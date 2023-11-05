import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { FormProvider } from '../../../components/hook-form';
import { MODAL_STATUSES } from './StatusesConfig';
import CreateDrawer from '../../../components/browsers/CreateDrawer';
import StatusFormTextField from './statusesTextField';
import { StatusesPopover } from './index';
import { ModalTabs } from '../../index';
import axios from '../../../utils/axios';
import { useDispatch } from '../../../redux/store';
import { statusesRequested } from '../../../redux/slices/browsers';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const TABLE_HEADS = [
  {
    id: 'editStatus',
    label: 'Edit status',
    src: '/assets/icons/main/ic_add.svg',
    iconWidth: 14,
    iconHeight: 14,
  },
];

// ----------------------------------------------------------------------

StatusesModalEdit.propTypes = {
  status: PropTypes.object.isRequired,
};

// ----------------------------------------------------------------------

export default function StatusesModalEdit({ status, open, close }) {

  const dispatch = useDispatch();

  const params = useParams();

  const folderId = params.id;

  const schema = Yup.object().shape({
    name: Yup.string().required('Field is required'),
  });

  const defaultValues = {
    name: status.status,
    color: status.status_color,
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    setValue,
  } = methods;

  const [tab, setTab] = useState(TABLE_HEADS[0].id);

  const [popover, setPopover] = useState({ open: false, anchorEl: null, event: null });

  const [selectColor, setSelectColor] = useState(status.status_color);

  useEffect(() => {
    setValue(`color`, selectColor);
  }, [selectColor]);

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    axios.put(`/api/v1/folders/${folderId}/statuses/${status.id}`, data)
      .then((res) => {
        console.log(res);
        handleCloseModal();

        dispatch(statusesRequested({ folderId }));
      })
      .catch((err) => {
        if (err.error) {
          enqueueSnackbar(err.error, { variant: 'error' });
        }

        console.log(err);
      });
  };

  const handleCloseModal = () => {
    reset();
    close();
  };

  return (
    <CreateDrawer open={open} toggleDrawer={handleCloseModal} sx={{ width: MODAL_STATUSES.EDIT.WIDTH }}>
      <ModalTabs
        onCloseModal={handleCloseModal}
        tabValue={tab}
        tableHeads={TABLE_HEADS}
        handleChange={(newValue) => setTab(newValue)}
      />

      <Stack sx={{ py: 2, px: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <StatusFormTextField
            selectColor={selectColor}
            name='name'
            control={control}
            label='Status name'
            fullWidth
            variant='outlined'
            size='small'
            sx={{ mb: 2 }}
            openPopover={(event) => setPopover({ open: true, anchorEl: event.currentTarget, event })}
          />

          <Stack direction='row' spacing={1}>
            <Button
              fullWidth
              variant='contained'
              type='submit'
              sx={{ py: 1, height: 42 }}
              startIcon={<SvgIconStyle src={'/assets/icons/main/ic_edit_row.svg'} sx={{ width: 15, height: 15 }} />}
            >
              Edit
            </Button>
          </Stack>

          <StatusesPopover
            event={popover.event}
            setSelectColor={setSelectColor}
            openPopover={popover.open}
            anchorEl={popover.anchorEl}
            onClose={() => setPopover({ open: false, anchorEl: null, event: popover.event })}
          />
        </FormProvider>
        </Stack>
      </CreateDrawer>
  );
}
