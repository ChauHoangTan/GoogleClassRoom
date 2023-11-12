import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
  ThemeProvider,
} from '@mui/material';
import { Alert } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ProfileValidation } from '../../components/validation/userValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfileAction } from '../../redux/actions/userActions';
import toast from 'react-hot-toast';
import ImagePreview from '../../components/ImagePreview/ImagePreview';
import Uploader from '../../components/Uploader/Uploader';

const defaultTheme = {}; // Bạn có thể thêm các cài đặt theme tùy chọn ở đây

const EditProfile = () => {
  const [date, setDate] = useState(dayjs());

  const dispatch = useDispatch();
  const { userInfo } = useSelector(
      (state) => state.userLogin
  ); 
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "")
  const { isLoading, isError, isSuccess } = useSelector(
      (state) => state.userUpdateProfile
  );

   // validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  })

  // update profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  };

  
  // useEffect
  useEffect(() => {
    if (userInfo) {
        setValue("userName", userInfo?.userName);
        setValue("firstName", userInfo?.firstName);
        setValue("lastName", userInfo?.lastName);
        setValue("email", userInfo?.email);
        setValue("phone", userInfo?.phone);
        setDate(userInfo?.dob === "" ? dayjs() : userInfo?.dob);
    }   

    if(isSuccess) {
        dispatch({ type: "USER_UPDATE_PROFILE_RESET"});
    }
    if(isError) {
        toast.error(isError);
        dispatch({ type: "USER_UPDATE_PROFILE_RESET"});
        dispatch({ type: "USER_DELETE_PROFILE_RESET" });
    }

  }, [userInfo, setValue, isSuccess, isError, dispatch])

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid
        container
        sx={{
          height: '100vh',
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        maxWidth="xs"
      >
        <Container maxWidth="sm"  margin={4} component={Paper} elevation={6}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontFamily: 'FingerPaint', fontSize: '40px' }}
            >
              Edit Profile
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                  <Uploader setImageUrl={setImageUrl} />
                </Grid>
                {/* image preview */}
                <Grid item xs={12} sm={3}>
                  <ImagePreview 
                    image={imageUrl}
                    name={userInfo ? userInfo.name : "user-image"} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="userName"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      name="firstName"
                      required
                      fullWidth
                      autoFocus
                      id="firstName"
                      label="First Name"
                      {...register("firstName")}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      {...register("lastName")}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message || ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    {...register("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone?.message || ''}
                  />
                </Grid>
              
                <Grid item xs={12} sm={6} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label="Date of birth"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Button  disabled={isLoading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </ThemeProvider>
  );
};

export default EditProfile;