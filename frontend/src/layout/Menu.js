import { Avatar, Collapse, Divider, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import SchoolIcon from '@mui/icons-material/School'
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import BookOutlinedIcon from '@mui/icons-material/BookOutlined'
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined'
import './style.scss'
import { Link } from 'react-router-dom'

const ClassRegisterd = ({ avatar, title, tagline }) => {
  return (
    <Stack direction='row' alignItems='center'>
      <Avatar src={avatar} sx={{ width:'30px', height:'30px' }}/>
      <Stack ml={2}>
        <Typography variant='body-1' sx={{ fontWeight:'bold' }}>{title}</Typography>
        <Typography variant='body-1'>{tagline}</Typography>
      </Stack>
    </Stack>
  )
}

const Tabs = ({ indexTab, setIndexTab }) => {

  const handleOnclick = (index) => {
    setIndexTab(index)
  }

  const [isOpenRegistered, setIsOpenRegisterd] = useState(false)
  const handleIsOpenRegistered = () => {
    setIsOpenRegisterd(isOpenRegistered ? false : true)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders" className='containerPanel'>
        <List>
          <ListItem disablePadding className={`panel ${indexTab === 0 && 'highlight'}`}
            onClick={() => handleOnclick(0)}>
            <Link to='/home' className='link'>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </Link>

          </ListItem>
          <ListItem disablePadding className={`panel ${indexTab === 1 && 'highlight'}`}
            onClick={() => handleOnclick(1)}>
            <Link to='/blog' className='link'>
              <ListItemButton>
                <ListItemIcon>
                  <BookOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Blog" />
              </ListItemButton>
            </Link>

          </ListItem>
          <ListItem disablePadding className={`panel ${indexTab === 2 && 'highlight'}`}
            onClick={() => handleOnclick(2)}>
            <Link to='/myCourse' className='link'>
              <ListItemButton>
                <ListItemIcon>
                  <TaskOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="My Courses" />
              </ListItemButton>
            </Link>

          </ListItem>
        </List>
      </nav>
      <nav aria-label="main mailbox folders" className='containerPanel'>
        <List>
          <ListItem disablePadding className={`panel ${indexTab === 3 && 'highlight'}`}
            onClick={() => handleOnclick(3)}>
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
          <ListItem disablePadding className={`panel ${indexTab === 4 && 'highlight'}`}
            onClick={() => {handleOnclick(4); handleIsOpenRegistered() }}>

            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon/>
              </ListItemIcon>
              <ListItemText primary="Registered" />
              <ListItemIcon>
                {isOpenRegistered ? <ArrowDropDownIcon sx={{ width:'30px', height:'30px' }}/> : <ArrowRightIcon sx={{ width:'30px', height:'30px' }}/>}
              </ListItemIcon>
            </ListItemButton>

          </ListItem>
          <Collapse in={isOpenRegistered} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ListAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Things to do" />
              </ListItemButton>
            </List>
            <Divider/>
            <List>
              <ListItemButton sx={{ pl: 4 }}>
                <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                  title='2310-CLC-AWP-20KTPM2'
                  tagline='Advanced Web Programming'/>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </nav>
      <nav aria-label="third mailbox folders" className='containerPanel'>
        <List>
          <ListItem disablePadding className={`panel ${indexTab === 5 && 'highlight'}`}
            onClick={() => handleOnclick(5)}>
            <ListItemButton>
              <ListItemIcon>
                <SystemUpdateAltIcon />
              </ListItemIcon>
              <ListItemText primary="Archived class" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={`panel ${indexTab === 6 && 'highlight'}`}
            onClick={() => handleOnclick(6)}>
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

function Menu() {
  const [indexTab, setIndexTab] = useState(0)

  return (
    <Tabs indexTab={indexTab} setIndexTab={setIndexTab}/>
  )
}

export default Menu