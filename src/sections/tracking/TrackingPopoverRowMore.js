import { List, ListItemButton, ListItemIcon, ListItemText, Popover, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import SvgIconStyle from '../../components/SvgIconStyle';
import usePopoverPosition from '../../hooks/usePopoverPosition';

// ----------------------------------------------------------------------

const LIST = [
  { id: '1', label: 'Changelog', icon: 'main/ic_change_calendar.svg', iconWidth: 18, iconHeight: 20 },
  { id: '2', label: 'Go to folder', icon: 'main/ic_drop_right.svg', iconWidth: 18, iconHeight: 14 },
  { id: '3', label: 'Unfollow', icon: 'main/ic_close.svg', iconWidth: 24, iconHeight: 24 },
];

// ----------------------------------------------------------------------

TrackingPopoverRowMore.propTypes = {
  // row: PropTypes.object,
  event: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
  setOpenChangelog: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function TrackingPopoverRowMore({ event, open, anchorEl, onClose, setOpenChangelog }) {
  const [selectElement, setSelectElement] = useState(null);

  const popover = usePopoverPosition(event, 140, 'vertical');

  const handleElement = (id) => {
    if (id === '1') {
      setOpenChangelog(true);
    }
    setSelectElement(id);
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: popover?.anchorOrVer,
        horizontal: popover?.anchorOrHor,
      }}
      transformOrigin={{
        vertical: popover?.transformOrVer,
        horizontal: popover?.transformOrHor,
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
        <List component="nav" sx={{ p: 0 }}>
          {LIST.map((element, index) => (
            <ListItemButton
              key={element.id}
              selected={element.id === selectElement}
              onClick={() => {
                handleElement(element.id);
              }}
              sx={{
                p: '8px, 12px',
                borderRadius: 1,
                mb: index === LIST.length - 1 ? 0 : 0.2,
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'grey.600',
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
