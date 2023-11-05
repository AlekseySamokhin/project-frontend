import { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SvgIconStyle from '../../components/SvgIconStyle';

//-------------------------------------------------------

export default function PaymentUserInput() {
  const [value, setValue] = useState('');

  if (value < 0) {
    setValue('');
  }

  return (
    <TextField
      size="small"
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setValue(Number(value - 1))}>
              <SvgIconStyle src="/assets/icons/main/ic_minus.svg" sx={{ width: 14, height: 14, color: 'grey.400' }} />
            </IconButton>
            <IconButton onClick={() => setValue(Number(value + 1))}>
              <SvgIconStyle src="/assets/icons/main/ic_plus.svg" sx={{ width: 14, height: 14, color: 'grey.600' }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      label="Numbers of users"
      variant="outlined"
    />
  );
}
