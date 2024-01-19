import React, { useState } from 'react';
import {
  Box,
  FormControl,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  inputLabelClasses
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordService, ResetPasswordService } from './services/LoginServices';
import { updateToast } from '../../../app/redux/action/action';
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import CustomButton from '../../components/buttons/CustomButton';
import NavBar from '../../landing/NavBar';
import { useDispatch } from 'react-redux';

function ForgotPassword() {
  // function to navigate
  const navigate = useNavigate();

  // component state
  const steps = ['User ID', 'Validate OTP', 'Reset Password'];
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState(null);
  const [time, setTime] = useState(Date.now() + 60000);

  const dispatch = useDispatch();

  // password validation schema
  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        'Pwd should have 8 character, atleast 1 special character, 1 upper case, 1 Lower case and numerial value'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .min(4, 'Password length should be at least 4 characters')
      .max(12, 'Password cannot exceed more than 12 characters')
      .oneOf([yup.ref('password')], 'Passwords do not match')
  });

  const resetPasswordSchema2 = yup.object().shape({
    OTP: yup
      .string()
      .required('Enter OTP')
      .min(4, 'Enter valid OTP')
      .max(4, 'Enter valid OTP')
  });
  const resetPasswordSchema3 = yup.object().shape({
    userID: yup
      .string()
      .required('Enter User ID')
      .min(4, 'Minimum character should be 4')
      .max(10, 'Maximum character should be 10')
  });

  // state for form error validation
  const {
    register: userRegID,
    control: controlUserID,
    handleSubmit: submitUserID,
    formState: { errors: errorsUserID }
  } = useForm({ resolver: yupResolver(resetPasswordSchema3) });

  const {
    register,
    control: controlOTP,
    handleSubmit: submitOTP,
    formState: { errors: errorsOTP }
  } = useForm({ resolver: yupResolver(resetPasswordSchema2) });

  const {
    control: controlResetPassword,
    handleSubmit: submitResetPassword,
    formState: { errors: errorsResetPassword }
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  // function to handle validate user ID
  const handleSubmitUserID = async params => {
    let { data, status } = await ForgotPasswordService(params);
    if (status === 202) {
      dispatch(
        updateToast({
          show: true,
          message: `OTP Sent Successfully to Your Registered Mobile Number ${data?.data[0]?.mobile}`,
          severity: 'success'
        })
      );
      setUserData(data?.data[0]);
      setUserData(prev => ({ ...prev, userID: params?.userID }));
      setActiveStep(prev => prev + 1);
    } else {
      dispatch(
        updateToast({ show: true, message: 'Invalid User ID!', severity: 'error' })
      );
    }
  };

  //function to Resend OTP
  const handleResendOTP = async params => {
    let value = {};
    value['userID'] = params.userID;
    let { data, status } = await ForgotPasswordService(value);
    if (status === 202) {
      dispatch(
        updateToast({
          show: true,
          message: `OTP Sent Successfully to Your Registered Mobile Number ${data?.data[0]?.mobile}`,
          severity: 'success'
        })
      );
      setUserData(data?.data[0]);
      setUserData(prev => ({ ...prev, userID: params?.userID }));
    } else {
      dispatch(
        updateToast({ show: true, message: 'Invalid User ID!', severity: 'error' })
      );
    }
    setTime(Date.now() + 60000);
  };

  // function to validate OTP
  const handleSubmitOTP = params => {
    if (params?.OTP === userData?.OTP) {
      dispatch(
        updateToast({
          show: true,
          message: 'OTP Verified Successfully!',
          severity: 'success'
        })
      );
      setActiveStep(prev => prev + 1);
    } else {
      dispatch(updateToast({ show: true, message: 'Invalid OTP!', severity: 'error' }));
    }
  };

  // function to handle reset password
  const handleSubmitResetPassword = async params => {
    params = { ...params, userID: userData?.userID };
    let { status } = await ResetPasswordService(params);
    if (status === 200 || status === 201) {
      dispatch(
        updateToast({
          show: true,
          message: 'Password Changed Successfully!',
          severity: 'success'
        })
      );
      setActiveStep(prev => prev + 1);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      dispatch(
        updateToast({
          show: true,
          message: 'There is an error while changing password!',
          severity: 'warning'
        })
      );
    }
  };

  // validate user ID component
  const userID = () => (
    <Box>
      <Box m={2}>Forgot Password</Box>
      <Box
        component='form'
        onSubmit={submitUserID(handleSubmitUserID)}
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
        m={2}
      >
        <FormControl margin='dense' fullWidth>
          <Controller
            control={controlUserID}
            name='userID'
            render={({ field: { onChange, value } }) => (
              <TextField
                label='User ID'
                inputProps={{ minLength: 4, maxLength: 10 }}
                InputLabelProps={{
                  sx: {
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: '#00769e'
                    }
                  }
                }}
                size='small'
                onChange={onChange}
                value={value ? value : ''}
                error={Boolean(errorsUserID?.userID)}
                helperText={errorsUserID?.userID?.message}
                {...userRegID('userID')}
              />
            )}
          />
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            justifyContent: {
              lg: 'right',
              md: 'space-between',
              sm: 'space-between',
              xs: 'space-between'
            },
            gridGap: '5px'
          }}
          mt={2}
        >
          <CustomButton category='Cancel' onClick={() => navigate('/login')} />
          <CustomButton category='Next' type='submit' />
        </Box>
      </Box>
    </Box>
  );

  //Customize countdown timer
  const countDownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return (
        <Box
          onClick={() => handleResendOTP(userData)}
          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          Resend OTP?
        </Box>
      );
    } else {
      // Render a countdown
      return (
        <span>
          Time Remaining: {minutes <= 9 || minutes <= '9' ? '0' + minutes : minutes}:
          {seconds <= 9 || seconds <= '9' ? '0' + seconds : seconds} Seconds
        </span>
      );
    }
  };

  // validate OTP component
  const validateOTP = () => (
    <Box m={2}>
      <Box m={2}>Forgot Password</Box>
      <Box sx={{ fontSize: '10px' }} mx={2}>
        <b>Enter the OTP sent to your registered mobile number</b>
      </Box>
      <Box
        component='form'
        onSubmit={submitOTP(handleSubmitOTP)}
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
        m={2}
      >
        <FormControl margin='dense' fullWidth>
          <Controller
            control={controlOTP}
            name='OTP'
            render={({ field: { onChange, value } }) => (
              <TextField
                label='OTP'
                inputProps={{ minLength: 4, maxLength: 4 }}
                InputLabelProps={{
                  sx: {
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: '#00769e'
                    }
                  }
                }}
                size='small'
                onChange={onChange}
                value={value ? value : ''}
                error={Boolean(errorsOTP?.OTP)}
                helperText={errorsOTP?.OTP?.message}
                {...register('OTP')}
                onKeyDown={e => {
                  let NumberRegex = /^[a-z-A-Z’/`~!#*$@_%+=.,^&(){}[\]|;:'"”<>?\\]$/;
                  if (NumberRegex.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            )}
          />
        </FormControl>
        <Box sx={{ fontSize: '10px' }}>
          <b>
            Note: An OTP will be sent to your registered mobile number, Please check your
            mobile. OTP is valid upto a minute
          </b>
        </Box>
        <Box
          sx={{
            display: 'flex',
            textAlign: 'right',
            justifyContent: 'right',
            gridGap: '5px',
            fontSize: '12px',
            color: 'rgba(45,45,135,1)'
          }}
        >
          <Countdown date={time} renderer={countDownRenderer} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: {
              lg: 'right',
              md: 'space-between',
              sm: 'space-between',
              xs: 'space-between'
            },
            gridGap: '5px'
          }}
          mt={2}
        >
          <CustomButton category='Cancel' onClick={() => navigate('/login')} />
          <CustomButton category='Next' type='submit' />
        </Box>
      </Box>
    </Box>
  );

  // reset password component
  const resetPassword = () => (
    <Box>
      <Box m={2}>Forgot Password</Box>
      <Box
        component='form'
        onSubmit={submitResetPassword(handleSubmitResetPassword)}
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
        m={2}
      >
        <FormControl margin='dense' fullWidth>
          <Controller
            control={controlResetPassword}
            name='password'
            rules={{ required: 'Enter new password!' }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label='New Password'
                InputLabelProps={{
                  sx: {
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: '#00769e'
                    }
                  }
                }}
                size='small'
                onChange={onChange}
                value={value ? value : ''}
                error={Boolean(errorsResetPassword?.password)}
                helperText={errorsResetPassword?.password?.message}
              />
            )}
          />
        </FormControl>
        <FormControl margin='dense' fullWidth>
          <Controller
            control={controlResetPassword}
            name='confirmPassword'
            rules={{ required: 'Enter User ID' }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label='Confirm Password'
                InputLabelProps={{
                  sx: {
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: '#00769e'
                    }
                  }
                }}
                size='small'
                onChange={onChange}
                value={value ? value : ''}
                error={Boolean(errorsResetPassword?.confirmPassword)}
                helperText={errorsResetPassword?.confirmPassword?.message}
              />
            )}
          />
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            justifyContent: {
              lg: 'right',
              md: 'space-between',
              sm: 'space-between',
              xs: 'space-between'
            },
            gridGap: '5px'
          }}
          mt={2}
        >
          <CustomButton category='Cancel' onClick={() => navigate('/login')} />
          <CustomButton category='Next' type='submit' />
        </Box>
      </Box>
    </Box>
  );

  // function to get component with respective steps
  const getSteps = step => {
    switch (step) {
      case 0:
        return userID();
      case 1:
        return validateOTP();
      case 2:
        return resetPassword();
      default:
        return;
    }
  };

  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: { lg: 'center', sm: 'center', md: 'center', xs: 'center' },
          marginTop: '-58px'
        }}
        p={2}
      >
        <Box
          sx={{
            backgroundColor: '#D9D9D9',
            borderRadius: '13px',
            width: { lg: '50%' },
            padding: { lg: '40px', md: '30px', sm: '30px', xs: '20px' }
          }}
        >
          {activeStep === steps?.length ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }} p={2}>
              <Typography>Please Don't Forgot Your Password</Typography>
            </Box>
          ) : (
            <Box sx={{ width: '100%' }} mb={5}>
              {getSteps(activeStep)}
            </Box>
          )}
          <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%' }}>
            {steps?.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
