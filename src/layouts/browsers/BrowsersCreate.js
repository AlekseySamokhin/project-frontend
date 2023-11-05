import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { useState, useEffect } from 'react';
import { isEmpty, cloneDeep } from 'lodash';
import { useDispatch, useSelector } from '../../redux/store';
import axios from '../../utils/axios';
import { _folderColorSettings, _folderIconSettings } from '../../_mock/_folder_settings';
import SvgIconStyle from '../../components/SvgIconStyle';
import usePopoverPosition from '../../hooks/usePopoverPosition';
import { browsersFolderRequested } from '../../redux/slices/browsers';
import { personalityRequested } from '../../redux/slices/personality';
import { noCase } from 'change-case';

// ----------------------------------------------------------------------

BrowsersCreate.propTypes = {
  event: PropTypes.object,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function BrowsersCreate({ event, open, onClose, anchorEl }) {
  const dispatch = useDispatch();

  const popover = usePopoverPosition(event, 291, 'vertical');

  const [colorState, setColorState] = useState(_folderColorSettings);

  const [iconState, setIconState] = useState(_folderIconSettings);

  const [emptyTitle, setEmptyTitle] = useState(false);

  const loading = useSelector((state) => state.browsers.folder.loading);

  const initPositions = useSelector((state) => state.personality.data.folders);

  const [foldersPosition, setFoldersPosition] = useState(null);

  useEffect(() => {
    setFoldersPosition(
      map(cloneDeep(initPositions), (item) => {
        item.position = parseInt(item.position);
        return item;
      })
    );
  }, [initPositions, dispatch]);

  const newPosition = () => {
    const onlyPositionsOfClone = map(foldersPosition, (item) => item.position);
    const biggestPosition = onlyPositionsOfClone.sort((a, b) => b - a);
    return biggestPosition[0] + 1;
  };

  const [newFolder, setNewFolder] = useState(
    {
      folder_name: '',
      folder_icon: 'folders',
      folder_color: 'grey.600',
    });

  const onChangeItem = (newTitle) => {
    !isEmpty(newTitle) && setEmptyTitle(false);
    setNewFolder({
      ...newFolder,
      folder_name: newTitle,
    });
  };

  const onCloseWithReset = () => {
    onClose();
    setTimeout(
      () => {
        setNewFolder({
          folder_name: '',
          folder_color: '',
          folder_icon: '',
        });
        map(colorState, (item) => item.is_selected = false);
        map(iconState, (item) => item.is_selected = false);
      }, 500);
  };

  const onSelectColor = (id) => {
    const resetState = Array.from(colorState);
    map(resetState, (item) => (item.is_selected = false));
    setColorState(resetState);

    const selectedItem = resetState.filter((item) => item.id === id);
    selectedItem[0].is_selected = true;
    setColorState(resetState);
    setNewFolder({
      ...newFolder,
      folder_color: selectedItem[0].color,
    });
  };

  const onSelectIcon = (id) => {
    const resetState = Array.from(iconState);
    map(resetState, (item) => (item.is_selected = false));
    setIconState(resetState);

    const selectedItem = resetState.filter((item) => item.id === id);
    selectedItem[0].is_selected = true;
    setIconState(resetState);
    setNewFolder({
      ...newFolder,
      folder_icon: selectedItem[0].icon,
    });
  };

  const confirmSettings = async () => {
    const selectedItem = newFolder;
    if (isEmpty(selectedItem.folder_name)) {
      setEmptyTitle(true);
      return;
    }

    const colors = Array.from(colorState);
    const selectedColor = colors.filter((color) => color.is_selected === true);

    const icons = Array.from(iconState);
    const selectedIcon = icons.filter((icon) => icon.is_selected === true);

    !isEmpty(selectedColor) && (selectedItem.folder_color = selectedColor[0].color);
    !isEmpty(selectedIcon) && (selectedItem.folder_icon = selectedIcon[0].icon);

    setNewFolder(selectedItem);

    await axios.post(`api/v1/folders`, selectedItem).then(
      (response) => {
        axios.put(`api/v1/personality/folders`, {
          folders: [...foldersPosition, { id: response.data.id, position: newPosition() }],
        });
      }
    );

    dispatch(browsersFolderRequested());
    dispatch(personalityRequested());

    onCloseWithReset();
  };

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
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
          mt: 2,
          p: '20px',
          maxWidth: '320px',
          borderRadius: '12px',
          ...popover.sx,
        },
      }}
    >
      <Grid container direction='column'>
        <Grid container item direction='row' alignItems='center' justifyContent='space-between' spacing={1}>
          {map(_folderColorSettings, (colors, index) => (
            <Grid
              sx={{ cursor: 'pointer' }}
              item
              xs={2}
              value={colors.color}
              key={index}
              onClick={() => onSelectColor(colors.id)}
            >
              <Box
                sx={{ '&:hover': { border: (theme) => !colors.is_selected && `2px solid ${theme.palette.grey[500]}` } }}
                item
                bgcolor={colors.color}
                border={colors.is_selected && '2px solid rgba(51, 102, 255, 0.32)'}
                borderRadius='44px'
                height={40}
                minWidth={40}
              />
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 1.5 }} />
        <Grid container direction='row' alignItems='center' justifyContent='space-between' spacing={1} ml={-1}>
          {map(_folderIconSettings, (icons, index) => (
            <Grid
              container
              value={icons.icon}
              item
              xs={2}
              key={index}
              alignItems='center'
              justifyContent='center'
              onClick={() => onSelectIcon(icons.id)}
            >
              <IconButton
                p={1}
                onClick={() => onSelectIcon(icons.id)}
                sx={{ width: 40, height: 40, bgcolor: icons.is_selected && 'rgba(255, 193, 7, 0.24)' }}
              >
                <SvgIconStyle src={`/assets/icons/main/ic_${noCase(icons.icon)}.svg`}
                              sx={{ maxWidth: 20, height: 20, color: 'grey.600' }} />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Stack mt={1.5}>
        {emptyTitle && (
          <Alert severity='error' icon={false} sx={{ paddingY: 0.2, marginBottom: 1.5 }}>
            The folder cannot be without a name
          </Alert>
        )}
        <TextField
          fullWidth
          label='New folder'
          value={newFolder.folder_name}
          onChange={(event) => onChangeItem(event.target.value)}
          InputProps={{
            endAdornment: (
              <SvgIconStyle
                src={
                  !newFolder.folder_icon ? '/assets/icons/main/ic_folders.svg'
                    : `/assets/icons/main/ic_${noCase(newFolder.folder_icon)}.svg`
                }
                sx={{
                  minWidth: 20,
                  height: 20,
                  color: newFolder.folder_color ? newFolder.folder_color : 'grey.600',
                }}
              />
            ),
          }}
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
          sx={{
            label: { marginTop: '-6px' },
            input: {
              paddingY: '9px',
              bgcolor: 'background.paper',
            },
            '& .MuiInputBase-adornedEnd': {
              backgroundColor: 'background.paper',
            },
          }}
        />
      </Stack>
      <Stack direction='row' justifyContent='end' pt={1.5} spacing={1.5}>
        <Button
          variant='outlined'
          color='inherit'
          onClick={() => onCloseWithReset()}
          sx={{
            borderColor: 'grey.300',
          }}
        >
          <Typography color='text.primary' fontWeight={800} fontSize={14}>
            Cancel
          </Typography>
        </Button>
        <Button variant='contained' color='primary' onClick={!loading && confirmSettings}>
          {loading ? <CircularProgress size={20} color='inherit' /> : (
            <Typography color='white' fontWeight={800} fontSize={14}>
              Create Folder
            </Typography>
          )}
        </Button>
      </Stack>
    </Popover>
  );
}

