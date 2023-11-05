import { styled } from '@mui/material/styles';
import { Container, Link, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import { LoginForm } from '../../sections/auth/login';
import useAuth from '../../hooks/useAuth';
import { PATH_AFTER_LOGIN } from '../../config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  background:
    theme.palette.mode === 'light'
      ? '#FEFEFE url("/assets/bg_login-unprotected.png") center no-repeat'
      : theme.palette.background.paper,
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 320,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

// ----------------------------------------------------------------------

export default function Login() {

  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate(PATH_AFTER_LOGIN);
  }, [isAuthenticated]);

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <LoginForm />

            <Typography variant="caption" align="center" sx={{ mt: 2 }} color="primary">

              <Link  component={RouterLink} to={PATH_AUTH.resetPassword}>
                Forgot password
              </Link>

              {'  •  '}

              <Link component={RouterLink} to={PATH_AUTH.register}>
                Sign Up
              </Link>

            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
