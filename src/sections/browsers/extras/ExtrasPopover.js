import PropTypes from 'prop-types';
import { Popover } from '@mui/material';
import usePopoverPosition from '../../../hooks/usePopoverPosition';

// ----------------------------------------------------------------------

ExtrasPopover.propTypes = {
  event: PropTypes.object,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  height: PropTypes.number,
};

// ----------------------------------------------------------------------

export default function ExtrasPopover({ event, children, open, onClose, anchorEl, height }) {

  const popover = usePopoverPosition(event, height, 'horizontal', 342);

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
          p: '5px',
          width: '342px',
          borderRadius: '11px',
          ...popover.sx,
        },
      }}
    >
      {children}
    </Popover>
  );
}
