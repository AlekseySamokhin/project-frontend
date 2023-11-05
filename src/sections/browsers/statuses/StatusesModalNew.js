import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router';
import CreateDrawer from '../../../components/browsers/CreateDrawer';
import { MODAL_STATUSES } from './StatusesConfig';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { StatusesPropertiesForm } from '.';
import { FormProvider } from '../../../components/hook-form';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import ModalTabs from '../../ModalTabs';
import axios from '../../../utils/axios'
import { statusesRequested } from '../../../redux/slices/browsers';
import { useDispatch } from '../../../redux/store';

// ----------------------------------------------------------------------

const TABLE_HEADS = [
  { id: 'newStatus', label: 'New Status', src: '/assets/icons/main/ic_plus.svg', iconWidth: 14, iconHeight: 14 },
];

// ----------------------------------------------------------------------

StatusesModalNew.propTypes = {
  openNewStatuses: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function StatusesModalNew({ openNewStatuses, onCloseModal }) {

  const dispatch = useDispatch()

  const schema = Yup.object().shape({
    statuses: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Field is required'),
      })
    ),
  });

  const defaultValues = {
    statuses: [
      {
        name: '',
        color: '',
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
    setValue,
    formState: { errors },
  } = methods;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'statuses',
  });
  const isMountedRef = useIsMountedRef();

  const params = useParams();

  const folderId = params.id;

  const onSubmit = async (data) => {
    data.statuses = data.statuses.map((status) => { return [status.name, status.color] });
    axios.post(`/api/v1/folders/${folderId}/statuses`, data)
      .then((res) => {
        handleCloseModal();
        dispatch(statusesRequested({ folderId }));
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const handleCloseModal = () => {
    reset();
    onCloseModal();
  };

  return (
    <CreateDrawer open={openNewStatuses} toggleDrawer={handleCloseModal} sx={{ width: MODAL_STATUSES.NEW.WIDTH }}>
      <ModalTabs onCloseModal={handleCloseModal} tabValue="newStatus" tableHeads={TABLE_HEADS} />

      <Stack sx={{ p: 2, px: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <Stack key={field.id}>
              <StatusesPropertiesForm
                setValue={setValue}
                field={field}
                number={index}
                update={update}
                fields={fields}
                control={control}
                errors={errors}
                remove={remove}
              />
            </Stack>
          ))}

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" fullWidth sx={{ py: 1 }} onClick={() => append(defaultValues.statuses[0])}>
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
