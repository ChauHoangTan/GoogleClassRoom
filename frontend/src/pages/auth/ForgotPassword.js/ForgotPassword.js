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
import { forgotPasswordService } from '../../../redux/APIs/userServices'
import toast from 'react-hot-toast'
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
  // Validate user
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(ForgotPasswordValidation) })

  const onSubmit = async (data) => {
    try {
      const res = await forgotPasswordService(data)
      toast.success(res.message)
    } catch (error) {
      error.message && toast.error(error.response.data.message)
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
              Forgot Password
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
                sx={{ mt: 3, mb: 2, py: 1 }}
              >
                Verify your email
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </ThemeProvider>
  )
}

export default ForgotPassword
