import { Alert, Box, Button, Divider, Grid, IconButton, Popover, Stack, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import { _folderColorSettings, _folderIconSettings } from '../../_mock/_folder_settings';
import SvgIconStyle from '../../components/SvgIconStyle';
import usePopoverPosition from '../../hooks/usePopoverPosition';

// ----------------------------------------------------------------------

TrackingCreate.propTypes = {
  event: PropTypes.object,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function TrackingCreate({ event, open, onClose, anchorEl }) {
  const popover = usePopoverPosition(event, 291, 'vertical');

  const [colorState, setColorState] = useState(_folderColorSettings);

  const [iconState, setIconState] = useState(_folderIconSettings);

  const [emptyTitle, setEmptyTitle] = useState(false);

  const [newFolder, setNewFolder] = useState([
    {
      id: 4,
      title: '',
      is_deleted: false,
      is_selected: false,
      position: '4',
      path: '#',
      icon: '/assets/icons/main/ic_folders.svg',
      color: 'grey.600',
      active: false,
    },
  ]);

  const onChangeItem = (newTitle, id) => {
    !isEmpty(newTitle) && setEmptyTitle(false);
    const changedState = Array.from(newFolder);
    const selectedItem = changedState.filter((item) => item.id === id);
    selectedItem[0].title = newTitle;
    setNewFolder(changedState);
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

  const confirmSettings = () => {
    const folderTemplate = Array.from(newFolder);
    const selectedItem = folderTemplate[0];
    if (isEmpty(selectedItem.title)) {
      setEmptyTitle(true);
      return;
    }

    const colors = Array.from(colorState);
    const selectedColor = colors.filter((color) => color.is_selected === true);

    const icons = Array.from(iconState);
    const selectedIcon = icons.filter((icon) => icon.is_selected === true);

    !isEmpty(selectedColor) && (selectedItem.color = selectedColor[0].color);
    !isEmpty(selectedIcon) && (selectedItem.icon = selectedIcon[0].icon);

    setNewFolder(folderTemplate);
    console.log(folderTemplate[0]);

    onClose();
    setTimeout(() => {
      const resetNewFolder = Array.from(newFolder);
      map(resetNewFolder, (item) => {
        item.title = '';
        item.icon = '/assets/icons/main/ic_folders.svg';
        item.color = 'grey.600';
        item.is_selected = false;
      });
      setNewFolder(resetNewFolder);
    }, 3000);
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
      <Grid container direction="column">
        <Grid container item direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
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
                borderRadius="44px"
                height={40}
                minWidth={40}
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
      <Stack mt={1.5}>
        {emptyTitle && (
          <Alert severity="error" icon={false} sx={{ paddingY: 0.2, marginBottom: 1.5 }}>
            The folder cannot be without a name
          </Alert>
        )}
        <TextField
          fullWidth
          label="New folder"
          value={newFolder[0].title}
          onChange={(event) => onChangeItem(event.target.value, newFolder[0].id)}
          InputProps={{
            endAdornment: (
              <SvgIconStyle
                src={newFolder[0].icon}
                sx={{
                  minWidth: 20,
                  height: 20,
                  color: newFolder[0].color,
                  opacity: newFolder[0].is_deleted && 0.3,
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
              opacity: newFolder[0].is_deleted && 0.3,
            },
            '& .MuiInputBase-adornedEnd': {
              backgroundColor: 'background.paper',
            },
          }}
        />
      </Stack>
      <Stack direction="row" justifyContent="end" pt={1.5} spacing={1.5}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onClose}
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
            Create Folder
          </Typography>
        </Button>
      </Stack>
    </Popover>
  );
}
