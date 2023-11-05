import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '@mui/material';

CreateDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  sx: PropTypes.object,
  handleOpenDrawer: PropTypes.node,
};

export default function CreateDrawer({ children, open, toggleDrawer, handleOpenDrawer, sx }) {
    return (
      <Drawer
        disableBackdropTransition
        anchor='right'
        open={open}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        PaperProps={{
          sx,
        }}
        SlideProps={{
          onEnter: handleOpenDrawer,
        }}
        ModalProps={{
          keepMounted: false,
        }}
      >
        {children}
      </Drawer>
    );
}
