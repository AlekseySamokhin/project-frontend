import { useEffect, useRef, useState } from 'react';
import { FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import useWindowSize from '../hooks/useWindowSize';
import SvgIconStyle from './SvgIconStyle';

// ----------------------------------------------------------------------

CustomSelect.propTypes = {
  value: PropTypes.string,
  selectData: PropTypes.arrayOf(PropTypes.shape),
  onChange: PropTypes.func,
  label: PropTypes.string,
  capitalizeFirstLetter: PropTypes.bool,
  upperCase: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string,
  cross: PropTypes.bool,
  bgcolor: PropTypes.string,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function CustomSelect({
  value,
  selectData,
  onChange,
  label,
  name,
  error = false,
  helperText = '',
  cross = true,
  capitalizeFirstLetter,
  upperCase,
  bgcolor = 'inherit',
  sx,
  ...other
}) {
  const [showIcon, setShowIcon] = useState(false);

  const ref = useRef(null);

  const [selectWidth, setSelectWidth] = useState(null);

  const [width] = useWindowSize();

  useEffect(() => {
    setSelectWidth(ref.current.offsetWidth);
  }, [width]);

  useEffect(() => {
    if (value) {
      setShowIcon(true);
    } else {
      setShowIcon(false);
    }
  }, [value]);

  if (upperCase) {
    value = value.toUpperCase() || '';
    selectData = selectData.map((element) => ({ ...element, [name]: element[name]?.toUpperCase() || '' }));
  }

  if (capitalizeFirstLetter) {
    value = value
      .toString()
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    selectData = selectData.map((element) => ({
      ...element,
      [name]: element[name]
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    }));
  }

  return (
    <FormControl sx={sx} error={error}>
      <InputLabel
        sx={{
          color: 'grey.500',
          fontSize: 14,
          marginTop: '-6px',
          '&.Mui-focused': {
            marginTop: '3px',
          },
          '&.MuiFormLabel-filled': {
            marginTop: '3px',
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        sx={{ bgcolor }}
        MenuProps={{
          PaperProps: {
            sx: {
              width: selectWidth,
              marginLeft: showIcon && cross ? '30px' : '6px',
            },
          },
        }}
        value={value}
        onChange={(event) => onChange(event.target.value?.toLowerCase())}
        label={label}
        ref={ref}
        endAdornment={
          <>
            {showIcon && cross && (
              <IconButton disableRipple sx={{ mr: 1 }} onClick={() => onChange('')}>
                <SvgIconStyle src={`/assets/icons/main/ic_close.svg`} sx={{ width: 20, height: 20 }} />
              </IconButton>
            )}
          </>
        }
        inputProps={{ sx: { paddingY: 1 } }}
        {...other}
      >
        {selectData?.map((element) => (
          <MenuItem key={element.id} value={element[name]}>
            {element[name]}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={{ display: helperText.length > 0 ? 'block' : 'none' }}>{helperText}</FormHelperText>
    </FormControl>
  );
}
