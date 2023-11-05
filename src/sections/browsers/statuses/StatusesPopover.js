import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import map from 'lodash/map';
import { useState } from 'react';
import PropTypes from 'prop-types';
import usePopoverPosition from '../../../hooks/usePopoverPosition';

// ----------------------------------------------------------------------

const COLORS = ['#00AB55', '#3366FF', '#FFC107', '#FF4842', '#C4CDD5'];

// ----------------------------------------------------------------------

StatusesPopover.propTypes = {
  event: PropTypes.node,
  selectColor: PropTypes.string,
  setSelectColor: PropTypes.func.isRequired,
  openPopover: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.node,
};

// ----------------------------------------------------------------------

export default function StatusesPopover({ event, selectColor, setSelectColor, openPopover, onClose, anchorEl }) {
  const [checkColor, setCheckColor] = useState(selectColor);

  const popover = usePopoverPosition(event, 136, 'horizontal', 266);

  const confirmSettings = () => {
    setSelectColor(checkColor);
    onClose();
  };

  return (
    <Popover
      open={openPopover}
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
          p: '20px',
          borderRadius: '12px',
          ...popover.sx,
        },
      }}
    >
      <Stack direction="column">
        <Stack direction="row" alignItems="center" spacing={0.8} pb={1.5}>
          {map(COLORS, (color, index) => (
            <Stack sx={{ cursor: 'pointer' }} item value={color} key={index} onClick={() => setCheckColor(color)}>
              <Box
                // sx={{'&:hover': { border: color !== checkColor && `2px solid #C4CDD5`}}}
                p={0}
                bgcolor={color}
                border={color === checkColor && '2px solid rgba(0, 0, 0, 0.5)'}
                borderRadius="44px"
                height={40}
                width={40}
              />
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" justifyContent="end" pt={1} spacing={1}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
            sx={{
              width: 79,
              height: 36,
              borderColor: 'grey.300',
            }}
          >
            <Typography color="text.primary" fontWeight={800} fontSize={14} onClick={onClose}>
              Cancel
            </Typography>
          </Button>
          <Button sx={{ width: 94 }} variant="contained" color="primary" onClick={confirmSettings}>
            <Typography color="white" fontWeight={800} fontSize={14}>
              Set Style
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Popover>
  );
}
