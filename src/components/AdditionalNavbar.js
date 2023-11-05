import { Button, ListItemButton, Paper, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Scrollbar from './Scrollbar';
import useWindowSize from '../hooks/useWindowSize';

// ----------------------------------------------------------------------

AdditionalNavbar.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  buttons: PropTypes.node.isRequired,
  noData: PropTypes.bool,
};

// ----------------------------------------------------------------------

export function AdditionalNavbar({ children, title, buttons, noData = false }) {
  const [, windowHeight] = useWindowSize();

  return (
    <Paper
      sx={{
        boxShadow: (theme) => theme.customShadows.z8,
        backgroundColor: 'background.folder',
        minHeight: '100% !important',
      }}
      square
    >
      <Stack width={236} height="100%">
        <Stack direction="row" alignItems="center" justifyContent="space-between" p={2} pb={1.5}>
          <Stack sx={{ cursor: 'default' }} direction="row">
            <Typography variant="subtitle1" color="text.strong">
              {title}
            </Typography>
          </Stack>

          <Stack direction="row" display={noData ? 'none' : 'flex'}>
            {buttons}
          </Stack>
        </Stack>

        <Stack height={windowHeight - 68}>
          <Scrollbar>{children}</Scrollbar>
        </Stack>
      </Stack>
    </Paper>
  );
}

export const AdditionalNavbarButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[600],
  borderColor: theme.palette.border.button,
  minWidth: 0,
  width: 36,
  height: 36,
  marginLeft: 8,
  padding: 0,
  '&:hover': {
    borderColor: theme.palette.grey[100],
  },
}));

export const AdditionalNavbarListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  height: 48,
  marginBottom: theme.spacing(0.5),
  textTransform: 'capitalize',
}));
