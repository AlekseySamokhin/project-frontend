import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

DrawerSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  selectList: PropTypes.arrayOf(PropTypes.string).isRequired,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function DrawerSelect({ label, value, onChange, selectList, sx }) {
  value = value.charAt(0).toUpperCase() + value.slice(1);
  selectList = selectList.map((element) => element.charAt(0).toUpperCase() + element.slice(1));

  return (
    <FormControl sx={{ mb: 2, ...sx }} size="small" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={(event) => onChange(event.target.value.toLowerCase())} label={label}>
        <MenuItem value="" sx={{ p: 2 }} />

        {selectList.map((element, index) => (
          <MenuItem key={index} value={element}>
            {element}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
