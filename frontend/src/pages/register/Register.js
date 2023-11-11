import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Snackbar, Alert } from '@mui/material';
import './style.scss';

const defaultTheme = createTheme();

function Register() {

    const handleSubmit = async (event) => {

        event.preventDefault();
        
        if (inputUserNameValue === '' || inputUserNameValue === '' || inputFirstNameValue === '' || inputLastNameValue === '') {
            setNotificationOpen(true);
            setErrorMessage("Please fill in the blank field");
        } else if (inputPasswordValue.length < 6) {
            setNotificationOpen(true);
            setErrorMessage("Password must be greater than 6 characters");
        } else if (!agreeTerm) {
            setNotificationOpen(true);
            setErrorMessage("You must agree to our terms in order to create an account");
        } else {

            const data = new FormData(event.currentTarget);
            console.log({
                fullName: data.get('firstName') + ' ' + data.get('lastName'),
                userName: data.get('userName'),
                password: data.get('password'),
            });
        }
    };

    const [inputUserNameValue, setInputUserNameValue] = useState('');
    const [inputPasswordValue, setInputPasswordValue] = useState('');
    const [inputFirstNameValue, setInputFirstNameValue] = useState('');
    const [inputLastNameValue, setInputLastNameValue] = useState('');
    const [agreeTerm, setAgreeTerm] = useState(false);

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

    const handleInputFirstNameChange = (event) => {
        // TODO: Handle change first name
        const newInputValue = event.target.value;
        setInputFirstNameValue(newInputValue);
    };

    const handleInputLastNameChange = (event) => {
        // TODO: Handle change last name
        const newInputValue = event.target.value;
        setInputLastNameValue(newInputValue);
    };

    const handleAgreeTermChange = (event) => {
        setAgreeTerm(event.target.checked);
    };

    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setNotificationOpen(false);
    };
      
    return ( 
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Grid container 
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
                <Container maxWidth="xs" component={Paper} elevation={6}>
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 4,
                        marginBottom: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Typography component="h1" variant="h5" sx={{fontFamily: 'FingerPaint', fontSize: '40px'}}>
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            value={inputFirstNameValue}
                            onChange={handleInputFirstNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            value={inputLastNameValue}
                            onChange={handleInputLastNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            name="userName"
                            autoComplete="userName"
                            value={inputUserNameValue}
                            onChange={handleInputUserNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={inputPasswordValue}
                            onChange={handleInputPasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="agreeTerm" color="primary" />}
                                label="I agree to the terms and conditions"
                                checked={agreeTerm}
                                onChange={handleAgreeTermChange}
                            />
                        </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Login
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                    </Box>
                </Container>
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

export default Register; 