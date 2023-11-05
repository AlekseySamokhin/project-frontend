import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import CustomSelect from '../components/CustomSelect';

// ----------------------------------------------------------------------

SelectForm.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  cross: PropTypes.bool,
  selectData: PropTypes.arrayOf(PropTypes.shape),
  other: PropTypes.any,
};

// ----------------------------------------------------------------------

export default function SelectForm({ name, label, cross = true, selectData, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <CustomSelect
          value={field.value}
          selectData={selectData}
          onChange={field.onChange}
          error={!!error}
          helperText={error?.message}
          cross={cross}
          label={label}
          name="title"
          sx={{ width: '100%' }}
          {...other}
        />
      )}
    />
  );
}
