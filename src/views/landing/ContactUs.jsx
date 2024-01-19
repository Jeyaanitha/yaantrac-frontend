import React from 'react';
import {
  Box,
  Button,
  Grid,
  inputLabelClasses,
  TextField,
  Typography
} from '@mui/material';
import contactusImage from '../../app/images/contactusImage.png';
import SendIcon from '@mui/icons-material/Send';
import Footer from './Footer';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { makeStyles, withStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff',
    overflow: 'scroll !important',
    height: '100vh'
  },
  form: {
    display: 'flex !important',
    flexDirection: 'column !important',
    justifyContent: 'center !important',
    alignItems: 'center !important'
  },
  map: {
    width: '550px',
    height: '500px'
  },
  heading: {
    fontWeight: '700 !important'
  },
  formText: {
    marginBottom: '30px !important'
  }
});

const CustomButton = withStyles({
  root: {
    backgroundColor: '#00769E',
    '&:hover': {
      backgroundColor: '#00769E'
    },
    fontWeight: 600
  }
})(Button);

function ContactUs() {
  const styles = useStyles();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Enter Name')
      .matches(/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/, 'Enter Valid Name')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    email: yup
      .string()
      .required('Enter Email')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email')
      .email('Enter valid email'),
    mobile: yup
      .string()
      .required('Enter Mobile Number')
      .matches(/^[6-9]\d{9}$/, 'Enter valid mobile number')
      .min(10, 'Enter valid mobile number')
      .max(10, 'Enter valid mobile number'),
    message: yup
      .string()
      .required('Enter Message')
      .min(10, 'Message should have minimum length of 10 characters')
      .max(500, 'Message should have maximum length of 500 characters')
  });

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = params => {};

  return (
    <div className={styles.root} id='contacts'>
      <Grid container>
        <Grid
          item
          lg={6}
          sx={{
            display: { md: 'none', xs: 'none', lg: 'flex' }
          }}
        >
          <Box component='img' src={contactusImage} sx={{ width: '100%' }} />
        </Grid>
        <Grid
          item
          lg={6}
          xs={12}
          className={styles.form}
          my={{ md: 3, xs: 3, lg: 'none' }}
        >
          <Box>
            <Typography
              component='h3'
              sx={{
                textAlign: 'center',
                fontSize: '14px',
                justifyContent: 'center',
                fontWeight: 700,
                marginBottom: '30px'
              }}
            >
              Get Your Credential
            </Typography>
          </Box>
          <Box
            component='form'
            noValidate
            autoComplete='off'
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label='Name'
              size='small'
              className={styles.formText}
              sx={{
                width: { xs: '245px', sm: '350px', md: '500px' }
              }}
              InputLabelProps={{
                sx: {
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: '#00769e'
                  }
                }
              }}
              error={Boolean(errors?.name)}
              {...register('name')}
              helperText={errors?.name?.message}
            />
            <TextField
              label='Email'
              size='small'
              className={styles.formText}
              sx={{
                width: { xs: '245px', sm: '350px', md: '500px' }
              }}
              inputProps={{ style: { textTransform: 'lowercase' } }}
              InputLabelProps={{
                sx: {
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: '#00769e'
                  }
                }
              }}
              error={Boolean(errors?.email)}
              {...register('email')}
              helperText={errors?.email?.message}
            />
            <TextField
              label='Mobile Number'
              size='small'
              className={styles.formText}
              sx={{
                width: { xs: '245px', sm: '350px', md: '500px' }
              }}
              inputProps={{ maxLength: 10 }}
              InputLabelProps={{
                sx: {
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: '#00769e'
                  }
                }
              }}
              error={Boolean(errors?.mobile)}
              helperText={errors?.mobile?.message}
              {...register('mobile')}
              onKeyDown={e => {
                let NumberRegex = /^[a-z-A-Z’/`~!#*$@_%+=.,^&(){}[\]|;:'"”<>?\\]$/;
                if (NumberRegex.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <TextField
              label='Message'
              size='small'
              multiline
              rows={4}
              className={styles.formText}
              sx={{
                width: { xs: '245px', sm: '350px', md: '500px' }
              }}
              InputLabelProps={{
                sx: {
                  [`&.${inputLabelClasses.shrink}`]: {
                    color: '#00769e'
                  }
                }
              }}
              error={Boolean(errors?.message)}
              {...register('message')}
              helperText={errors?.message?.message}
            />
            <CustomButton
              variant='contained'
              type='submit'
              sx={{ width: '140px !important', borderRadius: '10px' }}
              startIcon={<SendIcon />}
            >
              Send
            </CustomButton>
          </Box>
        </Grid>

        <Grid item lg={12} xs={12}>
          <iframe
            title='datayaan-location'
            style={{ outline: 'none', width: '100%' }}
            className={styles.map}
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.427029643012!2d80.12084155027866!3d12.944504190828898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f1df872a491%3A0xcf669140189cc963!2sDatayaan%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1617877827888!5m2!1sen!2sin'
          />
        </Grid>
        <Grid item md={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
}

export default ContactUs;
