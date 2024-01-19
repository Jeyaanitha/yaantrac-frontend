import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';

function NavDrawer({ loginHandler }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const pages = ['Home', 'Features', 'Highlights', 'Contact Us'];
  return (
    <>
      <Drawer anchor='top' open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ color: 'transparent' }}>
          {pages.map((page, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <ListItemText primary={page}>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
        <Button sx={{ margin: '10px' }} variant='contained' onClick={loginHandler}>
          Login
        </Button>
      </Drawer>
      <IconButton sx={{ marginLeft: 'auto' }} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon color='white' />
      </IconButton>
    </>
  );
}

export default NavDrawer;
