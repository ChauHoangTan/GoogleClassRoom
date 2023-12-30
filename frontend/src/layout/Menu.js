import { Avatar, Collapse, Divider, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
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
import {
  PeopleAlt,
  KingBed,
  Dashboard
} from '@mui/icons-material'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getRoleInClassByUserId } from '../redux/APIs/classServices';

const ClassRegisterd = ({ avatar, name, classCode }) => {

  return (
    <Stack direction='row' alignItems='center'>
      <Avatar src={avatar} sx={{ width:'30px', height:'30px' }}/>
      <Stack ml={2}>
        <Typography variant='body-1' sx={{ fontWeight:'bold', fontSize:'15px' }}>{classCode}</Typography>
        <Typography variant='body-2' sx={{ fontSize:'13px' }}>{name}</Typography>
      </Stack>
    </Stack>
  )
}

const Tabs = ({ indexTab, setIndexTab, classTeaching, classStudying }) => {
  const { userInfo } = useSelector(
    (state) => state.userLogin
  )
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

  const navigate = useNavigate()
  const handleNavigateToClassDetails = (classId) => {
    navigate(`/class/${classId}/stream`)
    window.location.reload()
  }

  const isOpenMenu = useSelector(state => state.isOpenMenu)
  let storePrevStateMenu = useRef(isOpenMenu)
  useEffect (() => {
    if (isOpenMenu != storePrevStateMenu) {
      if (!isOpenMenu) {
        setIsOpenTeaching(false)
        setIsOpenMyCourses(false)
      }
      storePrevStateMenu = isOpenMenu
    }
  }, [isOpenMenu])

  const location = useLocation()
  useEffect (() => {
    const urlInfo = location.pathname.split('/')
    if ( urlInfo[1] === '') {
      setIndexTab(-1)
    } else if ( urlInfo[1] === 'home') {
      setIndexTab(0)
    } else {
      const getRole = async () => {
        const response = await getRoleInClassByUserId(urlInfo[2])
        if ( response.isTeacher == true) {
          setIndexTab(1)
        } else {
          setIndexTab(2)
        }
      }

      getRole()
    }
  }, [location.pathname])

  return (
    userInfo?.isAdmin ? (
      <Box sx={{ width: '100%', bgcolor:'background.paper' }}>
        <nav aria-label="main mailbox folders" className='containerPanel'>
          <List>
            <ListItem disablePadding className={`panel ${indexTab === 0 && 'highlight'}`}
              onClick={() => handleOnclick(0)}>
              <Link to='/dashboard' className='link' style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                color: 'inherit',
                margin: '5px 0px'
              }}>
                <ListItemButton>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <Typography variant='body-1' color='inherit'
                    sx={{
                      backgroundColor: (theme) => (theme.palette.primary)
                    }}
                  >Dashboard</Typography>
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </nav>
        <nav aria-label="secondary mailbox folders" className='containerPanel'>
          <List className='link'>
            <ListItem disablePadding className={`panel ${indexTab === 2 && 'highlight'}`}onClick={() => handleOnclick(2)}>
              <Link to='/users' className='link' style={{
                color: 'inherit', margin: '5px 0px'
              }}>
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleAlt/>
                  </ListItemIcon>
                  <Typography variant='body-1' >Users</Typography>
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </nav>
        <nav aria-label="third mailbox folders" className='containerPanel'>
          <List className='link'>
            <ListItem disablePadding className={`panel ${indexTab === 3 && 'highlight'}`}onClick={() => handleOnclick(3)}>
              <Link to='/classes' className='link' style={{
                color: 'inherit', margin: '5px 0px'
              }}>
                <ListItemButton>
                  <ListItemIcon>
                    <KingBed/>
                  </ListItemIcon>
                  <Typography variant='body-1' >Classes</Typography>
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </nav>
      </Box>
    ): (
      <Box sx={{ width: '100%', bgcolor:'background.paper' }}>
        <nav aria-label="main mailbox folders" className='containerPanel'>
          <List>
            <ListItem disablePadding className={`panel ${indexTab === 0 && 'highlight'}`}
              onClick={() => handleOnclick(0)}>
              <Link to='/home' className='link' style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                color: 'inherit',
                margin: '5px 0px'
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
          </List>
        </nav>
        <nav aria-label="secondary mailbox folders" className='containerPanel'>
          <List className='link'>
            <ListItem disablePadding className={`panel ${indexTab === 1 && 'highlight'}`}
              onClick={() => {handleOnclick(1); handleIsOpenTeaching() }}>

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
                  {
                    classTeaching.map(( specificClass ) => {
                      return (
                        <>
                          <ListItemButton key={specificClass._id}
                            onClick={() => handleNavigateToClassDetails(specificClass._id)}>
                            <ClassRegisterd avatar={specificClass.background}
                              name={specificClass.className}
                              classCode={specificClass.codeClassName}
                              classId={specificClass._id}/>
                          </ListItemButton>
                          <Divider/>
                        </>
                      )
                    })
                  }
                </Stack>
              </List>
            </Collapse>
          </List>
        </nav>
        <nav aria-label="third mailbox folders" className='containerPanel'>
          <List className='link'>
            <ListItem disablePadding className={`panel ${indexTab === 2 && 'highlight'}`}
              onClick={() => {handleOnclick(2); handleIsOpenMyCourses() }}>

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
                  {/* <ListItemButton>
                    <ClassRegisterd avatar='https://i.pinimg.com/564x/45/9f/e6/459fe627958e37805d5444e8544480f7.jpg'
                      title='2310-CLC-AWP-20KTPM2'
                      tagline='Advanced Web Programming'/>
                  </ListItemButton> */}
                  {
                    classStudying.map(( specificClass ) => {
                      return (
                        <>
                          <ListItemButton key={specificClass._id}
                            onClick={() => handleNavigateToClassDetails(specificClass._id)}>
                            <ClassRegisterd avatar={specificClass.background}
                              name={specificClass.className}
                              classCode={specificClass.codeClassName}
                              classId={specificClass._id}/>
                          </ListItemButton>
                          <Divider/>
                        </>
                      )
                    })
                  }
                </Stack>

              </List>
            </Collapse>
          </List>
        </nav>
      </Box>
    )
  )
}

function Menu({ classTeaching, classStudying }) {
  const [indexTab, setIndexTab] = useState(0)

  return (
    <Tabs indexTab={indexTab} setIndexTab={setIndexTab}
      classTeaching={classTeaching} classStudying={classStudying}/>
  )
}

export default Menu