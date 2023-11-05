import { Box, Popover } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DayPicker } from 'react-day-picker';
import React from 'react';
import PropTypes from 'prop-types';

CalendarPopover.propTypes = {
  open: PropTypes.bool,
  anchorEl: PropTypes.func,
  onClose: PropTypes.func,
};

export default function CalendarPopover({ open, anchorEl, onClose }) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: { p: '6px', width: 320, height: 358 },
      }}
    >
      <Box
        sx={{
          width: 320,
          height: 358,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DayPicker
            styles={{
              width: '320px',
              height: '358px',
            }}
            mode='range'
            format='MM/dd/yyyy'
          />
        </LocalizationProvider>
      </Box>
    </Popover>
  );
}
