import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import SvgIconStyle from './SvgIconStyle';

// ----------------------------------------------------------------------

CustomIcon.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  boxWidth: PropTypes.number,
  boxHeight: PropTypes.number,
  boxSx: PropTypes.object,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function CustomIcon({
  src,
  width = 13,
  height = 13,
  boxWidth = 20,
  boxHeight = 20,
  boxSx,
  sx,
  ...other
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: boxWidth,
        height: boxHeight,
        ...boxSx,
      }}
    >
      <SvgIconStyle src={src} sx={{ width, height, ...sx }} {...other} />
    </Box>
  );
}
