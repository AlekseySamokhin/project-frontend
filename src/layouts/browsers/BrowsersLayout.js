import { useEffect, useState } from 'react';
import { Box, Button, List, ListItemText, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import map from 'lodash/map';
import { cloneDeep, isEmpty } from 'lodash';
import { noCase } from 'change-case';
import { useDispatch, useSelector } from '../../redux/store';
import {
  AdditionalNavbar,
  AdditionalNavbarButton,
  AdditionalNavbarListItemButton,
} from '../../components/AdditionalNavbar';
import SvgIconStyle from '../../components/SvgIconStyle';
import BrowsersSettings from './BrowsersSettings';
import BrowsersCreate from './BrowsersCreate';
import Loading from '../../components/Loading';
import CustomIcon from '../../components/CustomIcon';
import { browsersFolderRequested } from '../../redux/slices/browsers';
import { PATH_BROWSERS } from '../../routes/paths';
import { personalityRequested } from '../../redux/slices/personality';

// ----------------------------------------------------------------------

export default function BrowsersLayout() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { collection: folders, loading: loadingFolders } = useSelector((state) => state.browsers.folder);

  const foldersPosition = useSelector(state => state.personality.data.folders);

  const [selectFolder, setSelectFolder] = useState('');

  const [foldersState, setFoldersState] = useState('')

  const [popups, setPopups] = useState({
    settings: {
      open: false,
      anchorEl: null,
    },
    create: {
      event: null,
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

  const handleFolder = (id) => {
    setSelectFolder(id);
    navigate(PATH_BROWSERS.profiles(id));
  };

  useEffect(() => {
    dispatch(browsersFolderRequested());
  }, []);

  useEffect(() => {
    dispatch(personalityRequested());
  }, []);

  useEffect(() => {
    setSelectFolder(folders[0]?.id);

    const items = cloneDeep(folders)

    if (typeof items !== 'undefined') {

      map(foldersPosition, (item) => {
        const changeItem = items.filter((filterItem) => filterItem.id === item.id);
        if (!isEmpty(changeItem)) {
          changeItem[0].position = item.position;
        }
      });

      items.sort((a, b) => a.position - b.position);

      setFoldersState(items);
    }
  }, [folders, foldersPosition]);

  return (
    <Box display='flex' flexDirection='row' minHeight='100vh'>
      <AdditionalNavbar
        title='Folders'
        noData={folders?.length === 0}
        buttons={
          <>
            <AdditionalNavbarButton
              variant='outlined'
              onClick={(event) => {
                handlePopups('settings', 'open', true);
                handlePopups('settings', 'anchorEl', event.currentTarget);
              }}
            >
              <SvgIconStyle src={`/assets/icons/main/ic_settings.svg`} sx={{ width: 16, height: 16 }} />
            </AdditionalNavbarButton>

            <AdditionalNavbarButton
              variant='outlined'
              onClick={(event) => {
                handlePopups('create', 'event', event);
                handlePopups('create', 'open', true);
                handlePopups('create', 'anchorEl', event.currentTarget);
              }}
            >
              <SvgIconStyle src={`/assets/icons/main/ic_add.svg`} sx={{ width: 14, height: 14 }} />
            </AdditionalNavbarButton>

            <BrowsersSettings
              open={popups.settings.open}
              anchorEl={popups.settings.anchorEl}
              onClose={() => handlePopups('settings', 'open', false)}
            />

            <BrowsersCreate
              event={popups.create.event}
              open={popups.create.open}
              anchorEl={popups.create.anchorEl}
              onClose={() => handlePopups('create', 'open', false)}
            />
          </>
        }
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {!loadingFolders ? (
            folders.length === 0 ?
              <Stack direction='column' justifyContent='center' alignItems='center' mt={4} px={2}>

                <img src='/assets/icons/main/ic_folder.svg' width={64} height={64} alt='folder' />

                <Typography
                  variant='caption'
                  sx={(theme) => ({ color: alpha(theme.palette.text.strong, 0.48), my: 2 })}
                  textAlign='center'
                >
                  Folders allow you to further distribute and categorize profiles. They are also used as a differentiation
                  of user rights.
                </Typography>

                <Button
                  variant='contained'
                  startIcon={
                    <CustomIcon
                      src='/assets/icons/main/ic_folders.svg'
                      width={16}
                      height={13}
                      boxWidth={24}
                      boxHeight={24}
                    />
                  }
                >
                  New folder
                </Button>
              </Stack>
              :
              <List component='nav' sx={{ px: 2 }}>
                {foldersState && foldersState?.map(
                  (folder) =>
                    !folder.locked && (
                      <AdditionalNavbarListItemButton
                        color={`'warning.main'29`}
                        key={folder.id}
                        selected={folder.id === selectFolder}
                        onClick={() => handleFolder(folder.id)}
                        sx={(theme) => ({
                          opacity: folder.deleted_at !== null ? 0.5 : 1,
                          '&.Mui-selected': {
                            backgroundColor: `${theme.palette.warning.main}29`,
                            '&.Mui-focusVisible, &:hover': {
                              backgroundColor: `${theme.palette.warning.main}29`,
                            },
                          },
                          '&.Mui-focusVisible, &:hover': {
                            backgroundColor: folder.deleted_at !== null ? 'success.main' : `${theme.palette.text.strong}14`,
                          },
                        })}
                      >
                        <Stack width='100%' direction='row' justifyContent='space-between' alignItems='center'>
                          <Stack direction='row' justifyContent='center'>
                            <CustomIcon
                              src={folder?.folder_icon?.length > 0 ?
                                `/assets/icons/main/ic_${noCase(folder.folder_icon)}.svg` : `/assets/icons/main/ic_folders.svg`}
                              width={20}
                              height={16}
                              boxHeight={24}
                              boxWidth={24}
                              boxSx={{ mr: 2.25 }}
                              sx={{
                                bgcolor: folder?.folder_color ? folder?.folder_color : 'grey.600',
                              }}
                            />
                            <ListItemText primary={folder.folder_name} />
                          </Stack>
                        </Stack>
                      </AdditionalNavbarListItemButton>
                    ),
                )}
              </List>
          )
          :
          <Loading />
        }
      </AdditionalNavbar>

      <Box width='100%' minHeight="100vh" height="100vh" sx={{ p: 2 }}>
        <Outlet />
      </Box>

    </Box>
  );
}
