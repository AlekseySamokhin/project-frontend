import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, List, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import map from 'lodash/map';
import { useLocation, useNavigate } from 'react-router-dom';
import { navConfig, NavListItemButton } from './NavConfig';
import Iconify from '../../components/Iconify';
import { getActive } from '../../utils/link';
import useAuth from '../../hooks/useAuth';


// ----------------------------------------------------------------------

NavCustomList.propTypes = {
  isCollapse: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function NavCustomList({ isCollapse, onToggleCollapse }) {
  return (
    <Stack px={isCollapse ? 1.25 : 2} mt={isCollapse ? 1.5 : 0}>
      <List disablePadding>
        {map(navConfig.first, (item, key) => (isCollapse ? <React.Fragment key={key}>
          <ListItemCollapse item={item} />
        </React.Fragment> : <React.Fragment key={key}>
          <ListItem item={item} />
        </React.Fragment>))}

        <Divider sx={{ mb: 0.5 }} />

        {map(navConfig.second, (item, key) => (isCollapse ? <React.Fragment key={key}>
          <ListItemCollapse item={item} />
        </React.Fragment> : <React.Fragment key={key}>
          <ListItem item={item} />
        </React.Fragment>))}

        {isCollapse && (
          <NavListItemButton
            onClick={onToggleCollapse}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                m: 0,
              }}
            >
              <Iconify icon='eva:arrowhead-right-outline' width={22} height={22} />
            </ListItemIcon>
          </NavListItemButton>
        )}
      </List>
    </Stack>
  );
}

ListItem.propTypes = {
  item: PropTypes.object,
};

function ListItem({ item }) {
  const { logout } = useAuth();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(getActive(item.path, pathname));
  }, [pathname]);

  return (
    <NavListItemButton
      key={item.id} selected={isOpen}
      onClick={() => {
        if (item.title === 'Log out') {
          logout().then();
        }
        navigate(item.path);
      }}
    >
      <ListItemIcon
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
        }}
      >
        {item.icon}
      </ListItemIcon>

      <ListItemText primary={<Typography variant='body2'>{item.title}</Typography>} />
    </NavListItemButton>
  );
}


ListItemCollapse.propTypes = {
  item: PropTypes.object,
};

function ListItemCollapse({ item }) {
  const { logout } = useAuth();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(getActive(item.path, pathname));
  }, [pathname]);

  return (
    <NavListItemButton
      key={item.id}
      selected={isOpen}
      onClick={() => {
        if (item.title === 'Log out') {
          logout().then();
        }
        navigate(item.path);
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ListItemIcon
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          m: 0,
        }}
      >
        {item.icon}
      </ListItemIcon>
    </NavListItemButton>
  );
}
