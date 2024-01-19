import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  FetchMyProfileService,
  UpdateMyProfileDetails
} from './services/MyProfileServices';
import { updateToast } from '../../../app/redux/action/action';
import CustomButton from '../../components/buttons/CustomButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { convert, getEpoch } from '../../../utils/CommonFunctions';
import logo from '../../../app/images/YaantracLandingImg.png';
import Calendar2 from '../../components/customized/Calendar2';
import { useDispatch } from 'react-redux';
import CustomTextField from '../../components/customized/CustomTextField';

const MyProfile = () => {
  // component states
  const [showEdit, setShowEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [profiledata, setProfileData] = useState(null);
  const [calendar, setCalendar] = useState(null);
  const [isupdate, setIsUpdate] = useState(false);

  const dispatch = useDispatch();

  // validation schema
  const myProfileSchema = yup.object().shape({
    userName: yup
      .string()
      .required('Enter the Name')
      .matches(/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/, 'Enter valid name')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    userBio: yup
      .string()
      .required('Enter the Bio')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    displayName: yup
      .string()
      .required('Enter the Display Name')
      .matches(/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/, 'Enter valid name'),
    dateOfBirth: yup.string().required('Enter the DOB'),
    email: yup
      .string()
      .required('Enter the Email')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email')
      .email('Enter valid email'),
    overSpeed: yup
      .number()
      .typeError('Enter overspeed limit')
      .required('Enter overspeed limit')
      .min(1, 'Minimum overspeed is 1')
      .max(80, 'Maximum overspeed is 80'),
    mobileNumber: yup
      .string()
      .required('Enter the mobile number')
      .matches(/^[6-9]\d{9}$/, 'Enter valid mobile number')
      .min(10, 'Enter valid mobile number')
      .max(10, 'Enter valid mobile number')
  });

  // get validation methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    reset
  } = useForm({ resolver: yupResolver(myProfileSchema) });

  // function to get profile details
  const getMyProfileDetails = async () => {
    let res = await FetchMyProfileService();
    let profile = res.data.data;
    setProfileData(profile);
    setValue('userName', profile?.userName);
    setValue('displayName', profile?.displayName);
    setValue('userBio', profile?.userBio);
    setValue('mobileNumber', profile?.mobileNumber);
    setValue('email', profile?.email);
    setValue('dateOfBirth', profile?.dateOfBirth);
    setValue('overSpeed', profile?.overSpeed);
  };

  // function to update profile details
  const updateProfileDetails = async formData => {
    let { status } = await UpdateMyProfileDetails(formData);
    if (status === 200) {
      dispatch(
        updateToast({
          show: true,
          message: 'User profile updated successfully',
          severity: 'success'
        })
      );
      setShowEdit(true);
    }
  };

  // function to handle edit profile
  const handleEdit = () => setShowEdit(false);

  // function to submit update profile
  const profileOnSubmit = async () => {
    setIsLoading(true);
    let params = getValues();
    let param = {
      ...params,
      mobileNumber: parseInt(params?.mobileNumber),
      overSpeed: parseInt(params?.overSpeed),
      dateOfBirth: convert(params?.dateOfBirth)
    };
    await updateProfileDetails(param);
    await getMyProfileDetails();
    setIsLoading(false);
    setIsUpdate(false);
  };

  // function to show confirmation dialog
  const onSubmit = () => setIsUpdate(true);

  useEffect(() => {
    getMyProfileDetails();
  }, []);

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
          padding: '20px 50px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '70%',
          overflowY: 'scroll !important'
        }}
        py={1}
      >
        <Box component='img' src={logo} sx={{ height: 50 }} />
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <FormControl margin='dense' fullWidth error={Boolean(errors?.name)}>
            <CustomTextField
              type='text'
              label='User Name'
              disabled
              shrink ={true}
              defaultValue={profiledata?.userName ? profiledata?.userName : 'User Name'}
              error={Boolean(errors?.userName)}
              helperText={errors?.userName?.message}
              {...register('userName')}
            />
          </FormControl>
          <FormControl margin='dense' fullWidth error={Boolean(errors?.displayname)}>
            <CustomTextField
              type='text'
              label='Display Name'
              shrink ={true}
              disabled={showEdit}
              defaultValue={
                profiledata?.displayName ? profiledata?.displayName : 'Display Name'
              }
              error={Boolean(errors?.displayName)}
              helperText={errors?.displayName?.message}
              {...register('displayName')}
            />
          </FormControl>
          <FormControl margin='dense' fullWidth>
            <CustomTextField
              type='text'
              label='User Bio'
              shrink ={true}
              disabled={showEdit}
              defaultValue={profiledata?.userBio ? profiledata?.userBio : 'User Bio'}
              error={Boolean(errors?.userBio)}
              helperText={errors?.userBio?.message}
              {...register('userBio')}
            />
          </FormControl>
          <FormControl margin='dense' fullWidth>
            <CustomTextField
              placeholder='youremail@example.com'
              shrink ={true}
              inputProps={{ style: { textTransform: 'lowercase' } }}
              type='text'
              label='Email'
              disabled={showEdit}
              defaultValue={profiledata?.email ? profiledata?.email : 'email'}
              error={Boolean(errors?.email)}
              helperText={errors?.email?.message}
              {...register('email')}
            />
          </FormControl>
          <FormControl margin='dense' fullWidth error={Boolean(errors?.name)}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Calendar2
                label='Date Of Birth'
                disabled={showEdit}
                shrink ={true}
                value={calendar ? calendar : profiledata?.dateOfBirth}
                onChange={newValue => {
                  setCalendar(newValue);
                  clearErrors('dateOfBirth');
                  setValue('dateOfBirth', getEpoch(newValue?.$d));
                }}
                error={Boolean(errors?.dateOfBirth)}
                helperText={errors?.dateOfBirth?.message}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl margin='dense' fullWidth>
            <CustomTextField
              label='Mobile number'
              inputProps={{ maxLength: 10 }}
              shrink ={true}
              disabled={showEdit}
              defaultValue={
                profiledata?.mobileNumber ? profiledata?.mobileNumber : 'mobileNumber'
              }
              error={Boolean(errors?.mobileNumber)}
              helperText={errors?.mobileNumber?.message}
              {...register('mobileNumber')}
              onKeyDown={e => {
                let NumberRegex = /^[a-z-A-Z’/`~!#*$@_%+=.,^&(){}[\]|;:'"”<>?\\]$/;
                if (NumberRegex.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </FormControl>
          <FormControl margin='dense' fullWidth>
            <CustomTextField
              shrink ={true}
              label='Overspeed Limit'
              inputProps={{ maxLength: 2 }}
              disabled={showEdit}
              defaultValue={profiledata?.overSpeed ? profiledata?.overSpeed : 'overSpeed'}
              error={Boolean(errors?.overSpeed)}
              helperText={errors?.overSpeed?.message}
              {...register('overSpeed')}
              onKeyDown={e => {
                let NumberRegex = /^[a-z-A-Z’/`~!#*$@_%+=.,^&(){}[\]|;:'"”<>?\\]$/;
                if (NumberRegex.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </FormControl>
          {showEdit ? (
            <Box>
              <CustomButton variant='contained' category='Edit' onClick={handleEdit} />
            </Box>
          ) : (
            <Box sx={{ mt: '12px  ' }}>
              <CustomButton
                category='Cancel'
                onClick={() => {
                  reset({
                    userName: profiledata?.userName,
                    displayName: profiledata?.displayName,
                    userBio: profiledata?.userBio,
                    email: profiledata?.email,
                    dateOfBirth: profiledata?.dateOfBirth,
                    mobileNumber: profiledata?.mobileNumber,
                    overSpeed: profiledata?.overSpeed
                  });
                  setCalendar(null);
                  setShowEdit(true);
                }}
              />
              <CustomButton category='Save' type='submit' sx={{ marginLeft: '10px' }} />
            </Box>
          )}
        </Box>
      </Card>
      <Dialog
        open={isupdate}
        onClose={() => {
          setShowEdit(true);
          setIsUpdate(true);
        }}
      >
        <DialogTitle>
          <Typography component='h6'>{`Are you sure want to update the profile ? `}</Typography>
        </DialogTitle>
        <DialogActions>
          <CustomButton
            category='No'
            onClick={() => {
              setIsUpdate(false);
            }}
          />
          <CustomButton
            category='Yes'
            type='submit'
            onClick={profileOnSubmit}
            loading={isLoading}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyProfile;
