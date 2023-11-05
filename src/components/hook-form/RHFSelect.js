import PropTypes from 'prop-types';
// form
import { Controller, useFormContext, useWatch } from 'react-hook-form';
// @mui
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from '@mui/material';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import SvgIconStyle from '../SvgIconStyle';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  name: PropTypes.string,
  selectData: PropTypes.array,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  cross: PropTypes.bool,
};

export const InputAdornmentStyle = styled(InputAdornment)({
  position: 'absolute',
  padding: 0,
  right: '15px',
});

export default function RHFSelect({ name, selectData, label, cross = false, disabled, ...other }) {
  const unique = uniq(selectData);
  const { control } = useFormContext();
  const value = useWatch({
    name,
    control,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} fullWidth size="small" disabled={disabled} error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select
            value={value}
            label={label}
            onChange={(event) => field.onChange(event.target.value)}
            sx={{
              paddingRight: 0,
            }}
            endAdornment={
              <>
                {cross && (
                  <InputAdornmentStyle position="start" sx={{ display: value ? '' : 'none' }}>
                    <IconButton disableRipple sx={{ p: 0 }} onClick={() => field.onChange('')}>
                      <SvgIconStyle src={`/assets/icons/main/ic_close.svg`} sx={{ width: 20, height: 20 }} />
                    </IconButton>
                  </InputAdornmentStyle>
                )}
              </>
            }
            {...other}
          >
            {map(unique, (value, key) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
