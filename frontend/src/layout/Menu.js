import { Avatar, Collapse, Divider, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home'
import SchoolIcon from '@mui/icons-material/School'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import './style.scss'
import { Link } from 'react-router-dom'
import theme from '../theme'

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

  const [isOpenTeaching, setIsOpenTeaching] = useState(false)
  const handleIsOpenTeaching = () => {
    setIsOpenTeaching(!isOpenTeaching)
  }

  const [isOpenMyCourses, setIsOpenMyCourses] = useState(false)
  const handleIsOpenMyCourses = () => {
    setIsOpenMyCourses(!isOpenMyCourses)
  }

  return (
    <Box sx={{ width: '100%'
    
    }}>
      <nav aria-label="main mailbox folders" className='containerPanel'>
        <List>
          <ListItem disablePadding className={`panel ${indexTab === 0 && 'highlight'}`}
            onClick={() => handleOnclick(0)}>
            <Link to='/home' className='link' style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
              marginTop: '10px'
            }}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <Typography variant='body-1' color='inherit'
                  sx={{
                    backgroundColor: (theme) => (theme.palette.primary)
                  }}
                >Home</Typography>
              </ListItemButton>
            </Link>

          </ListItem>
          <ListItem disablePadding className={`panel ${indexTab === 1 && 'highlight'}`}
            onClick={() => handleOnclick(1)}>
            <Link to='/notification' className='link' style={{
              color: 'inherit', margin: '10px 0px'
            }}>
              <ListItemButton>
                <ListItemIcon>
                  <NotificationsActiveOutlinedIcon />
                </ListItemIcon>
                <Typography variant='body-1' >Notification</Typography>
              </ListItemButton>
            </Link>

          </ListItem>

        </List>
      </nav>
      <nav aria-label="secondary mailbox folders" className='containerPanel'>
        <List className='link'>
          <ListItem disablePadding className={`panel ${indexTab === 2 && 'highlight'}`}
            onClick={() => {handleOnclick(2); handleIsOpenTeaching() }}>

            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon/>
              </ListItemIcon>
              <ListItemText primary="Teaching" />
              <ListItemIcon>
                {isOpenTeaching ? <ArrowDropDownIcon sx={{ width:'30px', height:'30px' }}/> : <ArrowRightIcon sx={{ width:'30px', height:'30px' }}/>}
              </ListItemIcon>
            </ListItemButton>

          </ListItem>
          <Collapse in={isOpenTeaching} timeout="auto" unmountOnExit>
            <Divider/>
            <List>
              <Stack spacing={2} pl={1} sx={{ height:'100%' }}>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
              </Stack>
            </List>
          </Collapse>
        </List>
      </nav>
      <nav aria-label="third mailbox folders" className='containerPanel'>
        <List className='link'>
          <ListItem disablePadding className={`panel ${indexTab === 3 && 'highlight'}`}
            onClick={() => {handleOnclick(3); handleIsOpenMyCourses() }}>

            <ListItemButton>
              <ListItemIcon>
                <TaskOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary="My Courses" />
              <ListItemIcon>
                {isOpenMyCourses ? <ArrowDropDownIcon sx={{ width:'30px', height:'30px' }}/> : <ArrowRightIcon sx={{ width:'30px', height:'30px' }}/>}
              </ListItemIcon>
            </ListItemButton>

          </ListItem>
          <Collapse in={isOpenMyCourses} timeout="auto" unmountOnExit>
            <Divider/>
            <List>
              <Stack spacing={2} pl={1} sx={{ height:'100%' }}>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
                <ListItemButton>
                  <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                    title='2310-CLC-AWP-20KTPM2'
                    tagline='Advanced Web Programming'/>
                </ListItemButton>
                <Divider/>
              </Stack>

            </List>
          </Collapse>
        </List>
      </nav>
      {/* <nav aria-label="third mailbox folders" className='containerPanel'>
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
            </nav> */}
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