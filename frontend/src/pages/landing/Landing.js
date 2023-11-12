import { Grid, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import React from 'react';
import './style.scss'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const theme = createTheme({
    palette:{
        primary:{
            main: '#439FFF',
        },
        secondary:{
            main: '#00EBBE'
        },
        
    }
})

const Introduction = () => {
    return (
        <ThemeProvider theme={theme}>
            <Stack direction='row' justifyContent='center' mt={2}>
                <Grid2 container sx={{width:'80%'}} alignItems='center'>
                    <Grid xs='8'>
                        <Stack direction='column' alignItems='center' justifyContent='center' className='containerText'>
                            <Typography variant='h4' mt={5}>
                                Welcome to Google Classroom!
                            </Typography>
                            <Typography variant='h5'>
                                Come to us, we will bring you the best education experience!
                            </Typography>
                        </Stack>
                    </Grid>
                        <img
                            src='https://i.pinimg.com/564x/1c/50/31/1c5031952f93d4bf890253d8f5283549.jpg'/>
                    <Grid xs='8'>

                    </Grid>
                </Grid2>
            </Stack>
            
            
        </ThemeProvider>
    )
}

function Landing() {
    return ( 
        <>
            <div className='introduction'>
                <Introduction/>
            </div>
            
        </>
     );
}

export default Landing;