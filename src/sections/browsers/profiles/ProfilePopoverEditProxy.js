import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  ToggleButton,
} from '@mui/material';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import GroupButtonForm from '../../GroupButtonForm';
import { FormProvider } from '../../../components/hook-form';
import DrawerTextField from '../../../components/browsers/DrawerTextField';
import { MODAL_NEW_PROXY_BUTTONGROUP_TYPE } from '../proxies/ProxyConfig';
import SvgIconStyle from '../../../components/SvgIconStyle';
import CustomSelect from '../../../components/CustomSelect';

// ----------------------------------------------------------------------

const BUTTONS = ['No proxy', 'Select proxy', 'Add proxy'];

const SELECTDATA = [
  { id: '1', name: 'Test1' },
  { id: '1', name: 'Test2' },
  { id: '1', name: 'Test3' },
  { id: '1', name: 'Test4' },
  { id: '1', name: 'Test4' },
];

// ----------------------------------------------------------------------

ProfilePopoverEditProxy.propTypes = {
  row: PropTypes.object,
  // value: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function ProfilePopoverEditProxy({ row, open, onClose }) {
  const [selectedSection, setSelectedSection] = useState(BUTTONS[0]);

  const [selectProxy, setSelectProxy] = useState('');

  const selectProxyData = SELECTDATA;

  const schema = Yup.object().shape({
    proxy_name: Yup.string().required('Field is required'),
    proxy: Yup.string().required('Please enter the required field').matches(/(http|https|socks4|socks5|ssh):\/\/([^\s]+:[^\s]+@)?([0-9]{1,3}[.]){3}[0-9]{1,3}:\b[1-9](\d{0,2})?\d?[1-5]?\b/, 'Field must be type://login:pass@ip:port'),
  });

  const defaultValues = {
    name: '',
    proxy: '',
    ipUrl: '',
    type: 'HTTP',
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
    getValues,
  } = methods;

  const isMountedRef = useIsMountedRef();

  const [type, setType] = useState(getValues().type);

  const handleType = (newType) => {
    setValue('type', newType);
    setType(newType);
  };

  const onSubmit = async (data) => {
    try {
      await console.log('id -', row.id, data); // post request
      handleCloseModal();
    } catch (error) {
      console.error(error);

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  const onSubmitNotRHF = async (data) => {
    try {
      await console.log(data); // post request
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  const WithoutProxy = (
    <>
      <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={1.5} sx={{ py: '14px' }}>
        <Button variant='outlined' color='inherit' onClick={handleCloseModal}>
          Cancel
        </Button>

        <Button variant='contained' type='submit' onClick={() => onSubmitNotRHF('No proxy')}>
          Save
        </Button>
      </Stack>
    </>
  );

  const SelectProxy = (
    <>
      <CustomSelect
        value={selectProxy}
        selectData={selectProxyData}
        onChange={(newValue) => setSelectProxy(newValue)}
        label='Proxy'
        name='name'
        bgcolor='background.paper'
        sx={{ width: '100%' }}
        capitalizeFirstLetter
      />

      <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={1.5} sx={{ py: '14px' }}>
        <Button variant='outlined' color='inherit' onClick={handleCloseModal}>
          Cancel
        </Button>

        <Button variant='contained' onClick={() => onSubmitNotRHF(selectProxy)}>
          Save
        </Button>
      </Stack>
    </>
  );

  const AddProxy = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DrawerTextField
        name='name'
        control={control}
        label='Proxy name'
        fullWidth
        variant='outlined'
        size='small'
        sx={{ mb: 2 }}
      />

      <GroupButtonForm
        type={type}
        handleType={handleType}
        buttonGroupTypes={MODAL_NEW_PROXY_BUTTONGROUP_TYPE}
        upperCase
      />

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

        <ToggleButton value={false} sx={{ p: 1, mb: errors?.proxy?.value?.type ? '24px!important' : 0 }}>
          <SvgIconStyle src={`/assets/icons/main/ic_connection.svg`} sx={{ width: 24, height: 24 }} />
        </ToggleButton>
      </Stack>

      <DrawerTextField
        name='ipUrl'
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

      <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={1.5} sx={{ py: '14px' }}>
        <Button variant='outlined' color='inherit' onClick={handleCloseModal}>
          Cancel
        </Button>

        <Button variant='contained' type='submit'>
          Save
        </Button>
      </Stack>
    </FormProvider>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { p: 2, pb: 0, width: 500 },
      }}
    >
      <DialogTitle sx={{ p: 0 }}>{row.name}</DialogTitle>

      <DialogContent sx={{ p: 0, mt: 2 }}>
        <Stack>
          <GroupButtonForm
            type={selectedSection}
            handleType={(newValue) => setSelectedSection(newValue)}
            buttonGroupTypes={BUTTONS}
            sx={{ fontSize: 14, mb: selectedSection === 'No proxy' ? 0 : 1.5 }}
          />

          {selectedSection === 'No proxy' && WithoutProxy}

          {selectedSection === 'Select proxy' && SelectProxy}

          {selectedSection === 'Add proxy' && AddProxy}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
