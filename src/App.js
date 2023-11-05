// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
// import ThemeSettings from './components/settings';
// import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBar2 } from './components/ProgressBar2';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        {/* <ThemeSettings> */}
        <NotistackProvider>
          <ProgressBar2 />
          {/* <ChartStyle /> */}
          <ScrollToTop />
          <Router />
        </NotistackProvider>
        {/* </ThemeSettings> */}
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
