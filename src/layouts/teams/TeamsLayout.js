import { Box, Button, List, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { cloneDeep, isEmpty } from 'lodash';
import map from 'lodash/map';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../redux/store';
import { PATH_TEAMS } from '../../routes/paths';
import SvgIconStyle from '../../components/SvgIconStyle';
import { AdditionalNavbar, AdditionalNavbarButton } from '../../components/AdditionalNavbar';
import TeamKey from './TeamKey';
import TeamSettings from './TeamSettings';
import TeamCreate from './TeamCreate';
import CustomIcon from '../../components/CustomIcon';
import TeamButtonAdditionalNavbar from './TeamButtonAdditionalNavbar';
import Loading from '../../components/Loading';
import { teamsRequested } from '../../redux/slices/teams';
import { personalityRequested } from '../../redux/slices/personality';


// ----------------------------------------------------------------------

export default function TeamsLayout() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { collection: teams, loading: loadingTeams } = useSelector((state) => state.teams);

  const teamsPosition = useSelector((state) => state.personality.data.teams);

  const [selectTeam, setSelectTeam] = useState('');

  const [splitTeams, setSplitTeams] = useState({ admins: [], members: [] });

  const [popups, setPopups] = useState({
    key: {
      open: false,
    },
    settings: {
      open: false,
    },
    create: {
      open: false,
      anchorEl: null,
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

  const handleSelectTeam = (selectedTeamId) => {
    setSelectTeam(selectedTeamId);
    navigate(PATH_TEAMS.teamId(selectedTeamId));
  };


  useEffect(() => {
    dispatch(teamsRequested());
  }, []);

  useEffect(() => {
    dispatch(personalityRequested());
  }, []);

  useEffect(() => {
    setSelectTeam(teams[0]?.id);

    const items = cloneDeep(teams.filter((element) => element.role === 'Admin'));

    if (typeof items !== 'undefined') {

      map(teamsPosition, (item) => {
        const changeItem = items.filter((filterItem) => filterItem.id === item.id);
        if (!isEmpty(changeItem)) {
          changeItem[0].position = item.position;
        }
      });

      items.sort((a, b) => a.position - b.position);

      setSplitTeams({
        members: teams.filter((element) => element.role === 'Member'),
        admins: items,
      });

    }

  }, [teams, teamsPosition]);


  return (
    <Box display='flex' flexDirection='row' minHeight='100vh'>
      <AdditionalNavbar
        title='Teams'
        noData={splitTeams.admins?.length === 0 && splitTeams.members.length === 0}
        buttons={
          <>
            <AdditionalNavbarButton
              variant='outlined'
              onClick={() => {
                handlePopups('key', 'open', true);
              }}
            >
              <SvgIconStyle src={`/assets/icons/main/ic_key.svg`} sx={{ width: 16, height: 16 }} />
            </AdditionalNavbarButton>

            <AdditionalNavbarButton
              variant='outlined'
              onClick={() => handlePopups('settings', 'open', true)}
            >
              <SvgIconStyle src={`/assets/icons/main/ic_settings.svg`} sx={{ width: 16, height: 16 }} />
            </AdditionalNavbarButton>

            <AdditionalNavbarButton
              variant='outlined'
              onClick={(event) => {
                handlePopups('create', 'event', event);
                handlePopups('create', 'open', true);
                handlePopups('create', 'anchorEl', event.currentTarget);
              }}
            >
              <SvgIconStyle src={`/assets/icons/main/ic_add.svg`} sx={{ width: 14, height: 14 }} />
            </AdditionalNavbarButton>

            <TeamKey open={popups.key.open} onClose={() => handlePopups('key', 'open', false)} />

            <TeamSettings
              open={popups.settings.open}
              anchorEl={popups.settings.anchorEl}
              onClose={() => handlePopups('settings', 'open', false)}
            />

            <TeamCreate
              event={popups.create.event}
              open={popups.create.open}
              anchorEl={popups.create.anchorEl}
              onClose={() => handlePopups('create', 'open', false)}
            />
          </>
        }
      >
        {!loadingTeams ? (
          splitTeams.admins?.length === 0 && splitTeams.members.length === 0 ?
            <Stack direction='column' justifyContent='center' alignItems='center' mt={4} px={2}>
              <img src='/assets/icons/main/ic_team.svg' width={64} height={64} alt='team' />

              <Typography
                variant='caption'
                sx={(theme) => ({ color: alpha(theme.palette.text.strong, 0.48), my: 2 })}
                textAlign='center'
              >
                Folders allow you to further distribute and categorize profiles. They are also used as a
                differentiation
                of user rights.
              </Typography>

              <Button
                variant='contained'
                startIcon={
                  <CustomIcon src='/assets/icons/main/ic_users.svg' width={24} height={24} boxWidth={24}
                              boxHeight={24} />
                }
                onClick={(event) => {
                  handlePopups('create', 'event', event);
                  handlePopups('create', 'open', true);
                  handlePopups('create', 'anchorEl', event.currentTarget);
                }}
              >
                New team
              </Button>
            </Stack>
            :
            <List sx={{ px: 2, py: 0 }}>
              <Stack>
                <Stack>
                  <Typography variant='overline' sx={{ color: 'text.secondary', mb: 1 }}>
                    mine
                  </Typography>

                  {splitTeams.admins?.map((team) => (
                    <TeamButtonAdditionalNavbar
                      key={team.id}
                      team={team}
                      selectTeam={selectTeam}
                      handleSelectTeam={handleSelectTeam}
                      isDelete={team?.deleted_at !== null}
                    />
                  ))}
                </Stack>

                {(splitTeams.members).length > 0 &&
                <Stack mt={1.75}>
                  <Typography variant='overline' sx={{ color: 'text.secondary', mb: 1 }}>
                    invited
                  </Typography>

                  {splitTeams.members?.map((team) => (
                    <TeamButtonAdditionalNavbar
                      key={team.id}
                      team={team}
                      selectTeam={selectTeam}
                      handleSelectTeam={handleSelectTeam}
                    />
                  ))}
                </Stack>
                }

              </Stack>
            </List>
        ) : <Loading height='70vh' />}
      </AdditionalNavbar>

      <Box width='100%' sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
