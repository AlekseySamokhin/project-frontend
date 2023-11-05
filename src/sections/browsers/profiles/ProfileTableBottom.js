import { IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import SvgIconStyle from '../../../components/SvgIconStyle';
import Label from '../../../components/Label';
import ProfileModalRowTags from './ProfileModalRowTags';
import { profileStartRequested, profileStopRequested } from '../../../redux/slices/browsers';
import { useDispatch } from '../../../redux/store';
import { TableBottomIconButtom } from '../BrowsersStyles';

// ----------------------------------------------------------------------

ProfileTableBottom.propTypes = {
  selected: PropTypes.array,
  setSelected: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function ProfileTableBottom({ selected, setSelected }) {
  const dispatch = useDispatch();

  const [popups, setPopups] = useState({
    tags: {
      open: false,
      anchorEl: null,
    },
  });

  const handlePopups = (popup, key, value) => {
    setPopups((prevState) => ({
      ...prevState,
      [popup]: {
        ...prevState[popup],
        [key]: value,
      },
    }));
  };

  const isNotSelectedRows = selected.length === 0;

  return (
    <Stack direction="row">
      <IconButton disabled sx={{ width: 0, height: 0, p: 0 }} />
      <TableBottomIconButtom
        disabled={isNotSelectedRows}
        color="primary"
        onClick={(event) => {
          handlePopups('tags', 'anchorEl', event.currentTarget);
          handlePopups('tags', 'open', true);
        }}
      >
        <SvgIconStyle src={`/assets/icons/browsers/ic_tags.svg`} sx={{ width: 19, height: 19 }} />
      </TableBottomIconButtom>

      <TableBottomIconButtom disabled={isNotSelectedRows} color="primary">
        <SvgIconStyle src={`/assets/icons/main/ic_export.svg`} sx={{ width: 18, height: 20 }} />
      </TableBottomIconButtom>

      <TableBottomIconButtom disabled={isNotSelectedRows} color="primary">
        <SvgIconStyle src={`/assets/icons/main/ic_transfer.svg`} sx={{ width: 16, height: 20 }} />
      </TableBottomIconButtom>

      <TableBottomIconButtom disabled={isNotSelectedRows} color="primary">
        <SvgIconStyle src={`/assets/icons/browsers/ic_proxy.svg`} sx={{ width: 22, height: 20 }} />
      </TableBottomIconButtom>

      <TableBottomIconButtom
        disabled={isNotSelectedRows}
        color="primary"
        onClick={() => {
          selected.forEach((id) => dispatch(profileStopRequested({ profileId: id })));
        }}
      >
        <SvgIconStyle src={`/assets/icons/main/ic_start.svg`} sx={{ width: 11, height: 14 }} />
      </TableBottomIconButtom>

      <TableBottomIconButtom
        disabled={isNotSelectedRows}
        color="primary"
        onClick={() => {
          selected.forEach((id) => dispatch(profileStartRequested({ profileId: id })));
        }}
      >
        <SvgIconStyle src={`/assets/icons/main/ic_pause.svg`} sx={{ width: 12, height: 14 }} />
      </TableBottomIconButtom>

      <TableBottomIconButtom
        disabled={isNotSelectedRows}
        color="primary"
        onClick={() => {
          selected.forEach((id) => console.log('deleteRequest -', { profileId: id }));
        }}
      >
        <SvgIconStyle src={`/assets/icons/main/ic_delete.svg`} sx={{ width: 20, height: 20 }} />
      </TableBottomIconButtom>

      {!isNotSelectedRows && (
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ width: 40, height: 40 }}>
          <Label color="primary">{selected.length}</Label>
        </Stack>
      )}

      <ProfileModalRowTags
        selected={selected}
        open={popups.tags.open}
        onClose={() => {
          setSelected([]);
          handlePopups('tags', 'open', false);
        }}
      />
    </Stack>
  );
}
