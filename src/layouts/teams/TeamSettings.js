import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  InputAdornment,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import map from 'lodash/map';
import truncate from 'lodash/truncate';
import { useEffect, useState } from 'react';
import SvgIconStyle from '../../components/SvgIconStyle';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { cloneDeep, isEmpty, keys, toUpper } from 'lodash';
import { useDispatch, useSelector } from '../../redux/store';
import axios from '../../utils/axios';
import { personalityRequested } from '../../redux/slices/personality';
import { teamsRequested } from '../../redux/slices/teams';
import Scrollbar from '../../components/Scrollbar';
import { popoverSetting } from '../LayoutConfig';

// ----------------------------------------------------------------------

TeamSettings.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function TeamSettings({ open, onClose }) {
  const dispatch = useDispatch();

  const teamsPosition = useSelector(state => state.personality.data.teams);
  const { notDeletedAndRoleAdmin: notDeleted } = useSelector(state => state.teams);
  const [nestedOpen, setNestedOpen] = useState(false);
  const [anchorTeamSettings, setAnchorTeamSettings] = useState();
  const [selectedShortName, setSelectedShortName] = useState(null);
  const [state, setState] = useState(notDeleted);

  useEffect(() => {
    const items = cloneDeep(notDeleted);
    if (typeof items !== 'undefined') {
      map(teamsPosition, (item) => {
        let changeItem = items.filter(filterItem => filterItem.id === item.id);
        if (!isEmpty(changeItem)) {
          changeItem[0].position = item.position;
          changeItem[0].is_deleted = false;
          changeItem[0].deleting = false;
        }
      });
      items.sort((a, b) => a.position - b.position);
      setState(items);
    }
  }, [notDeleted, teamsPosition]);

  const anchorElSettings = (event) => {
    setAnchorTeamSettings(event.currentTarget);
    setNestedOpen(true);
  };

  const handleClose = () => {
    setNestedOpen(false);
  };


  const onDragEnd = result => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }

    if (destination.index > source.index) {
      const reorderState = cloneDeep(state);
      const selected = reorderState.filter(item => item.position === draggableId);
      const summaryStart = reorderState.filter(item => item.position <= destination.index);
      const summaryEnd = summaryStart.filter(item => item.position > source.index);
      map(summaryEnd, (item) => {
        item.position = parseInt(item.position) - 1;
        item.position = item.position + '';
      });
      selected[0].position = destination.index + '';
      reorderState.sort((a, b) => a.position - b.position);
      setState(reorderState);
    }

    if (source.index > destination.index) {
      const reorderState = cloneDeep(state);
      const selected = reorderState.filter(item => item.position === draggableId);
      const summaryStart = reorderState.filter(item => item.position >= destination.index);
      const summaryEnd = summaryStart.filter(item => item.position < source.index);
      map(summaryEnd, (item) => {
        item.position = parseInt(item.position) + 1;
        item.position = item.position + '';
      });
      selected[0].position = destination.index + '';
      reorderState.sort((a, b) => a.position - b.position);
      setState(reorderState);
    }
  };

  const onChangeItem = (newName, id) => {
    const changedState = Array.from(state);
    const selectedItem = changedState.filter(item => item.id === id);
    selectedItem[0].name = newName;
    setState(changedState);
  };

  const onDeleteConfirmation = (id) => {
    const changedState = Array.from(state);
    const selectedItem = changedState.filter(item => item.id === id);
    selectedItem[0].is_deleted = true;
    setState(changedState);
  };

  const onDeleteCansel = (id) => {
    const changedState = Array.from(state);
    const selectedItem = changedState.filter(item => item.id === id);
    selectedItem[0].is_deleted = false;
    setState(changedState);
  };

  const onDelete = async (id) => {
    try {
      const changedState = Array.from(state);
      const selectedItem = changedState.filter((item) => item.id === id);
      selectedItem[0].deleting = true;
      setState(changedState);

      await axios.delete(`api/v1/teams/${id}`).then(dispatch(teamsRequested()))

      dispatch(teamsRequested())

      selectedItem[0].deleting = false;
      setState(changedState);

    } catch (e) {
      console.log(e);
    }

    // const newState = state.filter(item => item.id !== id);
    // const reorder = newState.filter(item => item.position > selectedItem[0].position);
    // map(reorder, (item) => {
    //   item.position = parseInt(item.position) - 1;
    //   item.position = item.position + '';
    // });
    // newState.sort((a, b) => a.position - b.position);
    // setState(newState);
  };

  const onSubmit = () => {
    const teams = cloneDeep(state);
    const personalityTeams = cloneDeep(state);

    map(teams, (item) => {
      delete item.position;
      delete item.is_deleted;
      delete item.deleting;
    });

    console.log(teams, '[PUT] /teams/?????');

    map(personalityTeams, (item) => {
      const itemKeys = keys(item);
      itemKeys.map(checking => {
        if (checking === 'id') {
          checking;
        } else if (checking === 'position') {
          checking;
        } else {
          delete item[checking];
        }
      })
      ;
    });
    personalityTeams.map((item) => {
      item.position = parseInt(item.position);
    });
    console.log(personalityTeams, '[PUT] /personality/teams');
    onPersonalityQuery(personalityTeams).then();
  };

  const onPersonalityQuery = async (data) => {
    try {
      await axios.put(`api/v1/personality/teams`, { teams: data });
      dispatch(personalityRequested());
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const shortNickname = (id) => {
    const stateCopy = Array.from(state);
    const selectedItem = stateCopy.filter(items => items.id === id);
    selectedItem[0] = toUpper(truncate(selectedItem[0].name, { length: 2, omission: '' }));
    setSelectedShortName(selectedItem[0]);
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
            <Typography variant='h6'>
              Setting up Teams
            </Typography>
            <Stack sx={{ cursor: 'pointer' }} onClick={onClose}>
              <SvgIconStyle src={`/assets/icons/main/ic_close.svg`}
                            sx={{ width: 22, height: 22 }}
              />
            </Stack>
          </Stack>
          <Stack height={184}>
            <Scrollbar>
            <DragDropContext onDragEnd={onDragEnd}>
              <Divider />
              <Droppable droppableId='1'>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {map(state, (items, index) => (
                      <Draggable key={items.position} draggableId={items.position} index={index}>
                        {(provided, snapshot) => (
                          <Stack
                            direction='row'
                            justifyContent='center'
                            alignItems='center'
                            px={4}
                            py={1}
                            spacing={2}
                            height={60}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            sx={{ borderBottom: !snapshot.isDragging && '1px solid rgba(145, 158, 171, 0.24)' }}
                          >
                            <Box {...provided.dragHandleProps} mt='6px' sx={{ opacity: items.is_deleted && 0.3 }}>
                              <SvgIconStyle src={`/assets/icons/main/ic_burger.svg`}
                                            sx={{ width: 20, height: 20, color: 'grey.600' }}
                              />
                            </Box>
                            <TextField
                              fullWidth
                              value={items.name}
                              placeholder='Team name'
                              onChange={(event) =>
                                onChangeItem(event.target.value, items.id)}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <SvgIconStyle src={items.icon}
                                                  sx={{
                                                    minWidth: 24, height: 24, color: items.color,
                                                    opacity: items.is_deleted && 0.3 || items.deleted_at !== null && 0.3,
                                                  }}
                                    />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                input: {
                                  paddingY: '9px',
                                  bgcolor: 'background.paper',
                                  opacity: items.is_deleted && 0.3 || items.deleted_at !== null && 0.3,
                                },
                                '& .MuiInputBase-adornedEnd': {
                                  backgroundColor: 'background.paper',
                                },
                              }}
                            />
                            {items.deleting && (
                              <Stack spacing={2} direction="row">
                                <Box width="24px" />
                                <Box width="20px" height="20px">
                                  <CircularProgress size="20px" />
                                </Box>
                              </Stack>
                            )}
                            {!items.deleting && items.is_deleted && (
                              <Box onClick={() => onDeleteCansel(items.id)} mt="3px!important"
                                   hidden={items.deleted_at !== null}>
                                <SvgIconStyle src={`/assets/icons/main/ic_close.svg`}
                                              sx={{ minWidth: 20, minHeight: 20, color: 'grey.600' }}
                                />
                              </Box>
                            )}

                            {!items.deleting && !items.is_deleted && (
                              <Box
                                onClick={(event) => {
                                  anchorElSettings(event);
                                  shortNickname(items.id);
                                }}
                                hidden={items.deleted_at !== null}
                              >
                                <Box
                                  width={24}
                                  height={24}
                                  borderRadius="50%"
                                  alignItems="center"
                                  justifyContent="center"
                                  bgcolor='grey.400'
                                  display="flex"
                                >
                                  <Typography fontSize={10} color="grey.600" fontWeight="600">
                                    {toUpper(truncate(items.name, { length: 2, omission: '' }))}
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                            {!items.deleting && items.is_deleted && (
                              <Box onClick={() => onDelete(items.id)} mt={'2px!important'}
                                   hidden={items.deleted_at !== null}>
                                <SvgIconStyle src={`/assets/icons/main/ic_confirm.svg`}
                                              sx={{ maxWidth: 20, height: 20, color: 'grey.600' }}
                                />
                              </Box>
                            )}

                            {!items.deleting && !items.is_deleted && (
                              <Box onClick={() => onDeleteConfirmation(items.id)} mt="4px!important"
                                   hidden={items.deleted_at !== null}>
                                <SvgIconStyle src={`/assets/icons/main/ic_trash.svg`}
                                              sx={{ maxWidth: 20, maxHeight: 20, color: 'grey.600' }}
                                />
                              </Box>
                            )}
                            {items.deleted_at !== null && (
                              <Stack spacing={2} direction="row">
                                <Box width="24px" />
                                <Box width="20px" />
                              </Stack>
                            )}
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
              }}
            >
              <Typography color='text.primary' fontWeight={800} fontSize={14}>
                Cancel
              </Typography>
            </Button>
            <Button variant='contained' color='primary' onClick={onSubmit}>
              <Typography color='white' fontWeight={800} fontSize={14}>
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
          anchorEl={anchorTeamSettings}
          anchorOrigin={{
            vertical: popoverSetting.anchorOrVer,
            horizontal: popoverSetting.anchorOrHor,
          }}
          transformOrigin={{
            vertical: popoverSetting.transformOrVer,
            horizontal: popoverSetting.transformOrHor,
          }}
          PaperProps={{
            sx: (theme) => ({
              p: '20px',
              maxWidth: '197px',
              borderRadius: '12px',
              ...popoverSetting.sx(theme),
            }),
          }}
        >
          <Grid container direction="column">
            <Grid container item direction="column" alignItems="center" justifyContent="space-between" spacing={1}
                  pb={1.75}>
              <Box
                width={64}
                height={64}
                borderRadius="50%"
                alignItems="center"
                justifyContent="center"
                bgcolor="grey.400"
                display="flex"
              >
                <Typography fontSize={14} color="grey.600" fontWeight="600">
                  {selectedShortName}
                </Typography>
              </Box>
            </Grid>
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: 'grey.300',
                marginBottom: '4px',
              }}
            >
              <Typography color="text.primary" fontWeight={800} fontSize={14}>
                Browse Image
              </Typography>
            </Button>
          </Grid>
          <Stack direction="row" justifyContent="end" pt={1} spacing={1}>
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
            <Button variant="contained" color="primary"
              // onClick={confirmSettings}
            >
              <Typography color="white" fontWeight={800} fontSize={14}>
                Save
              </Typography>
            </Button>
          </Stack>
        </Popover>
      </div>
    </>
  );
};
