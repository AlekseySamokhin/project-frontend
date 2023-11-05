import PropTypes from 'prop-types';
import { Checkbox, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { FlagIcon } from 'react-flag-kit';
import Label from '../../../components/Label';
import { ProxyModalEdit } from '.';
import { parseProxyName } from '../../../utils/parse';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

ProxyTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function ProxyTableRow({ row, selected, onSelectRow }) {

  const { proxy_name, proxy_type, proxy_ip, proxy_port, proxy_username, proxy_password, last_check_at, geo_info } = row;

  const [editFormOpen, setEditFormEdit] = useState(false);

  const rightName = (proxy_name || parseProxyName(proxy_type, proxy_username, proxy_password, proxy_port, proxy_ip));

  const status = createStatus(last_check_at, geo_info);

  return (
    <TableRow selected={selected}>
      <TableCell padding='checkbox'>
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>
        <Stack direction='row' alignItems='center'>

          <IconButton onClick={() => setEditFormEdit(true)}>
            <SvgIconStyle src={`/assets/icons/main/ic_edit_row.svg`} sx={{ width: 18, height: 18 }} />
          </IconButton>

          <ProxyModalEdit
            proxy={row}
            open={editFormOpen}
            closeModal={() => setEditFormEdit(false)}
          />

          <Stack>

            <Typography variant='body2' color='text.primary'>
              {rightName}
            </Typography>

          </Stack>
        </Stack>
      </TableCell>

      <TableCell align='left' sx={{ p: '8px', height: 94 }}>
        <Label
          variant='outlined'
          color={(status !== 'Active' && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>

        {geo_info && <><Stack direction='row' alignItems='center' py={1}>
          <FlagIcon size={20} code={geo_info?.country.substring(0, 2).toUpperCase()} />
          <Typography sx={{ml: 1}} variant='body2'>{geo_info?.ip}</Typography>
        </Stack>
          <Typography variant='caption' color='text.secondary'>
            {`${last_check_at}  •  ${geo_info?.timezone}/${geo_info?.country}`}
          </Typography></>}
      </TableCell>

      <TableCell align='left'>
        <Label variant='filled' sx={{ p: '1px 8px 1px 8px', bgcolor: 'background.normal' }}>
          -
        </Label>
      </TableCell>

      <TableCell align='left'>
        <Label variant='outlined' color='primary' sx={{ textTransform: 'uppercase' }}>
          {proxy_type}
        </Label>
      </TableCell>

      <TableCell align='left'>
        <Typography variant='body2'>{proxy_ip}</Typography>
      </TableCell>

      <TableCell align='left'>
        <Typography variant='body2'>{proxy_port || '-'}</Typography>
      </TableCell>

      <TableCell align='left'>
        <Typography variant='body2'>{proxy_username || ' '}</Typography>
      </TableCell>
    </TableRow>
  );
}

function createStatus(last_check_at, geo_info) {

  if (last_check_at === null && geo_info === null) {
    return 'Not checked';
  }

  if (last_check_at !== null && geo_info === null) {
    return 'Invalid';
  }

  return 'Active';
}
