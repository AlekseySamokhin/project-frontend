import PropTypes from 'prop-types';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Iconify from '../components/Iconify';
import SvgIconStyle from '../components/SvgIconStyle';

// ----------------------------------------------------------------------

Search.propTypes = {
  value: PropTypes.string,
  handleValue: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function Search({ value, handleValue, ...other }) {
  return (
    <TextField
      fullWidth
      value={value}
      variant='standard'
      onChange={(event) => handleValue(event.target.value)}
      placeholder='Search'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start' sx={{ paddingLeft: 2 }}>
            <Iconify icon={'eva:search-fill'} sx={{ color: 'grey.600', width: 24, height: 24 }} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position='start'>
            {value && (
              <IconButton sx={{ p: 0 }} onClick={() => handleValue('')}>
                <SvgIconStyle src={`/assets/icons/main/ic_close.svg`} sx={{ width: 24, height: 24 }} />
              </IconButton>
            )}
          </InputAdornment>
        ),
        disableUnderline: true,
        sx: { borderRadius: 1 },
      }}
      sx={{
        input: {
          height: 42,
          '&::placeholder': {
            color: 'grey.500',
            fontSize: 14,
          },
          p: 0,
        },
      }}
      {...other}
    />
  );
}
