import { Navigate, useRoutes } from 'react-router-dom';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ResetPassword from '../pages/auth/ResetPassword';
import NewPassword from '../pages/auth/NewPassword';
import VerifyCode from '../pages/auth/VerifyCode';
import MainLayout from '../layouts/MainLayout';
import BrowsersLayout from '../layouts/browsers/BrowsersLayout';
import BrowsersPage from '../pages/browsers/BrowsersPage';
import ProfilesPage from '../pages/browsers/ProfilesPage';
import ProxiesPage from '../pages/browsers/ProxiesPage';
import TagsPage from '../pages/browsers/TagsPage';
import StatusesPage from '../pages/browsers/StatusesPage';
import ExtrasPage from '../pages/browsers/ExtrasPage';
import TrackingLayout from '../layouts/tracking/TrackingLayout';
import TrackingPage from '../pages/tracking/TrackingPage';
import TrackingFolderPage from '../pages/tracking/TrackingFolderPage';
import TeamsLayout from '../layouts/teams/TeamsLayout';
import TeamsPage from '../pages/teams/TeamsPage';
import TeamPage from '../pages/teams/TeamPage';
import HelpPage from '../pages/help/HelpPage';
import HelpCardArticlePage from '../pages/help/HelpCardArticlePage';
import HelpCardPage from '../pages/help/HelpCardPage';
import PaymentPage from '../pages/PaymentPage';
import SettingPage from '../pages/SettingPage';
import ComingSoon from '../pages/ComingSoon';
import Page500 from '../pages/Page500';
import Page404 from '../pages/Page404';
import Page403 from '../pages/Page403';
import HelpLayout from '../layouts/HelpLayout';
import AutomationPage from '../pages/AutomationPage';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [

        { index: true, element: <Navigate to='browsers/folders' replace /> },

        { path: 'browsers', element: <Navigate to='folders' replace /> },
        {
          path: 'browsers/folders', element: <BrowsersLayout />, children: [
            { index: true, element: <BrowsersPage /> },
            { path: ':id', element: <Navigate to='profiles' replace /> },
            { path: ':id/profiles', element: <ProfilesPage /> },
            { path: ':id/proxies', element: <ProxiesPage /> },
            { path: ':id/tags', element: <TagsPage /> },
            { path: ':id/statuses', element: <StatusesPage /> },
            { path: ':id/extras', element: <ExtrasPage /> },
          ],
        },

        { path: 'tracking', element: <Navigate to='/tracking/folders' /> },
        {
          path: 'tracking/folders', element: <TrackingLayout />, children: [
            { index: true, element: <TrackingPage /> },
            { path: ':id', element: <TrackingFolderPage /> },
          ],
        },

        {
          path: 'teams', element: <TeamsLayout />, children: [
            { index: true, element: <TeamsPage /> },
            { path: ':id', element: <TeamPage /> },
          ],
        },


        {
          path: 'help', element: <HelpLayout />, children: [
            { index: true, element: <HelpPage /> },
            { path: ':id', element: <Navigate to='articles' replace /> },
            { path: ':id/articles', element: <HelpCardPage /> },
            { path: ':id/articles/:fid', element: <HelpCardArticlePage /> },
          ],
        },


        { path: 'payment', element: <PaymentPage /> },

        { path: 'settings', element: <SettingPage /> },

        { path: 'api', element: <ComingSoon /> },

        { path: 'automation', element: <AutomationPage /> },

      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to='/404' replace /> },
      ],
    },

    { path: '*', element: <Navigate to='/404' replace /> },
  ]);
}

// const Loadable = (Component) => (props) => {
//
//   return (
//     <Suspense fallback={<LoadingScreen />}>
//       <Component {...props} />
//     </Suspense>
//   );
// };

// // AUTHENTICATION
// const Login = Loadable(lazy(() => import('../pages/auth/Login')));
// const Register = Loadable(lazy(() => import('../pages/auth/Register')));
// const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
// const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
// const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
//
// const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
// const Page500 = Loadable(lazy(() => import('../pages/Page500')));
// const Page403 = Loadable(lazy(() => import('../pages/Page403')));
// const Page404 = Loadable(lazy(() => import('../pages/Page404')));
//
// // Browsers
// const BrowsersPage = Loadable(lazy(() => import('../pages/browsers/BrowsersPage')));
// const ExtrasPage = Loadable(lazy(() => import('../pages/browsers/ExtrasPage')));
// const ProfilesPage = Loadable(lazy(() => import('../pages/browsers/ProfilesPage')));
// const ProxiesPage = Loadable(lazy(() => import('../pages/browsers/ProxiesPage')));
// const TagsPage = Loadable(lazy(() => import('../pages/browsers/TagsPage')));
// const StatusesPage = Loadable(lazy(() => import('../pages/browsers/StatusesPage')));
//
// // Help
// const HelpPage = Loadable(lazy(() => import('../pages/help/HelpPage')));
// const HelpCardPage = Loadable(lazy(() => import('../pages/help/HelpCardPage')));
// const HelpCardArticlePage = Loadable(lazy(() => import('../pages/help/HelpCardArticlePage')));
//
// // Teams
// const TeamPage = Loadable(lazy(() => import('../pages/teams/TeamPage')));
// const TeamsPage = Loadable(lazy(() => import('../pages/teams/TeamsPage')));
//
// // Tracking
// const TrackingPage = Loadable(lazy(() => import('../pages/tracking/TrackingPage')));
// const TrackingFolderPage = Loadable(lazy(() => import('../pages/tracking/TrackingFolderPage')));
//
// // Payment
// const PaymentPage = Loadable(lazy(() => import('../pages/PaymentPage')));
//
// // Setting
// const SettingPage = Loadable(lazy(() => import('../pages/SettingPage')));
//
// // Automation
// const AutomationPage = Loadable(lazy(() => import('../pages/AutomationPage')));
