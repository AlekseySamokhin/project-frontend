import { Box, Divider, List, ListItemText, Stack } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../redux/store';
import { AdditionalNavbarListItemButton } from '../Styles';
import CustomIcon from '../../components/CustomIcon';

export default function TrackingFolderList() {
  const theme = useTheme();

  const params = useParams();

  const navigate = useNavigate();

  const folders = useSelector((state) => state.tracking.folder.collection);

  const [selectFolder, setSelectFolder] = useState(params.id);

  const handleFolder = (id) => {
    setSelectFolder(id);
    navigate(`/tracking/folders/${id}`);
  };

  return (
    <Stack>
      <List component="nav" sx={{ px: 2, pb: 0 }}>
        {folders.map(
          (folder) =>
            !folder.locked && (
              <AdditionalNavbarListItemButton
                color={`'warning.main'29`}
                key={folder.id}
                selected={folder.id === selectFolder}
                onClick={() => handleFolder(folder.id)}
                sx={{
                  pr: 1.5,
                  '&.Mui-selected': {
                    backgroundColor: `${theme.palette.warning.main}29`,
                    '&.Mui-focusVisible, &:hover': {
                      backgroundColor: `${theme.palette.warning.main}29`,
                    },
                  },
                  '&.Mui-focusVisible, &:hover': {
                    backgroundColor: `${theme.palette.warning.main}29`,
                  },
                }}
              >
                <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" justifyContent="center">
                    <CustomIcon
                      src={`/assets/icons/main/ic_folders.svg`}
                      width={20}
                      height={16}
                      boxHeight={24}
                      boxWidth={24}
                      boxSx={{ mr: 2.25 }}
                    />
                    <ListItemText primary={folder.title} />
                  </Stack>
                  {folder.title === 'Arbitrageurs' ? (
                    <Box sx={{ bgcolor: 'primary.main', borderRadius: '100%' }} width={10} height={10} />
                  ) : null}
                </Stack>
              </AdditionalNavbarListItemButton>
            )
        )}
      </List>

      <Divider variant="middle" />

      <List component="nav" sx={{ px: 2, pt: 0.5 }}>
        {folders.map(
          (folder) =>
            folder.locked && (
              <AdditionalNavbarListItemButton
                color={`'warning.main'29`}
                key={folder.id}
                selected={folder.id === selectFolder}
                onClick={() => handleFolder(folder.id)}
                sx={{
                  pr: 1.5,
                  '&.Mui-selected': {
                    backgroundColor: `${theme.palette.warning.main}29`,
                    '&.Mui-focusVisible, &:hover': {
                      backgroundColor: `${theme.palette.warning.main}29`,
                    },
                  },
                  '&.Mui-focusVisible, &:hover': {
                    backgroundColor: `${theme.palette.warning.main}29`,
                  },
                }}
              >
                <CustomIcon
                  src={`/assets/icons/main/ic_folder_locked.svg`}
                  width={22}
                  height={20}
                  boxHeight={24}
                  boxWidth={24}
                  boxSx={{ mr: 2, ml: '2px' }}
                />
                <ListItemText primary={folder.title} />
              </AdditionalNavbarListItemButton>
            )
        )}
      </List>
    </Stack>
  );
}
