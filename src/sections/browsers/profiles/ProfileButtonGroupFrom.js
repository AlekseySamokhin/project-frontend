import PropTypes from 'prop-types';
// form
// @mui
import { Button, ButtonGroup } from '@mui/material';
import map from 'lodash/map';

// ----------------------------------------------------------------------

ProfileButtonGroupFrom.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.array,
  handleType: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function ProfileButtonGroupFrom({ type, value, handleType }) {
  return (
    <ButtonGroup variant="outlined" fullWidth sx={{ pb: 2 }} color="primary">
      {map(value, (element, index) => (
        <Button
          key={index}
          variant={element === type ? 'contained' : 'outlined'}
          color={element === type ? 'primary' : 'inherit'}
          sx={{ textTransform: 'none' }}
          onClick={() => handleType(element.id)}
        >
          {element.value}
        </Button>
      ))}
    </ButtonGroup>
  );
}
