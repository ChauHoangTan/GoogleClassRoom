import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
import { Snackbar, Alert } from '@mui/material';
  
const defaultTheme = createTheme();

function Login() {

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (inputUserNameValue === '' || inputUserNameValue === '') {
            setNotificationOpen(true);
            setErrorMessage("Please fill in the blank field");
        } else if (inputPasswordValue.length < 6) {
            setNotificationOpen(true);
            setErrorMessage("Password must be greater than 6 characters");
        } else {
            
            const data = new FormData(event.currentTarget);
            console.log({
              userName: data.get('userName'),
              password: data.get('password'),
            });
        }
    };

    const handleGoogleLogin = () => {
        // Handle when user click login by Google
        console.log('Google login clicked');
      };
    
      const handleFacebookLogin = (response) => {
        // Handle when user click login by Facebook
        console.log('Facebook login response:', response);
      };
    
    
    const [inputUserNameValue, setInputUserNameValue] = useState('');
    const [inputPasswordValue, setInputPasswordValue] = useState('');

    const [notificationOpen, setNotificationOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputUserNameChange = (event) => {
        const regex = /^\S+$/; 
        const newInputValue = event.target.value;
    
        if (regex.test(newInputValue) || newInputValue === '') {
          setInputUserNameValue(newInputValue);
        } else {
          // Show notification when the input doesn't match the regex pattern
          setNotificationOpen(true);
          setErrorMessage("Username does not contain spaces");
        }
    };

    const handleInputPasswordChange = (event) => {
        // TODO: Handle change password
        const newInputValue = event.target.value;
        setInputPasswordValue(newInputValue);
    };

    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setNotificationOpen(false);
    };
    
    return (
    <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item
            xs={false}
            sm={4}
            md={7}
            sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5"            >
                    Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="userName"
                        autoComplete="userName"
                        autoFocus
                        value={inputUserNameValue}
                        onChange={handleInputUserNameChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={inputPasswordValue}
                        onChange={handleInputPasswordChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                            Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>

                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="10vh">
                        <Typography sx={{ mt: 2, pb: 2, mr: 4 }}>
                            Or login with
                        </Typography>
                        <IconButton 
                            variant="rounded"
                            onClick={handleGoogleLogin}
                            size="large"
                        >
                            <GoogleIcon />
                        </IconButton>
                        <IconButton 
                            variant="rounded"
                            onClick={handleFacebookLogin}
                            size="large"
                        >
                            <FacebookIcon />
                        </IconButton>
                        </Box>
                </Box>
            </Box>
        </Grid>
        </Grid>

        <Snackbar
            open={notificationOpen}
            autoHideDuration={6000}
            onClose={handleNotificationClose}
        >
            <Alert onClose={handleNotificationClose} severity="error">
                {errorMessage}
            </Alert>
        </Snackbar>
    </ThemeProvider>
    );
}

export default Login; 