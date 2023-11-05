import { List, ListItemButton, ListItemIcon, ListItemText, Popover, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import SvgIconStyle from '../../../components/SvgIconStyle';
import usePopoverPosition from '../../../hooks/usePopoverPosition';
import { ProfileModalEdit } from './index';

// ----------------------------------------------------------------------

const LIST = [
  { id: '1', label: 'Edit profile', icon: 'main/ic_edit_row.svg', iconWidth: 19, iconHeight: 19 },
  { id: '2', label: 'Pin to top', icon: 'main/ic_pin.svg', iconWidth: 18.71, iconHeight: 18.71 },
  { id: '3', label: 'Copy profile', icon: 'main/ic_copy.svg', iconWidth: 20, iconHeight: 20 },
  { id: '4', label: 'Import cookies', icon: 'main/ic_import.svg', iconWidth: 16, iconHeight: 20 },
  { id: '5', label: 'Export cookies', icon: 'main/ic_export.svg', iconWidth: 18, iconHeight: 20 },
  { id: '6', label: 'Cookie robot', icon: 'main/ic_robot.svg', iconWidth: 19, iconHeight: 18 },
  { id: '7', label: 'Delete', icon: 'main/ic_delete.svg', iconWidth: 20, iconHeight: 20 },
];

// ----------------------------------------------------------------------

ProfilePopoverRowMore.propTypes = {
  // row: PropTypes.object,
  event: PropTypes.node,
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
  openEditProfile: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function ProfilePopoverRowMore({ event, open, anchorEl, onClose, openEditProfile }) {

  const popover = usePopoverPosition(event, 302, 'vertical');

  const handleElement = (id) => {

    switch (id) {
      case '1':
        openEditProfile();
        onClose();
        break;

      default:
        onClose();
        break;
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
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
          p: '6px',
          width: 216,
          borderRadius: '10px',
          ...popover.sx,
        },
      }}
    >
      <Stack>
        <List component='nav' sx={{ p: 0 }}>
          {LIST.map((element, index) => (
            <ListItemButton
              key={element.id}
              onClick={() => handleElement(element.id)}
              sx={{
                p: '8px, 12px',
                borderRadius: 1,
                mb: index === LIST.length - 1 ? 0 : 0.2,
              }}
            >
              <ListItemIcon
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 24,
                  height: 24,
                }}
              >
                <SvgIconStyle
                  src={`/assets/icons/${element.icon}`}
                  sx={{ width: element.iconWidth, height: element.iconHeight }}
                />
              </ListItemIcon>

              <ListItemText primary={element.label} />
            </ListItemButton>
          ))}
        </List>

      </Stack>
    </Popover>
  );
}
