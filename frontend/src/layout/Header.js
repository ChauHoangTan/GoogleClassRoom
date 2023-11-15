import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Avatar, Stack, Button, Hidden } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../redux/actions/userActions';
import toast from 'react-hot-toast';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {setMoreIcon} from '../redux/actions/moreIconActions.js'
import { RiLockPasswordLine, RiLogoutCircleLine } from 'react-icons/ri'

import './style.scss';
import { FiSettings } from 'react-icons/fi';

const ResponsiveHeader = ({isClickMore}) => {

  return (
    <Stack direction='column' className={`responsive ${!isClickMore && 'hide'}`}>
      <Stack direction='column' alignItems='center'>
          {pages.map((page) => (
                <Typography className='nav' key={page} variant="body-1" py={2} sx={{fontSize:'18px'}}>
                  <Link to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {page}
                  </Link>
                </Typography>
              ))}
      </Stack>
    </Stack>
  )
}

const pages = ['Home', 'Blog', 'My Course'];

export default function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    dispatch(setMoreIcon())
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    handleCloseUserMenu();
    dispatch(logoutAction());
    toast.success('Logged out successfully');
    navigate('/login');
  };

    // state responsive
    const [isClickMore, setIsClickMore] = useState(false);

    const handleIsClickMore = () => {
      setIsClickMore(isClickMore ? false : true)
    }
    ///////////////////

  const imgURL = userInfo?.image ? userInfo?.image : "https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/avatar-chill-anime-2.jpg";

  return (
    <Stack id='header' >
      <AppBar position="static" >
        <Box sx={{ flexGrow: 1, paddingInline: 3, backgroundColor: '#466874' }}>
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon/>
            </IconButton>
            <Stack sx={{ flexGrow: 1 }} direction="row" alignItems="center">
              <Link to="/">
                  <Avatar src={logo} sx={{ width: 210, height: 60, margin: 2, borderRadius: 0, display: { xs: 'none', sm: 'block' } }} />
              </Link>
            </Stack>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Typography className='nav' key={page} variant="h6" sx={{fontFamily:'Arima', mr: 2 }}>
                  <Link to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {page}
                  </Link>
                </Typography>
              ))}
            </Box>
            
            
            { userInfo ? (
              <>
                <Typography variant="h6" sx={{fontFamily:'Arima', mr: 2, display: { xs: 'none', md: 'inline-flex' }}}>
                  Hi, {userInfo?.firstName}
                </Typography>

                <Box sx={{ flexGrow: 0 }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenUserMenu}
                    color="inherit"
                  >
                    <Avatar
                      src={imgURL}
                      sx={{ width: 40, height: 40, mr: 1 }}
                    />
                  </IconButton>
                  <IconButton color="inherit" sx={{
                    display: { xs: 'none', md: 'inline-flex' }
                  }}>
                    <Badge badgeContent={5} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to="/profile" style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
                        <FiSettings />
                        <span style={{ marginLeft: '4px'}} >Profile account</span>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to="/password" style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
                        <RiLockPasswordLine /> 
                        <span style={{ marginLeft: '4px' }} >Change password</span>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={logoutHandler} style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
                      <RiLogoutCircleLine />
                      <span style={{ marginLeft: '4px' }} >Log Out</span>
                    </MenuItem>
                  </Menu>
                </Box>

                
              </>
            ) : (
              <>
                <Link to='/login'>
                  <Button
                    className='btnCustom'
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, mx: 1, borderRadius: 50, 
                      color: '#ffffff', borderColor: '#ffffff',
                      '&:hover': {
                        borderColor: '#ffffff',
                        backgroundColor: '#283643'
                      },
                    }}
                  >
                      Login
                  </Button>
                </Link>
                
                <Link to=''>
                  <Button
                    className='btnCustom'
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, mx: 2, borderRadius: 50, 
                      color: '#ffffff', borderColor: '#ffffff',
                      '&:hover': {
                        borderColor: '#ffffff',
                        backgroundColor: '#283643'
                      },
                    }}
                  >
                    Register
                  </Button>
                </Link>

                
              </>
            )}

            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <IconButton onClick={handleIsClickMore}>
                <div style={{ backgroundColor:'#97AFB9'}}>
                  {isClickMore ?
                    <ArrowDropUpRoundedIcon sx={{width:'50px', height:'50px', color:'white'}}/>
                    :
                    <ArrowDropDownRoundedIcon sx={{width:'50px', height:'50px', color:'white'}}/> }
                </div>
                  
                  
              </IconButton>
            </Box>
            
          </Toolbar>
        </Box>
      </AppBar>
      <ResponsiveHeader isClickMore={isClickMore}/>
    </Stack>
    
  );
}
