import { Box, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../components/Avatar';
import TeamModalRecovery from '../../sections/teams/TeamModalRecovery';
import { AdditionalNavbarListItemButton } from '../../components/AdditionalNavbar';

TeamButtonAdditionalNavbar.propTypes = {
  team: PropTypes.object,
  selectTeam: PropTypes.string,
  handleSelectTeam: PropTypes.func,
  isDelete: PropTypes.bool,
};

export default function TeamButtonAdditionalNavbar({ team, selectTeam, handleSelectTeam, isDelete }) {

  const theme = useTheme();

  const [open, setOpen] = useState({
    status: false,
    name: '',
    id: '',
  });

  return (
    <>
      <TeamModalRecovery
        name={open.name}
        id={open.id}
        onClose={() => setOpen({ ...open, status: !open.status })}
        open={open.status}
      />

      <AdditionalNavbarListItemButton
        selected={team.id === selectTeam}
        onClick={() => (isDelete ? setOpen({ status: true, name: team.name, id: team.id }) : handleSelectTeam(team.id))}
        sx={{
          opacity: isDelete ? 0.5 : 1,
          '&.Mui-selected': {
            backgroundColor: `${theme.palette.text.strong}14`,
            '&.Mui-focusVisible, &:hover': {
              backgroundColor: `${theme.palette.text.strong}14`,
            },
          },
          '&.Mui-focusVisible, &:hover': {
            backgroundColor: isDelete ? 'success.main' : `${theme.palette.text.strong}14`,
          },
        }}
      >
        <Avatar sx={{ width: 24, height: 24, mr: 2 }}>
          <Typography variant='smallAvatar' align='center'>
            {team?.name?.slice(0, 2)}
          </Typography>
        </Avatar>

        <ListItemText
          primary={
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
              {team?.name.length > 18 ? `${team.name} .` : team.name}
            </Box>
          }
        />
      </AdditionalNavbarListItemButton>
    </>
  );
}
