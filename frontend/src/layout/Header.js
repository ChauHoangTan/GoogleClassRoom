import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Stack, Button, Hidden } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../redux/actions/userActions';
import toast from 'react-hot-toast';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './style.scss';

const pages = ['Home', 'Blog', 'My Course'];

export default function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
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

  const imgURL = userInfo?.image ? userInfo?.image : "https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/avatar-chill-anime-2.jpg";

  return (
    <AppBar position="static" sx={{ overflow: 'hidden', backgroundColor: '#466874' }}>
      <Box sx={{ flexGrow: 1, paddingInline: 3 }}>
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenNavMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Stack sx={{ flexGrow: 1 }} direction="row" alignItems="center">
            <Link to="/">
              <Avatar src={logo} sx={{ width: 210, height: 60, margin: 2, borderRadius: 0 }} />
            </Link>
          </Stack>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Typography key={page} variant="h6" sx={{fontFamily:'Arima', mr: 2 }}>
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
                    <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                      Profile account
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to="/password" style={{ textDecoration: 'none', color: 'black' }}>
                      Change password
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>Log out</MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Button
                className='btnCustom'
                href="/login"
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

              <Button
                className='btnCustom'
                href="/register"
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
            </>
          )}
          
        </Toolbar>
      </Box>
    </AppBar>
  );
}
