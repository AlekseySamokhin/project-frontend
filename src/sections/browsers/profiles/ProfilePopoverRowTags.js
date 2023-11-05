import { Popover } from '@mui/material';
import PropTypes from 'prop-types';
import BrowsersSelectTags from '../BrowsersSelectTags';
import usePopoverPosition from '../../../hooks/usePopoverPosition';

// ----------------------------------------------------------------------

ProfilePopoverRowTags.propTypes = {
  event: PropTypes.object,
  row: PropTypes.object,
  id: PropTypes.string,
  value: PropTypes.array,
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function ProfilePopoverRowTags({ event, row, id, value, open, anchorEl, onClose }) {

  const popover = usePopoverPosition(event, 165, 'horizontal');

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
          p: 2,
          pb: 0,
          width: 351,
          borderRadius: '12px',
          ...popover.sx,
        },
      }}
    >
      <BrowsersSelectTags row={row} selectTagsDefault={value} id={id} onClose={onClose} />
    </Popover>
  );
}
