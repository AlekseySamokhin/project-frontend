import PropTypes from 'prop-types';
import { Box, Checkbox, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import SvgIconStyle from '../../components/SvgIconStyle';
import { TrackingModalChangelog, TrackingPopoverRowMore } from '.';

// ----------------------------------------------------------------------

TrackingTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function TrackingTableRow({ row, selected, onSelectRow }) {
  const { profile_name, initiator, last_message, date } = row;

  const [openChangelog, setOpenChangelog] = useState(false);

  const [popups, setPopups] = useState({
    event: '',
    open: false,
    anchorEl: null,
  });

  const handlePopups = (key, value) => {
    setPopups((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <TableRow selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">
        <Stack ml={-2} direction="row">
          <IconButton
            sx={{ mx: 0.75, width: 20, height: 20 }}
            onClick={(event) => {
              handlePopups('event', event);
              handlePopups('anchorEl', event.currentTarget);
              handlePopups('open', true);
            }}
          >
            <SvgIconStyle src={`/assets/icons/main/ic_more.svg`} sx={{ width: 3.33, height: 15 }} />
          </IconButton>

          <Typography variant="body2">{profile_name}</Typography>

          <TrackingPopoverRowMore
            row={row}
            event={popups.event}
            open={popups.open}
            anchorEl={popups.anchorEl}
            setOpenChangelog={setOpenChangelog}
            onClose={() => handlePopups('open', false)}
          />

          <TrackingModalChangelog openChangelog={openChangelog} onCloseModal={() => setOpenChangelog(false)} />
        </Stack>
      </TableCell>

      <TableCell align="left">
        <Typography variant="body2" color="secondary">
          {initiator}
        </Typography>
      </TableCell>

      <TableCell size="small" align="left">
        <Stack direction="row" alignItems="center" maxWidth={387}>
          <Typography pr={1} component="span" color="text.disabled" variant="body2">
            {last_message.title}
          </Typography>

          <Box
            sx={{
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {last_message.text}
          </Box>
        </Stack>
      </TableCell>

      <TableCell align="left">
        <Typography variant="body2">{date}</Typography>
      </TableCell>
    </TableRow>
  );
}
