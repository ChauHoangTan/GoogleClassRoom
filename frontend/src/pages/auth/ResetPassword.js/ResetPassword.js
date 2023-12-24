import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  ThemeProvider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog
} from '@mui/material'
import { createTheme } from '@mui/material'
import { ResetPasswordValidation } from '../../../components/validation/userValidation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { checkResetPasswordUrlService, resetPasswordService } from '../../../redux/APIs/authServices'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorIcon from './../../../assets/img/error.png'
import Loader from '../../../components/notification/Loader'

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

const ResetPassword = () => {
  const { activation_token } = useParams()
  const navigate = useNavigate()
  const initialized = useRef(false)

  const [isLoadingReset, setIsLoadingReset] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [err, setErr] = useState('')
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [success, setSuccess] = useState('')
  const [open, setOpen] = useState(true)

  // Validate user
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(ResetPasswordValidation) })

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      const activateEmail = async () => {
        try {
          const res = await checkResetPasswordUrlService(activation_token)
          setErr('')
          setIsValidUrl(true)
        } catch (error) {
          setErr(error.response.data.message)
        }
        setIsLoading(false);
      }
      activateEmail()

    }
  }, [])

  useEffect(() => {
    if (isValidUrl) {
      if (err) {
        toast.error(err)
        setErr('')
        setIsLoadingReset(false)
      }

      if (success) {
        toast.success(success)
        setSuccess('')
        setIsLoadingReset(false)
        navigate('/login')
      }
    }

  }, [err, success, navigate, isValidUrl])

  const handleClose = () => {
    setOpen(false)
    navigate('/login')
  }

  const onSubmit = async (data) => {
    setIsLoadingReset(true)
    try {
      const res = await resetPasswordService(data.newPassword, activation_token)
      setSuccess(res.message)
    } catch (error) {
      error.message && setErr(error.response.data.message)
    }
  }

  return (
    <>
    {isLoading ? (
    <Grid
        container
        sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        maxWidth='xs'
    >
        <Loader />
    </Grid>
    ) : (
        <ThemeProvider theme={defaultTheme}>
        <Grid
            container
            sx={{
            height: '120vh',
            backgroundImage:'url(https://source.unsplash.com/random?wallpapers)',
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
            {isValidUrl ? (
                <Box
                sx={{
                    marginTop: 4,
                    marginBottom: 4,
                    textAlign: 'center'
                }}
                >
                <Typography
                    component='h1'
                    variant='h5'
                    sx={{
                    fontSize: '40px',
                    fontWeight: 'bold',
                    color: 'primary.main'
                    }}
                >
                            Reset Password
                </Typography>
                <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type="password"
                        id="newPassword"
                        {...register('newPassword')}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword')}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message || ''}
                        />
                    </Grid>
                    </Grid>
                    <Button
                    type='submit'
                    fullWidth
                    disabled={isLoadingReset}
                    variant='contained'
                    sx={{ mt: 3, mb: 2, py: 1 }}
                    >
                    {isLoadingReset ? 'Reset Password' : 'Reseting'}
                    </Button>
                </Box>
                </Box>
            ) : (
                <Dialog open={open} onClose={handleClose}>
                <Box sx={{ padding: 2 }}>
                    <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={ErrorIcon} alt="error-icon" style={{ width: '88px', height: '88px' }}/>
                    <Typography
                        component='h1'
                        variant='h5'
                        sx={{
                        fontWeight: 'bold',
                        mt: '24px',
                        color: '#545454',
                        fontSize: '30px'
                        }}
                    >
                        Reset Password
                    </Typography>
                    </DialogTitle>
                    <DialogContent sx={{ textAlign: 'center' }}>
                    <Typography
                        sx={{
                        fontSize: '20px',
                        fontWeight: '500'
                        }}
                    >
                        {err}
                    </Typography>
                    <Typography
                        sx={{
                        fontSize: '16px',
                        mt: 1
                        }}
                    >
                        Please click the Forgot Password again
                    </Typography>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        sx={{ py: 1, px: 2 }}
                        color="primary"
                    >
                        Back To Login
                    </Button>
                    </DialogActions>
                </Box>
                </Dialog>
            )}
            </Container>
        </Grid>
        </ThemeProvider>
    )}
    </>
  )
}

export default ResetPassword
