import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Box,
  Container,
} from '@mui/material';
import {
  ShoppingCart,
  Search,
  Person,
  Menu as MenuIcon,
  Favorite,
  Logout,
  Receipt,
  Dashboard,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useAuthStore, useCartStore } from '../../store/store';
import { motion } from 'framer-motion';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isAuthenticated, user, logout } = useAuthStore();
  const { itemCount } = useCartStore();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1 }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  flexGrow: 0,
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 800,
                  letterSpacing: 1,
                  cursor: 'pointer',
                  background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                WishCrate
              </Typography>
            </Link>
          </motion.div>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: 4 }}>
            <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: 600 }}>
              <SearchBar>
                <SearchIconWrapper>
                  <Search />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search for products..."
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchBar>
            </form>
          </Box>

          {/* Right Side Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAuthenticated ? (
              <>
                <IconButton color="inherit" component={Link} to="/wishlist">
                  <Favorite />
                </IconButton>
                
                <IconButton color="inherit" component={Link} to="/cart">
                  <Badge badgeContent={itemCount} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>

                <IconButton
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                    {user?.firstName?.charAt(0)}
                  </Avatar>
                </IconButton>
                
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                    <Person sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={() => { navigate('/orders'); handleClose(); }}>
                    <Receipt sx={{ mr: 1 }} /> My Orders
                  </MenuItem>
                  {(user?.role === 'ADMIN' || user?.role === 'SELLER') && (
                    <MenuItem onClick={() => { navigate('/admin'); handleClose(); }}>
                      <Dashboard sx={{ mr: 1 }} /> Admin Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ fontWeight: 600 }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to="/register"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
