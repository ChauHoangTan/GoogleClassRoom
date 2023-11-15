import './style.scss';
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
import { Container } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { loginAction } from '../../redux/actions/userActions';
import { useEffect } from 'react';
import toast from "react-hot-toast";
import { LoginValidation } from "../../components/validation/userValidation";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FiLogIn } from 'react-icons/fi';
// const defaultTheme = createTheme()
const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#466874',
        },
        secondary: {
            main: '#f2f2f2'
        },

    }
})

function Login({rememberMe, setRememberMe}) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, userInfo, isSuccess } = useSelector(
        (state) => state.userLogin
    );

    // Validate user 
    const { 
        register, 
        setValue,
        handleSubmit, 
        formState: {errors} 
    } = useForm({ resolver: yupResolver(LoginValidation) })

    // On submit
    const onSubmit = (data) => {
        dispatch(loginAction(data));
        if (rememberMe) {
            localStorage.setItem('rememberedCheck', rememberMe);
            localStorage.setItem('rememberedUsername', data.userName);
            localStorage.setItem('rememberedPassword', data.password);
        } else {
            localStorage.removeItem('rememberedUsername');
            localStorage.removeItem('rememberedPassword');
        }
    };

    const handleRememberMeChange = () => {
        setRememberMe((prevRememberMe) => !prevRememberMe);
    };

    useEffect(() => {
        const rememberedCheck = localStorage.getItem('rememberedCheck');
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        const rememberedPassword = localStorage.getItem('rememberedPassword');
        
        if (rememberMe) {
            setRememberMe(rememberedCheck);
            setValue("userName", rememberedUsername);
            setValue("password", rememberedPassword);
        } 
    },[]);

    // useEffect
    useEffect(() => {
        if (userInfo) {
            navigate("/home");
        }

        if (isSuccess) {
            toast.success(`Welcome back ${userInfo?.firstName} ${userInfo?.lastName}`);
        }
        if (isError) {
            toast.error(isError);
            dispatch({ type: "USER_LOGIN_RESET" });
        }
    }, [userInfo, isSuccess, isError, navigate, dispatch]);    

    const handleGoogleLogin = () => {
        // Handle when user click login by Google
        console.log('Google login clicked');
    };
    
    const handleFacebookLogin = (response) => {
        // Handle when user click login by Facebook
        console.log('Facebook login response:', response);
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
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center'
            }}
        >
            <Container sx={{ width: '100%' }}>
                <Typography component="h1" sx={{fontFamily: 'FingerPaint', fontSize: '100px', color: 'white'}}>
                    Google Class Room
                </Typography>

                <Typography sx={{fontFamily: 'FingerPaint', fontSize: '30px', color: 'white'}} marginTop={4}>
                    Building a High-Quality Online Learning Platform - Connecting Knowledge, Elevating Wisdom!
                </Typography>
            </Container>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
            sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{fontSize: '60px', fontWeight: 'bold', color: '#465d74'}}>
                    Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="userName"
                        autoComplete="userName"
                        autoFocus
                        {...register("userName")}
                        error={!!errors.userName}
                        helperText={errors.userName?.message || ''}
                    />
                    <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            id="password"
                            autoComplete="current-password"
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
                    <FormControlLabel
                        control={<Checkbox onChange={handleRememberMeChange} checked={rememberMe} value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, p: 2, borderRadius: 50}}
                        disabled={isLoading}
                    >
                        {
                            isLoading ? (
                                "Loading..." 
                            ) : (
                                <>
                                    <FiLogIn /> Sign In
                                </>
                            )
                        }
                    </Button>
                    <Grid container sx={{justifyContent: 'flex-end'}}>
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
                        <Typography sx={{ mt: 2, pb: 2, mr: 4, fontSize: '20px' }}>
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
    </ThemeProvider>
    );
}

export default Login; 