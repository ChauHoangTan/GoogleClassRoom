import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Stack } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/img/logo.png'
import './style.scss'

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    handleClose();
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }} id='header'>
      
      <AppBar position="static" sx={{backgroundColor: 'rgba(0, 191, 255, 0.382)', color:'#673F00'}} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Stack sx={{flexGrow: 1}} direction="row" alignItems="center" spacing={4}>
 
            <Link to='/'>
                <Avatar src={logo} sx={{width:60, height:60, margin: 2}}/>
            </Link>
            
          </Stack>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar 
                    src='https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/avatar-chill-anime-2.jpg'
                    sx={{width:40, height:40}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                    <Link to='/account' style={{textDecoration:'none', color:'black'}}>Profile account</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    Log out
                </MenuItem>
                
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}