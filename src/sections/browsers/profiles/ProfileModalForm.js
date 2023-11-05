import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Button, Grid, Stack, ToggleButton } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import CreateDrawer from '../../../components/browsers/CreateDrawer';
import { PROFILE_BUTTONGROUP_TYPE, PROFILE_PROXY } from './ProfileConfig';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { FormProvider } from '../../../components/hook-form';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import RHFTextField from '../../../components/hook-form/RHFTextField';
import useWindowSize from '../../../hooks/useWindowSize';
import RHFAutocompleteMultiple from '../../../components/hook-form/RHFAutocompleteMultiple';
import { MODAL_NEW_PROXY_BUTTONGROUP_TYPE } from '../proxies/ProxyConfig';
import ProfileAdvancedSettings from './ProfileAdvancedSettings';
import RHFDropzone from '../../../components/hook-form/RHFDropzone';
import { ModalTabs } from '../../index';
import Scrollbar from '../../../components/Scrollbar';
import ProfileModalRandomize from './ProfileModalRandomize';
import RHFButtonGroup from '../../../components/hook-form/RHFButtonGroup';
import { useDispatch } from '../../../redux/store';
import RHFSelect from '../../../components/hook-form/RHFSelect';
import axios from '../../../utils/axios';
import { fingerprintsRequested } from '../../../redux/slices/browsers';

// ----------------------------------------------------------------------

const TABLE_HEADS = [
  {
    id: 'newProfile',
    label: 'New Profile',
    src: '/assets/icons/main/ic_add.svg',
    iconWidth: 14,
    iconHeight: 14,
  },
  {
    id: 'import',
    label: 'Import',
    src: '/assets/icons/main/ic_export.svg',
    iconWidth: 16,
    iconHeight: 20,
  },
];

// ----------------------------------------------------------------------

const selectData = ['test1', 'test2', 'test3', 'test4'];

// ----------------------------------------------------------------------

ProfileModalForm.propTypes = {
  open: PropTypes.bool.isRequired,
  edit: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  defaultValues: PropTypes.object.isRequired,
};

// ----------------------------------------------------------------------

