import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Popover } from '@mui/material';

// ----------------------------------------------------------------------

CustomPopover.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

export default function CustomPopover({ children, open, onClose, anchorEl }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          p: '5px',
          maxWidth: '320px',
          borderRadius: '12px',
          overflowX: 'unset',
          overflowY: 'unset',
          boxShadow: theme.customShadows.popover,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 6,
            left: 'calc(100% + 7px)',
            width: 18,
            height: 14,
            backgroundColor: theme.palette.grey[isLight ? 0 : 800],
            transform: 'translate(-50%, 50%) rotate(90deg)',
            clipPath: 'polygon(50% 50%, 0% 100%, 100% 100%);',
          },
        },
      }}
    >
      {children}
    </Popover>
  );
}
