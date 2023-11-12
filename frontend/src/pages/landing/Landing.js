import { Grid, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import React from 'react';
import './style.scss'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate()
    const handleClickBthStart = () => {
        navigate('/login')
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack direction='row' justifyContent='center' mt={1}>
                <Grid container sx={{width:'100%',backgroundColor:'#9CB3E9'}} alignItems='center'>
                    <Grid item xs='6' >
                        <Stack direction='column' alignItems='center' justifyContent='center' className='containerText'>
                            <Stack direction='column' alignItems='center' justifyContent='center' className='containerText'
                                    sx={{width:'90%'}}>
                                <Typography variant='h4' mt={5} className='title'>
                                    Welcome to Google Classroom!
                                </Typography>
                                <Typography variant='h6' className='title'>
                                    Come to us, we will bring you the best education experience!
                                </Typography>
                                <Typography variant='body-1' mt={3}
                                    sx={{fontSize:'16px'}}>
                                    Greetings, educators and students alike! We extend a warm welcome to our dedicated space 
                                    for Google Classroom, where learning and collaboration thrive. Whether you're a teacher 
                                    shaping minds or a student on a quest for knowledge, this hub is designed with you in mind.
                                </Typography>
                                <button className='btnStart'>Let's Start</button>
                            </Stack>
                        </Stack>
                    </Grid>
                        
                    <Grid item xs='6'>
                        <Stack direction='column' className='containerImg'>
                            <div className='circular'></div>
                            <img src='https://www.distancelearningcollege.co.uk/wp-content/uploads/2022/02/Online-learning-scaled.jpg'/>
                            <img src='https://assets-global.website-files.com/61a05ff14c09ecacc06eec05/61f5868b789816331ac6af01_5_Benefits_of_Online_Education.png'/>
                        </Stack>
                    </Grid>
                </Grid>
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