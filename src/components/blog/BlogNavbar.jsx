import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from '../../assets/Gigaspace_logo-removebg-preview.png';

const useStyles = makeStyles({
  navbar: {
    background: '#0c0c0c',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    borderBottom: '1px solid #2a2a2e',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    minHeight: '70px',
    '@media (max-width: 900px)': {
      padding: '0 1.5rem',
      minHeight: '60px',
    },
    '@media (max-width: 600px)': {
      padding: '0 1rem',
      minHeight: '55px',
    },
    '@media (max-width: 480px)': {
      padding: '0 0.75rem',
      minHeight: '50px',
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      opacity: 0.8,
    },
  },
  logo: {
    height: '40px',
    width: 'auto',
    '@media (max-width: 900px)': {
      height: '35px',
    },
    '@media (max-width: 600px)': {
      height: '30px',
    },
    '@media (max-width: 480px)': {
      height: '28px',
    },
  },
  logoText: {
    marginLeft: '12px',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#ffffff',
    '@media (max-width: 900px)': {
      fontSize: '1.3rem',
      marginLeft: '10px',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
      marginLeft: '8px',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
      marginLeft: '6px',
    },
    '@media (max-width: 375px)': {
      display: 'none', // Hide text on very small screens
    },
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    marginLeft: '2rem',
    '@media (max-width: 900px)': {
      marginLeft: '1rem',
      gap: '1rem',
    },
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    borderBottom: '1px solid transparent',
    padding: '6px 0',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderBottom: '1px solid #ffffff',
      opacity: 0.9,
    },
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    '@media (max-width: 600px)': {
      gap: '0.75rem',
    },
    '@media (max-width: 480px)': {
      gap: '0.5rem',
    },
  },
  startChattingButton: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    borderRadius: '25px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '&:hover': {
      background: 'linear-gradient(135deg, #5855eb, #7c3aed)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
    },
    transition: 'all 0.3s ease',
    '@media (max-width: 900px)': {
      padding: '0.625rem 1.25rem',
      fontSize: '0.95rem',
    },
    '@media (max-width: 600px)': {
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      borderRadius: '20px',
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem 0.75rem',
      fontSize: '0.85rem',
      '& .button-text': {
        display: 'none',
      },
    },
  },
  dashboardButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontWeight: 500,
    textTransform: 'none',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    transition: 'all 0.3s ease',
    '@media (max-width: 600px)': {
      padding: '0.4rem 0.8rem',
      fontSize: '0.85rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.4rem 0.6rem',
      '& .button-text': {
        display: 'none',
      },
    },
  },
  logoutButton: {
    color: '#ffffff',
    padding: '0.5rem',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#ff6b6b',
    },
    transition: 'all 0.3s ease',
  },
  userInfo: {
    color: '#a0a0a0',
    fontSize: '0.9rem',
    marginRight: '0.5rem',
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 480px)': {
      display: 'none',
    },
  },
});

const BlogNavbar = () => {
  const classes = useStyles();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleStartChatting = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/blog');
  };

  return (
    <AppBar className={classes.navbar} position="sticky">
      <Toolbar className={classes.toolbar}>
        {/* Logo Section */}
        <Link to="/blog" className={classes.logoContainer}>
          <img
            src={logo}
            alt="GigaSpace Logo"
            className={classes.logo}
          />
        </Link>

        {/* Primary Navigation Links */}
        <Box className={classes.navLinks}>
          <Link to="/" className={classes.navLink}>Home</Link>
          <Link to="/blog" className={classes.navLink}>Blog</Link>
          <Link to="/faq" className={classes.navLink}>FAQ</Link>
          <Link to="/terms" className={classes.navLink}>Terms & Policies</Link>
        </Box>

        {/* Navigation Actions */}
        <Box className={classes.navActions}>
          {isAuthenticated ? (
            // Authenticated User Actions
            <>
              {user && (
                <Box className={classes.userInfo}>
                  Welcome, {user.username || user.name}
                </Box>
              )}
              <Button
                className={classes.dashboardButton}
                onClick={() => navigate('/dashboard')}
                startIcon={<DashboardIcon />}
              >
                <span className="button-text">Dashboard</span>
              </Button>
              <Button
                className={classes.startChattingButton}
                onClick={handleStartChatting}
                startIcon={<ChatIcon />}
              >
                <span className="button-text">Start Chatting</span>
              </Button>
              <IconButton
                className={classes.logoutButton}
                onClick={handleLogout}
                title="Logout"
              >
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            // Non-authenticated User Actions
            <Button
              className={classes.startChattingButton}
              onClick={handleStartChatting}
              startIcon={<ChatIcon />}
            >
              <span className="button-text">Start Chatting</span>
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default BlogNavbar;
