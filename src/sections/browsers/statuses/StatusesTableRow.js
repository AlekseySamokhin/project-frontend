import PropTypes from 'prop-types';
import { Checkbox, IconButton, Stack, TableCell, TableRow } from '@mui/material';
import { useRef, useState } from 'react';
import { StatusesEditModal } from '.';
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

StatusesTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function StatusesTableRow({ row, selected, onSelectRow }) {

  const { id, status, status_color } = row;

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const nameRef = useRef(null);

  const boxRef = useRef(null);

  return (
    <TableRow selected={selected} key={id}>
      <TableCell padding='checkbox'>
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align='left'>
        <Stack direction='row' alignItems='center' ref={nameRef}>

          <IconButton onClick={() => setOpenModalEdit(true)}>
            <SvgIconStyle src="/assets/icons/main/ic_edit_row.svg" sx={{ width: 18, height: 18 }} />
          </IconButton>

          <Stack direction='row' alignItems='center' ref={boxRef}>
            <Label
              color={status_color}
              variant='outlined'
              sx={{
                textTransform: 'uppercase', minWidth: 83,
              }}
            >
              {status}
            </Label>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align='left' width='50%'>
        <Stack direction='row' alignItems='center'>
          <Label variant='filled' sx={{ p: '1px 8px 1px 8px', bgcolor: 'background.normal' }}>
            {/* {profiles} */}
            1
          </Label>
        </Stack>
      </TableCell>

      <StatusesEditModal
        status={row}
        open={openModalEdit}
        close={() => setOpenModalEdit(false)}
      />

    </TableRow>
  );
}
