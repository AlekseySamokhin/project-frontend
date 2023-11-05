import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CreateDrawer from '../../components/browsers/CreateDrawer';
import SvgIconStyle from '../../components/SvgIconStyle';
import { FormProvider } from '../../components/hook-form';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { ModalTabs } from '../index';
import { TrackingModalTable } from './index';
import { trackingChangelogRequested } from '../../redux/slices/tracking';

// ----------------------------------------------------------------------

const TABLE_HEADS = [
  {
    id: 'changelog',
    label: 'Changelog',
    src: '/assets/icons/tracking/ic_refresh.svg',
    iconWidth: 16.98,
    iconHeight: 16,
  },
];

// ----------------------------------------------------------------------

TrackingModalChangelog.propTypes = {
  openChangelog: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function TrackingModalChangelog({ openChangelog, onCloseModal }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trackingChangelogRequested());
  }, []);

  const schema = Yup.object().shape({
    start_date: Yup.string().required('Field is required'),
    end_date: Yup.string().required('Field is required'),
  });

  const defaultValues = {
    start_date: '',
    end_date: '',
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    setValue,
  } = methods;

  const isMountedRef = useIsMountedRef();

  const onSubmit = async (data) => {
    try {
      await console.log(data); // post request
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
    onCloseModal();
  };

  const [openStart, setOpenStart] = useState(false);

  const [openEnd, setOpenEnd] = useState(false);

  const [valueStart, setValueStart] = useState(new Date('2022-05-18T21:11:54'));
  const [valueEnd, setValueEnd] = useState(new Date('2022-05-18T21:11:54'));

  const onClick = () => {
    setValue('start_date', valueStart);
    setValue('end_date', valueEnd);
  };

  return (
    <CreateDrawer open={openChangelog} toggleDrawer={handleCloseModal} sx={{ width: 526 }}>
      <ModalTabs onCloseModal={handleCloseModal} tabValue="changelog" tableHeads={TABLE_HEADS} />

      <Stack p={2} pb={0}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="row" spacing={1.5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                disableOpenPicker
                open={openStart}
                onOpen={() => setOpenStart(true)}
                onClose={() => setOpenStart(false)}
                inputFormat="dd.MM.yyyy"
                value={valueStart}
                onChange={(value) => setValueStart(value)}
                renderInput={(params) => <TextField onClick={() => setOpenStart(true)} size="small" {...params} />}
              />
              <DesktopDatePicker
                disableOpenPicker
                open={openEnd}
                onOpen={() => setOpenEnd(true)}
                onClose={() => setOpenEnd(false)}
                inputFormat="dd.MM.yyyy"
                value={valueEnd}
                onChange={(value) => setValueEnd(value)}
                renderInput={(params) => (
                  <TextField
                    onChange={(e) => console.log(e.target.value)}
                    onClick={() => setOpenEnd(true)}
                    size="small"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>

            <Button sx={{ minWidth: 75 }} type="submit" onClick={onClick} variant="contained">
              Apply
            </Button>
            <Button sx={{ px: '5px', minWidth: 40 }} variant="outlined" color="inherit">
              <SvgIconStyle
                src={`/assets/icons/tracking/ic_refresh.svg`}
                sx={{ color: 'grey.600', width: 15.98, height: 16 }}
              />
            </Button>
          </Stack>
        </FormProvider>

        <TrackingModalTable />
      </Stack>
    </CreateDrawer>
  );
}
