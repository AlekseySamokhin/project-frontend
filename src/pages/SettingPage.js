import { Box } from '@mui/material';
import Page from '../components/Page';
import SettingUser from '../sections/settings/SettingUser';

// ----------------------------------------------------------------------

export default function SettingPage() {
  return (
    <Page title="Setting">
      <Box m={2}>
        <SettingUser />
      </Box>
    </Page>
  );
}
