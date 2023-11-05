import { useEffect } from 'react';
import { useParams } from 'react-router';
import Page from '../../components/Page';
import { useDispatch, useSelector } from '../../redux/store';
import { teamListMembersRequested } from '../../redux/slices/teams';
import { TeamList, TeamMember } from '../../sections/teams';
import Loading from '../../components/Loading';
import { personalityRequested } from '../../redux/slices/personality';

// ----------------------------------------------------------------------

export default function TeamPage() {

  const dispatch = useDispatch();

  const params = useParams();

  const teamId = params.id;

  const { collection: teams, loading: loadingTeams } = useSelector((state) => state.teams);

  const team = teams.find((element) => element.id === teamId);

  useEffect(() => {
    dispatch(personalityRequested());
  }, []);

  useEffect(() => {
    if (teams.find((element) => element.id === teamId)) {
      dispatch(teamListMembersRequested({ teamId }));
    }
  }, [teams, teamId]);

  if (loadingTeams) {
    return (
      <Page title={`Team - ${teamId}`}>
        <Loading />
      </Page>
    );
  }

  return (
    <Page title={`Team - ${teamId}`}>

      {!teams.length && <TeamList team={team} empty />}

      {team?.invite_status === 'Pending' && <TeamMember team={team} pending />}

      {team?.invite_status === 'Accepted' && team?.permissions?.read === false && <TeamMember team={team} />}

      {(team?.role === 'Admin' || team?.permissions?.read === true) && team?.invite_status !== 'Pending' && (
        <TeamList team={team} />
      )}

    </Page>
  );
}
