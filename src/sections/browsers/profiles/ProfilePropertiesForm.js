import { Button, Divider, IconButton, InputAdornment, Stack, ToggleButton } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import SvgIconStyle from '../../../components/SvgIconStyle';
import DrawerTextField from '../../../components/browsers/DrawerTextField';

ProfilesPropertiesForm.propTypes = {
  number: PropTypes.number.isRequired,
  control: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default function ProfilesPropertiesForm({ number, control, fields, update, errors, remove }) {

  const [type, setType] = useState(fields[number].type.value);

  const handleType = (newType) => {
    const newFields = fields[number];
    delete newFields.id;
    update(number, { ...newFields, type: { value: newType } });
    setType(newType);
  };

  return (
    <Stack>


      <DrawerTextField
        name={`new-proxy.${number}.name.value`}
        control={control}
        label="Proxy name"
        fullWidth
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />

      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <DrawerTextField
          name={`new-proxy.${number}.proxy.value`}
          control={control}
          label="Proxy"
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SvgIconStyle src={`/assets/icons/main/ic_info.svg`} sx={{ width: 24, height: 24 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ '& .MuiOutlinedInput-root': { p: 0 } }}
        />

        <ToggleButton value={false}
                      sx={{ p: 1, mb: (errors?.['new-proxy']?.[number]?.proxy?.value?.type ? '24px!important' : 0) }}>
          <SvgIconStyle src={`/assets/icons/main/ic_connection.svg`} sx={{ width: 24, height: 24 }} />
        </ToggleButton>

      </Stack>

      <DrawerTextField
        name={`new-proxy.${number}.ipUrl.value`}
        control={control}
        label='Link for changing proxy IP'
        fullWidth
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SvgIconStyle src={`/assets/icons/main/ic_info.svg`} sx={{ width: 24, height: 24 }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ '& .MuiOutlinedInput-root': { p: 0, mb: 2 } }}
      />


      {fields.length > 1 &&
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          sx={{ mb: 2 }}
          onClick={() => remove(number)}
        >
          Remove
        </Button>
      }

      {number !== fields.length - 1 &&
        <Divider sx={{ mb: 2 }} />}
    </Stack>
  );
};
