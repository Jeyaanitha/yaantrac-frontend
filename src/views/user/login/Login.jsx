import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import CustomButton from '../../components/buttons/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { UserLoginService } from './services/LoginServices';
import { updateUserID, updateToast } from '../../../app/redux/action/action';
import imgLogo from '../../../app/images/YTLogoCompass.png';
import trackImg from '../../../app/images/trackLogo.png';
import { useDispatch } from 'react-redux';
import json2mq from 'json2mq';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    width: '100%',
    height: '100vh',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background: 'linear-gradient(-10deg, #fff 50%, #00769E 50%)'
  },
  loginBox: {
    padding: '30px !important',
    boxShadow: '0px 0px 7px 2px #ccc',
    borderRadius: '10px',
    width: '330px !important',
    backgroundColor: '#fff'
  },
  logo: {
    cursor: 'pointer',
    marginBottom: '30px',
    borderRadius: '50%'
  },
  head: {
    fontWeight: '600',
    fontFamily: 'monospace',
    color: '#707070'
  },
  input: {
    '& .css-nz481w-MuiInputBase-input-MuiInput-input': {
      height: '1.8em !important'
    },
    '& .css-16zhr80-MuiInputBase-root-MuiInput-root:after': {
      borderColor: '#00769E !important'
    },
    '& .css-3o8n9t-MuiInputBase-root-MuiInput-root:after': {
      borderColor: '#00769E !important'
    },
    '& .css-1jhorkr-MuiFormLabel-root-MuiInputLabel-root': {
      color: '#00769E !important'
    },
    '& .css-f4ygud-MuiFormLabel-root-MuiInputLabel-root.Mui-error': {
      color: '#00769E !important'
    },
    '& .css-16zhr80-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before': {
      borderColor: '#999 !important'
    },
    '& .css-3o8n9t-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before': {
      borderColor: '#999 !important'
    }
  },
  inputAlign: {
    textAlign: 'left',
    width: '100%'
  },
  link: {
    display: 'flex !important',
    justifyContent: 'center !important',
    flexDirection: 'row !important',
    textTransform: 'none',
    margin: '10px',
    marginTop: '20px',
    padding: '7px',
    width: '100% !important',
    borderRadius: '135px !important',
    backgroundColor: '#00769E',
    transition: 'all .2s ease',
    '&:hover': {
      backgroundColor: '#01698c'
    },
    fontWeight: 600
  },
  dBlock: {
    textAlign: 'right'
  },
  forgetPassword: {
    fontWeight: 600,
    display: 'inline-block',
    color: '#00769E',
    textDecoration: 'none !important'
  },
  loginBtn: {
    display: 'flex',
    justifyContent: 'center'
  },
  // for responsive
  dMdBlock: {
    display: 'block',
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '30%',
    height: 'auto'
  },
  dMdNone: {
    display: 'none'
  },
  smWidth: {
    width: '90% !important',
    padding: '30px !important',
    boxShadow: '0px 0px 7px 2px #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff'
  }
});

const Login = () => {
  // component styles
  const styles = useStyles();

  // function to dispatch
  const dispatch = useDispatch();

  // function to navigate
  const navigate = useNavigate();

  // responsive
  const SmallDevices = useMediaQuery(theme => theme.breakpoints.down('md'));
  const VerySmallDevices = useMediaQuery(
    json2mq({
      maxWidth: 350
    })
  );

  // component state
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // for submit function
  const {
    control: controlLogin,
    handleSubmit: submitLogin,
    formState: { errors: errorsLogin }
  } = useForm();

  // function to show & hide password
  const handleClickShowPassword = () => setShowPassword(show => !show);

  // function to login
  const handleLogin = async param => {
    setIsLoading(true);
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
    param = { ...param, roleType: 'user' };
    let { token = null, message, status } = await UserLoginService(param);
    if (status === 200) {
      dispatch(
        updateToast({
          show: true,
          message: 'Logged in successfully',
          severity: 'success'
        })
      );
      setTimeout(() => {
        dispatch(updateUserID(param?.userID));
        let lastVisitedPage = localStorage.getItem('lastVisitedPage');
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', true);
        if (lastVisitedPage) {
          window.location.replace(lastVisitedPage);
        } else {
          window.location.replace('/dashboard');
        }
      }, 500);
    } else {
      dispatch(updateToast({ show: true, message, severity: 'error' }));
    }
    setIsLoading(false);
  };

  return (
    <Grid container spacing={2} className={styles.container}>
      <Box className={VerySmallDevices ? styles.smWidth : styles.loginBox}>
        <Box component='form' onSubmit={submitLogin(handleLogin)}>
          <Box
            component='img'
            className={styles.logo}
            alt='YaanTrac Logo image'
            src={imgLogo}
            onClick={() => navigate('/')}
          />
          <FormControl className={styles.inputAlign}>
            <Controller
              control={controlLogin}
              name='userID'
              rules={{ required: 'Username is required' }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextField
                    className={styles.input}
                    size='small'
                    id='userID'
                    label='Username'
                    autoComplete='off'
                    variant='standard'
                    onChange={onChange}
                    value={value ? value : ''}
                    error={Boolean(errorsLogin?.userID)}
                    helperText={errorsLogin?.userID?.message}
                  />
                </>
              )}
            />
          </FormControl>
          <FormControl variant='standard' className={styles.inputAlign}>
            <Controller
              control={controlLogin}
              name='password'
              rules={{ required: 'Password is required' }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextField
                    className={styles.input}
                    size='small'
                    autoComplete='off'
                    id='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    variant='standard'
                    fullWidth
                    margin='normal'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    onChange={onChange}
                    value={value ? value : ''}
                    error={Boolean(errorsLogin?.password)}
                    helperText={errorsLogin?.password?.message}
                  />
                </>
              )}
            />
          </FormControl>
          <Box className={styles.dBlock}>
            <Link to='/forgotpassword' className={styles.forgetPassword}>
              <Typography component='h6' className={styles.forgetPassword}>
                Forgot Password?
              </Typography>
            </Link>
          </Box>
          <Box className={styles.loginBtn}>
            <CustomButton
              category='Login'
              variant='contained'
              type='submit'
              loading={isLoading}
              className={styles.link}
            />
          </Box>
        </Box>
      </Box>
      <Box
        component='img'
        className={SmallDevices ? styles.dMdNone : styles.dMdBlock}
        alt='Track Logo image'
        src={trackImg}
      />
    </Grid>
  );
};

export default Login;
