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
import { ForgotPasswordValidation } from '../../../components/validation/userValidation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resendActivationEmailService, forgotPasswordService } from '../../../redux/APIs/authServices'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
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

const ForgotPassword = () => {
  const { type } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')

  // Validate user
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(ForgotPasswordValidation) })

  useEffect(() => {
    if (err) {
      toast.error(err)
      setErr('')
    }

    if (success) {
      toast.success(success)
      setSuccess('')
    }

    setIsLoading(false)
  }, [err, success])

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      if (type === 'forgot') {
        const res = await forgotPasswordService(data)
        setSuccess(res.message)
      } else {
        const res = await resendActivationEmailService(data)
        setSuccess(res.message)
      }
    } catch (error) {
      error.message && setErr(error.response.data.message)
    }
    finally {
      setIsLoading(false) // Reset isLoading to false after success/error
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
              {type === 'forgot' ? 'Forgot Password' : 'Resend activation email'}
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
                    fullWidth
                    {...register('email')}
                    id='email'
                    label='Email'
                    name='email'
                    error={!!errors.email}
                    helperText={errors.email?.message || ''}
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                disabled={isLoading}
                sx={{ mt: 3, mb: 2, py: 1 }}
              >
                { type === 'forgot'
                    ? (
                        isLoading 
                        ? 'Forgetting....'
                        : 'Forgot Password'
                    ) : (
                        isLoading
                        ? 'Verifying....'
                        : 'Verify your email'
                    )
                }
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </ThemeProvider>
  )
}

export default ForgotPassword
