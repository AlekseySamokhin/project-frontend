import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import CreateDrawer from '../../../components/browsers/CreateDrawer';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { FormProvider } from '../../../components/hook-form';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { ModalTabs } from '../../index';
import { TagPropertiesForm } from './index';
import axios from '../../../utils/axios';
import { useDispatch } from '../../../redux/store';
import { tagsRequested } from '../../../redux/slices/browsers';

// ----------------------------------------------------------------------

const TABLE_HEADS = [
  {
    id: 'newTag',
    label: 'New Tag',
    src: '/assets/icons/main/ic_add.svg',
    iconWidth: 14,
    iconHeight: 14,
  },
];

// ----------------------------------------------------------------------

TagModalNew.propTypes = {
  openNewTag: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function TagModalNew({ openNewTag, onCloseModal }) {
  const schema = Yup.object().shape({
    tags: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Field is required'),
      }),
    ),
  });

  const defaultValues = {
    tags: [
      {
        name: '',
      },
    ],
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const dispatch = useDispatch();

  const isMountedRef = useIsMountedRef();

  const params = useParams();

  const folderId = params.id;

  const onSubmit = async (data) => {
    data.tags = data.tags.map((tag) => tag.name);
    axios.post(`/api/v1/folders/${folderId}/tags`, data)
      .then((res) => {
        console.log(res);
        handleCloseModal();
        dispatch(tagsRequested({ folderId }));
      })
      .catch((err) => {
        console.log(err);
        reset();
      });
    // try {
    //   await console.log(data); // post request
    //   handleCloseModal();
    // } catch (error) {
    //   console.error(error);
    //
    //   reset();
    //
    //   if (isMountedRef.current) {
    //     setError('afterSubmit', { ...error, message: error.message });
    //   }
    // }
  };

  const handleCloseModal = () => {
    reset();
    onCloseModal();
  };

  return (
    <CreateDrawer open={openNewTag} toggleDrawer={handleCloseModal} sx={{ width: 540 }}>
      <ModalTabs onCloseModal={handleCloseModal} tabValue='newTag' tableHeads={TABLE_HEADS} />

      <Stack sx={{ p: 2, px: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <Stack key={field.id}>
              <TagPropertiesForm number={index} fields={fields} control={control} remove={remove} />
            </Stack>
          ))}

          <Stack direction='row' spacing={2}>
            <Button variant='outlined' fullWidth sx={{ py: 1 }} onClick={() => append(defaultValues.tags[0])}>
              Add more
            </Button>

            <Button
              fullWidth
              variant='contained'
              type='submit'
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
