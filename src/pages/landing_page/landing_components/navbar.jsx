import React, { useState } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import gigaspaceLogo from '../../../assets/Gigaspace_logo-removebg-preview.png';

const useStyles = makeStyles((theme) => ({
  // Header Container
  headerContainer: {
    position: 'sticky',
    top: 0,
    width: '100%',
    borderBottom: '1px solid #2a2a2e',
    background: 'rgba(12, 12, 12, 0.95)',
    backdropFilter: 'blur(12px)',
    zIndex: 1100,
    transition: 'all 0.3s ease',
  },
  
  // Toolbar
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    minHeight: '70px',
    margin: '0 auto',
    width: '100%',
    '@media (max-width: 1440px)': {
      padding: '0 24px',
    },
    '@media (max-width: 1200px)': {
      padding: '0 20px',
      minHeight: '65px',
    },
    '@media (max-width: 960px)': {
      padding: '0 16px',
      minHeight: '60px',
    },
    '@media (max-width: 600px)': {
      padding: '0 12px',
      minHeight: '55px',
    },
    '@media (max-width: 480px)': {
      padding: '0 8px',
      minHeight: '50px',
    },
  },
  
  // Logo Section
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.02)',
    },
    '@media (max-width: 768px)': {
      gap: '8px',
    },
    '@media (max-width: 480px)': {
      gap: '6px',
    },
  },
  
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '42px',
    '& img': {
      height: '100%',
      width: 'auto',
      objectFit: 'contain',
    },
    '@media (max-width: 1200px)': {
      height: '38px',
    },
    '@media (max-width: 960px)': {
      height: '34px',
    },
    '@media (max-width: 600px)': {
      height: '30px',
    },
    '@media (max-width: 480px)': {
      height: '26px',
    },
  },
  
  logoText: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#818cf8',
    textDecoration: 'none',
    '@media (max-width: 1200px)': {
      fontSize: '22px',
    },
    '@media (max-width: 960px)': {
      fontSize: '20px',
    },
    '@media (max-width: 768px)': {
      fontSize: '18px',
    },
    '@media (max-width: 600px)': {
      fontSize: '16px',
    },
    '@media (max-width: 480px)': {
      fontSize: '14px',
    },
  },
  
  // Navigation Container - Fixed the class name issue
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: 1,
    justifyContent: 'center',
    overflowX: 'auto',
    scrollbarWidth: 'none', // For Firefox
    msOverflowStyle: 'none', // For IE and Edge
    '&::-webkit-scrollbar': {
      display: 'none', // For Chrome, Safari and Opera
    },
    padding: '4px 0',
    '@media (max-width: 1440px)': {
      gap: '14px',
    },
    '@media (max-width: 1280px)': {
      gap: '12px',
      justifyContent: 'flex-start',
      padding: '4px 16px',
    },
    '@media (max-width: 1024px)': {
      display: 'none',
    },
  },
  
  navLink: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#a0a0a0',
    textDecoration: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    borderBottom: '2px solid transparent',
    transition: 'all 0.3s ease',
    position: 'relative',
    textTransform: 'none',
    minWidth: 'max-content',
    flexShrink: 0,
    '&:hover': {
      color: '#6366f1',
      background: 'rgba(99, 102, 241, 0.1)',
      borderBottomColor: '#6366f1',
      transform: 'translateY(-1px)',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '50%',
      width: 0,
      height: '2px',
      background: 'linear-gradient(90deg, #6366f1, #818cf8)',
      transition: 'all 0.3s ease',
      transform: 'translateX(-50%)',
    },
    '&:hover:before': {
      width: '80%',
    },
    '@media (max-width: 1440px)': {
      fontSize: '13px',
      padding: '6px 10px',
    },
    '@media (max-width: 1200px)': {
      fontSize: '12px',
      padding: '6px 8px',
    },
  },
  
  // Action Buttons Container
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexShrink: 0,
    marginLeft: 'auto',
    '@media (max-width: 1280px)': {
      gap: '8px',
      marginLeft: '16px',
    },
    '@media (max-width: 1024px)': {
      gap: '8px',
    },
    '@media (max-width: 768px)': {
      gap: '6px',
    },
  },
  
  loginButton: {
    borderRadius: '8px',
    background: 'transparent',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#6366f1',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(99, 102, 241, 0.4)',
    minWidth: 'auto',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.1)',
      borderColor: '#6366f1',
      transform: 'scale(1.02)',
    },
    '@media (max-width: 1200px)': {
      fontSize: '13px',
      padding: '7px 14px',
    },
    '@media (max-width: 1024px)': {
      display: 'none',
    },
  },
  
  signupButton: {
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #6366f1, #818cf8)',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    border: 'none',
    minWidth: 'auto',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a5fcf, #7c7ff0)',
      transform: 'scale(1.02)',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
    },
    '@media (max-width: 1200px)': {
      fontSize: '13px',
      padding: '7px 14px',
    },
    '@media (max-width: 1024px)': {
      display: 'none',
    },
  },
  
  // Mobile Menu Button
  mobileMenuButton: {
    display: 'none',
    color: '#a0a0a0',
    padding: '8px',
    borderRadius: '6px',
    '&:hover': {
      color: '#6366f1',
      background: 'rgba(99, 102, 241, 0.1)',
    },
    '@media (max-width: 1024px)': {
      display: 'flex',
    },
  },
  
  mobileMenuIcon: {
    fontSize: '24px',
    '@media (max-width: 600px)': {
      fontSize: '22px',
    },
    '@media (max-width: 480px)': {
      fontSize: '20px',
    },
  },
  
  // Mobile Drawer Styles
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'linear-gradient(180deg, #0c0c0c 0%, #1a1a1a 100%)',
      borderLeft: '1px solid #2a2a2e',
      width: '320px',
      '@media (max-width: 768px)': {
        width: '280px',
      },
      '@media (max-width: 600px)': {
        width: '260px',
      },
      '@media (max-width: 480px)': {
        width: '100vw',
      },
    },
  },
  
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid #2a2a2e',
    background: 'rgba(99, 102, 241, 0.05)',
    '@media (max-width: 600px)': {
      padding: '16px 20px',
    },
    '@media (max-width: 480px)': {
      padding: '14px 16px',
    },
  },
  
  drawerCloseButton: {
    color: '#a0a0a0',
    '&:hover': {
      color: '#6366f1',
      background: 'rgba(99, 102, 241, 0.1)',
    },
  },
  
  drawerList: {
    padding: '24px 0',
    '@media (max-width: 600px)': {
      padding: '20px 0',
    },
  },
  
  drawerListItem: {
    padding: '12px 24px',
    margin: '4px 12px',
    borderRadius: '8px',
    borderLeft: '3px solid transparent',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.1)',
      borderLeftColor: '#6366f1',
      transform: 'translateX(4px)',
    },
    '@media (max-width: 600px)': {
      padding: '10px 20px',
      margin: '3px 10px',
    },
    '@media (max-width: 480px)': {
      padding: '8px 16px',
      margin: '2px 8px',
    },
  },
  
  drawerListItemText: {
    '& .MuiListItemText-primary': {
      color: '#e5e5e5',
      fontSize: '16px',
      fontWeight: 500,
      transition: 'color 0.3s ease',
      '@media (max-width: 600px)': {
        fontSize: '15px',
      },
      '@media (max-width: 480px)': {
        fontSize: '14px',
      },
    },
  },
  
  drawerButtons: {
    padding: '24px',
    borderTop: '1px solid #2a2a2e',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    background: 'rgba(99, 102, 241, 0.02)',
    '@media (max-width: 600px)': {
      padding: '20px',
      gap: '10px',
    },
    '@media (max-width: 480px)': {
      padding: '16px',
      gap: '8px',
    },
  },
  
  drawerLoginButton: {
    borderRadius: '8px',
    background: 'transparent',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#6366f1',
    textTransform: 'none',
    border: '1px solid rgba(99, 102, 241, 0.4)',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.1)',
      borderColor: '#6366f1',
    },
    '@media (max-width: 600px)': {
      fontSize: '13px',
      padding: '10px 16px',
    },
  },
  
  drawerSignupButton: {
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #6366f1, #818cf8)',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    textTransform: 'none',
    border: 'none',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a5fcf, #7c7ff0)',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
    },
    '@media (max-width: 600px)': {
      fontSize: '13px',
      padding: '10px 16px',
    },
  },
}));

const GigaspaceNavbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  
  // Use media query for mobile detection
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  const handleLoginClick = () => {
    navigate('/login');
    setMobileOpen(false);
  };
  
  const handleRegisterClick = () => {
    navigate('/register');
    setMobileOpen(false);
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const navItems = [
    { title: 'About', id: 'about' },
    { title: 'Features', id: 'features' },
    { title: 'Legends', id: 'legends' },
    { title: 'History', id: 'historical' },
    { title: 'Learn', id: 'learn' },
    { title: 'Entertain', id: 'entertainment' },
    { title: 'Solve', id: 'problem-solving' },
    { title: 'Languages', id: 'languages' },
    { title: 'How It Works', id: 'how-it-works' },
    { title: 'Advantages', id: 'advantages' },
    { title: 'Start Journey', id: 'start-journey' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" className={classes.headerContainer} elevation={0}>
        <Toolbar className={classes.toolbar} disableGutters>
          {/* Logo Section */}
          <Box 
            component="div" 
            className={classes.logoContainer}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Box className={classes.logoIcon}>
              <img src={gigaspaceLogo} alt="Logo" />
            </Box>
          </Box>
          
          {/* Desktop Navigation */}
          <Box className={classes.navContainer}>
            {navItems.map((item) => (
              <Button 
                key={item.id}
                color="inherit" 
                className={classes.navLink}
                onClick={() => scrollToSection(item.id)}
              >
                {item.title}
              </Button>
            ))}
          </Box>
          
          {/* Action Buttons */}
          <Box className={classes.actionContainer}>
            <Button 
              className={classes.loginButton}
              onClick={handleLoginClick}
            >
              Log In
            </Button>
            <Button 
              variant="contained" 
              className={classes.signupButton}
              onClick={handleRegisterClick}
            >
              Sign Up
            </Button>
            
            {/* Mobile Menu Button */}
            <IconButton
              className={classes.mobileMenuButton}
              onClick={handleDrawerToggle}
              edge="start"
              aria-label="menu"
            >
              <MenuIcon className={classes.mobileMenuIcon} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className={classes.drawer}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
      >
        <Box>
          {/* Drawer Header */}
          <Box className={classes.drawerHeader}>
            <div></div>
            <IconButton 
              onClick={handleDrawerToggle}
              className={classes.drawerCloseButton}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          {/* Navigation Links */}
          <List className={classes.drawerList}>
            {navItems.map((item) => (
              <ListItem 
                button 
                key={`mobile-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={classes.drawerListItem}
              >
                <ListItemText 
                  primary={item.title} 
                  className={classes.drawerListItemText}
                />
              </ListItem>
            ))}
          </List>
          
          {/* Action Buttons */}
          <Box className={classes.drawerButtons}>
            <Button 
              className={classes.drawerLoginButton}
              onClick={handleLoginClick}
              fullWidth
            >
              Log In
            </Button>
            <Button 
              className={classes.drawerSignupButton}
              onClick={handleRegisterClick}
              fullWidth
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default GigaspaceNavbar;