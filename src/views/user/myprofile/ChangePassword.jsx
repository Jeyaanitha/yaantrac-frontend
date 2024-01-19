import { createUseStyles } from 'react-jss';
import { Box, FormControl, Card, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { ChangePasswordService } from './services/MyProfileServices';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateToast } from '../../../app/redux/action/action';
import CustomButton from '../../components/buttons/CustomButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import CustomTextField from '../../components/customized/CustomTextField';
import logo from '../../../app/images/YaantracLandingImg.png';

// component styles
const useStyles = createUseStyles({
  root: {
    height: `calc(100vh - 24px)`
  },
  changecard: {
    margin: 'auto',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'relative'
  }
});

const ChangePassword = () => {
  // component styles
  const styles = useStyles();

  // function to navigate
  const navigate = useNavigate();

  // component state
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // function to dispatch
  const dispatch = useDispatch();

  // function to show old password
  const handleOldPassword = () => setShowOldPassword(!showOldPassword);

  // function to show new password
  const handleNewPassword = () => setShowNewPassword(!showNewPassword);

  // function to show confirm password
  const handleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // schema for update password
  const updatePasswordSchema = yup.object().shape({
    oldPassword: yup.string().required('Current Password is required!'),
    newPassword: yup
      .string()
      .required('New Password is required')
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        'Pwd should have 8 character, atleast 1 special character, 1 upper case, 1 Lower case and numerial value'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        'Pwd should have 8 characters, atleast 1 special character, 1 upper case, 1 Lower case and numerial value'
      )
      .oneOf([yup.ref('newPassword')], 'Passwords do not match')
  });

  // state for update password form validation
  const {
    control: controlUpdatePassword,
    handleSubmit: submitUpdatePassword,
    formState: { errors: errorsUpdatePassword },
    reset
  } = useForm({ resolver: yupResolver(updatePasswordSchema) });

  // function to update password
  const handleUpdatePassword = async params => {
    setIsLoading(true);
    let { status, oldPassword, newPassword } = await ChangePasswordService(params);
    if (status === 200) {
      dispatch(
        updateToast({
          show: true,
          message: 'Password changed successfully!',
          severity: 'success'
        })
      );
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else if (oldPassword === newPassword) {
      dispatch(
        updateToast({
          show: true,
          message: 'New password should not be the same as the current password!',
          severity: 'error'
        })
      );
      setTimeout(() => {
        navigate('/myprofile');
      }, 1500);
    } else {
      dispatch(
        updateToast({
          show: true,
          message: 'Invalid current password!',
          severity: 'error'
        })
      );
      setTimeout(() => {
        navigate('/myprofile');
      }, 1500);
    }
    reset({ confirmPassword: '', newPassword: '', oldPassword: '' });
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        height: `calc(100vh - 64px) !important`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card
        sx={{
          borderRadius: '10px',
          backgroundColor: '#D9D9D9',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '75%',
          overflowY: 'scroll !important'
        }}
        py={1}
      >
        <Box component='img' src={logo} sx={{ height: 50 }} />

        <Box
          component='form'
          className={styles.changecard}
          p={2}
          onSubmit={submitUpdatePassword(handleUpdatePassword)}
        >
          <FormControl margin='dense' fullWidth sx={{ paddingY: '10px', width: '60%' }}>
            <Controller
              control={controlUpdatePassword}
              name='oldPassword'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  id='current-password'
                  label='Current Password'
                  type={showOldPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={handleOldPassword}
                          onMouseDown={handleOldPassword}
                        >
                          {showOldPassword ? (
                            <VisibilityIcon sx={{ color: '#00769e' }} />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onChange={onChange}
                  value={value ? value : ''}
                  error={Boolean(errorsUpdatePassword?.oldPassword)}
                  helperText={errorsUpdatePassword?.oldPassword?.message}
                />
              )}
            />
          </FormControl>
          <FormControl margin='dense' fullWidth sx={{ paddingY: '10px', width: '60%' }}>
            <Controller
              control={controlUpdatePassword}
              name='newPassword'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  size='small'
                  id='new-password'
                  label='New Password'
                  type={showNewPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={handleNewPassword}
                          onMouseDown={handleNewPassword}
                        >
                          {showNewPassword ? (
                            <VisibilityIcon sx={{ color: '#00769e' }} />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onChange={onChange}
                  value={value ? value : ''}
                  error={Boolean(errorsUpdatePassword?.newPassword)}
                  helperText={errorsUpdatePassword?.newPassword?.message}
                />
              )}
            />
          </FormControl>
          <FormControl
            margin='dense'
            fullWidth
            sx={{ paddingY: '10px', width: '60%' }}
            size='small'
          >
            <Controller
              control={controlUpdatePassword}
              name='confirmPassword'
              render={({ field: { onChange, value } }) => (
                <CustomTextField
                  id='confirm-password'
                  label='Confirm Password'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={handleConfirmPassword}
                          onMouseDown={handleConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <VisibilityIcon sx={{ color: '#00769e' }} />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  type={showConfirmPassword ? 'text' : 'password'}
                  onChange={onChange}
                  value={value ? value : ''}
                  error={Boolean(errorsUpdatePassword?.confirmPassword)}
                  helperText={errorsUpdatePassword?.confirmPassword?.message}
                />
              )}
            />
          </FormControl>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gridGap: '10px',
              marginTop: '10px',
              marginBottom: '10px'
            }}
          >
            <CustomButton
              size='small'
              category='Cancel'
              color='error'
              onClick={() => {
                reset({ confirmPassword: '', newPassword: '', oldPassword: '' });
                navigate('/dashboard');
              }}
            />

            <CustomButton
              category='Save'
              size='small'
              type='submit'
              loading={isLoading}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ChangePassword;
