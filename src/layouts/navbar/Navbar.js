import { useEffect, useRef, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Drawer, Stack } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import cssStyles from '../../utils/cssStyles';
import { NAVBAR } from '../../config';
import { useDispatch, useSelector } from '../../redux/store';
import { closeSidebar } from '../../redux/slices/collapseSidebar';
import useWindowSize from '../../hooks/useWindowSize';
import Scrollbar from '../../components/Scrollbar';
import NavCustomList from './NavCustomList';
import NavBottom from './NavBottom';
import NavBottomCollapse from './NavBottomCollapse';
import NavTop from './NavTop';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
  },
}));

// ----------------------------------------------------------------------

export default function Navbar() {
  const theme = useTheme();

  const dispatch = useDispatch();

  const isDesktop = useResponsive('up', 'lg');

  const openSidebar = useSelector((state) => state.collapseSidebar.open);

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse } = useCollapseDrawer();

  const [, windowHeight] = useWindowSize();

  const [heightLine, setHeightLine] = useState(0);

  const refNavbar = useRef(null);


  useEffect(() => {
    setHeightLine(refNavbar.current?.offsetHeight);
  }, [windowHeight]);

  const renderContent = (
    <Stack minHeight="100%" ref={refNavbar}>
      <Scrollbar>
        <Stack minHeight={heightLine} justifyContent="space-between">
          <Stack>
            <NavTop isCollapse={isCollapse} />

            <NavCustomList isCollapse={isCollapse} onToggleCollapse={onToggleCollapse} />
          </Stack>

          {isDesktop && isCollapse ? <NavBottomCollapse /> : <NavBottom />}
        </Stack>
      </Scrollbar>
    </Stack>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {!isDesktop && (
        <Drawer
          open={openSidebar}
          onClose={() => dispatch(closeSidebar())}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: 'none',
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
