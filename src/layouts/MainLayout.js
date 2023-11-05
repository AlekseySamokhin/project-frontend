import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import useCollapseDrawer from '../hooks/useCollapseDrawer';
import { NAVBAR } from '../config';
import Navbar from './navbar/Navbar';
import Scrollbar from '../components/Scrollbar';
import { openSidebar, toggleSidebar } from '../redux/slices/collapseSidebar';
import { useDispatch } from '../redux/store';
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
  flexGrow: 1,
  height: '100vh',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('lg')]: {
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function MainLayout() {

  const dispatch = useDispatch();

  const isDesktop = useResponsive('up', 'lg');

  const { collapseClick, onToggleCollapse } = useCollapseDrawer();

  const [borderFlash, setBorderFlash] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: { lg: 1 } }}>
      <Navbar />

      <MainStyle collapseClick={collapseClick}>

        <Stack
          position='absolute'
          minHeight='100%'
          width='6px'
          bgcolor='primary.main'
          sx={{
            opacity: (borderFlash ? 1 : 0),
            cursor: 'url(/assets/icons/main/ic_collapse.svg) 12 10, auto',
          }}
          zIndex={1}
          onMouseOut={() => setBorderFlash(false)}
          onMouseOver={() => setBorderFlash(true)}
          onClick={() => (isDesktop ?  onToggleCollapse() : dispatch(openSidebar()))}
        />

        <Scrollbar>
          <Outlet />
        </Scrollbar>

      </MainStyle>
    </Box>
  );
}
