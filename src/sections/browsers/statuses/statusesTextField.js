import { Box, InputAdornment, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

StatusFormTextField.propTypes = {
  selectColor: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  openPopover: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
};

export default function StatusFormTextField({ selectColor, name, control, openPopover, ...props }) {
  const {
    field: { value, ...other },
    fieldState: { error },
  } = useController({ name, control });
  return (
    <TextField
      fullWidth
      error={!!error}
      helperText={error?.message}
      {...other}
      {...props}
      value={value || ''}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Stack sx={{ cursor: 'pointer' }}>
              <Box
                onClick={openPopover}
                item
                bgcolor={selectColor}
                borderRadius="44px"
                height={24}
                minWidth={24}
              />
            </Stack>
          </InputAdornment>
        ),
      }}
    />
  );
}
