import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import CustomIcon from '../../components/CustomIcon';
import Avatar from '../../components/Avatar';
import Label from '../../components/Label';
import { fDateWithPoint } from '../../utils/formatTime';
import { getAllFirstCharacter } from '../../utils/createAvatar';
import TeamModalEditMember from './TeamModalEditMember';
import { useDispatch } from '../../redux/store';
import axios from '../../utils/axios';
import { teamListMembersRequested } from '../../redux/slices/teams';

// ----------------------------------------------------------------------

TeamListMemberCards.propTypes = {
  team: PropTypes.object,
  empty: PropTypes.bool,
  member: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function TeamListMemberCards({ member, team, empty }) {
  const dispatch = useDispatch();

  const [openModalEditUser, setOpenModalEditUser] = useState(false);

  const isWrite = empty ? true : !team.permissions.write;
  const isDelete = empty ? true : !team.permissions.delete;

  const handleDelete = async () => {
    try {
      await axios.delete(`api/v1/teams/${team.id}/members/${member.id}`);

      dispatch(teamListMembersRequested({ teamId: team.id }));
    } catch (e) {
      console.log(e);
    }
  };

  const buttonsInvited = (
    <>
      <Button
        variant='outlined'
        color='inherit'
        disabled={isWrite}
        fullWidth
        sx={{
          whiteSpace: 'nowrap',
          textTransform: 'none',
        }}
      >
        Cancel invitation
      </Button>

      <Button
        variant='outlined'
        color='inherit'
        disabled={isWrite}
        sx={{
          whiteSpace: 'nowrap',
          textTransform: 'none',
          minWidth: 42,
          width: 42,
          ml: 1.25,
        }}
        onClick={() => setOpenModalEditUser(true)}
      >
        <CustomIcon
          src={`/assets/icons/main/ic_edit_row.svg`}
          width={15.83}
          height={15.83}
          boxHeight={24}
          boxWidth={24}
          sx={{ bgcolor: isWrite ? 'text.disabled' : 'text.secondary' }}
        />
      </Button>

      <TeamModalEditMember
        team={team}
        memberId={member.id}
        open={openModalEditUser}
        onClose={() => setOpenModalEditUser(false)}
      />

      <Button
        variant='outlined'
        color='inherit'
        disabled={isDelete}
        onClick={handleDelete}
        sx={{
          textTransform: 'none',
          minWidth: 42,
          ml: 1.25,
        }}
      >
        <CustomIcon
          src={`/assets/icons/main/ic_delete.svg`}
          width={15.83}
          height={15.83}
          boxHeight={24}
          boxWidth={24}
          sx={{ bgcolor: isDelete ? 'text.disabled' : 'text.secondary' }}
        />
      </Button>
    </>
  );

  const buttonsRejectedOrLeft = (
    <>
      <Button
        variant='outlined'
        color='inherit'
        fullWidth
        disabled={isWrite}
        onClick={handleDelete}
        sx={{
          whiteSpace: 'nowrap',
          textTransform: 'none',
        }}
      >
        Delete
      </Button>
    </>
  );

  const buttonsAccepted = (
    <>
      <Button
        variant='outlined'
        color='inherit'
        disabled={isWrite}
        fullWidth
        sx={{
          whiteSpace: 'nowrap',
          textTransform: 'none',
        }}
        startIcon={
          <CustomIcon
            src={`/assets/icons/main/ic_edit_row.svg`}
            width={15.83}
            height={15.83}
            boxHeight={24}
            boxWidth={24}
            sx={{ bgcolor: isWrite ? 'text.disabled' : 'text.secondary' }}
          />
        }
        onClick={() => setOpenModalEditUser(true)}
      >
        Edit user
      </Button>

      <TeamModalEditMember
        team={team}
        memberId={member.id}
        open={openModalEditUser}
        onClose={() => setOpenModalEditUser(false)}
      />

      <Button
        variant='outlined'
        color='inherit'
        onClick={handleDelete}
        disabled={isDelete}
        fullWidth
        sx={{
          whiteSpace: 'nowrap',
          textTransform: 'none',
          ml: 1.25,
        }}
        startIcon={
          <CustomIcon
            src={`/assets/icons/main/ic_delete.svg`}
            width={15.83}
            height={15.83}
            boxHeight={24}
            boxWidth={24}
            sx={{ bgcolor: isDelete ? 'text.disabled' : 'text.secondary' }}
          />
        }
      >
        Delete user
      </Button>
    </>
  );

  return (
      <Card sx={{ height: 241, maxWidth: 340 }}>
        <CardContent sx={{ p: '16px!important', height: '100%'}}>
          <Stack direction='column' justifyContent='space-between' alignItems='flex-start' sx={{ height: '100%' }}>
            <Stack>
              <Stack direction='row' spacing={1.4} mb={2}>
                <Avatar sx={{ width: 48, height: 48 }}>
                  <Typography variant='subtitle2' align='center' sx={{ textTransform: 'uppercase' }}>
                    {getAllFirstCharacter(member?.display_name ? member?.display_name : member?.username)}
                  </Typography>
                </Avatar>

                <Stack>
                  <Typography variant='subtitle1' sx={{ color: 'text.strong' }}>
                    {member?.display_name ? member?.display_name : member?.username}
                  </Typography>

                  <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                    {member?.position}
                  </Typography>
                </Stack>
              </Stack>

              <Box mb={2}>
                {member?.invite_status !== 'Accepted' && (
                  <Label variant='outlined' color={statusColor(member?.invite_status)} sx={{ mb: 1 }}>
                    {member?.invite_status === 'Pending' ? 'Invited' : member?.invite_status}
                  </Label>
                )}

                <Typography variant='body2' sx={{ color: 'text.strong' }}>
                  {member?.username}
                </Typography>

                <Typography variant='body2'>{switchDate(member, member?.invite_status)}</Typography>
              </Box>
            </Stack>

            <Stack sx={{ width: '100%' }}>
              <Divider />

              <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }} mt={2}>
                {member?.invite_status === 'Pending' && buttonsInvited}

                {(member?.invite_status === 'Rejected' ||
                    member?.invite_status === 'Left' ||
                    member?.invite_status === 'Cancelled') &&
                  buttonsRejectedOrLeft}

                {member?.invite_status === 'Accepted' && buttonsAccepted}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
  );
}

function statusColor(status) {
  switch (status) {
    case 'Pending':
      return 'warning';
    default:
      return 'error';
  }
}

export function switchDate(member, status) {
  switch (status) {
    case 'Pending':
      return fDateWithPoint(member.invite_created_at);
    case 'Left':
      return fDateWithPoint(member.left_at);
    case 'Rejected':
      return fDateWithPoint(member.invite_rejected_at);
    case 'Cancelled':
      return fDateWithPoint(member.invite_cancelled_at);
    case 'Accepted':
      return fDateWithPoint(member.invite_accepted_at);
    default:
      return fDateWithPoint(member.invite_created_at);
  }
}
