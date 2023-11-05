import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';

DrawerTextField.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
};

export default function DrawerTextField({ name, control, ...props }) {
  const {
    field: { value, ...other },
    fieldState: { error },
  } = useController({ name, control });

  return <TextField fullWidth error={!!error} helperText={error?.message} {...other} {...props} value={value || ''} />;
}
