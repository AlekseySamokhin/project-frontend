import { Button, Popover, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import usePopoverPosition from '../../../hooks/usePopoverPosition';
import { useParams } from 'react-router';
import { useDispatch } from '../../../redux/store';
import { profileRequested } from '../../../redux/slices/browsers';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

ProfilePopoverRowNote.propTypes = {
  id: PropTypes.string,
  event: PropTypes.node,
  value: PropTypes.string,
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function ProfilePopoverRowNote({ id, event, value, open, anchorEl, onClose }) {
  const popover = usePopoverPosition(event, 228, 'vertical');

  const dispatch = useDispatch();

  const params = useParams();

  const folderId = params.id;

  const schema = Yup.object().shape({
    note: Yup.string().required('Field is required'),
  });

  const defaultValues = {
    note: value,
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const isMountedRef = useIsMountedRef();

  const onSubmit = async (data) => {
    try {

      console.error('patching', id, data);
      await axios.patch(
        `api/v1/folders/${folderId}/profiles/${id}`,
        { profile_notes: data.note },
      ).then(() => {
        dispatch(profileRequested({ folderId }));
      });

      handleCloseModal();
    } catch (error) {
      console.error(error);

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleCloseModal}
      transition
      anchorOrigin={{
        vertical: popover.anchorOrVer,
        horizontal: popover.anchorOrHor,
      }}
      transformOrigin={{
        vertical: popover.transformOrVer,
        horizontal: popover.transformOrHor,
      }}
      PaperProps={{
        sx: {
          p: 2,
          pb: 0,
          width: 351,
          borderRadius: '12px',
          ...popover.sx,
        },
      }}
    >
      <Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField name="note" rows={5} fullWidth multiline label="Note" defaultValue={value} />

          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1.5} sx={{ py: '14px' }}>
            <Button variant="outlined" color="inherit" onClick={handleCloseModal}>
              Cancel
            </Button>

            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </FormProvider>
      </Stack>
    </Popover>
  );
}
