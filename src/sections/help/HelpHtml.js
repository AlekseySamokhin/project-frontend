import { Box, Typography, Stack, Grid, Alert } from '@mui/material';
import Label from '../../components/Label';

// ----------------------------------------------------------------------

export default function HelpHtml() {
  return (
    <Box>
      <Box>
        <Typography variant="body1">
          A browser profile is a set of parameters that upon launch configure the <a href="#">browser</a> to make it
          seem like a unique and separate online identity. A browser profile is a set of parameters that upon launch
          configure the browser to make it seem like a unique and separate online identity. A browser profile is a set
          of parameters that upon launch configure the browser to make it seem like a unique and separate online
          identity. A browser profile is a set of parameters that upon launch configure the browser to make it seem like
          a unique and separate online identity. A browser profile is a set of parameters that upon launch configure the
          browser to make it seem like a unique and separate online identity. A browser profile is a set of parameters
          that upon launch configure the browser to make it seem like a unique and separate online identity. A browser
          profile is a set of parameters that upon launch configure the browser to make it seem like a unique and
          separate online identity. A browser profile is a set of parameters that upon launch configure the browser to
          make it seem like a unique and separate online identity. A browser profile is a set of parameters that upon
          launch configure the browser to make it seem like a unique and separate online identity.{' '}
        </Typography>
      </Box>

      <Box mt={2}>
        <Stack direction="row" spacing={1}>
          <Label sx={{ width: '22px', borderRadius: '50%' }} variant="filled" color="info">
            <Typography variant="subtitle3">1</Typography>
          </Label>

          <Box>
            <Typography sx={{ fontWeight: 600, display: 'inline' }}>
              Save your master password in multiple secure places. &nbsp;
            </Typography>

            <Typography display="inline">
              &nbsp; Your master password is the key that encrypts your session data (history, cookies, tabs, etc). By
              resetting it with the help of the "Forgot password" functionality, you are losing access to your session
              data stored on our server. The only way to retrieve access is to remember your old password.
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box mt={2}>
        <Stack direction="row" spacing={1}>
          <Label sx={{ width: '22px', borderRadius: '50%' }} variant="filled" color="info">
            <Typography variant="subtitle3">2</Typography>
          </Label>

          <Box>
            <Typography sx={{ fontWeight: 600, display: 'inline' }}>
              Do not register an account with generic email address aliases, like admin@, sales@, info@, etc.&nbsp;
            </Typography>

            <Typography>
              &nbsp; This is due to the fact these emails may get blacklisted. Using throwaway email services may lead
              to losing an account.
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box mt={2} ml={3}>
        <Stack direction="row" spacing={1}>
          <Label sx={{ width: '22px', borderRadius: '50%' }} variant="filled" color="info">
            <Typography variant="subtitle3" textAlign="center">
              A
            </Typography>
          </Label>

          <Typography>
            You can edit all IP-related settings (TimeZone, WebRTC, and Geolocation) after the Proxy settings
          </Typography>
        </Stack>
      </Box>

      <Box mt={2} ml={3}>
        <Stack direction="row" spacing={1}>
          <Label sx={{ width: '22px', borderRadius: '50%' }} variant="filled" color="info">
            <Typography variant="subtitle3" textAlign="center">
              B
            </Typography>
          </Label>

          <Typography>
            If you click on the "Advanced" settings tab on the left navigation panel, you will be able to manage each
            parameter individually
          </Typography>
        </Stack>
      </Box>

      <Box my={2}>
        <Alert severity="info">This is an info alert — check it out!</Alert>
      </Box>

      <Box mt={2}>
        <Typography variant="body1">
          A browser profile is a set of parameters that upon launch configure the browser to make it seem like a unique
          and separate online identity. A browser profile is a set of parameters that upon launch configure the browser
          to make it seem like a unique and separate online identity. A browser profile is a set of parameters that upon
          launch configure the browser to make it seem like a unique and separate online identity. A browser profile is
          a set of parameters that upon launch configure the browser to make it seem like a unique and separate online
          identity. A browser profile is a set of parameters that upon launch configure the browser to make it seem like
          a unique and separate online identity. A browser profile is a set of parameters that upon launch configure the
          browser to make it seem like a unique and separate online identity. A browser profile is a set of parameters
          that upon launch configure the browser to make it seem like a unique and separate online identity. A browser
          profile is a set of parameters that upon launch configure the browser to make it seem like a unique and
          separate online identity. A browser profile is a set of parameters that upon launch configure the browser to
          make it seem like a unique and separate online identity.{' '}
        </Typography>
      </Box>

      <Box my={2}>
        <Typography variant="h3">Creating browser profiles</Typography>
      </Box>

      <Box>
        A browser profile is a set of parameters that upon launch configure the browser to make it seem like a unique
        and separate online identity. A browser profile is a set of parameters that upon launch configure the browser to
        make it seem like a unique and separate online identity. A browser profile is a set of parameters that upon
        launch configure the browser to make it seem like a unique and separate online identity. A browser profile is a
        set of parameters that upon launch configure the browser to make it seem like a unique and separate online
        identity. A browser profile is a set of parameters that upon launch configure the browser to make it seem like a
        unique and separate online identity.
      </Box>

      <Grid mt={2} container spacing={1}>
        <Grid item xs={6}>
          <img layout="fill" src={'https://finalytics.pro/wp-content/uploads/2018/01/pivottable1.png'} alt="Analytics" />
        </Grid>

        <Grid item xs={6}>
          <img layout="fill" src={'https://finalytics.pro/wp-content/uploads/2018/01/pivottable1.png'} alt="Analytics" />
        </Grid>
      </Grid>
    </Box>
  );
}
