import { Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import './style.scss'
import HomePageContent from './homePageContent/HomePageContent';
const Tabs = ({indexTab, setIndexTab}) => {

    const handleOnclick = (index) => {
        setIndexTab(index)
    }

    return ( 
        <Stack direction='column' sx={{color:'#414756'}}>

            <Stack className='containerPanel'>
            
                <Stack direction='row' className={`panel ${indexTab === 0 && 'highlight'}`}
                     onClick={() => handleOnclick(0)} >
                    <HomeIcon/> 
                    <Typography variant='body-1' ml={2}>Home</Typography>
                </Stack>
               
                <Stack direction='row' className={`panel ${indexTab === 1 && 'highlight'}`}
                    onClick={() => handleOnclick(1)}>
                    <CalendarTodayIcon/> 
                    <Typography variant='body-1' ml={2}>Calendar</Typography>
                </Stack>
                
                
            </Stack>
         
            <Stack className='containerPanel '>
                <Stack direction='row' className={`panel ${indexTab === 2 && 'highlight'}`}
                    onClick={() => handleOnclick(2)}>
                    <SchoolIcon/> 
                    <Typography variant='body-1' ml={2}>Registered</Typography>
                </Stack>
            </Stack>

            <Stack className='containerPanel'>
                
                <Stack direction='row' className={`panel ${indexTab === 3 && 'highlight'}`}
                     onClick={() => handleOnclick(3)}>
                    <SystemUpdateAltIcon/> 
                    <Typography variant='body-1' ml={2}>Archived class</Typography>
                </Stack>
            
                <Stack direction='row' className={`panel ${indexTab === 4 && 'highlight'}`}
                     onClick={() => handleOnclick(4)}>
                    <SettingsIcon/> 
                    <Typography variant='body-1' ml={2}>Setting</Typography>
                </Stack>
                
            </Stack>
            
        </Stack>
    )
}

function Home() {
    const [indexTab, setIndexTab] = useState(0)

    return ( 

        <Grid container id='home'>
            <Grid item xs={3} className='grid1'>
                <Tabs indexTab={indexTab} setIndexTab={setIndexTab}/>
            </Grid>

            <Grid item xs={9} className='grid2'>
                <HomePageContent />
            </Grid>
        </Grid>
     );
}

export default Home;