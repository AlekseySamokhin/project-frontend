import { Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PATH_BROWSERS } from '../../routes/paths';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { id: 'profiles', label: 'profiles', icon: 'ic_profiles', href: 'profiles' },
  { id: 'proxies', label: 'proxies', icon: 'ic_proxies', href: 'proxies' },
  { id: 'tags', label: 'tags', icon: 'ic_tags', href: 'tags' },
  { id: 'statuses', label: 'statuses', icon: 'ic_statuses', href: 'statuses' },
  { id: 'extras', label: 'extras', icon: 'ic_extras', href: 'extras' },
];

// ----------------------------------------------------------------------

BrowsersTabs.propTypes = {
  tabsValue: PropTypes.string,
};

export default function BrowsersTabs({ tabsValue }) {

  const params = useParams();

  const navigate = useNavigate();

  return (
    <Tabs allowScrollButtonsMobile variant="scrollable" scrollButtons="auto" value={tabsValue} sx={{ px: 2 }}>
      {STATUS_OPTIONS.map((tab) => (
        <Tab
          disableRipple
          label={tab.label}
          value={tab.label}
          key={tab.id}
          onClick={() => navigate(PATH_BROWSERS[tab.href](params.id))}
          icon={
            <SvgIconStyle
              src={`/assets/icons/browsers/${tab.icon}.svg`}
              sx={{ width: 18, height: 18, bgcolor: tabsValue === tab.label ? 'primary.main' : 'grey.600' }}
            />
          }
        />
      ))}
    </Tabs>
  );
}
