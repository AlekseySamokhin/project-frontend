import { Button, IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import SvgIconStyle from '../../../components/SvgIconStyle';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { FormProvider } from '../../../components/hook-form';
import { MODAL_TAGS } from './TagConfig';
import CreateDrawer from '../../../components/browsers/CreateDrawer';
import RHFTextField from '../../../components/hook-form/RHFTextField';
import { ModalTabs } from '../../index';
import axios from '../../../utils/axios';
import { tagsRequested } from '../../../redux/slices/browsers';
import { useDispatch } from '../../../redux/store';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const TABLE_HEADS = [
  {
    id: 'editTag',
    label: 'Edit tag',
    src: '/assets/icons/main/ic_add.svg',
    iconWidth: 14,
    iconHeight: 14,
  },
];

// ----------------------------------------------------------------------

TagModalEdit.propTypes = {
  tag: PropTypes.object.isRequired,
};

// ----------------------------------------------------------------------

export default function TagModalEdit({ tag, open, close }) {

  const dispatch = useDispatch();

  const params = useParams();

  const folderId = params.id;

  const schema = Yup.object().shape({
    name: Yup.string().required('Field is required'),
  });

  const defaultValues = {
    name: tag.tag_name,
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
  } = methods;


  const [tab, setTab] = useState(TABLE_HEADS[0].id);

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    axios.put(`/api/v1/folders/${folderId}/tags/${tag.id}`, data)
      .then((res) => {
        console.log(res);
        handleCloseModal();

        dispatch(tagsRequested({ folderId }));
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
      <CreateDrawer open={open} toggleDrawer={handleCloseModal} sx={{ width: MODAL_TAGS.EDIT.WIDTH }}>
        <ModalTabs
          onCloseModal={handleCloseModal}
          tabValue={tab}
          tableHeads={TABLE_HEADS}
          handleChange={(newValue) => setTab(newValue)}
        />

        <Stack sx={{ p: 2, px: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField name='name' control={control} label='Tag name' size='small' variant='outlined' />

            <Stack mt={2}>
              <Button
                fullWidth
                variant='contained'
                type='submit'
                sx={{ py: 1 }}
                startIcon={<SvgIconStyle src={'/assets/icons/main/ic_edit_row.svg'} sx={{ width: 15, height: 15 }} />}
              >
                Edit
              </Button>
            </Stack>
          </FormProvider>
        </Stack>
      </CreateDrawer>
  );
}
