import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box, Card, Stack } from '@mui/material';
import { useParams } from 'react-router';
import Page from '../../components/Page';
// import { useDispatch } from '../../redux/store';
import { ExtrasBookmarks, ExtrasExtensions, ExtrasHomePage } from '../../sections/browsers/extras';
import { Search } from '../../sections';
import BrowsersTabs from '../../sections/browsers/BrowsersTabs';
import Scrollbar from '../../components/Scrollbar';
import useWindowSize from '../../hooks/useWindowSize';

// ----------------------------------------------------------------------

export default function ExtrasPage() {

  // const dispatch = useDispatch();

  const params = useParams();

  const folderId = params.id;

  const folders = useSelector((state) => state.browsers.folder.collection);

  const [, windowHeight] = useWindowSize();

  useEffect(() => {
    if (folders.find((element) => element.id === folderId)) {
      // dispatch();
      // extras Requested;
    }

  }, [folders, folderId]);

  return (
    <Page title={`Browsers Folder - ${folderId}`}>

      <Stack sx={{marginBottom: "16px"}}>
        <Search value='' handleValue={(newValue) => console.log(newValue)} />
      </Stack>

      <Card sx={{ borderRadius: 1, my: 1.25 }}>
        <BrowsersTabs tabsValue='extras' />
      </Card>

      <Scrollbar heightAuto sx={{ height: windowHeight - 150 }}>
        <Box
          sx={{
            minWidth: 700,
            height: windowHeight - 150,
            position: 'relative',
            pb: 3,
          }}
        >

          <ExtrasExtensions />

          <ExtrasBookmarks />

          <ExtrasHomePage />

        </Box>
      </Scrollbar>

    </Page>
  );
}
