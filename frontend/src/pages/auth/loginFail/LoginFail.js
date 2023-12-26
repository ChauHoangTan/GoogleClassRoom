import './style.scss'

import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, Button } from '@mui/material'
import ErrorIcon from './../../../assets/img/error.png'
import { useState } from 'react'

function LoginFail() {
  const { provider, error } = useParams()
  const [open, setOpen] = useState(true)

  const navigate = useNavigate()
  const handleClose = () => {
    setOpen(false)
    navigate('/login')
  }


  return (
    <div>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item>
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
                    Login By {provider}
                  </Typography>
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: '500',
                      marginLeft: 2,
                      marginRight: 2,
                    }}
                  >
                    Login Fail, Your Account Was {error}
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
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginFail