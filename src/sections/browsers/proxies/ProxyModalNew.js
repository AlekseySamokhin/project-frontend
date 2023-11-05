import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import CreateDrawer from '../../../components/browsers/CreateDrawer';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { ProxyPropertiesForm } from '.';
import { FormProvider } from '../../../components/hook-form';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { ModalTabs } from '../../index';
import axios from '../../../utils/axios';
import { useDispatch } from '../../../redux/store';
import { proxyRequested } from '../../../redux/slices/browsers';
import { parseProxy } from '../../../utils/parse';

// ----------------------------------------------------------------------

const TABLE_HEADS = [
  {
    id: 'newProxy',
    label: 'New proxy',
    src: '/assets/icons/main/ic_add.svg',
    iconWidth: 14,
    iconHeight: 14,
  },
];

// ----------------------------------------------------------------------

ProxyModalNew.propTypes = {
  folderId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function ProxyModalNew({ folderId, open, close }) {

  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    proxies: Yup.array().of(
      Yup.object().shape({
        proxy_name: Yup.string().required('Field is required'),
        proxy: Yup.string().required('Please enter the required field').matches(/(http|https|socks4|socks5|ssh):\/\/([^\s]+:[^\s]+@)?([0-9]{1,3}[.]){3}[0-9]{1,3}:\b[1-9](\d{0,2})?\d?[1-5]?\b/, 'Field must be type://login:pass@ip:port'),
      }),
    ),
  });

  const defaultValues = {
    proxies: [
      {
        proxy_name: '',
        proxy: '',
        proxy_type: 'HTTP',
        update_url: '',
      },
    ],
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'proxies',
  });


  const isMountedRef = useIsMountedRef();

  const onSubmit = async (data) => {
    data.proxies = data.proxies.map(element => {
      const parseObject = parseProxy(element.proxy);

      delete element.proxy;
      return { ...element, ...parseObject };
    })

    try {
      await axios.post(`/api/v1/folders/${folderId}/proxies`, data)

      handleCloseModal();
      dispatch(proxyRequested({ folderId }));

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
    close();
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
          {fields.map((field, index) => (
            <Stack key={field.id}>
              <ProxyPropertiesForm
                field={field}
                number={index}
                fields={fields}
                control={control}
                errors={errors}
                remove={remove}
                setValue={setValue}
                setError={setError}
              />
            </Stack>
          ))}

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" fullWidth sx={{ py: 1 }} onClick={() => append(defaultValues.proxies[0])}>
              Add more
            </Button>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ py: 1 }}
              startIcon={<SvgIconStyle src={'/assets/icons/main/ic_add.svg'} sx={{ width: 15, height: 15 }} />}
            >
              Create
            </Button>
          </Stack>
        </FormProvider>
      </Stack>
    </CreateDrawer>
  );
}
