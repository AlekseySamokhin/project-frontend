import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@mui/material';

// ----------------------------------------------------------------------

GroupButtonForm.propTypes = {
  type: PropTypes.string,
  handleType: PropTypes.func.isRequired,
  buttonGroupTypes: PropTypes.arrayOf(PropTypes.string),
  upperCase: PropTypes.bool,
  notPadding: PropTypes.bool,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function GroupButtonForm({ type, handleType, buttonGroupTypes, upperCase, notPadding, sx }) {
  return (
    <ButtonGroup variant="outlined" fullWidth sx={{ pb: notPadding ? 0 : 2 }} color="primary">
      {buttonGroupTypes.map((element, index) => (
        <Button
          key={index}
          variant={element === type ? 'contained' : 'outlined'}
          color={element === type ? 'primary' : 'inherit'}
          onClick={() => handleType(element)}
          sx={{ textTransform: 'none', ...sx }}
        >
          {upperCase ? element.toUpperCase() : element}
        </Button>
      ))}
    </ButtonGroup>
  );
}
