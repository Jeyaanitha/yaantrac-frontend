import React, { useEffect, useState } from 'react';
import UserNavbar from '../views/components/customized/UserNavbar';
import PrivateRoute from './PrivateRoute';
import Backdrop from '@mui/material/Backdrop';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { Login } from '@mui/icons-material';
import { createUseStyles } from 'react-jss';
import breakdownImg from '../app/images/breakdown.png';

const useStyles = createUseStyles({
  errorBox: {
    padding: '30px',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '8px',
    boxShadow: '0 0 5px #999',
    textAlign: 'center',
    borderBottom: '5px solid #00769E'
  },
  breakdownLogo: {
    width: '150px',
    height: 'auto',
    marginBottom: '16px'
  },
  head1: {
    marginBottom: '10px !important',
    color: 'red'
  },
  head2: {
    color: '#999',
    marginBottom: '10px !important'
  },
  logoutBtnAlign: {
    display: 'inline-block',
    marginTop: '10px'
  },
  logoutIcon: {
    fontSize: '20px !important',
    marginRight: '5px'
  },
  logoutBtn: {
    backgroundColor: '#00769E',
    display: 'flex',
    alignItems: 'center',
    padding: '6px 15px',
    borderRadius: '135px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all .2s ease',
    '&:hover': {
      backgroundColor: '#006e94'
    }
  }
});

const PrivateRouteApp = () => {
  const styles = useStyles();
  const smallDevices = useMediaQuery('(max-width:350px)');
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem('token');

  const handleRedirect = () => window.location.replace('/login');

  useEffect(() => {
    if (!token || token === 'expired') setIsOpen(true);
  }, [token]);

  return (
    <>
      <UserNavbar>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ width: '100%', height: '100vh' }}>
            <PrivateRoute />
          </Box>
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={isOpen}
        >
          <Box className={styles.errorBox} width={smallDevices ? '90%' : 'auto'}>
            <Box className={styles.breakdownLogo} component='img' src={breakdownImg} />
            <Typography component={smallDevices ? 'h6' : 'h5'} className={styles.head1}>
              Your Token has been Expried !
            </Typography>
            <Typography component='h6' className={styles.head2}>
              Please login again
            </Typography>
            <Box size='small' onClick={handleRedirect} className={styles.logoutBtnAlign}>
              <Typography component='h6' className={styles.logoutBtn}>
                <Login className={styles.logoutIcon} /> Login
              </Typography>
            </Box>
          </Box>
        </Backdrop>
      </UserNavbar>
    </>
  );
};

export default PrivateRouteApp;
