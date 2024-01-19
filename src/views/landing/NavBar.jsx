import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../app/images/YaantracLandingImg.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';
import { createUseStyles } from 'react-jss';

//Custom Styles for Login button and Nav Tabs
const useStyles = createUseStyles({
  loginBtn: {
    backgroundColor: '#F1654A !important',
    color: 'white',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#E15F45'
    }
  },
  hamburgerBtn: {
    backgroundColor: '#00769E !important',
    color: 'white',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#00769E'
    }
  },
  tab: {
    color: 'white !important',
    padding: '0 25px',
    textTransform: 'capitalize !important',
    '&.Mui-selected': {
      fontWeight: 'bold !important',
      color: '#F1654A !important'
    }
  }
});

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [value, setValue] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenu);

  //Function to change Tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Function Change Nav Menu in  Mobile View
  const handleMobileMenuOpen = e => {
    setMobileMenu(e.currentTarget);
  };

  //Function To Close Nav Menu in Mobile View
  const handleMobileMenuClose = () => {
    setMobileMenu(null);
  };

  useEffect(() => {
    setValue(
      pathname === '/'
        ? 0
        : pathname === '/aboutus'
        ? 1
        : pathname === '/contactus'
        ? 2
        : false
    );
  }, [pathname]);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  //Nav Menu Template for Mobile View
  const renderMobileMenu = (
    <>
      <Menu
        anchorEl={mobileMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem className='primary' onClick={() => navigate('/')}>
          Home
        </MenuItem>
        <MenuItem className='primary' onClick={() => navigate('/aboutus')}>
          About Us
        </MenuItem>
        <MenuItem className='primary' onClick={() => navigate('/contactus')}>
          Contact Us
        </MenuItem>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            className={classes.hamburgerBtn}
            variant='contained'
            sx={{ px: 5 }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Box>
      </Menu>
    </>
  );

  return (
    <Box>
      <AppBar position='static' sx={{ backgroundColor: '#00769E' }}>
        <Toolbar>
          <Box
            nowrap='true'
            component='img'
            src={logo}
            sx={{
              display: { width: 130 },
              flexGrow: 0,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          />
          <Box
            sx={{
              flexGrow: { md: 1, sm: 1, xs: 1 }
            }}
          />
          <Box
            sx={{
              display: { lg: 'flex', md: 'flex', sm: 'none', xs: 'none' }
            }}
          >
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                variant='standard'
                scrollButtons='auto'
                aria-label='scrollable auto tabs example'
                TabIndicatorProps={{
                  style: {
                    display: 'none'
                  }
                }}
              >
                <Tab className={classes.tab} label='Home' onClick={() => navigate('/')} />
                <Tab
                  className={classes.tab}
                  label='About Us'
                  onClick={() => navigate('/aboutus')}
                />
                <Tab
                  className={classes.tab}
                  label='Contact Us'
                  onClick={() => navigate('/contactus')}
                />
              </Tabs>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                className={classes.loginBtn}
                variant='contained'
                sx={{ px: 5 }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none', sm: 'flex' } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};

export default NavBar;
