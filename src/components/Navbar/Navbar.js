import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navbarStyles } from './styles';
import { useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import HotelIcon from '@mui/icons-material/Hotel';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';


const Navbar = (token) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

 const handleCloseNavMenu = (item) => {
   setAnchorElNav(null);
   navigate(item);
 };

  const authedItems = [
    {
      id: 0,
      icon: <HotelIcon/>,
      label: 'Hotels',
      route: 'hotels',
    },
    {
      id: 3,
      icon: <LogoutIcon/>,
      label: 'Logout',
      route: 'logout',
    }
  ]

  const notAuthedItems = [
    {
      id: 0,
      icon: <HotelIcon/>,
      label: 'Hotels',
      route: 'hotels',
    },
    {
      id: 1,
      icon: <LoginIcon/>,
      label: 'Login',
      route: 'login',
    },
    {
      id: 2,
      icon: <HowToRegIcon/>,
      label: 'Register',
      route: 'register',
    }
  ]

  let navbarItems = notAuthedItems;
  if (token.token)
  {
    navbarItems = authedItems;
  }

 return (
  <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/hotels"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
        Viešbučiai
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="rgba(255,255,255,0.7)"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {navbarItems.map((item, index) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={() => handleCloseNavMenu(item.route)}>
                <ListItemIcon sx={navbarStyles.icons}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                sx={navbarStyles.text}
                primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
        Viešbučiai
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {navbarItems.map((item, index) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={() => navigate(item.route)}>
                <ListItemIcon sx={navbarStyles.icons}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                sx={navbarStyles.text}
                primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>

        
      </Toolbar>
    </Container>
  </AppBar>
);
}

export default Navbar