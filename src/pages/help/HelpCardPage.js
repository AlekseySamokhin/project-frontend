import { Box, Button, Stack } from '@mui/material';
import map from 'lodash/map';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import SvgIconStyle from '../../components/SvgIconStyle';
import { PATH_HELP } from '../../routes/paths';
import { useSelector } from '../../redux/store';
import { HelpArticle, HelpBreadCrumbs } from '../../sections/help';
import Loading from '../../components/Loading';
import HelpFilters from '../../sections/help/HelpFilters';
import Scrollbar from '../../components/Scrollbar';
import useWindowSize from '../../hooks/useWindowSize';

// ----------------------------------------------------------------------

export default function HelpCardPage() {

  const params = useParams();

  const navigate = useNavigate();

  const [, windowHeight] = useWindowSize();

  const { collection: helpCards, loading: loadingHelpCards } = useSelector((state) => state.help);

  const helpCard = helpCards.find(element => element.id === params.id);

  return (
    <Page title="Help">
      <Box height="100vh" p={2}>

        <Stack direction="row" alignItems="center" mb={2} >

          <Button
            onClick={() => navigate(PATH_HELP.root)}
            variant="default"
            color="common"
            sx={{
              height: '42px',
              minWidth: '42px',
              px: '4px',
              backgroundColor: 'background.paper',
              mr: 1.5,
            }}
          >
            <SvgIconStyle src="/assets/icons/main/ic_chevron_left.svg" sx={{ width: 20, height: 20 }} />
          </Button>

          <HelpFilters />

        </Stack>

        {loadingHelpCards ? <Loading /> :
          <>
            <HelpBreadCrumbs helpCard={helpCard} />

            <Stack mt={1} height={windowHeight - 124}>
              <Scrollbar>

                {map(helpCard?.articles, (article) => (
                  <HelpArticle
                    key={article?.id}
                    cardId={helpCard?.id}
                    article={article}
                  />
                ))}

                {map(helpCard?.articles, (article) => (
                  <HelpArticle
                    key={article?.id}
                    cardId={helpCard?.id}
                    article={article}
                  />
                ))}

                {map(helpCard?.articles, (article) => (
                  <HelpArticle
                    key={article?.id}
                    cardId={helpCard?.id}
                    article={article}
                  />
                ))}

                {map(helpCard?.articles, (article) => (
                  <HelpArticle
                    key={article?.id}
                    cardId={helpCard?.id}
                    article={article}
                  />
                ))}

              </Scrollbar>
            </Stack>

          </>
        }
      </Box>
    </Page>
  );
}
