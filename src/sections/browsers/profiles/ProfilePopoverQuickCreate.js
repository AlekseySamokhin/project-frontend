import PropTypes from 'prop-types';
import { List, ListItemButton, ListItemIcon, ListItemText, Popover, Stack } from '@mui/material';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const LIST = [
  { id: '1', label: 'Windows quick creation', icon: 'main/ic_windows.svg', iconWidth: 18, iconHeight: 20 },
  { id: '2', label: 'MacOS quick creation', icon: 'main/ic_macOs.svg', iconWidth: 18, iconHeight: 20 },
  { id: '3', label: 'Linux quick creation', icon: 'main/ic_linux.svg', iconWidth: 18, iconHeight: 20 },
];

// ----------------------------------------------------------------------

ProfilePopoverQuickCreate.propTypes = {
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function ProfilePopoverQuickCreate({ open, anchorEl, onClose }) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: { p: '6px', width: 270 },
      }}
    >
      <Stack>
        <List component="nav" sx={{ p: 0 }}>
          {LIST.map((element, index) => (
            <ListItemButton
              key={element.id}
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
