import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { activationEmailService } from '../../../redux/APIs/authServices'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, ThemeProvider, Typography, createTheme } from '@mui/material'

import ErrorIcon from './../../../assets/img/error.png'
import SuccessIcon from './../../../assets/img/success.png'
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

function ActivationEmail() {
  const initialized = useRef(false)
  const navigate = useNavigate()

  const { activation_token } = useParams()
  const [err, setErr] = useState('')
  const [isValidUrl, setIsValidUrl] = useState(true)
  const [success, setSuccess] = useState('')
  const [open, setOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (activation_token) {
      if (!initialized.current) {
        initialized.current = true
        const activateEmail = async () => {
          try {
            const res = await activationEmailService({ activation_token })
            setSuccess(res.message)
            setIsValidUrl(true)
          } catch (error) {
            error.message && setErr(error.response.data.message)
            setIsValidUrl(false)
          }
          setIsLoading(false)
        }
        activateEmail()
      }
    }
  }, [activation_token])

  const handleClose = () => {
    setOpen(false)
    navigate('/login')
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
            alignItems: 'center'
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
              height: '100vh',
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
              <Dialog open={open} onClose={handleClose}>
                <Box sx={{ padding: 2 }}>
                  <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={isValidUrl ? SuccessIcon : ErrorIcon} alt={isValidUrl ? 'success-icon' : 'error-icon'} style={{ width: '88px', height: '88px' }}/>
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
                    Verify registered email address
                    </Typography>
                  </DialogTitle>
                  <DialogContent sx={{ textAlign: 'center' }}>
                    <Typography
                      sx={{
                        fontSize: '20px',
                        fontWeight: '500'
                      }}
                    >
                      {isValidUrl ? success : err}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        mt: 1
                      }}
                    >
                        Please log in to use your account
                    </Typography>
                  </DialogContent>
                  <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      sx={{ py: 1, px: 2 }}
                      color="primary"
                    >
                    Back to Login
                    </Button>
                  </DialogActions>
                </Box>
              </Dialog>
            </Container>
          </Grid>
        </ThemeProvider>
      )}
    </>
  )
}

export default ActivationEmail