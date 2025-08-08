import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/dashboard/main/Sidebar';

const useStyles = makeStyles({
  dashboardRoot: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '280px',
    transition: 'margin-left 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 1200px)': {
      marginLeft: '260px',
    },
    '@media (max-width: 960px)': {
      marginLeft: '240px',
    },
    '@media (max-width: 900px)': {
      marginLeft: '0',
    },
  },
  mainContentCollapsed: {
    marginLeft: '70px',
    '@media (max-width: 1200px)': {
      marginLeft: '65px',
    },
    '@media (max-width: 960px)': {
      marginLeft: '60px',
    },
    '@media (max-width: 900px)': {
      marginLeft: '0',
    },
  },
  contentWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
  mobileOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1250,
    display: 'none',
    '@media (max-width: 900px)': {
      display: 'block',
    },
  },
});

const DashboardLayout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Handle responsive sidebar behavior
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
      setSidebarCollapsed(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Handle sidebar toggle for mobile
  const handleSidebarToggle = () => {
    if (isMobile) {
      setSidebarOpen(prev => !prev);
    } else {
      setSidebarCollapsed(prev => !prev);
    }
  };

  // Close sidebar when clicking overlay (mobile)
  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Close sidebar on mobile when navigating
  const handleNavigation = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleCharacterCreated = (newCharacter) => {
    // Navigate to discover page with new character
    navigate('/dashboard/discover');
  };

  // Get the actual sidebar open state for desktop vs mobile
  const actualSidebarOpen = isMobile ? sidebarOpen : !sidebarCollapsed;

  return (
    <Box className={classes.dashboardRoot}>
      {/* Sidebar */}
      <Sidebar
        open={actualSidebarOpen}
        onToggle={handleSidebarToggle}
        onCharacterCreated={handleCharacterCreated}
      />

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <Box 
          className={classes.mobileOverlay}
          onClick={handleOverlayClick}
        />
      )}

      {/* Main content area */}
      <Box 
        className={`${classes.mainContent} ${
          !isMobile && sidebarCollapsed ? classes.mainContentCollapsed : ''
        }`}
      >
        <Box className={classes.contentWrapper}>
          <Outlet 
            context={{ 
              onSidebarToggle: handleSidebarToggle,
              sidebarOpen: actualSidebarOpen,
              isMobile 
            }} 
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;