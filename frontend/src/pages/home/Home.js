import {Stack } from '@mui/material';
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './style.scss'
import HomePageContent from './homePageContent/HomePageContent';
const Tabs = ({indexTab, setIndexTab}) => {

    const handleOnclick = (index) => {
        setIndexTab(index)
    }

    const [isOpenRegistered, setIsOpenRegisterd] = useState(false)
    const handleIsOpenRegistered = () =>{
        setIsOpenRegisterd(isOpenRegistered ? false : true)
    }

    return ( 
        // <Stack direction='column' sx={{color:'#414756'}}>

        //     <Stack className='containerPanel'>
            
        //         <Stack direction='row' className={`panel ${indexTab === 0 && 'highlight'}`}
        //              onClick={() => handleOnclick(0)} >
        //             <HomeIcon/> 
        //             <Typography variant='body-1' ml={2}>Home</Typography>
        //         </Stack>
               
        //         <Stack direction='row' className={`panel ${indexTab === 1 && 'highlight'}`}
        //             onClick={() => handleOnclick(1)}>
        //             <CalendarTodayIcon/> 
        //             <Typography variant='body-1' ml={2}>Calendar</Typography>
        //         </Stack>
                
                
        //     </Stack>
         
        //     <Stack className='containerPanel '>
        //         <Stack direction='row' className={`panel ${indexTab === 2 && 'highlight'}`}
        //             onClick={() => handleOnclick(2)}>
        //             <SchoolIcon/> 
        //             <Typography variant='body-1' ml={2}>Registered</Typography>
        //         </Stack>
        //     </Stack>

        //     <Stack className='containerPanel'>
                
        //         <Stack direction='row' className={`panel ${indexTab === 3 && 'highlight'}`}
        //              onClick={() => handleOnclick(3)}>
        //             <SystemUpdateAltIcon/> 
        //             <Typography variant='body-1' ml={2}>Archived class</Typography>
        //         </Stack>
            
        //         <Stack direction='row' className={`panel ${indexTab === 4 && 'highlight'}`}
        //              onClick={() => handleOnclick(4)}>
        //             <SettingsIcon/> 
        //             <Typography variant='body-1' ml={2}>Setting</Typography>
        //         </Stack>
                
        //     </Stack>
            
        // </Stack>

    //     <List
        //   sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        //   component="nav"
        //   aria-labelledby="nested-list-subheader"
        //   subheader={
        //     <ListSubheader component="div" id="nested-list-subheader">
        //       Nested List Items
        //     </ListSubheader>
        //   }
        // >
        //   <ListItemButton>
        //     <ListItemIcon>
        //       <SendIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="Sent mail" />
        //   </ListItemButton>

        //   <ListItemButton>
        //     <ListItemIcon>
        //       <DraftsIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="Drafts" />
        //   </ListItemButton>

        //   <ListItemButton onClick={handleClick}>
        //     <ListItemIcon>
        //       <InboxIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="Inbox" />
        //     {open ? <ExpandLess /> : <ExpandMore />}
        //   </ListItemButton>

        //   <Collapse in={open} timeout="auto" unmountOnExit>
        //     <List component="div" disablePadding>
        //       <ListItemButton sx={{ pl: 4 }}>
        //         <ListItemIcon>
        //           <StarBorder />
        //         </ListItemIcon>
        //         <ListItemText primary="Starred" />
        //       </ListItemButton>
        //     </List>
        //   </Collapse>

        // </List>

        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders" className='containerPanel'>
                <List>
                    <ListItem disablePadding className={`panel ${indexTab === 0 && 'highlight'}`}
                        onClick={() => handleOnclick(0)}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding className={`panel ${indexTab === 1 && 'highlight'}`}
                        onClick={() => handleOnclick(1)}>
                        <ListItemButton>
                            <ListItemIcon>
                                <CalendarTodayIcon />
                            </ListItemIcon>
                            <ListItemText primary="Calendar" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <nav aria-label="secondary mailbox folders" className='containerPanel'>
                <List>
                    <ListItem disablePadding className={`panel ${indexTab === 2 && 'highlight'}`}
                        onClick={() => {handleOnclick(2); handleIsOpenRegistered() }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <SchoolIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Registered" />
                            <ListItemIcon>
                                {isOpenRegistered ? <ArrowDropDownIcon sx={{width:'30px', height:'30px'}}/> : <ArrowRightIcon  sx={{width:'30px', height:'30px'}}/>}
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <nav aria-label="secondary mailbox folders" className='containerPanel'>
                <List>
                    <ListItem disablePadding className={`panel ${indexTab === 3 && 'highlight'}`}
                        onClick={() => handleOnclick(3)}>
                        <ListItemButton>
                            <ListItemIcon>
                                <SystemUpdateAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Archived class" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding className={`panel ${indexTab === 4 && 'highlight'}`}
                        onClick={() => handleOnclick(4)}>
                        <ListItemButton>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Setting" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    )
}

function Home() {
    const [indexTab, setIndexTab] = useState(0)

    return ( 

        <Stack direction='row' container id='home'>
            <div item className='grid1' style={{flex:'0 0 350px'}}>
                <Tabs indexTab={indexTab} setIndexTab={setIndexTab}/>
            </div>

            <div item className='grid2' style={{flexGrow:'1'}}>
                <HomePageContent />
            </div>
        </Stack>
     );
}

export default Home;