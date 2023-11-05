import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
import { useNavigate } from 'react-router-dom';
import { PATH_HELP } from '../../routes/paths';

// ----------------------------------------------------------------------

HelpArticle.propTypes = {
  cardId: PropTypes.string,
  article: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function HelpArticle({ cardId, article }) {
  const navigate = useNavigate();

  return (
    <Card sx={(theme) => ({ mt: 1, borderRadius: 1, boxShadow: theme.customShadows.z1 })}>
      <CardActionArea onClick={() => navigate(PATH_HELP.articleId(cardId, article?.id))}>
        <CardContent sx={{ p: 2 }}>
          <Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography fontWeight={500} color="text.strong">
                {article?.title}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {article?.date}
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.primary">
              {article?.description}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
