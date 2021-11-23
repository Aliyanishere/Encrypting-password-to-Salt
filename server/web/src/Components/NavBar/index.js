import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from "../../assests/Images/logo.png";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem style={{ display: "block", padding: "12px 30px", boxShadow: "1px 1px lightgrey" }} onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem style={{ display: "block", padding: "12px 30px" }} onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem style={{ display: "block", padding: "12px 30px", boxShadow: "1px 1px lightgrey" }}>
        <IconButton
          size="small"
          color="inherit"
        >
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            Login
          </Link>
        </IconButton>
      </MenuItem>
      <MenuItem style={{ display: "block", padding: "12px 30px", boxShadow: "1px 1px lightgrey" }}>
        <IconButton
          size="small"
          color="inherit"
        >
          <Link to="/signup" style={{ color: "black", textDecoration: "none" }}>
            Signup
          </Link>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen} style={{ display: "block", padding: "12px 30px" }}>
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          Account
        </IconButton>
      </MenuItem>
    </Menu >
  );

  return (
    <Box sx={{ flexGrow: 3 }}>
      <AppBar
        style={{ backgroundColor: "#cc004e", width: "100%" }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
          >
            <img src={logo} width="18" height="30px" alt="mongodb" /> Mongodb
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <IconButton
              size="small"
              color="inherit"
            >
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                <h4 style={{ marginRight: "20px", fontWeight: "normal" }}>
                  Login
                </h4>
              </Link>
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
            >
              <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
                <h4 style={{ marginRight: "20px", fontWeight: "normal" }}>
                  SignUp
                </h4>
              </Link>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="large"
              edge="start"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}