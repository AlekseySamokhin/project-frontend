import { Box, Button, Stack } from '@mui/material';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import { PATH_HELP } from '../../routes/paths';
import SvgIconStyle from '../../components/SvgIconStyle';
import { HelpBreadCrumbs, HelpOpenedArticle } from '../../sections/help';
import { useSelector } from '../../redux/store';
import HelpFilters from '../../sections/help/HelpFilters';
import Loading from '../../components/Loading';

// ----------------------------------------------------------------------

export default function HelpCardArticlePage() {

  const params = useParams();

  const navigate = useNavigate();

  const { collection: helpCards, loading: loadingHelpCards } = useSelector((state) => state.help);

  const helpCard = helpCards.find((element) => element.id === params.id);

  const article = helpCard?.articles.find((element) => element.id === params.fid);

  return (
    <Page title='Help'>
      <Box height='100vh' p={2}>
        <Stack direction='row' alignItems='center' mb={2}>
          <Button
            onClick={() => navigate(PATH_HELP.root)}
            variant='default'
            color='common'
            sx={{
              height: '42px',
              minWidth: '42px',
              px: '4px',
              backgroundColor: 'background.paper',
              mr: 1.5,
            }}
          >
            <SvgIconStyle src='/assets/icons/main/ic_chevron_left.svg' sx={{ width: 20, height: 20 }} />
          </Button>

          <HelpFilters />
        </Stack>

        {loadingHelpCards ? (
          <Loading />
        ) : (
          <>
            <HelpBreadCrumbs helpCard={helpCard} article={article} />

            <HelpOpenedArticle article={article} />
          </>
        )}
      </Box>
    </Page>
  );
}
