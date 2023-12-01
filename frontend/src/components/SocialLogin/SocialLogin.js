import React from 'react'
// material-ui
import { useTheme } from '@mui/material/styles'
import { useMediaQuery, Button, Stack } from '@mui/material'

// assets
import Google from './../../assets/img/icons/google.svg'
import Facebook from './../../assets/img/icons/facebook.svg'

function SocialLogin() {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'))

    const handleGoogleLogin = () => {
        // Handle when user click login by Google
        window.open('http://localhost:5000/api/auth/google', '_self')
    }
    
    const handleFacebookLogin = () => {
        // Handle when user click login by Facebook
        window.open('http://localhost:5000/api/auth/facebook', '_self')
    }

    return (
        <Stack
        direction="row"
        spacing={matchDownSM ? 1 : 2}
        justifyContent={matchDownSM ? 'space-around' : 'space-between'}
        sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
      >
        <Button
          variant="outlined"
          color="secondary"
          fullWidth={!matchDownSM}
          startIcon={<img src={Google} alt="Google" />}
          onClick={handleGoogleLogin}
        >
          {!matchDownSM && 'Google'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth={!matchDownSM}
          startIcon={<img src={Facebook} alt="Facebook" />}
          onClick={handleFacebookLogin}
        >
          {!matchDownSM && 'Facebook'}
        </Button>
      </Stack>
    )
}

export default SocialLogin