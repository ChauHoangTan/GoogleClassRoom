import React, { useEffect } from 'react';
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
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerAction } from '../../redux/actions/userActions';
import { useForm } from 'react-hook-form';
import { RegisterValidation } from '../../components/validation/userValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import toast from 'react-hot-toast';

const defaultTheme = createTheme();

function Register() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [agreeTerm, setAgreeTerm] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, userInfo, isSuccess } = useSelector(
        (state) => state.userRegister
    ); 

    // validate user
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RegisterValidation),
    })

      // useEffect
      useEffect(() => {
        if( userInfo) {
            navigate("/profile");
        }
        if (isSuccess) {
            toast.success(`Welcome ${userInfo?.firstName} ${userInfo?.lastName}`);
            dispatch({ type: "USER_REGISTER_RESET" });
        }
        if (isError) {
            toast.error(isError);
            dispatch({ type: "USER_REGISTER_RESET" });
        }
    }, [userInfo, isSuccess, isError, navigate, dispatch]);

    // onSubmit
    const onSubmit = (data) => {
        if (!agreeTerm) {
            toast.error('Please agree to the terms and conditions to be register new account');
            return;
        }
        dispatch(registerAction(data));
    };

    const handleTermCheckBox = () => {
        setAgreeTerm(!agreeTerm);
    }

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
                <Container maxWidth="xs" component={Paper} elevation={6}
                    sx={{
                        padding: 5,
                        borderRadius: 5
                    }}
                >
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
                    <Typography component="h1" variant="h5" sx={{fontSize: '60px'}}>
                        Sign up
                    </Typography>
                    <Box 
                        component="form" 
                        noValidate 
                        onSubmit={handleSubmit(onSubmit)} 
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    {...register("firstName")}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    {...register("lastName")}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    name="userName"
                                    {...register("userName")}
                                    error={!!errors.userName}
                                    helperText={errors.userName?.message || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                id="password"
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message || ''}
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value={agreeTerm} onChange={handleTermCheckBox} color="primary" />}
                                    label="I agree to the terms and conditions"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, p: 2, borderRadius: 50 }}
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
        </ThemeProvider>
    );
}

export default Register; 