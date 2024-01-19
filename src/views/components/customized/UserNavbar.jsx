import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import UserDrawer from './UserDrawer';
import { Avatar, Button, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import YTLogo from '../../../app/images/favicon.png';
import {
  AccountCircle,
  ExpandMore,
  LockReset,
  Logout,
  Person
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router';
import apps from '../../../app/images/menu.png';
import { useSelector } from 'react-redux';
import '@fontsource/montserrat/500.css';

const useStyles = createUseStyles({
  menu: {
    '& .MuiPaper-root': {
      backgroundColor: '#1C2A3C',
      top: '50px !important',
      left: 'initial !important',
      right: '30px !important'
    }
  },
  icon: { color: '#FFF' },
  typography: {
    color: '#FFF',
    textTransform: 'none',
    fontSize: '12px !important'
  }
});

const drawerWidth = 224;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,

    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

const UserNavbar = ({ children }) => {
  // component styles
  const styles = useStyles();

  // function to navigate
  const navigate = useNavigate();

  // get user ID
  const { userID } = useSelector(state => state.reducers);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  // component state
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // function to open the drawer
  const handleDrawerOpen = () => setOpen(true);

  // function to close the drawer
  const handleDrawerClose = () => setOpen(false);

  // function to trigger to open My Profile component
  const handleClick = e => setAnchorEl(e.currentTarget);

  // function to trigger to close My Profile component
  const handleClose = () => setAnchorEl(null);

  const menuItems = [
    {
      icon: <Person className={styles.icon} />,
      text: 'Profile',
      path: () => {
        handleClose();
        navigate('/myprofile');
      }
    },
    {
      icon: <LockReset className={styles.icon} />,
      text: 'Change Password',
      path: () => {
        handleClose();
        navigate('/changepassword');
      }
    },
    {
      icon: <Logout className={styles.icon} />,
      text: 'Logout',
      path: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        window.location.replace('/');
      }
    }
  ];

  useEffect(() => {
    isMediumScreen && handleDrawerOpen();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open} sx={{ backgroundColor: '#00769E' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <Box component='img' src={apps} width='25px' />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: { md: 'space-between', xs: 'end' },
              alignItems: 'intial',
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: { md: 'flex', sm: 'none', xs: 'none' },
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Button
                onClick={() => navigate('/dashboard')}
                sx={{ cursor: 'pointer', borderRadius: '100px' }}
              >
                <Avatar alt='YTLogo' src={YTLogo} />
              </Button>
              <Typography component='h5' mx={2}
               sx={{fontfamily: 'Montserrat',fontWeight:'500' }}>
                Welcome back !
              </Typography>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <Button
                size='small'
                startIcon={<AccountCircle />}
                endIcon={<ExpandMore />}
                component='h5'
                sx={{
                  color: '#FFF',
                  marginBottom: { md: '-30px', xs: '0' },
                  textTransform: 'capitalize',
                  fontfamily: 'Montserrat',
                  fontWeight:'500'
                  
                }}
                onClick={handleClick}
              >
                {userID}
              </Button>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={styles.menu}
            >
              {menuItems.map(({ icon, text, path }, index) => (
                <MenuItem key={index}>
                  <Button size='small' startIcon={icon} onClick={path}>
                    <Typography component='h6' className={styles.typography}>
                      {text}
                    </Typography>
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiPaper-root': {
            backgroundColor: '#1C2A3C !important',
            width: 'inherit !important'
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: '#fff !important',
              backgroundColor: '#1976d2 !important',
              '&:hover': {
                backgroundColor: '#145faa !important'
              }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <UserDrawer />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default UserNavbar;
