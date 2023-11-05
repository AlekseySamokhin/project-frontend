import PropTypes from 'prop-types';
import { Checkbox, IconButton, Stack, TableCell, TableRow } from '@mui/material';
import { useRef } from 'react';
import { TagModalEdit } from '.';
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { useState } from 'react';

// ----------------------------------------------------------------------

TagTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function TagTableRow({ row, selected, onSelectRow }) {

  const { tag_name } = row;

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const nameRef = useRef(null);

  const boxRef = useRef(null);

  return (
    <TableRow selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">
        <Stack direction="row" alignItems="center" ref={nameRef}>

          <IconButton onClick={() => setOpenModalEdit(true)}>
            <SvgIconStyle src={`/assets/icons/main/ic_edit_row.svg`} sx={{ width: 18, height: 18 }} />
          </IconButton>



          <Stack direction="row" alignItems="center" ref={boxRef}>
            <Label variant="outlined" color="primary" sx={{ textTransform: 'capitalize', minWidth: 83 }}>
              {tag_name}
            </Label>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align="left" width="50%">
        <Label variant="filled" sx={{ p: '1px 8px', bgcolor: 'background.normal' }}>
          {/* {profiles} */}
          1
        </Label>
      </TableCell>

      <TagModalEdit
        open={openModalEdit}
        close={() => setOpenModalEdit(false)}
        tag={row}
      />

    </TableRow>
  );
}
