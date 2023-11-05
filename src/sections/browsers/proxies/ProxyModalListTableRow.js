import PropTypes from 'prop-types';
// @mui
import { IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
// components
import { FlagIcon } from 'react-flag-kit';
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import axios from '../../../utils/axios';
import { proxyRequested } from '../../../redux/slices/browsers';
import { useDispatch } from '../../../redux/store';

// ----------------------------------------------------------------------

ProxyModalListTableRow.propTypes = {
  row: PropTypes.object,
};

export default function ProxyModalListTableRow({ row }) {
  const { id, proxy_name, proxy_type, proxy_ip, proxy_port, proxy_username, folder_id, last_check_at, geo_info } = row;
  const status = createStatus(last_check_at, geo_info);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const folderId = folder_id;
    try {
      await axios.delete(`/api/v1/folders/${folder_id}/proxies/${id}`)

      dispatch(proxyRequested({ folderId }));
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <TableRow>
      <TableCell sx={{ py: '4px!important', px: '8px!important' }}>
        <Stack direction='row' alignItems='center'>
          <IconButton disableRipple onClick={handleDelete}>
            <SvgIconStyle src={`/assets/icons/main/ic_delete.svg`} sx={{ width: 18, height: 18 }} />
          </IconButton>
          <Stack>
            <Typography variant='body2' color='text.primary'>
              {proxy_name}
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

      <TableCell align='left' sx={{ p: '8px' }}>
        <Label variant='outlined' color='primary' sx={{ textTransform: 'uppercase' }}>
          {proxy_type}
        </Label>
      </TableCell>

      <TableCell align='left' sx={{ p: '8px' }}>
        <Typography variant='body2'>{proxy_ip}</Typography>
      </TableCell>

      <TableCell align='left' sx={{ p: '8px' }}>
        <Typography variant='body2'>{proxy_port}</Typography>
      </TableCell>

      <TableCell align='left' sx={{ p: '8px' }}>
        <Typography variant='body2'>{proxy_username}</Typography>
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

