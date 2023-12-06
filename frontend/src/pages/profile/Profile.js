import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  ThemeProvider
} from '@mui/material'
import { createTheme } from '@mui/material'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { ProfileValidation } from '../../components/validation/userValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { getProfileAction, updateProfileAction } from '../../redux/actions/userActions'
import toast from 'react-hot-toast'
import ImagePreview from '../../components/ImagePreview/ImagePreview'
import Uploader from '../../components/Uploader/Uploader'
import { deleteImageService } from '../../redux/APIs/ImageUpload'
import Loader from '../../components/notification/Loader'

// const defaultTheme = createTheme();
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#466874'
    },
    secondary: {
      main: '#f2f2f2'
    }
  }
})

const EditProfile = () => {
  const [date, setDate] = useState(null)
  const dispatch = useDispatch()
  const initialized = useRef(false)

  const { isError, isLoading, userInfo, isSuccess } = useSelector(
    state => state.userGetProfile
  )

  const [imageUrl, setImageUrl] = useState('')
  const [imageUpdateUrl, setImageUpdateUrl] = useState('')

  const { isLoading: updateLoading, isError: editError, userInfo: editUserInfo, isSuccess: editSuccess } = useSelector(
    state => state.userUpdateProfile
  )

  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ProfileValidation)
  })

  // update profile
  const onSubmit = async data => {
    if (imageUpdateUrl !== imageUrl) {
      await deleteImageService(imageUpdateUrl)
    }
    dispatch(
      updateProfileAction({
        ...data,
        ...{ image: imageUrl, dob: date.format('MM/DD/YYYY') }
      })
    )
  }

  // useEffect
  useEffect(() => {
    if (!initialized.current) {
        initialized.current = true
          const fetchUserInfo = async () => {
            dispatch(getProfileAction())
        }

      fetchUserInfo()
    }
  }, [editSuccess])

  useEffect(() => {
    if (userInfo) {
      setValue('firstName', userInfo?.firstName)
      setValue('lastName', userInfo?.lastName)
      setValue('email', userInfo?.email)
      setValue('phone', userInfo?.phone)
      if (userInfo?.dob !== '') {
        setDate(dayjs(userInfo?.dob))
      }
      userInfo?.image && setImageUrl(userInfo?.image)
    //   userInfo?.image && setImageUpdateUrl(userInfo?.image)
    }

    // if (editUserInfo) {
    //   setValue('firstName', editUserInfo?.firstName)
    //   setValue('lastName', editUserInfo?.lastName)
    //   setValue('email', editUserInfo?.email)
    //   setValue('phone', editUserInfo?.phone)
    //   if (editUserInfo?.dob !== '') {
    //     setDate(dayjs(editUserInfo?.dob))
    //   }
    // //   setImageUpdateUrl(editUserInfo?.image)
    // }

    if (editSuccess) {
      setImageUpdateUrl(editUserInfo?.image)
      dispatch({ type: 'USER_UPDATE_PROFILE_RESET' })
      dispatch({ type: 'USER_GET_PROFILE_RESET' })
    }
    if (editError) {
      toast.error(editError)
      dispatch({ type: 'USER_UPDATE_PROFILE_RESET' })
      dispatch({ type: 'USER_GET_PROFILE_RESET' })
    }
  }, [editUserInfo, setValue, editSuccess, editError, dispatch, userInfo])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        sx={{
          height: '120vh',
          backgroundImage:
                        'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: t =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        maxWidth='xs'
      >
        <Container
          maxWidth='sm'
          margin={4}
          component={Paper}
          elevation={6}
        >
          <Box
            sx={{
              marginTop: 4,
              marginBottom: 4
            }}
          >
            <Typography
              component='h1'
              variant='h5'
              sx={{
                fontSize: '40px',
                fontWeight: 'bold'
              }}
            >
                            Edit Profile
            </Typography>
            {isLoading ? <Loader/> : (
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={9}>
                    <Uploader
                      setImageUrl={setImageUrl}
                      imageUrl={imageUrl}
                      imageUpdateUrl={imageUpdateUrl}
                    />
                  </Grid>
                  {/* image preview */}
                  <Grid item xs={12} sm={3}>
                    <ImagePreview
                      image={imageUrl}
                      name={
                        userInfo
                          ? userInfo.name
                          : 'user-image'
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      {...register('email')}
                      id='email'
                      label='Email'
                      name='email'
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name='firstName'
                      required
                      fullWidth
                      autoFocus
                      id='firstName'
                      label='First Name'
                      {...register('firstName')}
                      error={!!errors.firstName}
                      helperText={
                        errors.firstName?.message || ''
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id='lastName'
                      label='Last Name'
                      name='lastName'
                      {...register('lastName')}
                      error={!!errors.lastName}
                      helperText={
                        errors.lastName?.message || ''
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} sx={{ mt: 1 }}>
                    <TextField
                      fullWidth
                      id='phone'
                      label='Phone'
                      name='phone'
                      autoComplete='phone'
                      required
                      {...register('phone')}
                      error={!!errors.phone}
                      helperText={errors.phone?.message || ''}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                    >
                      <DemoContainer
                        components={['DatePicker']}
                      >
                        <DatePicker
                          label='Date of birth'
                          value={date}
                          onChange={newValue =>
                            setDate(newValue)
                          }
                          error={false}
                          placeholder="MM/DD/YYYY"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Button
                  disabled={updateLoading}
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2, py: 1 }}
                >
                  {updateLoading ? 'Updating...' : 'Update Profile'}
                </Button>
              </Box>

            )}
          </Box>
        </Container>
      </Grid>
    </ThemeProvider>
  )
}

export default EditProfile
