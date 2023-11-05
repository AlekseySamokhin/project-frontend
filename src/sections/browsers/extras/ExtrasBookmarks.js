import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import SvgIconStyle from '../../../components/SvgIconStyle';
import CustomTextField from '../../../components/CustomTextField';
import CustomAccordion from '../../../components/CustomAccordion';
import { EXTRAS_BOOKMARK, EXTRAS_BOOKMARK_ACCORDION } from './ExtrasConfig';
import ExtrasPopover from './ExtrasPopover';

// ----------------------------------------------------------------------

export default function ExtrasBookmarks() {
  const [anchorEl, setAnchorEl] = useState(null);

  const [anchorEl1, setAnchorEl1] = useState(null);

  const [event, setEvent] = useState(null);

  const handleClick = (event) => {
    setEvent(event);
    setAnchorEl(event.currentTarget);
  };

  const handleClick1 = (event) => {
    setEvent(event);
    setAnchorEl1(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);

  const id = open ? 'simple-popover' : undefined;
  const id1 = open1 ? 'simple-popover-1' : undefined;

  return (
    <Card sx={{ px: 2, py: 1.5, my: 1.25 }}>

      <CardHeader
        sx={{ p: 0 }}
        title={
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Stack direction='row' alignItems='center'>

              <SvgIconStyle src='/assets/icons/main/ic_book.svg'
                            sx={{ width: 16, height: 20, bgcolor: 'grey.600', mr: 1.5 }} />

              <Typography variant='subtitle1' fontWeight={500} fontSize={18}>
                Bookmarks
              </Typography>

            </Stack>

            <Stack direction='row' spacing={1}>

              <Button aria-describedby={id1} size='small' color='inherit' variant='outlined' onClick={handleClick1}>
                New folder
              </Button>

              <ExtrasPopover
                id={id1}
                height={130}
                event={event}
                open={open1}
                anchorEl={anchorEl1}
                onClose={() => setAnchorEl1(null)}
              >
                <Box p={2}>
                  <TextField size='small' fullWidth placeholder='Folder name' />

                  <Stack direction='row' justifyContent='flex-end' mt={2} spacing={2}>
                    <Button variant='outlined' onClick={() => setAnchorEl1(null)}>
                      Cancel
                    </Button>
                    <Button variant='contained'>Create folder</Button>
                  </Stack>
                </Box>
              </ExtrasPopover>

              <Button aria-describedby={id} size='small' color='inherit' variant='outlined' onClick={handleClick}>
                New bookmark
              </Button>

              <ExtrasPopover
                id={id}
                height={230}
                event={event}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
              >
                <Box p={2}>
                  <Stack spacing={1}>
                    <TextField size='small' fullWidth label='Folder' placeholder='Folder' select
                               defaultValue='Important'>
                      {['Important', 'test', 'tests'].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField size='small' fullWidth placeholder='URL' />

                    <TextField size='small' fullWidth placeholder='Name' />
                  </Stack>

                  <Stack direction='row' justifyContent='flex-end' mt={2} spacing={2}>
                    <Button variant='outlined' onClick={() => setAnchorEl(null)}>
                      Cancel
                    </Button>

                    <Button variant='contained'>Create bookmark</Button>
                  </Stack>
                </Box>
              </ExtrasPopover>
            </Stack>
          </Stack>
        }
      />

      <CardContent sx={{ p: '0 !important', mt: 1.75 }}>

        {EXTRAS_BOOKMARK_ACCORDION.map((items, key) => (
          <Box key={key} mb={1}>
            <CustomAccordion key={key} name={items.name} redactor isFolder>
              {items.accordion.map((item, i) => (
                <Stack key={i}>
                  <CustomTextField item={item.label} icon={item.img} />
                  <Divider />
                </Stack>
              ))}
            </CustomAccordion>
          </Box>
        ))}

        <Stack spacing={2} mt={2}>
          {EXTRAS_BOOKMARK.map((item, key) => (
            <Stack key={key}>
              <CustomTextField
                item={item.label}
                icon={item.img}
                del
                confirm
              />
              <Divider />
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
