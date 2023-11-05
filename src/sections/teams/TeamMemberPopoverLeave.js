import { Button, Popover, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import usePopoverPosition from '../../hooks/usePopoverPosition';

// ----------------------------------------------------------------------

TeamMemberPopoverLeave.propTypes = {
  event: PropTypes.object,
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function TeamMemberPopoverLeave({ event, open, anchorEl, onClose }) {
  const popover = usePopoverPosition(event, 124, 'vertical');
  console.log(event);
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
          width: 194,
          borderRadius: '12px',
          // boxShadow: ' 0px 20px 40px -4px rgba(145, 158, 171, 0.16)',
          ...popover.sx,
        },
      }}
    >
      <Stack p={2}>
        <Typography variant='body2' align='center' mb={1.5}>
          Are you sure you want to leave the team?
        </Typography>

        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={1.5}>
          <Button variant='outlined' color='inherit' onClick={onClose}>
            Cancel
          </Button>
          <Button variant='contained' color='primary'>
            Leave
          </Button>
        </Stack>
      </Stack>
    </Popover>
  );
}
