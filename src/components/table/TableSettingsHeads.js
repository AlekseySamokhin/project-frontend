import PropTypes from 'prop-types';
import { Box, Button, Checkbox, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import map from 'lodash/map';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { isEmpty } from 'lodash';
import SvgIconStyle from '../SvgIconStyle';
import ModalTabs from '../../sections/ModalTabs';
import CreateDrawer from '../browsers/CreateDrawer';

// ----------------------------------------------------------------------

const TABLE_HEADS = [
  {
    id: 'settings',
    label: 'Settings',
    src: '/assets/icons/main/ic_settings_second.svg',
    iconWidth: 24,
    iconHeight: 24,
  },
];

const tableHeads = [
  { id: '1', label: 'Tags', position: '0', is_showing: false },
  { id: '2', label: 'Proxy', position: '1', is_showing: false },
  { id: '3', label: 'Status', position: '2', is_showing: false },
  { id: '4', label: 'Notes', position: '3', is_showing: false },
  { id: '5', label: 'Worktime', position: '4', is_showing: false },
  { id: '6', label: 'Timer', position: '5', is_showing: false },
];

// ----------------------------------------------------------------------

TableSettingsHeads.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function TableSettingsHeads({ open, onClose, sx }) {
  const [state, setState] = useState(tableHeads);

  const cansel = () => {
    // при появлении стейта в редаксе будет следующая логика:
    //   1. все изменения до клика по Save пишутся в локальныйState
    //   2. при закрытии формы без кнопки Save
    //      срабатывает cansel с помощью setЛокальныйState(редаксState),
    //      так мы откатим к начальному стейту всё несохраненное
    onClose();
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }

    if (destination.index > source.index) {
      const reorderState = Array.from(state);
      const selected = reorderState.filter((item) => item.position === draggableId);
      const summaryStart = reorderState.filter((item) => item.position <= destination.index);
      const summaryEnd = summaryStart.filter((item) => item.position > source.index);
      map(summaryEnd, (item) => {
        item.position = parseInt(item.position, 10) - 1;
        item.position += '';
      });
      selected[0].position = `${destination.index}`;
      reorderState.sort((a, b) => a.position - b.position);
      setState(reorderState);
    }

    if (source.index > destination.index) {
      const reorderState = Array.from(state);
      const selected = reorderState.filter((item) => item.position === draggableId);
      const summaryStart = reorderState.filter((item) => item.position >= destination.index);
      const summaryEnd = summaryStart.filter((item) => item.position < source.index);
      map(summaryEnd, (item) => {
        item.position = parseInt(item.position, 10) + 1;
        item.position += '';
      });
      selected[0].position = `${destination.index}`;
      reorderState.sort((a, b) => a.position - b.position);
      setState(reorderState);
    }
  };

  const onCheckbox = (id, event) => {
    const renderState = Array.from(state);
    const selectedItem = renderState.filter((item) => item.id === id);
    selectedItem[0].is_showing = event.target.checked;
    setState(renderState);
  };

  const notFoundHidden = () => {
    const renderState = Array.from(state);
    const notShowingItems = renderState.filter((item) => item.is_showing === false);
    return !isEmpty(notShowingItems);
  };

  const foundHidden = () => {
    const renderState = Array.from(state);
    const notShowingItems = renderState.filter((item) => item.is_showing === false);
    return isEmpty(notShowingItems);
  };

  const allCheckboxes = (event) => {
    const renderState = Array.from(state);
    map(renderState, (item) => {
      item.is_showing = event.target.checked;
    });
    setState(renderState);
  };

  const confirmSettings = () => {
    console.log(state);
  };

  return (
    <CreateDrawer open={open} toggleDrawer={cansel} sx={{ width: 320, ...sx }}>
      <ModalTabs tabValue="settings" onCloseModal={cansel} tableHeads={TABLE_HEADS} />
      <Box p={2} height={1} justifyContent="space-between">
        <Stack height={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderRadius={0.5}
            border="1px solid rgba(145, 158, 171, 0.16)"
            py={0.25}
            px={1}
            mb={1}
            sx={{ bgcolor: 'background.paper' }}
          >
            <Stack direction="row" alignItems="center">
              <Checkbox
                checked={foundHidden()}
                indeterminate={notFoundHidden()}
                onClick={(event) => allCheckboxes(event)}
              />
              <Typography variant="body2">All</Typography>
            </Stack>
          </Stack>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="1">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {map(state, (items, index) => (
                    <Draggable key={items.position} draggableId={items.position} index={index}>
                      {(provided) => (
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          borderRadius={0.5}
                          border="1px solid rgba(145, 158, 171, 0.16)"
                          py={0.25}
                          px={1}
                          mb={1}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          sx={{ bgcolor: 'background.paper' }}
                        >
                          <Stack direction="row" alignItems="center">
                            <Checkbox checked={items.is_showing} onClick={(event) => onCheckbox(items.id, event)} />
                            <Typography variant="body2">{items.label}</Typography>
                          </Stack>
                          <Box {...provided.dragHandleProps} mt="6px" mr={0.5}>
                            <SvgIconStyle
                              src={`/assets/icons/main/ic_burger.svg`}
                              sx={{ width: 20, height: 20, color: 'grey.600' }}
                            />
                          </Box>
                        </Stack>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Stack>
        <Stack direction="row" justifyContent="space-around" mt={-4}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={cansel}
            sx={{
              borderColor: 'grey.300',
              width: '45%',
            }}
          >
            <Typography color="text.primary" fontWeight={800} fontSize={14}>
              Cancel
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={confirmSettings}
            sx={{
              borderColor: 'grey.300',
              width: '45%',
            }}
          >
            <Typography color="white" fontWeight={800} fontSize={14}>
              Save
            </Typography>
          </Button>
        </Stack>
      </Box>
    </CreateDrawer>
  );
}
