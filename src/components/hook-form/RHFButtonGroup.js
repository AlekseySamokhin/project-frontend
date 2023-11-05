import PropTypes from 'prop-types';
// form
import { Controller, useFormContext, useWatch } from 'react-hook-form';
// @mui
import { Button, ButtonGroup } from '@mui/material';
import map from 'lodash/map';

// ----------------------------------------------------------------------

RHFButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  buttonGroupTypes: PropTypes.arrayOf(PropTypes.string),
  upperCase: PropTypes.bool,
  notPadding: PropTypes.bool,
  handleType: PropTypes.func,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function RHFButtonGroup({ name, buttonGroupTypes, upperCase, notPadding, sx }) {
  const { control, setValue } = useFormContext();

  const type = useWatch({
    name,
    control,
  });

  const onClick = (element) => {
    setValue(name, element);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <ButtonGroup variant='outlined' fullWidth sx={{ pb: notPadding ? 0 : 2 }} color='primary'>
          {map(buttonGroupTypes, (element, index) => (
            <Button
              key={index}
              variant={element === type ? 'contained' : 'outlined'}
              color={element === type ? 'primary' : 'inherit'}
              onClick={() => onClick(element)}
              sx={{ textTransform: 'none', ...sx }}
            >
              {upperCase ? element.toUpperCase() : element}
            </Button>
          ))}
        </ButtonGroup>
      )}
    />
  );
}
