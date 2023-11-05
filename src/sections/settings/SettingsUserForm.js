import { Box, Button, Divider, Avatar, Paper, Stack, Alert, Typography } from '@mui/material';

import React, { createRef, useState } from 'react';
import SvgIconStyle from '../../components/SvgIconStyle';

import Label from '../../components/Label';

import { RHFSwitch, RHFTextField } from '../../components/hook-form';

import RHFAddAvatar from '../../components/hook-form/RHFHiddenAddFile';
//---------------------------------------

export default function UserSettingsForm() {
  function UserSettingTitle({ title }) {
    return (
      <Stack direction="row" spacing={'13px'} alignItems="center">
        <SvgIconStyle src="/assets/icons/main/ic_puzzle.svg" sx={{ width: 21, height: 21, color: 'grey.600' }} />
        <Typography fontWeight="500" variant="h6">
          {title}
        </Typography>
      </Stack>
    );
  }

  const [avatarFile, setAvatarFile] = useState('');

  const dropzoneRef = createRef();
  const dropPathRef = createRef();

  const openDialog = () => {
    // Note that the ref is set async,
    // so it might be null at some point
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const openPathDialog = () => {
    if (dropPathRef.current) {
      dropPathRef.current.open();
    }
  };

  return (
    <Paper>
      <Box p={2} pb={3.6}>
        <UserSettingTitle title="User settings" />

        <Stack mt={1} mb={2} direction={'row'} spacing={'16px'}>
          <Label sx={{ width: 64, height: 64, borderRadius: '50%' }} variant="filled" color="default">
            {avatarFile ? (
              <Avatar sx={{ width: 64, height: 64, borderRadius: '50%' }} alt="avatar" src={avatarFile.preview} />
            ) : (
              <Typography color="grey.600" variant="h6">
                AY
              </Typography>
            )}
          </Label>

          <Stack direction="column" spacing={0.5}>
            <Typography component="div" variant="body2">
              {avatarFile.name ? avatarFile.name : 'Profile Picture'}
            </Typography>

            <Button
              onClick={openDialog}
              sx={{ height: '30px', width: '107px', border: '1px solid #C4CDD5', py: 0.3, px: 0.9, maxWidth: '106px' }}
              variant="default"
            >
              <Typography fontWeight={700} fontSize="13px">
                Browse image
              </Typography>
            </Button>

            <RHFAddAvatar name="avatar" setAvatarFile={setAvatarFile} dropzoneRef={dropzoneRef} />
          </Stack>
          <Box display="flex" alignItems="center">
            {avatarFile && (
              <Alert sx={{ height: 50 }} severity="success">
                File Uploaded
              </Alert>
            )}
          </Box>
        </Stack>

        <Divider />

        <Stack my={2} direction="column" spacing={'17px'}>
          <Box maxWidth="400px">
            <RHFTextField name="name" fullWidth variant="outlined" size="small" label="Displayed name" />
          </Box>

          <Divider />

          <Box maxWidth="400px">
            <Stack direction="column" spacing={'17px'}>
              <RHFTextField name="password" variant="outlined" size="small" label="New password" />
              <RHFTextField name="confirmPassword" variant="outlined" size="small" label="Repeat new password" />
              <Button type="submit" variant="contained">
                Update
              </Button>
            </Stack>
          </Box>
        </Stack>

        <Divider />

        <Box my={'17px'}>
          <UserSettingTitle title="App settings" />
        </Box>

        <Stack mt={0} mb={2} direction="row" alignItems="center">
          <Typography mr={'10px'} component="div" variant="body2">
            App version
          </Typography>
          <Label sx={{ width: 34, height: 24, borderRadius: '50px', mr: 2 }} variant="filled" color="default">
            <Typography sx={{ fontWeight: '400' }} variant="body2">
              1.2
            </Typography>
          </Label>
          <Button
            sx={{ fontSize: '13px', px: 1.4, py: 0.4, textTransform: 'none' }}
            variant="contained"
            color="inherit"
            size="small"
          >
            Check for updates
          </Button>
        </Stack>

        <Divider />

        <Stack mt={2} mb={'18px'} direction="row" spacing={'10px'}>
          <Typography component="div" variant="body2">
            Browser version
          </Typography>
          <Label sx={{ width: 40, height: 24, borderRadius: '50px' }} variant="filled" color="default">
            <Typography fontWeight={400} variant="body2">
              10.2
            </Typography>
          </Label>
        </Stack>

        <Divider />

        <Stack my={2} direction="row" spacing={'12px'}>
          <Box width="400px">
            <RHFTextField name="localStorage" fullWidth variant="outlined" size="small" label="Local storage" />
          </Box>
          <Button sx={{ height: 39 }} variant="contained" color="inherit">
            Change
          </Button>
        </Stack>

        <Divider />

        <Stack direction="row" mt={'7px'} spacing={-2.6} alignItems="flex-start">
          <RHFSwitch name="updateAuto" size="small" />
          <Box pt={1}>
            <Typography alignSelf="center" variant="body2">
              Update User Agents Automatically
            </Typography>
            <Typography color="grey.500" variant="caption">
              Old versions of the application do not allow you to use new features
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={-2.6} alignItems="center">
          <RHFSwitch name="changeScreen" size="small" />
          <Typography component="span" variant="body2">
            Screen Resolution (Real/From Fingerprint)
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}
