import { Button, Divider, IconButton, InputAdornment, Stack, ToggleButton } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import SvgIconStyle from '../../../components/SvgIconStyle';
import DrawerTextField from '../../../components/browsers/DrawerTextField';
import { GroupButtonForm } from '../../index';
import { MODAL_NEW_PROXY_BUTTONGROUP_TYPE } from './ProxyConfig';
import { changeProxyType } from '../../../utils/parse';
import { _proxyTypeHead } from '../../../_mock';
import RHFButtonGroup from '../../../components/hook-form/RHFButtonGroup';

// ----------------------------------------------------------------------

ProxyPropertiesForm.propTypes = {
  number: PropTypes.number.isRequired,
  field: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function ProxyPropertiesForm({ number, control, fields, errors, remove, setValue }) {

  const [count, setCount] = useState(0);
  const [proxyValue, proxyType] = useWatch({
    name: [`proxies.${number}.proxy`, `proxies.${number}.proxy_type`],
    control,
  });

  useEffect(() => {
    const valueType = _proxyTypeHead.find((element) =>
      element.id === proxyValue.substring(0, element.size).toUpperCase() &&
      proxyValue.substring(0, element.size).toUpperCase() !== proxyType,
    );
    if (valueType) {
      setValue(`proxies.${number}.proxy_type`, proxyValue.substring(0, valueType.size).toUpperCase());
    }
  }, [proxyValue]);

  useEffect(() => {
    if (count === 0) {
      setCount(count + 1);
    }
    if (count !== 0) {
      setValue(`proxies.${number}.proxy`, changeProxyType(proxyValue, proxyType));
    }

  }, [proxyType]);

  return (
    <Stack>
      <DrawerTextField
        name={`proxies.${number}.proxy_name`}
        control={control}
        label='Proxy name'
        fullWidth
        variant='outlined'
        size='small'
        sx={{ mb: 2 }}
      />

      <RHFButtonGroup name={`proxies.${number}.proxy_type`} buttonGroupTypes={MODAL_NEW_PROXY_BUTTONGROUP_TYPE}
                      upperCase />

      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        spacing={2}
        sx={{ mb: 2 }}
      >
        <DrawerTextField
          name={`proxies.${number}.proxy`}
          control={control}
          label='Proxy'
          fullWidth
          variant='outlined'
          size='small'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton>
                  <SvgIconStyle src={`/assets/icons/main/ic_info.svg`} sx={{ width: 24, height: 24 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ '& .MuiOutlinedInput-root': { p: 0 } }}
        />

        <ToggleButton value={false}
                      sx={{ p: 1, mb: (errors?.proxies?.[number]?.proxy?.type ? '24px!important' : 0) }}>
          <SvgIconStyle src={`/assets/icons/main/ic_connection.svg`} sx={{ width: 24, height: 24 }} />
        </ToggleButton>

      </Stack>

      <DrawerTextField
        name={`proxies.${number}.update_url`}
        control={control}
        label='Link for changing proxy IP'
        fullWidth
        variant='outlined'
        size='small'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
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
          variant='outlined'
          color='inherit'
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
