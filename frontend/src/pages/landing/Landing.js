import { Card, CardContent, Grid, Paper, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import React from 'react';
import './style.scss'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#439FFF',
        },
        secondary: {
            main: '#00EBBE'
        },

    }
})

const Title = ({ children }) => {
    return (
        <Typography variant='body-1' sx={{ fontSize: '30px', fontWeight: 'bold', color: '#347FDB', textDecoration: 'underline 2px solid #347FDB' }}>
            {children}
        </Typography>
    )
}

const Introduction = () => {

    const navigate = useNavigate()
    const handleClickBthStart = () => {
        navigate('/login')
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack direction='row' justifyContent='center' >
                <Grid container sx={{ width: '100%', backgroundColor: '#9CB3E9' }} alignItems='center'>
                    <Grid item xs='6' >
                        <Stack direction='column' alignItems='center' justifyContent='center' className='containerText'>
                            <Stack direction='column' alignItems='center' justifyContent='center' className='containerText'
                                sx={{ width: '90%' }}>
                                <Typography variant='h4' mt={5} className='title'>
                                    Welcome to Google Classroom!
                                </Typography>
                                <Typography variant='h6' className='title'>
                                    Come to us, we will bring you the best education experience!
                                </Typography>
                                <Typography variant='body-1' mt={3}
                                    sx={{ fontSize: '16px' }}>
                                    Greetings, educators and students alike! We extend a warm welcome to our dedicated space
                                    for Google Classroom, where learning and collaboration thrive. Whether you're a teacher
                                    shaping minds or a student on a quest for knowledge, this hub is designed with you in mind.
                                </Typography>
                                <button className='btnStart'
                                    onClick={handleClickBthStart}>Let's Start</button>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid item xs='6'>
                        <Stack direction='column' className='containerImg'>
                            <div className='circular'></div>
                            <img src='https://www.distancelearningcollege.co.uk/wp-content/uploads/2022/02/Online-learning-scaled.jpg' />
                            <img src='https://assets-global.website-files.com/61a05ff14c09ecacc06eec05/61f5868b789816331ac6af01_5_Benefits_of_Online_Education.png' />
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>


        </ThemeProvider>
    )
}

const Famous = () => {
    return (
        <Stack direction='row' justifyContent='center' mt={10}>
            <Stack direction='column' sx={{ width: '90%' }}>
                
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                    <Title>Why Should Use My Google Classroom</Title>
                        <Stack direction='column' mt={6}>
                            <Paper elevation={1} sx={{ borderRadius: '20px' }} className='paperQuantity'>
                                <Grid container spacing={3} justifyContent="center" >
                                    {/* Số liệu 1 */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div align="center">
                                            50M+
                                        </div>
                                        <span align="center">
                                            Teachers use it every day
                                        </span>
                                    </Grid>

                                    {/* Số liệu 2 */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div align="center">
                                            100M+
                                        </div>
                                        <span align="center">
                                            Students participate in class
                                        </span>
                                    </Grid>

                                    {/* Số liệu 3 */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div align="center">
                                            1.5M+
                                        </div>
                                        <span align="center">
                                            Lectures are created every day
                                        </span>
                                    </Grid>

                                    {/* Số liệu 4 */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <div align="center">
                                            95%
                                        </div>
                                        <span align="center">
                                            User satisfaction
                                        </span>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Typography variant='body-1' mt={2}>
                                <li>
                                    <Typography variant='body-1' sx={{fontWeight:'bold'}}>Seamless Integration with Google Services: </Typography>
                                    Google Classroom seamlessly integrates with other
                                    Google services such as Google Drive, Google Docs, and Google Calendar. </li>
                                 
                            </Typography>

                            <Typography variant='body-1' mt={1}>
                                <li>
                                    <Typography variant='body-1' sx={{fontWeight:'bold'}}>User-Friendly and Intuitive Interface: </Typography>
                                    Google Classroom offers a user-friendly and
                                    intuitive interface that is accessible for both teachers and students. 
                                </li>
                                
                                 
                            </Typography>

                            <Typography variant='body-1' mt={1}>
                                <li>
                                    <Typography variant='body-1' sx={{fontWeight:'bold'}}>Powerful Collaboration and Communication Tools: </Typography>
                                    Google Classroom provides powerful tools for real-time collaboration 
                                    and communication.
                                </li>
                                
                            </Typography>
                        </Stack>

                    </Grid>

                    <Grid item xs={4}>
                        <img 
                            className='img'
                            src='https://i.pinimg.com/564x/03/f2/34/03f23479c81a356126bc1ba54a091c0f.jpg'/>
                    </Grid>
                </Grid>
            </Stack>

        </Stack>
    )
}

const Features = () => {
    return (
        <Stack direction='column' alignItems='center' mt={10}>
            <Stack sx={{width:'90%'}}>
                <Title>Features</Title>
            </Stack>
            
            <Grid container sx={{width:'90%'}} spacing={2} className='gridFeatures' mt={2}>
                
                <Grid item xs={3}>
                    <Card variant='outlined' sx={{padding:'10px 20px', boxShadow:'1px 2px 2px #A5ABBD'}}>
                        <img src='https://i.pinimg.com/564x/4a/30/13/4a30135c32abbea9693ce564b7f02348.jpg'/>
                        <CardContent>
                            <Typography variant='body-1' sx={{fontWeight:'bold'}}>Effortless Class Management: </Typography>Streamline your classes with the power of Google Classroom. 
                            Manage assignments, share resources, and foster collaboration seamlessly.
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card variant='outlined' sx={{padding:'10px 20px', boxShadow:'1px 2px 2px #A5ABBD'}}>
                        <img src='https://i.pinimg.com/564x/1f/ec/bc/1fecbc7d8496e7d6a7251d46ca1a84f6.jpg'/>
                        <CardContent>
                            <Typography variant='body-1' sx={{fontWeight:'bold'}}>Empowering Educators: </Typography>Discover tips, tricks,
                             and best practices to maximize your teaching potential with Google Classroom. From innovative assignments 
                             to effective communication strategies, we've got you covered.
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card variant='outlined' sx={{padding:'10px 20px', boxShadow:'1px 2px 2px #A5ABBD'}}>
                        <img src='https://i.pinimg.com/564x/9c/f3/b8/9cf3b8676bcc88bfa2efb1847adefa4e.jpg'/>
                        <CardContent>
                            <Typography variant='body-1' sx={{fontWeight:'bold'}}>Engaging Student Experiences: </Typography>Students, embark
                             on an interactive learning journey! Explore ways to make the most of Google Classroom, participate in discussions, 
                             and elevate your academic experience.
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={3}>
                    <Card variant='outlined' sx={{padding:'10px 20px', boxShadow:'1px 2px 2px #A5ABBD'}}>
                        <img src='https://i.pinimg.com/564x/af/7e/2a/af7e2ad4bea83c4d68a2825d86ff9b3a.jpg'/>
                        <CardContent>
                            <Typography variant='body-1' sx={{fontWeight:'bold'}}> Stay Updated: </Typography>Keep abreast of the latest Google Classroom 
                            features, updates, and educational trends. Our hub is a dynamic space where the learning never stops.
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Stack>
    )
}

function Landing() {
    return (
        <div id='landingPage'>
            <div className='introduction'>
                <Introduction />
            </div>
            <div className='famous'>
                <Famous />
            </div>
            <div className='features'>
                <Features/>
            </div>

        </div>
    );
}

export default Landing;