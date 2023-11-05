import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { PATH_BROWSERS } from '../routes/paths';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, collapsed }, ref) => {

  const logo = (
    <Box ref={ref} sx={{ width: 37, height: 15, cursor: 'pointer', ...sx }}>
      <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M34.584 5.15294C27.2223 5.15294 27.1438 16.3196 18.2917 16.3196C9.43952 16.3196 9.36107 5.15294 1.99936 5.15294"
          stroke="url(#paint0_linear_2068_8107)" strokeWidth="2.92896" strokeLinecap="square" />
        <path
          d="M34.584 12.8414C27.2223 12.8414 27.1438 1.6748 18.2917 1.6748C9.43952 1.6748 9.36107 12.8414 1.99936 12.8414"
          stroke="url(#paint1_linear_2068_8107)" strokeWidth="2.92896" strokeLinecap="square" />
        <circle cx="18.2914" cy="8.65816" r="2.79336" fill="black" />
        <defs>
          <linearGradient id="paint0_linear_2068_8107" x1="50.8763" y1="10.7363" x2="44.0271" y2="-9.24984"
                          gradientUnits="userSpaceOnUse">
            <stop stopColor="#5BE584" />
            <stop offset="1" stopColor="#007B55" />
          </linearGradient>
          <linearGradient id="paint1_linear_2068_8107" x1="50.8763" y1="7.25813" x2="44.0271" y2="27.2442"
                          gradientUnits="userSpaceOnUse">
            <stop stopColor="#AAF27F" />
            <stop offset="1" stopColor="#229A16" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (

    <Link
      component={RouterLink}
      to={PATH_BROWSERS.root}
      sx={{color: "text.strong"}}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        mr={!collapsed && 2}
        pt={collapsed && 1.5}
        pb={collapsed && 1.5}
      >
        {logo}
        {!collapsed && <Typography variant="logo" component="p">Vision</Typography>}
      </Stack>
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
  collapsed: PropTypes.bool,
};

export default Logo;
