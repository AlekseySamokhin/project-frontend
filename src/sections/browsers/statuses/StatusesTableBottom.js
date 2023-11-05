import { IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import SvgIconStyle from '../../../components/SvgIconStyle';
import Label from '../../../components/Label';
import { TableBottomIconButtom } from '../BrowsersStyles';
import axios from '../../../utils/axios';
import { statusesRequested } from '../../../redux/slices/browsers';

// ----------------------------------------------------------------------

StatusesTableBottom.propTypes = {
  selected: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setSelected: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function StatusesTableBottom({ selected, setSelected }) {

  const dispatch = useDispatch()

  const params = useParams();

  const folderId = params.id;

  const isNotSelectedRows = selected.length === 0;

  return (
    <Stack direction="row">
      <IconButton disabled sx={{ width: 0, height: 0, p: 0 }} />

      <TableBottomIconButtom
        disabled={isNotSelectedRows}
        color="primary"
        onClick={() => {
          const data = {status_ids: [...selected]}
          axios.delete(`/api/v1/folders/${folderId}/statuses`,  {data} )
            .then((res) => {
              setSelected([])
              console.log(res);
              dispatch(statusesRequested({ folderId }));
            })
            .catch((err) => {
              console.log(err);
            });
        }}
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
