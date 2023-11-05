import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../components/Avatar';
import TeamMemberPopoverLeave from './TeamMemberPopoverLeave';
import CustomIcon from '../../components/CustomIcon';

TeamMember.propTypes = {
  team: PropTypes.object,
  pending: PropTypes.bool,
};

export default function TeamMember({ team, pending = false }) {
  const [popoverLeave, setPopoverLeave] = useState({ open: false, anchorEl: null, event: null });

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" minHeight="60%">
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Avatar sx={{ width: 128, height: 128, mb: 1.5 }}>
          <Typography variant="bigAvatar">{team?.name.slice(0, 2)}</Typography>
        </Avatar>

        <Typography variant="h3" sx={{ fontSize: '18px!important' }}>
          {team?.name}
        </Typography>

        {pending ? (
          <>
            <Typography variant="body2" sx={{ fontSize: '18px!important', mt: 1.5, mb: 4 }}>
              You have been invited to the team
            </Typography>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1.5}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ height: '42px', p: '6px 16px' }}
                startIcon={<CustomIcon src={'/assets/icons/main/ic_plus.svg'} width={13} height={13} />}
              >
                Accept
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={(event) => setPopoverLeave({ open: true, anchorEl: event.currentTarget, event })}
                sx={{ height: '42px', p: '6px 16px' }}
              >
                Decline
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Typography variant="body2" sx={{ fontSize: '18px!important', mt: 1.5, mb: 4 }}>
              You have no permissions to edit users within the team
            </Typography>

            <Button
              variant="outlined"
              color="error"
              onClick={(event) => setPopoverLeave({ open: true, anchorEl: event.currentTarget, event })}
              sx={{ height: '42px', p: '6px 16px' }}
            >
              Leave
            </Button>

            <TeamMemberPopoverLeave
              event={popoverLeave.event}
              open={popoverLeave.open}
              anchorEl={popoverLeave.anchorEl}
              onClose={() => setPopoverLeave({ open: false, anchorEl: null, event: popoverLeave.event })}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
}
