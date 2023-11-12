import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { PasswordValidation } from '../../components/Validation/userValidation';
import { changePasswordAction } from '../../redux/actions/userActions';

const defaultTheme = createTheme();

function Password() {
    const dispatch = useDispatch();
    const  { isLoading, isError, message, isSuccess } = useSelector(
        (state) => state.userChangePassword
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(PasswordValidation),
    });

   // on submit
    const onSubmit = (data) => {
        dispatch(changePasswordAction(data));
    };

// useEffect
useEffect(() => {
    if (isSuccess) {
        dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (isError) {
        toast.error(isError);
        dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (message) {
        toast.success(message);
        reset();
    }
}, [isSuccess, isError, message, reset, dispatch]);

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
                        Change Password
                    </Typography>
                    <Box 
                        component="form" 
                        noValidate 
                        onSubmit={handleSubmit(onSubmit)}  
                        sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}
                    >
                            <TextField
                                required
                                fullWidth
                                id="oldPassword"
                                label="Old Password"
                                type="password"
                                name="oldPassword"
                                {...register('oldPassword')}
                                error={!!errors.oldPassword}
                                helperText={errors.oldPassword?.message || ''}
                            />
                        </Grid>
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
                            type="submit"
                            disabled={isLoading}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoading ? "Changing..." : "Change Password"}
                        </Button>                       
                    </Box>
                    </Box>
                </Container>
            </Grid>

        </ThemeProvider>
    );
}

export default Password; 