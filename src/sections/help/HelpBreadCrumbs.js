import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import SvgIconStyle from '../../components/SvgIconStyle';
import { PATH_HELP } from '../../routes/paths';

// ----------------------------------------------------------------------

HelpBreadCrumbs.propTypes = {
  helpCard: PropTypes.object,
  article: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function HelpBreadCrumbs({ helpCard, article }) {

  const { pathname } = useLocation();

  const breadcrumbs = [

      <Link
        key='1'
        underline='hover'
        color='inherit'
        component={RouterLink}
        to={PATH_HELP.root}
      >
        <Typography variant='body2'>
          Help
        </Typography>
      </Link>,

      <Link
        key='2'
        underline='hover'
        color='inherit'
        component={RouterLink}
        to={PATH_HELP.articlesCardId(`${helpCard?.id}`)}
      >

        <Typography variant='body2'>
          {helpCard?.title}
        </Typography>
      </Link>,

      article && (
        <Link
          key='3'
          underline='hover'
          color='inherit'
          component={RouterLink}
          to={pathname}
        >
          <Typography variant='body2'>
            {article?.title}
          </Typography>
        </Link>
      ),
    ]
  ;

  return (
    <Box>
      <Breadcrumbs separator={<SvgIconStyle src='/assets/icons/main/ic_dot.svg' sx={{ width: 20, height: 20 }} />}>
        {breadcrumbs}
      </Breadcrumbs>
    </Box>
  );
}
