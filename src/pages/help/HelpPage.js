import map from 'lodash/map';
import { Box, Grid, Stack } from '@mui/material';
// import Layout from '../../layouts';
import { HelpCard } from '../../sections/help';
import Page from '../../components/Page';
import {useSelector } from '../../redux/store';
import Loading from '../../components/Loading';
import HelpFilters from '../../sections/help/HelpFilters';
import useWindowSize from '../../hooks/useWindowSize';
import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function HelpPage() {

  const [, windowHeight] = useWindowSize();

  const { collection: helpCards, loading: loadingHelpCards } = useSelector((state) => state.help);

  if (loadingHelpCards) {
    return (
      <Page title="Help">
        <Loading height="70vh" />
      </Page>
    );
  }

  return (
    <Page title="Help">
      <Box height="100vh" p={2}>
        <HelpFilters />

        <Stack mt={2} height={windowHeight - 92}>
          <Scrollbar>
            <Grid container spacing={2}>
              {map(helpCards, (card) => (
                <Grid item xs={6} sm={4} md={3} xl={2} key={card.id}>
                  <HelpCard card={card} />
                </Grid>
              ))}

              {map(helpCards, (card) => (
                <Grid item xs={6} sm={4} md={3} xl={2} key={card.id}>
                  <HelpCard card={card} />
                </Grid>
              ))}

              {map(helpCards, (card) => (
                <Grid item xs={6} sm={4} md={3} xl={2} key={card.id}>
                  <HelpCard card={card} />
                </Grid>
              ))}

              {map(helpCards, (card) => (
                <Grid item xs={6} sm={4} md={3} xl={2} key={card.id}>
                  <HelpCard card={card} />
                </Grid>
              ))}
            </Grid>
          </Scrollbar>
        </Stack>
      </Box>
    </Page>
  );
}
