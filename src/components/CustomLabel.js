import { useState } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import Label from './Label';

// ----------------------------------------------------------------------

CustomLabel.propTypes = {
  children: PropTypes.node.isRequired,
  variantHover: PropTypes.string.isRequired,
  variantUnHover: PropTypes.string.isRequired,
  sxBox: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function CustomLabel({ children, variantHover, variantUnHover, sxBox, ...other }) {
  const [hover, setHover] = useState(false);

  return (
    <Stack
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ border: hover ? '1px solid #00000000' : 'none', ...sxBox }}
    >
      <Label variant={hover ? variantHover : variantUnHover} {...other}>
        {children}
      </Label>
    </Stack>
  );
}
