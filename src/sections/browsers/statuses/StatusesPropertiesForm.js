import { Button, Divider, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StatusFormTextField from './statusesTextField';
import { StatusesPopover } from './index';

StatusesPropertiesForm.propTypes = {
  number: PropTypes.number.isRequired,
  control: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default function StatusesPropertiesForm({ setValue, number, control, fields, remove }) {
  const [selectColor, setSelectColor] = useState('#00AB55');

  const [popover, setPopover] = useState({ open: false, anchorEl: null, event: null });

  useEffect(() => {
    setValue(`statuses[${number}].color`, selectColor);
  }, [selectColor]);

  return (
    <Stack>
      <StatusFormTextField
        selectColor={selectColor}
        name={`statuses.${number}.name`}
        control={control}
        label="Status name"
        fullWidth
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
        openPopover={(event) => setPopover({ open: true, anchorEl: event.currentTarget, event })}
      />

      {fields.length > 1 && (
        <Button fullWidth variant="outlined" color="inherit" sx={{ mb: 2 }} onClick={() => remove(number)}>
          Remove
        </Button>
      )}

      {number !== fields.length - 1 && <Divider sx={{ mb: 2 }} />}

      <StatusesPopover
        selectColor={selectColor}
        setValue={setValue}
        setSelectColor={setSelectColor}
        openPopover={popover.open}
        anchorEl={popover.anchorEl}
        event={popover.event}
        onClose={() => setPopover({ open: false, anchorEl: null, event: popover.event })}
      />
    </Stack>
  );
}
