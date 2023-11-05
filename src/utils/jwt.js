import jwtDecode from 'jwt-decode';
// routes
import { PATH_AUTH } from '../routes/paths';
//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp) => {

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  const expiredTimer = setTimeout(() => {
    // alert('Token expiredaaaa');

    localStorage.removeItem('accessToken');

    window.location.href = PATH_AUTH.login;
  }, timeLeft);

  clearTimeout(expiredTimer);
};

const setSession = (token) => {
  if (token) {
    localStorage.setItem('X-Token', token);
    axios.defaults.headers.common['X-Token'] = token;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(token); // ~5 days by minimals server
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem('X-Token');
    delete axios.defaults.headers.common['X-Token'];
  }
};

export { isValidToken, setSession };
