import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Avatar, Stack, Button, Popover } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import logoLight from '../assets/img/logo_light_mode.png'
import logoDark from '../assets/img/logo_dark_mode.png'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../redux/actions/userActions'
import toast from 'react-hot-toast'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { setMoreIcon } from '../redux/actions/moreIconActions.js'
import { RiLockPasswordLine, RiLogoutCircleLine } from 'react-icons/ri'
import { useColorScheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Tooltip from '@mui/material/Tooltip'

import './style.scss'
import { FiSettings } from 'react-icons/fi'
import Notification from '../pages/notification/Notification.js'

export default function ResponsiveAppBar () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mode, setMode } = useColorScheme()
  const { userInfo } = useSelector(state => state.userLogin)

  const [anchorElUser, setAnchorElUser] = React.useState(null)

  // eslint-disable-next-line no-unused-vars
  const handleOpenNavMenu = event => {
    dispatch(setMoreIcon())
  }

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const logoutHandler = () => {
    handleCloseUserMenu()
    dispatch(logoutAction())
    toast.success('Logged out successfully')
    navigate('/')
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const handleClickAncorEl = (e) => {
    setAnchorEl(e.target)
    handleClickNotification()
  }

  const [isNoti, setIsNoti] = useState (false)
  const handleClickNotification = () => {
    setIsNoti(!isNoti)
  }

  const imgURL = userInfo?.image
    ? userInfo?.image
    : 'https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/avatar-chill-anime-2.jpg'

  return (
    <Stack id='header'>
      <AppBar position='static'>
        <Box
          sx={{
            flexGrow: 1,
            paddingInline: 3
          }}
        >
          <Toolbar disableGutters>
            {userInfo && (
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                onClick={handleOpenNavMenu}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Stack
              sx={{ flexGrow: 1 }}
              direction='row'
              alignItems='center'
            >
              <Link to='/'>
                <Avatar
                  src={mode === 'dark' ? logoDark : logoLight}
                  sx={{
                    width: 230,
                    height: 60,
                    margin: 2,
                    borderRadius: 0,
                    objectFit: 'cover',
                    display: { xs: 'none', sm: 'block' }
                  }}
                />
              </Link>
            </Stack>

            <Box>
              <Tooltip title= {mode === 'light' ? 'Turn dark' : 'Turn light'} mode>
                <IconButton sx={{ mr: 2 }} onClick={() => {
                  setMode(mode === 'light' ? 'dark' : 'light')
                }} color="inherit">
                  {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
            </Box>

            {userInfo ? (
              <>
                <Typography
                  variant='h6'
                  sx={{
                    mr: 1,
                    display: {
                      xs: 'none',
                      md: 'inline-flex'
                    }
                  }}
                >
                  Hi, {userInfo?.firstName}
                </Typography>

                <Box sx={{ flexGrow: 0 }}>
                  <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleOpenUserMenu}
                    color='inherit'
                  >
                    <Avatar
                      src={imgURL}
                      sx={{
                        width: 40,
                        height: 40,
                        mr: 1
                      }}
                    />
                  </IconButton>
                  <IconButton color='inherit'>
                    <Badge badgeContent={5} color='error'>
                      <NotificationsIcon onClick={( e ) => handleClickAncorEl( e ) }/>
                    </Badge>
                  </IconButton>
                  <Popover
                    anchorEl={anchorEl}
                    open={isNoti}
                    onClose={handleClickNotification}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    <Notification/>
                  </Popover>
                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        to='/profile'
                        style={{
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          color: 'inherit'
                        }}
                      >
                        <FiSettings />
                        <span
                          style={{
                            marginLeft: '4px'
                          }}
                        >
                            Profile account
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        to='/password'
                        style={{
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          color: 'inherit'
                        }}
                      >
                        <RiLockPasswordLine />
                        <span
                          style={{
                            marginLeft: '4px'
                          }}
                        >
                          Change password
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={logoutHandler}
                      style={{
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <RiLogoutCircleLine />
                      <span style={{ marginLeft: '4px' }}>
                        Log Out
                      </span>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <Button
                    className='btnCustom'
                    variant='outlined'
                    sx={{
                      mx: 1,
                      borderRadius: 50,
                      color: '#ffffff',
                      borderColor: '#ffffff',
                      '&:hover': {
                        borderColor: '#ffffff',
                        backgroundColor: '#283643'
                      }
                    }}
                  >
                    Sign in
                  </Button>
                </Link>
              </>
            )}
          </Toolbar>
        </Box>
      </AppBar>
    </Stack>
  )
}
