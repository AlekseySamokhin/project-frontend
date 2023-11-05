import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

import { useState } from 'react';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import map from 'lodash/map';

import { isEmpty } from 'lodash';
import FOLDER_NAV_CONFIG from '../../sections/FolderNavConfig';
import { _folderColorSettings, _folderIconSettings } from '../../_mock/_folder_settings';
import SvgIconStyle from '../../components/SvgIconStyle';
import usePopoverPosition from '../../hooks/usePopoverPosition';
import Scrollbar from '../../components/Scrollbar';

TrackingSettings.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default function TrackingSettings({ open, onClose }) {
  const [state, setState] = useState(FOLDER_NAV_CONFIG.sort((a, b) => a.position - b.position));

  const [nestedOpen, setNestedOpen] = useState(false);

  const [event, setEvent] = useState(null);

  const popover = usePopoverPosition(event, 291, 'vertical');

  const [anchorFolderSettings, setAnchorFolderSettings] = useState();

  const [colorState, setColorState] = useState(_folderColorSettings);

  const [iconState, setIconState] = useState(_folderIconSettings);

  const anchorElSettings = (event) => {
    setEvent(event);
    setAnchorFolderSettings(event.currentTarget);
    setNestedOpen(true);
  };

  const handleClose = () => {
    setNestedOpen(false);
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

  const onChangeItem = (newTitle, id) => {
    const changedState = Array.from(state);
    const selectedItem = changedState.filter((item) => item.id === id);
    selectedItem[0].title = newTitle;
    setState(changedState);
  };

  const onDeleteConfirmation = (id) => {
    const changedState = Array.from(state);
    const selectedItem = changedState.filter((item) => item.id === id);
    selectedItem[0].is_deleted = true;
    setState(changedState);
  };

  const onDeleteCansel = (id) => {
    const changedState = Array.from(state);
    const selectedItem = changedState.filter((item) => item.id === id);
    selectedItem[0].is_deleted = false;
    setState(changedState);
  };

  const onDelete = (id) => {
    const selectedItem = state.filter((item) => item.id === id);
    const newState = state.filter((item) => item.id !== id);
    const reorder = newState.filter((item) => item.position > selectedItem[0].position);
    map(reorder, (item) => {
      item.position = parseInt(item.position, 10) - 1;
      item.position += '';
    });
    newState.sort((a, b) => a.position - b.position);
    setState(newState);
  };

  const onSelectColor = (id) => {
    const resetState = Array.from(colorState);
    map(resetState, (item) => (item.is_selected = false));
    setColorState(resetState);

    const selectedItem = resetState.filter((item) => item.id === id);
    selectedItem[0].is_selected = true;
    setColorState(resetState);
  };

  const onSelectIcon = (id) => {
    const resetState = Array.from(iconState);
    map(resetState, (item) => (item.is_selected = false));
    setIconState(resetState);

    const selectedItem = resetState.filter((item) => item.id === id);
    selectedItem[0].is_selected = true;
    setIconState(resetState);
  };

  const onSelectToSettings = (id) => {
    const changedState = Array.from(state);
    map(changedState, (item) => (item.is_selected = false));
    setState(changedState);

    const selectedItem = changedState.filter((item) => item.id === id);
    selectedItem[0].is_selected = true;
    setState(changedState);
  };

  const confirmSettings = () => {
    const changedState = Array.from(state);
    const selectedItem = changedState.filter((item) => item.is_selected === true);

    const colors = Array.from(colorState);
    const selectedColor = colors.filter((color) => color.is_selected === true);

    const icons = Array.from(iconState);
    const selectedIcon = icons.filter((icon) => icon.is_selected === true);

    !isEmpty(selectedColor) && (selectedItem[0].color = selectedColor[0].color);
    !isEmpty(selectedIcon) && (selectedItem[0].icon = selectedIcon[0].icon);

    setState(changedState);

    const resetIconState = Array.from(iconState);
    map(resetIconState, (item) => (item.is_selected = false));
    setIconState(resetIconState);

    const resetColorState = Array.from(colorState);
    map(resetColorState, (item) => (item.is_selected = false));
    setColorState(resetColorState);

    setNestedOpen(false);
  };

  const onSubmit = () => {
    console.log(state);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{sx: {height: 356, width: 420}}}
      >
        <Stack direction='column'>
          <Stack direction='row' justifyContent='space-between' px={4} py={3}>
            <Typography variant='h6'>Setting up Folders</Typography>
            <Stack onClick={onClose} sx={{ cursor: 'pointer' }}>
              <SvgIconStyle src={`/assets/icons/main/ic_close.svg`} sx={{ width: 22, height: 22 }} />
            </Stack>
          </Stack>
          <Stack height={184}>
            <Scrollbar>
              <DragDropContext onDragEnd={onDragEnd}>
                <Divider />
                <Droppable droppableId='1'>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {map(state, (items, index) => (
                        <Draggable key={items.position} draggableId={items.position} index={index}>
                          {(provided, snapshot) => (
                            <Stack
                              direction='row'
                              justifyContent="center"
                              alignItems="center"
                              px={4}
                              pr={3}
                              py={1}
                              height={60}
                              spacing={2}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              sx={{ borderBottom: !snapshot.isDragging && '1px solid rgba(145, 158, 171, 0.24)' }}
                            >
                              <Box {...provided.dragHandleProps} mt="6px" sx={{ opacity: items.is_deleted && 0.3 }}>
                                <SvgIconStyle
                                  src={`/assets/icons/main/ic_burger.svg`}
                                  sx={{ width: 20, height: 20, color: 'grey.600' }}
                                />
                              </Box>
                              <TextField
                                fullWidth
                                value={items.title}
                                label="Folder name"
                                onChange={(event) => onChangeItem(event.target.value, items.id)}
                                InputLabelProps={{
                                  sx: {
                                    '&.MuiFormLabel-filled': {
                                      marginTop: '0',
                                    },
                                    '&.Mui-focused': {
                                      marginTop: '0',
                                    },
                                  },
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <SvgIconStyle
                                        src={items.icon}
                                        sx={{
                                          maxWidth: 20,
                                          height: 20,
                                          color: items.color,
                                          opacity: items.is_deleted && 0.3,
                                        }}
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  label: { marginTop: '-6px' },
                                  input: {
                                    paddingY: '9px',
                                    bgcolor: 'background.paper',
                                    opacity: items.is_deleted && 0.3,
                                  },
                                  '& .MuiInputBase-adornedEnd': {
                                    backgroundColor: 'background.paper',
                                  },
                                }}
                              />
                              <Stack direction="row" justifyContent="center" alignItems="center">
                                {items.is_deleted ? (
                                  <IconButton
                                    onClick={() => onDeleteCansel(items.id)}
                                    sx={{ cursor: 'pointer', p: 0, width: 36, height: 36 }}
                                  >
                                    <SvgIconStyle
                                      src={`/assets/icons/main/ic_close.svg`}
                                      sx={{ minWidth: 20, minHeight: 20, color: 'grey.600' }}
                                    />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    onClick={(event) => {
                                      anchorElSettings(event);
                                      onSelectToSettings(items.id);
                                    }}
                                    // mt="6px!important"
                                    sx={{ cursor: 'pointer', width: 36 }}
                                  >
                                    <SvgIconStyle
                                      src={`/assets/icons/main/ic_settings.svg`}
                                      sx={{ minWidth: 20, height: 20, color: 'grey.600' }}
                                    />
                                  </IconButton>
                                )}
                                {items.is_deleted ? (
                                  <IconButton
                                    onClick={() => onDelete(items.id)}
                                    mt="2px!important"
                                    sx={{ cursor: 'pointer' }}
                                  >
                                    <SvgIconStyle
                                      src={`/assets/icons/main/ic_confirm.svg`}
                                      sx={{ maxWidth: 20, height: 20, color: 'grey.600' }}
                                    />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    onClick={() => onDeleteConfirmation(items.id)}
                                    // mt="4px!important" sx={{cursor: 'pointer'}}
                                  >
                                    <SvgIconStyle
                                      src={`/assets/icons/main/ic_trash.svg`}
                                      sx={{ maxWidth: 20, maxHeight: 20, color: 'grey.600' }}
                                    />
                                  </IconButton>
                                )}
                              </Stack>
                            </Stack>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Scrollbar>
          </Stack>
          <Stack direction='row' justifyContent='end' px={4} py={3} spacing={1}>
            <Button
              variant='outlined'
              color='inherit'
              onClick={onClose}
              sx={{
                borderColor: 'grey.300',
                cursor: 'pointer',
              }}
            >
              <Typography color="text.primary" fontWeight={800} fontSize={14}>
                Cancel
              </Typography>
            </Button>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              <Typography color="white" fontWeight={800} fontSize={14}>
                Save
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Dialog>
      <div>
        <Popover
          open={nestedOpen}
          onClose={handleClose}
          anchorEl={anchorFolderSettings}
          anchorOrigin={{
            vertical: popover.anchorOrVer,
            horizontal: popover.anchorOrHor,
          }}
          transformOrigin={{
            vertical: popover.transformOrVer,
            horizontal: popover.transformOrHor,
          }}
          PaperProps={{
            sx: {
              p: '20px',
              maxWidth: '320px',
              borderRadius: '12px',
              ...popover.sx,
            },
          }}
        >
          <Grid container direction="column">
            <Grid container item direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              {map(_folderColorSettings, (colors, index) => (
                <Grid item xs={2} value={colors.color} key={index} onClick={() => onSelectColor(colors.id)}>
                  <Box
                    item
                    bgcolor={colors.color}
                    border={colors.is_selected && '2px solid rgba(51, 102, 255, 0.32)'}
                    borderRadius="44px"
                    height={40}
                    minWidth={40}
                    sx={{
                      '&:hover': { border: (theme) => !colors.is_selected && `2px solid ${theme.palette.grey[500]}` },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: 1.5 }} />
            <Grid container direction="row" alignItems="center" justifyContent="space-between" spacing={1} ml={-1}>
              {map(_folderIconSettings, (icons, index) => (
                <Grid
                  container
                  value={icons.icon}
                  item
                  xs={2}
                  key={index}
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => onSelectIcon(icons.id)}
                >
                  <IconButton
                    p={1}
                    onClick={() => onSelectIcon(icons.id)}
                    sx={{ width: 40, height: 40, bgcolor: icons.is_selected && 'rgba(255, 193, 7, 0.24)' }}
                  >
                    <SvgIconStyle src={icons.icon} sx={{ maxWidth: 20, height: 20, color: 'grey.600' }} />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="end" pt={2.25} spacing={1}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleClose}
              sx={{
                borderColor: 'grey.300',
              }}
            >
              <Typography color="text.primary" fontWeight={800} fontSize={14}>
                Cancel
              </Typography>
            </Button>
            <Button variant="contained" color="primary" onClick={confirmSettings}>
              <Typography color="white" fontWeight={800} fontSize={14}>
                Set Style
              </Typography>
            </Button>
          </Stack>
        </Popover>
      </div>
    </>
  );
}
