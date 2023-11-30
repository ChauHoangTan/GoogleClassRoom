import { useEffect, useState } from 'react'
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
import { ResetPasswordValidation } from '../../../components/validation/userValidation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordService } from '../../../redux/APIs/authServices'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
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

const ResetPassword = () => {
  const { activation_token } = useParams()
  const navigate = useNavigate()

  const { type } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')

  // Validate user
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(ResetPasswordValidation) })

  useEffect(() => {
    if (err) {
      toast.error(err)
      setErr('')
      setIsLoading(false)
    }

    if (success) {
      toast.success(success)
      setSuccess('')
      setIsLoading(false)
      navigate('/login')
    }

  }, [err, success, navigate])


  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const res = await resetPasswordService(data.newPassword, activation_token)
      setSuccess(res.message)
    } catch (error) {
      error.message && setErr(error.response.data.message)
    }
  }
  return (
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
                disabled={isLoading}
                variant='contained'
                sx={{ mt: 3, mb: 2, py: 1 }}
              >
                {isLoading ? 'Reset Password' : 'Reseting'}
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </ThemeProvider>
  )
}

export default ResetPassword
