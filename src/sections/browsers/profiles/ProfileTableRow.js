import PropTypes from 'prop-types';
import { Box, Button, Checkbox, IconButton, Stack, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import filter from 'lodash/filter';
import map from 'lodash/map';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { useDispatch, useSelector } from '../../../redux/store';
import { profileUpdateRequested } from '../../../redux/slices/browsers';
import ProfilePopoverRowTags from './ProfilePopoverRowTags';
import ProfilePopoverRowMore from './ProfilePopoverRowMore';
import ProfilePopoverRowNote from './ProfilePopoverRowNote';
import LoadingButton from '../../../theme/overrides/LoadingButton';
import ProfilePopoverEditProxy from './ProfilePopoverEditProxy';
import { ProfileModalEdit } from './index';

// ----------------------------------------------------------------------

ProfileTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function ProfileTableRow({ row, selected, onSelectRow }) {

  const dispatch = useDispatch();

  const { id, running, profile_status, profile_name, profile_notes, profile_tags, proxy_id } = row;

  const allTags = useSelector((state) => state.browsers.tagsSimple.collection);

  const [openModalEditProfile, setOpenModalEditProfile] = useState(false);

  const nameRef = useRef(null);

  const boxRef = useRef(null);

  const [popups, setPopups] = useState({
    more: {
      event: '',
      open: false,
      anchorEl: null,
    },
    note: {
      open: false,
      anchorEl: null,
    },
    tags: {
      open: false,
      anchorEl: null,
    },
    proxy: {
      open: false,
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

  return (
    <TableRow selected={selected}>
      <TableCell padding='checkbox'>
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>


      <TableCell align='left' sx={{ width: '30%', minWidth: '400px' }}>
        <Stack direction='row' alignItems='center' ref={nameRef}>
          <Stack direction='row' alignItems='center' ref={boxRef}>
            {running ? (
              <Button
                variant='outlined'
                color='success'
                onClick={() => dispatch(profileUpdateRequested({ folder_id, id, data: { profile_name: 'test2' } }))}
                startIcon={<SvgIconStyle src={`/assets/icons/main/ic_start.svg`} sx={{ width: 9, height: 11 }} />}
                sx={{ p: '1px 8px', height: '26px', width: '72px', borderRadius: '6px' }}
              >
                Start
              </Button>
            ) : <Button
              variant='outlined'
              color='error'
              onClick={() => dispatch(profileUpdateRequested({ folder_id, id, data: { profile_name: 'test' } }))}
              startIcon={<SvgIconStyle src={`/assets/icons/main/ic_pause.svg`} sx={{ width: 9, height: 11 }} />}
              sx={{ p: '1px 8px', height: '26px', width: '72px', borderRadius: '6px' }}
            >
              Stop
            </Button>}

            <IconButton
              sx={{ mx: 0.75, width: 20, height: 20 }}
              onClick={(event) => {
                handlePopups('more', 'event', event);
                handlePopups('more', 'anchorEl', event.currentTarget);
                handlePopups('more', 'open', true);
              }}
            >
              <SvgIconStyle src={`/assets/icons/main/ic_more.svg`} sx={{ width: 3.33, height: 15 }} />
            </IconButton>
          </Stack>

          <ProfilePopoverRowMore
            row={row}
            event={popups.more.event}
            open={popups.more.open}
            anchorEl={popups.more.anchorEl}
            onClose={() => handlePopups('more', 'open', false)}
            openEditProfile={() => setOpenModalEditProfile(true)}
          />
          <Box
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {profile_name}
          </Box>
        </Stack>
      </TableCell>

      <TableCell align='left'>
        {
          profile_notes ? (
            <Stack direction='row' alignItems='center'>
              <Button
                variant='outlined'
                color='warning'
                sx={{
                  p: '1px 8px',
                  height: 22,
                  borderRadius: '6px',
                  textTransform: 'none',
                  minWidth: 0,
                }}
                onClick={(event) => {
                  handlePopups('note', 'event', event);
                  handlePopups('note', 'anchorEl', event.currentTarget);
                  handlePopups('note', 'open', true);
                }}
              >
                <Typography
                  variant='caption'
                  sx={{
                    fontWeight: 700,
                    minWidth: 70,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {profile_notes}
                </Typography>
              </Button>
            </Stack>
          ) : (
            <IconButton
              sx={{ width: 24, height: 24, p: 0 }}
              onClick={(event) => {
                handlePopups('note', 'event', event);
                handlePopups('note', 'anchorEl', event.currentTarget);
                handlePopups('note', 'open', true);
              }}
            >
              <SvgIconStyle src={`/assets/icons/main/ic_add_round.svg`} sx={{ width: 16.67, height: 16.67 }} />
            </IconButton>
          )}

        <ProfilePopoverRowNote
          id={row.id}
          value={profile_notes}
          event={popups.note.event}
          open={popups.note.open}
          anchorEl={popups.note.anchorEl}
          onClose={() => handlePopups('note', 'open', false)}
        />
      </TableCell>

      <TableCell align='left'>
        {
          profile_tags.length ? (
            <Stack direction='row' alignItems='center'>
              {map(profile_tags, (tag) => map(filter(allTags, { id: tag }), (mapFilteredTag, index) => (
                  <Button
                    key={mapFilteredTag.id}
                    variant='outlined'
                    color='primary'
                    sx={{
                      p: '1px 8px',
                      height: 22,
                      borderRadius: '6px',
                      textTransform: 'none',
                      mr: index < mapFilteredTag.length - 1 ? 0.5 : 0,
                      minWidth: 0,
                    }}
                    onClick={(event) => {
                      handlePopups('tags', 'event', event);
                      handlePopups('tags', 'anchorEl', event.currentTarget);
                      handlePopups('tags', 'open', true);
                    }}
                  >
                    <Typography variant='caption' sx={{ fontWeight: 700 }}>
                      {mapFilteredTag.tag_name}
                    </Typography>
                  </Button>
                )))}

            </Stack>
          ) : (
            <IconButton
              sx={{ width: 24, height: 24, p: 0 }}
              onClick={(event) => {
                handlePopups('tags', 'event', event);
                handlePopups('tags', 'anchorEl', event.currentTarget);
                handlePopups('tags', 'open', true);
              }}
            >
              <SvgIconStyle src={`/assets/icons/main/ic_add_round.svg`} sx={{ width: 16.67, height: 16.67 }} />
            </IconButton>
          )}

        <ProfilePopoverRowTags
          row={row}
          value={profile_tags}
          id={id}
          event={popups.tags.event}
          open={popups.tags.open}
          anchorEl={popups.tags.anchorEl}
          onClose={() => handlePopups('tags', 'open', false)}
        />
      </TableCell>

      <TableCell align='left'>
        {proxy_id ? (
          <Stack
            direction='row'
            alignItems='center'
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              handlePopups('proxy', 'open', true);
            }}
          >
            {proxy_id.ip === 'loading' ? (
              <LoadingButton loading sx={{ minHeight: '24px', minWidth: '24px', p: 0 }} />
            ) : (
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  // dispatch(profileProxyUpdateRequested({ profileId: id }));
                }}
                sx={{ width: 24, height: 24, p: 0 }}
              >
                <SvgIconStyle src={`/assets/icons/main/ic_refresh.svg`} sx={{ width: 20, height: 20 }} />
              </IconButton>
            )}

            <Stack sx={{ mx: 0.75 }}>
              <img alt='flag' src={proxy_id?.iconCountry} width={20} height={15} />
            </Stack>

            <Tooltip title={proxy_id} arrow>
              <Stack>{proxy_id}</Stack>
            </Tooltip>
          </Stack>
        ) : (
          <IconButton
            sx={{ width: 24, height: 24, p: 0 }}
            onClick={(event) => {
              handlePopups('proxy', 'anchorEl', event.currentTarget);
              handlePopups('proxy', 'open', true);
            }}
          >
            <SvgIconStyle src={`/assets/icons/main/ic_add_round.svg`} sx={{ width: 16.67, height: 16.67 }} />
          </IconButton>
        )}

        <ProfilePopoverEditProxy
          row={row}
          value={proxy_id}
          open={popups.proxy.open}
          onClose={() => handlePopups('proxy', 'open', false)}
        />

      </TableCell>

      <TableCell align='left'>
        <Box ml={3}>
          {profile_status || <>-</>}
        </Box>

      </TableCell>

      <TableCell align='left'>
        <Box ml={3}>
          -
        </Box>

      </TableCell>
      <TableCell align='left'>
        <Box ml={2}>
          -
        </Box>
      </TableCell>

      <ProfileModalEdit
        open={openModalEditProfile}
        edit
        closeModal={() => setOpenModalEditProfile(false)}
      />

    </TableRow>
  );
}
