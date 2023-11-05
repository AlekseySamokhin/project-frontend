import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from '../../redux/store';
import TeamFilters from './TeamFilters';
import TeamListMemberCards from './TeamListMemberCards';
import Scrollbar from '../../components/Scrollbar';
import useWindowSize from '../../hooks/useWindowSize';
import { staticMembers } from './TeamStaticData';
import Loading from '../../components/Loading';

// ----------------------------------------------------------------------

TeamList.propTypes = {
  team: PropTypes.object,
  empty: PropTypes.bool,
};

// ----------------------------------------------------------------------

export default function TeamList({ team, empty = false }) {

  const matches = useMediaQuery('(min-width:1920px)');
  const [, windowHeight] = useWindowSize();

  const {
    collection: members,
    loading: loadingMembers,
  } = useSelector((state) => state.teams.members);

  const [filterMembers, setFilterMembers] = useState([]);

  useEffect(() => {
    setFilterMembers([...members]);
  }, [members]);

  return (
    <Stack height="100%">
      <TeamFilters
        team={team}
        empty={empty}
        members={[...members]}
        handleFilterMembers={(newMembers) => setFilterMembers(newMembers)}
      />

      {loadingMembers ? (
        <Loading />
      ) : (
        <Stack height={windowHeight - 88} sx={{ position: 'relative' }}>
          <Scrollbar sx={() => empty && { filter: 'blur(2px)', userSelect: 'none' }}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
              {empty
                ? staticMembers.map((member) => (
                    <Grid item sm={12} md={6} lg={4} xl={3} c1={2.4} с2={2} key={member.id}>
                      <TeamListMemberCards member={member} team={team} empty />
                    </Grid>
                  ))
                : filterMembers.map((member) => (
                    <Grid item sm={12} md={6} lg={4} xl={3} c1={2.4} с2={2} key={member.id}>
                      <TeamListMemberCards member={member} team={team} />
                    </Grid>
                  ))}
            </Grid>
          </Scrollbar>
        </Stack>
      )}
    </Stack>
  );
}
