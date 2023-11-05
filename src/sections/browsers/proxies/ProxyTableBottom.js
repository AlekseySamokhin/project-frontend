import { IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import SvgIconStyle from '../../../components/SvgIconStyle';
import Label from '../../../components/Label';
import { TableBottomIconButtom } from '../BrowsersStyles';
import axios from '../../../utils/axios';
import { useParams } from 'react-router';
import { proxyRequested } from '../../../redux/slices/browsers';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

ProxyTableBottom.propTypes = {
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  // setSelected: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function ProxyTableBottom({ selected }) {

  const dispatch = useDispatch();

  const isNotSelectedRows = selected.length === 0;

  const params = useParams();

  const folderId = params.id;

  const handleDelete = async () => {
    const data = { id: [...selected] };
    try {
      await axios.delete(`/api/v1/folders/${folderId}/proxies`, { data })

      dispatch(proxyRequested({ folderId }));
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <Stack direction="row">
      <IconButton disabled sx={{ width: 0, height: 0, p: 0 }} />

      <TableBottomIconButtom disabled={isNotSelectedRows} color="primary">
        <SvgIconStyle src={`/assets/icons/browsers/ic_share.svg`} sx={{ width: 19, height: 18 }} />
      </TableBottomIconButtom>

      <TableBottomIconButtom disabled={isNotSelectedRows} color="primary">
        <SvgIconStyle src={`/assets/icons/browsers/ic_proxy.svg`} sx={{ width: 22, height: 20 }} />
      </TableBottomIconButtom>

      <TableBottomIconButtom
        disabled={isNotSelectedRows}
        color="primary"
        onClick={handleDelete}
      >
        <SvgIconStyle src={`/assets/icons/main/ic_delete.svg`} sx={{ width: 20, height: 20 }} />
      </TableBottomIconButtom>

      {!isNotSelectedRows && (
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ width: 40, height: 40 }}>
          <Label color="primary">{selected.length}</Label>
        </Stack>
      )}
    </Stack>
  );
}
