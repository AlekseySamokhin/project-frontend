import { Button, Divider, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { RHFTextField } from '../../../components/hook-form';

TagPropertiesForm.propTypes = {
  number: PropTypes.number.isRequired,
  control: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
};

export default function TagPropertiesForm({ number, control, fields, remove }) {
  return (
    <Stack>
      <RHFTextField
        name={`tags.${number}.name`}
        control={control}
        label="Tag name"
        fullWidth
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />

      {fields.length > 1 && (
        <Button fullWidth variant="outlined" color="inherit" sx={{ mb: 2 }} onClick={() => remove(number)}>
          Remove
        </Button>
      )}

      {number !== fields.length - 1 && <Divider sx={{ mb: 2 }} />}
    </Stack>
  );
}
