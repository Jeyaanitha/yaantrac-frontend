import React from 'react';
import { Badge, Box, IconButton } from '@mui/material';
import logo from '../../../app/images/YTLogoCompass.png';
import { HomeOutlined } from '@mui/icons-material';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    height: '100vh',
    width: '100%',
    backgroundColor: '#FFF',
    border: '1px solid #E8E8E8'
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '40px',
      height: '40px'
    }
  },
  navbar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Sidebar = ({ selected = 'home', handleClick }) => {
  // component styles
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Box className={styles.logo} p={1}>
        <Box component='img' src={logo} />
      </Box>
      <Box className={styles.navbar}>
        <IconButton size='large' onClick={() => handleClick('home')}>
          <Badge sx={{ color: selected === 'home' ? '#3239EA' : '#fff' }}>
            <HomeOutlined />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
