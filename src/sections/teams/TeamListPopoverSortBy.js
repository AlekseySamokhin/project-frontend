import { List, ListItemButton, ListItemText, Popover, Stack } from '@mui/material';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

const LIST = [
  { id: 'status', label: 'Status' },
  { id: 'date', label: 'Date' },
  { id: 'position', label: 'Position' },
];

// ----------------------------------------------------------------------

TeamListPopoverSortBy.propTypes = {
  value: PropTypes.string,
  handleValue: PropTypes.func,
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function TeamListPopoverSortBy({ value, handleValue, open, anchorEl, onClose }) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      PaperProps={{
        sx: { p: '6px', width: 162 },
      }}
    >
      <Stack>
        <List sx={{ p: 0 }}>
          {LIST.map((element, index) => (
            <ListItemButton
              key={element.id}
              selected={element.id === value}
              onClick={() => {
                handleValue(element.id);
                onClose();
              }}
              sx={{
                p: '8px  12px',
                borderRadius: 1,
                mb: index === LIST.length - 1 ? 0 : 0.2,
              }}
            >
              <ListItemText primary={element.label} />
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </Popover>
  );
}
