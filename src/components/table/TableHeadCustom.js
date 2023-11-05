import PropTypes from 'prop-types';
import { Checkbox, IconButton, Stack, TableCell, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import Iconify from '../Iconify';
import SvgIconStyle from '../SvgIconStyle';
import TableSettingsHeads from './TableSettingsHeads';

// ----------------------------------------------------------------------

TableHeadCustom.propTypes = {
  orderBy: PropTypes.string,
  headLabel: PropTypes.array,
  rowCount: PropTypes.number,
  numSelected: PropTypes.number,
  onSelectAllRows: PropTypes.func,
  order: PropTypes.oneOf(['asc', 'desc']),
  settingHeads: PropTypes.bool,
  sx: PropTypes.object,
};

export default function TableHeadCustom({
                                          order,
                                          orderBy,
                                          rowCount = 0,
                                          headLabel,
                                          numSelected = 0,
                                          onSelectAllRows,
                                          settingHeads = false,
                                          sx,
                                        }) {
  const [openSettingsHeads, setOpenSettingsHeads] = useState(false);

  return (
    <TableHead sx={sx}>
      <TableRow>
        {onSelectAllRows && (
          <TableCell padding='checkbox'>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event) => {
                onSelectAllRows(event.target.checked);
              }}
            />
          </TableCell>
        )}

        {headLabel.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth, maxWidth: headCell.maxWidth, ...headCell.sx }}
          >
            {settingHeads && index === headLabel.length - 1 ? (
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                {headCell.label}

                <IconButton sx={{ width: 24, height: 24, p: 0 }} onClick={() => setOpenSettingsHeads(true)}>
                  <SvgIconStyle src={`/assets/icons/main/ic_settings_second.svg`} sx={{ width: 24, height: 24 }} />
                </IconButton>

                <TableSettingsHeads open={openSettingsHeads} onClose={() => setOpenSettingsHeads(false)} />
              </Stack>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
