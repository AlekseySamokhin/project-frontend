import { IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { TableBottomIconButtom } from '../BrowsersStyles';
import axios from '../../../utils/axios';
import { tagsRequested } from '../../../redux/slices/browsers';

// ----------------------------------------------------------------------

TagTableBottom.propTypes = {
  selected: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setSelected: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function TagTableBottom({ selected, setSelected }) {

  const isNotSelectedRows = selected.length === 0;

  const dispatch = useDispatch();

  const params = useParams();

  const folderId = params.id;

  const handleDelete = () => {
    const data = { tag_ids: [...selected] };
    axios.delete(`/api/v1/folders/${folderId}/tags`, { data })
      .then((res) => {
        setSelected([]);
        console.log(res);
        dispatch(tagsRequested({ folderId }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Stack direction='row'>
      <IconButton disabled sx={{ width: 0, height: 0, p: 0 }} />

      <TableBottomIconButtom
        disabled={isNotSelectedRows}
        color='primary'
        onClick={handleDelete}
      >
        <SvgIconStyle src={`/assets/icons/main/ic_delete.svg`} sx={{ width: 20, height: 20 }} />
      </TableBottomIconButtom>

      {!isNotSelectedRows && (
        <Stack direction='row' justifyContent='center' alignItems='center' sx={{ width: 40, height: 40 }}>
          <Label color='primary'>
            {selected.length}
          </Label>
        </Stack>
      )}
    </Stack>
  );
}
