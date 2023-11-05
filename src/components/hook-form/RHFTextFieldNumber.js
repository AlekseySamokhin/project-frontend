import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import SvgIconStyle from '../SvgIconStyle';

// ----------------------------------------------------------------------

RHFTextFieldNumber.propTypes = {
  name: PropTypes.string,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
};

export default function RHFTextFieldNumber({ name, setValue, disabled, ...other }) {
  const [values, setValues] = useState(1);
  const { control } = useFormContext();

  const handleTypeMinus = (newType) => {
    if (newType > 0 && !disabled) {
      setValue(name, newType - 1);
      setValues(newType - 1);
    }
  };

  const handleTypePlus = (newType) => {
    if (newType < 3 && !disabled) {
      setValue(name, newType + 1);
      setValues(newType + 1);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          value={values}
          disabled={disabled}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          InputProps={{
            inputProps: { min: 0, max: 3 },
            endAdornment: (
              <>
                <IconButton size="small" disabled={disabled} onClick={() => handleTypeMinus(values)}>
                  <SvgIconStyle
                    fontSize="inherit"
                    src="/assets/icons/main/ic_minus.svg"
                    sx={{ width: 15, height: 15 }}
                  />
                </IconButton>
                <IconButton size="small" disabled={disabled} onClick={() => handleTypePlus(values)}>
                  <SvgIconStyle fontSize="inherit" src="/assets/icons/main/ic_add.svg" sx={{ width: 15, height: 15 }} />
                </IconButton>
              </>
            ),
          }}
        />
      )}
    />
  );
}
