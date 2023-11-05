import PropTypes from 'prop-types';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled';
import SvgIconStyle from './SvgIconStyle';
import Image from './Image';

// ----------------------------------------------------------------------

CustomTextField.propTypes = {
  item: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  confirm: PropTypes.bool,
  del: PropTypes.bool,
  plus: PropTypes.bool,
  inputMask: PropTypes.node,
  sx: PropTypes.object,
  other: PropTypes.any,
};

const CssTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInput-root': {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[0] : theme.palette.grey[800],
    height: 46,
  },
  input: {
    color: `${theme.palette.text.strong}!important`,
    fontWeight: 400,
    fontSize: '14px',
    '-webkit-text-fill-color': `${theme.palette.text.strong}!important`,
    padding: 0,
  },
}));

export default function CustomTextField({
                                          item,
                                          icon,
                                          confirm = false,
                                          del = false,
                                          plus = false,
                                          sx,
                                          ...other
                                        }) {

  const [value, setValue] = useState(item);

  const [disabled, setDisabled] = useState(true);

  const [remove, setRemove] = useState(false);

  return (
    <CssTextField
      variant='standard'
      size='small'
      fullWidth
      sx={sx}
      inputRef={(input) => input && input.focus()}
      value={value}
      disabled={disabled}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => {
        setDisabled(true);
        if (e.target.value.substr(0, 8) !== 'https://' && e.target.value.substr(0, 7) !== 'http://') {
          setValue(`https://${e.target.value}`);
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start' sx={{ marginLeft: 1 }}>
            <Image
              src={icon}
              sx={{
                width: 24,
                height: 24,
              }}
            />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position='start'>
            {remove ? (
              <>
                <IconButton size='small' onClick={() => setRemove(false)}>
                  <SvgIconStyle src='/assets/icons/main/ic_close.svg' sx={{ width: 20, height: 20 }} />
                </IconButton>
                <IconButton size='small'>
                  <SvgIconStyle src='/assets/icons/main/ic_confirm.svg' sx={{ width: 16, height: 16 }} />
                </IconButton>
              </>
            ) : (
              <>
                {confirm && (
                  <IconButton size='small' onClick={() => setDisabled(!disabled)}>
                    <SvgIconStyle src='/assets/icons/main/ic_edit_row.svg' sx={{ width: 20, height: 20 }} />
                  </IconButton>
                )}

                {del && (
                  <IconButton size='small' onClick={() => setRemove(true)}>
                    <SvgIconStyle src='/assets/icons/main/ic_delete.svg' sx={{ width: 20, height: 20 }} />
                  </IconButton>)
                }

                {plus && (
                  <IconButton size='small'>
                    <SvgIconStyle src='/assets/icons/main/ic_plus.svg' sx={{ width: 14, height: 14 }} />
                  </IconButton>)
                }

              </>
            )}
          </InputAdornment>
        ),
        disableUnderline: true,
        sx: {
          color: "text.strong",
        },
      }}
      {...other}
    />
  );
}
