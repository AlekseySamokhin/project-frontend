import { CircularProgress, Stack } from '@mui/material';
import PropTypes from 'prop-types';

Loading.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.string,
};

export default function Loading({ size = 32, color = 'text.disabled', height = '70%' }) {
  return (
    <Stack minHeight={height} minWidth='100%' direction='row' justifyContent='center' alignItems='center'>
      <CircularProgress
        size={size}
        sx={{
          '&.MuiCircularProgress-root': {
            color,
          },
        }}
      />
    </Stack>
  );
}
