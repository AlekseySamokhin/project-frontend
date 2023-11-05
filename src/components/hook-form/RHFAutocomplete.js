import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Autocomplete, TextField } from '@mui/material';
import SvgIconStyle from '../SvgIconStyle';

// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool,
};

export default function RHFAutocomplete({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          options={options}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          popupIcon={<SvgIconStyle src="/assets/icons/main/ic_drop.svg" sx={{ width: 11, height: 7 }} />}
          {...field}
          renderInput={(params) => (
            <TextField {...params} fullWidth error={!!error} helperText={error?.message} {...other} />
          )}
          onChange={(_, data) => field.onChange(data ?? 'Auto')}
        />
      )}
    />
  );
}
