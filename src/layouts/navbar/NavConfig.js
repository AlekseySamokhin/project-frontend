import { styled } from '@mui/material/styles';
import { ListItemButton } from '@mui/material';
import { PATH_AUTH, PATH_BROWSERS, PATH_HELP, PATH_MAIN_PAGE, PATH_TEAMS } from '../../routes/paths';
import SvgIconStyle from '../../components/SvgIconStyle';

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/main/${name}.svg`} sx={{ width: 18, height: 18 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
  browsers: getIcon('ic_browsers'),
  tracking: getIcon('ic_tracking'),
  teams: getIcon('ic_teams'),
  api: getIcon('ic_api'),
  automation: getIcon('ic_automation'),
  settings: getIcon('ic_settings'),
  payment: getIcon('ic_payment'),
  support: getIcon('ic_support'),
  logout: getIcon('ic_logout'),
};

export const navConfig = {
  first: [
    { id: '12345', title: 'Browsers', path: PATH_BROWSERS.root, icon: ICONS.browsers },
    { id: '23451', title: 'Tracking', path: PATH_MAIN_PAGE.tracking, icon: ICONS.tracking },
    { id: '34512', title: 'Teams', path: PATH_TEAMS.root, icon: ICONS.teams },
    { id: '45123', title: 'API', path: PATH_MAIN_PAGE.api, icon: ICONS.api },
    { id: '51234', title: 'Automation', path: PATH_MAIN_PAGE.automation, icon: ICONS.automation },
    { id: '01234', title: 'Settings', path: PATH_MAIN_PAGE.settings, icon: ICONS.settings },
    { id: '10234', title: 'Payment', path: PATH_MAIN_PAGE.payment, icon: ICONS.payment },
  ],
  second: [
    { id: '12034', title: 'Help', path: PATH_HELP.root, icon: ICONS.support },
    { id: '12305', title: 'Log out', path: PATH_AUTH.login, icon: ICONS.logout },
  ],
};

export const NavListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  height: 48,
  marginBottom: theme.spacing(0.5),
  textTransform: 'capitalize',
}));
