import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import SvgIconStyle from './SvgIconStyle';
import useWindowSize from '../hooks/useWindowSize';

CustomSelectSimple.propTypes = {
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

export default function CustomSelectSimple({
                                             selectData,
                                             bgcolor,
                                             label,
                                             handleFilter,
                                             name,
                                             value,
                                             cross = true,
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

  const handleChange = (newValue) => {
    const setValue = Object.fromEntries([[name, newValue]]);
    handleFilter(setValue);
  }

  return (
    <FormControl size='small' fullWidth disabled={isEmpty(selectData)}>
      <InputLabel>{label}</InputLabel>
      <Select
        sx={{ bgcolor }}
        bgcolor='background.neutral'
        value={value}
        label={label}
        onChange={(event) => handleChange(event.target.value)}
        ref={ref}
        MenuProps={{
          PaperProps: {
            sx: {
              width: selectWidth,
              marginLeft: showIcon && cross ? '30px' : '6px',
            },
          },
        }}
        endAdornment={
          <>
            {showIcon && cross && (
              <IconButton disableRipple sx={{ mr: 1 }} onClick={() => handleChange('')}>
                <SvgIconStyle src={`/assets/icons/main/ic_close.svg`} sx={{ width: 20, height: 20 }} />
              </IconButton>
            )}
          </>
        }
        {...other}
      >
        {map(selectData, (element, index) => <MenuItem key={index} value={element}>{element}</MenuItem>)}
      </Select>
    </FormControl>
  );
}
