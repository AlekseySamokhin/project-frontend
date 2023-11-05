import { Box, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import { HelpHtml } from '.';
import useWindowSize from '../../hooks/useWindowSize';

// ----------------------------------------------------------------------

HelpOpenedArticle.propTypes = {
  article: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function HelpOpenedArticle({ article }) {
  const [, windowHeight] = useWindowSize();

  return (
    <Box>
      <Typography mb={2} mt={0.75} variant="h2">
        {article?.title}
      </Typography>

      <Paper>
        <Stack py={1.75} px={2} height={windowHeight - 391}>
          <Scrollbar>
            <HelpHtml />
          </Scrollbar>
        </Stack>

        <Grid p={2} container spacing={2}>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: '20px', color: 'grey.500' }}>Related articles</Typography>

            <Box my={2}>
              <Divider />
            </Box>

            <Grid container>
              <Grid item xs={12}>
                <Label sx={{ borderRadius: '30px', p: 2, mr: 2, mb: 2 }} variant="filled" color="default">
                  <Typography variant="body2">System requirements</Typography>
                </Label>

                <Label sx={{ borderRadius: '30px', p: 2, mr: 2, mb: 2 }} variant="filled" color="default">
                  <Typography variant="body2">Working with groups</Typography>
                </Label>

                <Label sx={{ borderRadius: '30px', p: 2, mr: 2, mb: 2 }} variant="filled" color="default">
                  <Typography variant="body2">Data safety</Typography>
                </Label>

                <Label sx={{ borderRadius: '30px', p: 2, mr: 2, mb: 2 }} variant="filled" color="default">
                  <Typography variant="body2">Mobile profiles</Typography>
                </Label>

                <Label sx={{ borderRadius: '30px', p: 2, mr: 2, mb: 2 }} variant="filled" color="default">
                  <Typography variant="body2">Download Multilogin</Typography>
                </Label>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography sx={{ fontSize: '20px', color: 'grey.500' }}>
              Check out our latest news,research,and tutorials
            </Typography>

            <Box my={2}>
              <Divider />
            </Box>

            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="inherit">
                <Typography fontWeight="700" variant="body2">
                  Facebook
                </Typography>
              </Button>

              <Button variant="contained" color="inherit">
                <Typography fontWeight="700" variant="body2">
                  Telegram
                </Typography>
              </Button>

              <Button variant="contained" color="inherit">
                <Typography fontWeight="700" variant="body2">
                  YouTube
                </Typography>
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

// <div dangerouslySetInnerHTML={createMarkUp()} />
// function createMarkUp() {
//     return article.insert;
//   }
