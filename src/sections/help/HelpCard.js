import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { PATH_HELP } from '../../routes/paths';

// ----------------------------------------------------------------------

HelpCard.propTypes = {
  card: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function HelpCard({ card }) {
  const navigate = useNavigate();

  return (
    <Card sx={(theme) => ({ height: 238, borderRadius: 1, boxShadow: theme.customShadows.z1 })}>
      <CardActionArea onClick={() => navigate(PATH_HELP.articlesCardId(card?.id))} sx={{ height: '100%' }}>
        <CardContent sx={{ p: 2, height: '100%' }}>
          <Stack alignItems="center" height="100%">
            <Stack
              mt={5}
              mb={3}
              width={86}
              height={86}
              backgroundColor="background.normal"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="text.strong">
                86x86
              </Typography>
            </Stack>

            <Typography fontWeight={500} textAlign="center" color="text.strong">
              {card?.title}
            </Typography>

            <Typography color="grey.600" textAlign="center" variant="caption">
              {card?.articlesCount} articles
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
