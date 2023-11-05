import { Button, IconButton, InputAdornment, Stack, ToggleButton } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import SvgIconStyle from '../../../components/SvgIconStyle';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { FormProvider } from '../../../components/hook-form';
import { MODAL_NEW_PROXY_BUTTONGROUP_TYPE } from './ProxyConfig';
import DrawerTextField from '../../../components/browsers/DrawerTextField';
import CreateDrawer from '../../../components/browsers/CreateDrawer';
import { ModalTabs } from '../../index';
import { changeProxyType, parseProxy, parseProxyName } from '../../../utils/parse';
import axios from '../../../utils/axios';
import { proxyRequested } from '../../../redux/slices/browsers';
import { useDispatch } from '../../../redux/store';
import RHFButtonGroup from '../../../components/hook-form/RHFButtonGroup';
import { _proxyTypeHead } from '../../../_mock';

// ----------------------------------------------------------------------

const TABLE_HEADS = [
  {
    id: 'editProxy',
    label: 'Edit proxy',
    src: '/assets/icons/main/ic_add.svg',
    iconWidth: 14,
    iconHeight: 14,
  },
];

// ----------------------------------------------------------------------

ProxyModalEdit.propTypes = {
  proxy: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function ProxyModalEdit({ proxy, open, closeModal }) {

  const dispatch = useDispatch();

  const { id, folder_id, proxy_name, proxy_type, proxy_ip, proxy_port, proxy_username, proxy_password } = proxy;

  const schema = Yup.object().shape({
    proxy_name: Yup.string().required('Field is required'),
    proxy: Yup.string().required('Please enter the required field').matches(/(http|https|socks4|socks5|ssh):\/\/([^\s]+:[^\s]+@)?([0-9]{1,3}[.]){3}[0-9]{1,3}:\b[1-9](\d{0,2})?\d?[1-5]?\b/, 'Field must be type://login:pass@ip:port'),
  });

  const defaultValues = {
    proxy: parseProxyName(proxy_type, proxy_username, proxy_password, proxy_port, proxy_ip),
    update_url: '',
    proxy_name,
    proxy_type,
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = methods;

  const [tab, setTab] = useState(TABLE_HEADS[0].id);

  const [proxyValue, proxyType] = useWatch({
    name: ['proxy', 'proxy_type'],
    control,
  });

  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    const valueType = _proxyTypeHead.find((element) =>
      element.id === proxyValue.substring(0, element.size).toUpperCase() &&
      proxyValue.substring(0, element.size).toUpperCase() !== proxyType,
    );
    if (valueType) {
      setValue('proxy_type', proxyValue.substring(0, valueType.size).toUpperCase());
    }
  }, [proxyValue]);

  useEffect(() => {
    setValue('proxy', changeProxyType(proxyValue, proxyType));
  }, [proxyType]);

  const onSubmit = async (data) => {

    data = { ...data, ...parseProxy(data.proxy) };
    delete data.proxy;

    try {

      await axios.put(`/api/v1/folders/${folder_id}/proxies/${id}`, data);

      handleCloseModal();
      dispatch(proxyRequested({ folderId: folder_id }));

    } catch (error) {
      console.error(error);

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  const handleCloseModal = () => {
    reset();
    closeModal();
  };

  return (
    <CreateDrawer open={open} toggleDrawer={handleCloseModal} sx={{ width: 540 }}>
      <ModalTabs
        onCloseModal={handleCloseModal}
        tabValue={tab}
        tableHeads={TABLE_HEADS}
        handleChange={(newValue) => setTab(newValue)}
      />

      <Stack sx={{ p: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DrawerTextField
            name='proxy_name'
            control={control}
            label='Proxy name'
            fullWidth
            variant='outlined'
            size='small'
            sx={{ mb: 2 }}
          />

          <RHFButtonGroup name='proxy_type' buttonGroupTypes={MODAL_NEW_PROXY_BUTTONGROUP_TYPE} upperCase />

          <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2} sx={{ mb: 2 }}>
            <DrawerTextField
              name='proxy'
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

            <ToggleButton value={false} sx={{ p: 1, mb: errors?.proxy?.type ? '24px!important' : 0 }}>
              <SvgIconStyle src={`/assets/icons/main/ic_connection.svg`} sx={{ width: 24, height: 24 }} />
            </ToggleButton>
          </Stack>

          <DrawerTextField
            name='update_url'
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
            sx={{ '& .MuiOutlinedInput-root': { p: 0 }, mb: 2 }}
          />

          <Button
            fullWidth
            variant='contained'
            type='submit'
            sx={{ py: 1 }}
            startIcon={<SvgIconStyle src={'/assets/icons/main/ic_edit_row.svg'} sx={{ width: 15, height: 15 }} />}
          >
            Edit
          </Button>
        </FormProvider>
      </Stack>
    </CreateDrawer>

  );
}