export default function ProfileModalForm({ open, closeModal, defaultValues, edit }) {

  const dispatch = useDispatch();

  const [tab, setTab] = useState(TABLE_HEADS[0].id);

  const [openSettings, setOpenSettings] = useState(false);

  const [checkedZone, setCheckedZone] = useState(false);

  const [loadingZone, setLoadingZone] = useState(false);

  const [, windowHeight] = useWindowSize();

  const schema = Yup.object().shape({
    name: Yup.string().min(0).max(255).required('Field is required'),
    proxy_name: Yup.string().required('Field is required'),
    proxy: Yup.string().required('Please enter the required field').matches(/(http|https|socks4|socks5|ssh):\/\/([^\s]+:[^\s]+@)?([0-9]{1,3}[.]){3}[0-9]{1,3}:\b[1-9](\d{0,2})?\d?[1-5]?\b/, 'Field must be type://login:pass@ip:port'),
    ip: Yup.string().when('webRTC', {
      is: (val) => val === 'Manual',
      then: Yup.string().required('Field is required'),
      otherwise: Yup.string().notRequired(),
    }),
    vendor: Yup.string().when('webGLInfo', {
      is: (val) => val === 'Manual',
      then: Yup.string().required('Field is required'),
      otherwise: Yup.string().notRequired(),
    }),
    renderer: Yup.string().when('webGLInfo', {
      is: (val) => val === 'Manual',
      then: Yup.string().required('Field is required'),
      otherwise: Yup.string().notRequired(),
    }),
    latitude: Yup.string().when('geolocation', {
      is: (val) => val === 'Manual',
      then: Yup.string().required('Field is required'),
      otherwise: Yup.string().notRequired(),
    }),
    longitude: Yup.string().when('geolocation', {
      is: (val) => val === 'Manual',
      then: Yup.string().required('Field is required'),
      otherwise: Yup.string().notRequired(),
    }),
    accuracy: Yup.string().when('geolocation', {
      is: (val) => val === 'Manual',
      then: Yup.string().required('Field is required'),
      otherwise: Yup.string().notRequired(),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const isMountedRef = useIsMountedRef();

  const [cookies, proxy, platform] = useWatch({
    name: ['cookies', 'proxy', 'platform'],
    control,
  });

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      const file = acceptedFiles[0];

      const reader = new FileReader();

      reader.readAsText(file);

      reader.onloadstart = () => {
        setLoadingZone(true);
      };

      reader.onload = () => {
        setValue('cookies', reader.result);
      };

      reader.onloadend = () => {
        setLoadingZone(false);
      };
    }
  }, []);

  useEffect(async () => {
    if (open) {
      try {
        dispatch(fingerprintsRequested(platform.toLowerCase()));
        axios.get(`api/v1/fingerprints/${platform.toLowerCase()}/101`).then((response) => {
          // handle success
          setValue('vendor', response.data.data.fingerprint.webgl.unmasked_vendor);
          setValue('renderer', response.data.data.fingerprint.webgl.unmasked_renderer);
          setValue('useragent', response.data.data.fingerprint.navigator.user_agent);
          setValue('resolution', `${response.data.data.fingerprint.screen.width}x${response.data.data.fingerprint.screen.height}`);
          setValue('cpu', response.data.data.fingerprint.navigator.hardware_concurrency);
          setValue('memory', response.data.data.fingerprint.navigator.device_memory);
          setValue('screen', 'Manual');
        });
      } catch (error) {
        console.error(error);
      }
    }

  }, [platform, open]);

  const onSubmit = async (data) => {
    try {
      await console.log(data); // post request

      handleCloseModal();

      reset({ ...defaultValues });
    } catch (error) {
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  const handleCloseModal = () => {
    reset();
    setOpenSettings(false);
    closeModal();
  };

  return (
    <CreateDrawer open={open} toggleDrawer={handleCloseModal} sx={{ width: 866 }}>
      <ModalTabs
        onCloseModal={handleCloseModal}
        tabValue={tab}
        tableHeads={TABLE_HEADS}
        handleChange={(newValue) => setTab(newValue)}
      />

      {tab === 'newProfile' && (
        <Stack direction='row' justifyContent='space-between'>
          <Stack height={windowHeight - 50} width={534}>
            <Scrollbar>
              <Stack pr={2.4} pl={2} pb={2}>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  <Grid container pt={2} pb={2} spacing={2}>
                    <Grid item xs={8}>
                      <RHFTextField name='name' control={control} label='Name' size='small' variant='outlined' />
                    </Grid>
                    <Grid item xs={4}>
                      <RHFSelect name='status' label='Status' selectData={selectData} cross />
                    </Grid>
                  </Grid>
                  <Stack direction='column' spacing={2}>
                    <RHFAutocompleteMultiple tag name='tags' label='Tags' data={[]} />

                    <RHFButtonGroup name='platform' buttonGroupTypes={PROFILE_BUTTONGROUP_TYPE} notPadding />

                    <RHFButtonGroup name='proxy' buttonGroupTypes={PROFILE_PROXY} upperCase={false} notPadding />

                    {proxy === 'Select proxy' && (
                      <RHFSelect name='selectDataProxy' label='Proxy' selectData={selectData} />
                    )}

                    {proxy === 'Add proxy' && (
                      <>
                        <RHFTextField
                          name='proxy-name'
                          control={control}
                          label='Proxy name'
                          size='small'
                          fullWidth
                          variant='outlined'
                        />

                        <RHFButtonGroup
                          name='type'
                          buttonGroupTypes={MODAL_NEW_PROXY_BUTTONGROUP_TYPE}
                          upperCase
                          notPadding
                        />

                        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                          <RHFTextField
                            name='proxyAdd'
                            control={control}
                            label='Proxy'
                            fullWidth
                            size='small'
                            variant='outlined'
                            InputProps={{
                              endAdornment: <SvgIconStyle src='/assets/icons/main/ic_info.svg' />,
                            }}
                          />
                          <ToggleButton value={false} sx={{ p: 1 }}>
                            <SvgIconStyle src='/assets/icons/main/ic_connection.svg' sx={{ width: 22, height: 24 }} />
                          </ToggleButton>
                        </Stack>

                        <RHFTextField
                          name='proxy-ip'
                          control={control}
                          label='Link for changing proxy IP'
                          size='small'
                          variant='outlined'
                          InputProps={{
                            endAdornment: <SvgIconStyle src='/assets/icons/main/ic_info.svg' />,
                          }}
                        />
                      </>
                    )}

                    {checkedZone || !isEmpty(cookies) ? (
                      <RHFTextField
                        name='cookies'
                        autoFocus
                        control={control}
                        label='Cookies'
                        placeholder='Add cookies. Supported formats: JSON, NETSCAPE, BAS, BASE64'
                        multiline
                        rows={5.75}
                        defaultvalues={cookies}
                        onBlur={() => setCheckedZone(false)}
                        variant='outlined'
                      />
                    ) : (
                      <RHFDropzone
                        file={cookies}
                        setChecked={setCheckedZone}
                        loading={loadingZone}
                        onDrop={handleDropSingleFile}
                      />
                    )}

                    <RHFTextField
                      name='note'
                      control={control}
                      label='Note'
                      multiline
                      rows={4}
                      variant='outlined'
                      placeholder='Profile notes. Write something...'
                    />
                  </Stack>

                  <Button
                    fullWidth
                    variant='outlined'
                    sx={{ my: 2, textTransform: 'none' }}
                    onClick={() => {
                      setOpenSettings(!openSettings);
                    }}
                    endIcon={
                      openSettings ? (
                        <SvgIconStyle src='/assets/icons/main/ic_minus.svg' sx={{ width: 14, height: 14 }} />
                      ) : (
                        <SvgIconStyle src='/assets/icons/main/ic_drop.svg' sx={{ width: 14, height: 14 }} />
                      )
                    }
                  >
                    Advanced settings
                  </Button>

                  {openSettings && (
                    <ProfileAdvancedSettings control={control} watch={watch} setValue={setValue} errors={errors} />
                  )}

                  <Button fullWidth variant='contained' type='submit' sx={{ py: 1, textTransform: 'none' }}>
                    {edit ? 'Save profile' : 'Create profile'}
                  </Button>
                </FormProvider>
              </Stack>
            </Scrollbar>
          </Stack>

          <Stack height={windowHeight - 50} width={317} py={2} pr={2}>
            <ProfileModalRandomize control={control} setValue={setValue} />
          </Stack>
        </Stack>
      )}
      {tab === 'import' && <Stack>Development</Stack>}
    </CreateDrawer>
  );
}

