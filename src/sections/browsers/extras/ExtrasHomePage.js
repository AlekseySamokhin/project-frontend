import { Box, Button, Card, CardContent, CardHeader, Divider, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import SvgIconStyle from '../../../components/SvgIconStyle';
import CustomTextField from '../../../components/CustomTextField';
import { EXTRAS_HOME_PAGE } from './ExtrasConfig';
import ExtrasPopover from './ExtrasPopover';


// ----------------------------------------------------------------------

export default function ExtrasHomePage() {
  const [anchorEl, setAnchorEl] = useState(null);

  const [event, setEvent] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setEvent(event);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Card sx={{ px: 2, py: 1.5 }}>
      <CardHeader
        sx={{ p: 0 }}
        title={
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' alignItems='center'>
              <SvgIconStyle src='/assets/icons/main/ic_book.svg' sx={{ width: 16, height: 20, bgcolor: 'grey.600', mr: 1.5 }} />
              <Typography variant='subtitle1' fontWeight={500} fontSize={18}> Home pages </Typography>
            </Stack>
            <Button aria-describedby={id} size='small' color='inherit' variant='outlined' onClick={handleClick}>
              Add home page
            </Button>
            <ExtrasPopover
              id={id}
              height={134}
              event={event}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              <Box p={2}>
                <TextField size='small' fullWidth placeholder='URL' />

                <Stack direction='row' justifyContent='flex-end' mt={2} spacing={2}>
                  <Button variant='outlined' onClick={() => setAnchorEl(null)}>
                    Cancel
                  </Button>

                  <Button variant='contained'>Add home page</Button>
                </Stack>
              </Box>
            </ExtrasPopover>

          </Stack>
        }
      />
      <CardContent  sx={{ p: '0 !important', mt: 1.75 }}>
        <Stack spacing={2}>
          {EXTRAS_HOME_PAGE.map((item, key) => (
            <Stack key={key}>
              <CustomTextField item={item.label} icon={item.img} confirm={key !== EXTRAS_HOME_PAGE.length - 1}
                               del={key !== EXTRAS_HOME_PAGE.length - 1} />
              <Divider />
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}


