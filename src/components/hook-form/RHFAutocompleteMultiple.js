import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// form
import { Controller, useFormContext, useWatch } from 'react-hook-form';
// @mui
import {
  Autocomplete, Box,
  Chip,
  InputAdornment,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import SvgIconStyle from '../SvgIconStyle';
import CustomIcon from '../CustomIcon';

// ----------------------------------------------------------------------

RHFAutocompleteMultiple.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  tag: PropTypes.bool,
};

export default function RHFAutocompleteMultiple({
                                                  tag= false,
                                                  name, data,
                                                  disabled = false,
                                                  size = 'small',
                                                  type = 'text',
                                                  ...other
                                                }) {
  const [newArrayValue, setArrayValue] = useState([]);
  const [newValue, setNewValue] = useState('');
  const { control, setValue } = useFormContext();
  const newValueForm = useWatch({
    name,
    control,
  });


  const onTagsClick = () => {
    setArrayValue((props) => [newValue, ...props]);
    setValue(name, [newValue, ...newValueForm]);
    setNewValue('');
  };

  const checkKeyPress = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (!newArrayValue.includes(newValue) && newValue !== '') {
        setArrayValue((props) => [e.target.value, ...props]);
        setValue(name, [newValue, ...newValueForm]);
        setNewValue('');
      }
    }
  };

  useEffect(() => {
    setArrayValue(data);
  }, [data]);


  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          sx={{
            '& .MuiAutocomplete-popupIndicator': {
              display: isEmpty(newArrayValue) ? 'none' : 'inline-flex',
            },
          }}
          componentsProps={{
            paper: {
              sx: {
                display: isEmpty(newArrayValue) ? 'none' : 'block',
              },
            },
          }}

          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                color='primary'
                size='small'
                key={option}
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          disabled={disabled}
          multiple
          fullWidth
          options={newArrayValue}
          size={size}
          noOptionsText={
            <ListItem
              disablePadding
              sx={{ width: ' calc(100% + 12px)', marginLeft: '-6px', marginTop: '-6px', marginBottom: '-6px' }}
            >
              <ListItemButton sx={{ paddingLeft: '6px', borderRadius: 1 }} onMouseDown={() => onTagsClick()}>
                <ListItemText
                  primary={newValue}
                  sx={{ color: (theme) => (theme.palette.mode === 'light' ? 'grey.800' : 'grey.0') }}
                />
              </ListItemButton>
            </ListItem>
          }
          isOptionEqualToValue={(option, value) => option === value}
          disableCloseOnSelect
          popupIcon={
            <SvgIconStyle src='/assets/icons/main/ic_drop.svg' sx={{ width: 11, height: 7, marginTop: '1px' }} />
          }
          {...field}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <Stack direction='row' alignItems='center'>
                    {!isEmpty(newValueForm) && tag &&
                      <Stack sx={{ mr: 1.5 }}>
                        <CustomIcon
                          src={`/assets/icons/browsers/ic_tags.svg`}
                          width={19}
                          boxWidth={24}
                          height={19}
                          boxHeight={24}
                          sx={{ bgcolor: 'grey.600' }}
                        />
                      </Stack>
                    }
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {params.InputProps.startAdornment}
                    </Box>
                  </Stack>
                ),
              }}
              type={type} fullWidth error={!!error} helperText={error?.message} {...other} />
          )}
          onChange={(_event, props) => field.onChange(props ?? [])}
          onKeyUp={(e) => setNewValue(e.target.value)}
          onKeyPress={(e) => checkKeyPress(e)}
        />
      )}
    />
  );
}
