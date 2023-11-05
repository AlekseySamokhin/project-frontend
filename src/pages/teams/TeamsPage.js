import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import { useSelector } from '../../redux/store';
import { PATH_TEAMS } from '../../routes/paths';
import { TeamList } from '../../sections/teams';

// ----------------------------------------------------------------------

export default function TeamsPage() {

  const navigate = useNavigate();

  const teams = useSelector((state) => state.teams.collection);

  useEffect(() => {
    if (teams.length) {
      navigate(PATH_TEAMS.teamId(teams[0].id));
    }
  }, [teams]);

  return (
    <Page title="Teams">
      {!teams.length && <TeamList empty />}
    </Page>
  );
}
