import React, { useState, useEffect } from "react";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/dashboard/main/Sidebar";
import TopBar from "../components/dashboard/main/TopBar";
import StarField from "../components/common/StarField";

const useStyles = makeStyles({
  dashboardContainer: {
    display: "flex",
    padding: "20px",
    '@media (max-width: 1200px)': {
      padding: "18px",
    },
    '@media (max-width: 960px)': {
      padding: "16px",
    },
    '@media (max-width: 900px)': {
      padding: "0px",
      flexDirection: "column",
    },
  },
  mainContent: {
    padding: '20px !important',
    flex: 1,
    display: "flex",
    transition: 'margin-left 0.3s ease !important',
    '@media (max-width: 1200px)': {
      padding: '18px !important',
    },
    '@media (max-width: 960px)': {
      padding: '16px !important',
    },
    '@media (max-width: 900px)': {
      marginLeft: '0 !important',
      padding: '0 !important',
    },
  },
  mainContentOpen: {
    marginLeft: 280,
    '@media (max-width: 1200px)': {
      marginLeft: 260,
    },
    '@media (max-width: 960px)': {
      marginLeft: 240,
    },
    '@media (max-width: 900px)': {
      marginLeft: '0 !important',
    },
  },
  mainContentClosed: {
    marginLeft: 70,
    '@media (max-width: 1200px)': {
      marginLeft: 65,
    },
    '@media (max-width: 960px)': {
      marginLeft: 60,
    },
    '@media (max-width: 900px)': {
      marginLeft: '0 !important',
    },
  },
  contentArea: {
    flex: 1,
    overflow: "hidden",
    '@media (max-width: 900px)': {
      overflow: "auto",
      paddingTop: '110px',
    },
    '@media (max-width: 600px)': {
      paddingTop: '106px',
    },
    '@media (max-width: 480px)': {
      paddingTop: '104px',
    },
    '@media (max-width: 375px)': {
      paddingTop: '102px',
    },
  },
  contentAreaChatOpen: {
    '@media (max-width: 900px)': {
      paddingTop: '0 !important',
    },
  },
  menuButton: {
    position: 'fixed !important',
    top: '4% !important',
    transform: 'translateY(-50%) !important',
    zIndex: '1300 !important',
    transition: 'all 0.3s ease !important',
    color: 'white !important',
    '@media (max-width: 900px)': {
      display: 'none !important',
    },
  },
  menuButtonOpen: {
    left: '238px !important',
    backgroundColor: 'transparent !important',
    border: 'none !important',
    borderLeft: '1px solid rgba(42, 42, 42, 0.5) !important',
    borderTop: '1px solid rgba(42, 42, 42, 0.5) !important',
    borderBottom: '1px solid rgba(42, 42, 42, 0.5) !important',
    borderRight: '1px solid rgba(42, 42, 42, 0.5) !important',
    borderRadius: '0 8px 8px 0 !important',
    padding: '8px 12px 8px 8px !important',
    marginLeft: '-1px !important',
    '&:hover': {
      backgroundColor: 'rgba(42, 42, 42, 0.3) !important',
    },
    '@media (max-width: 1200px)': {
      left: '260px !important',
    },
    '@media (max-width: 960px)': {
      left: '240px !important',
    },
  },
  menuButtonClosed: {
    left: '70px !important',
    top: '20px !important',
    transform: 'none !important',
    backgroundColor: 'transparent !important',
    border: 'none !important',
    borderLeft: '1px solid rgba(42, 42, 42, 0.5) !important',
    borderTop: '1px solid rgba(42, 42, 42, 0.5) !important',
    borderBottom: '1px solid rgba(42, 42, 42, 0.5) !important',
    borderRight: '1px solid rgba(42, 42, 42, 0.5) !important',
    borderRadius: '0 8px 8px 0 !important',
    padding: '8px 12px 8px 8px !important',
    marginLeft: '-1px !important',
    '&:hover': {
      backgroundColor: 'rgba(42, 42, 42, 0.3) !important',
    },
    '@media (max-width: 1200px)': {
      left: '65px !important',
      top: '18px !important',
    },
    '@media (max-width: 960px)': {
      left: '60px !important',
      top: '16px !important',
    },
  },
  mobileOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1350,
    display: 'none',
    '@media (max-width: 900px)': {
      display: 'block',
    },
  },
});

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  // Check if chat is open based on the URL
  const isChatOpen = location.pathname.includes('/chat/');

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  const getActiveSection = () => {
    const pathParts = location.pathname.split('/');
    if (pathParts.includes('categories')) {
      const categoryIndex = pathParts.indexOf('categories');
      if (pathParts[categoryIndex + 1]) {
        return `categories/${pathParts[categoryIndex + 1]}`;
      }
    } else if (pathParts.includes('dashboard')) {
      const dashboardIndex = pathParts.indexOf('dashboard');
      if (pathParts[dashboardIndex + 1] && pathParts[dashboardIndex + 1] !== 'chat') {
        return pathParts[dashboardIndex + 1];
      }
    }
    return 'discover';
  };

  const handleSectionChange = (section) => {
    navigate(`/dashboard/${section}`);
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  const handleSearchToggle = () => {
    console.log('Search toggle');
  };

  // Calculate sidebar state for child components
  const sidebarState = {
    isOpen: isMobile ? mobileSidebarOpen : sidebarOpen,
    isMobile,
    sidebarWidth: isMobile ? (mobileSidebarOpen ? 280 : 0) : (sidebarOpen ? 280 : 70),
    isCollapsed: !isMobile && !sidebarOpen
  };

  return (
    <>
      <StarField />
      
      {/* Desktop toggle button - Hidden on mobile */}
      {/* REMOVE THIS OUTSIDE TOGGLE BUTTON */}
      {/* 
      {!isMobile && (
        <IconButton
          className={`${classes.menuButton} ${sidebarOpen ? classes.menuButtonOpen : classes.menuButtonClosed}`}
          onClick={toggleSidebar}
          aria-label="toggle sidebar"
        >
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      )}
      */}

      {/* Mobile TopBar - Hidden when chat is open */}
      {isMobile && !isChatOpen && (
        <TopBar
          activeSection={getActiveSection()}
          onSectionChange={handleSectionChange}
          onMenuToggle={toggleSidebar}
          onSearchToggle={handleSearchToggle}
        />
      )}

      {/* Mobile overlay */}
      {isMobile && mobileSidebarOpen && (
        <Box 
          className={classes.mobileOverlay}
          onClick={handleOverlayClick}
        />
      )}

      <Box className={classes.dashboardContainer}>
        {/* Sidebar - Only render on desktop OR when mobile is open */}
        {(!isMobile || mobileSidebarOpen) && (
          <Sidebar 
            open={isMobile ? mobileSidebarOpen : sidebarOpen}
            onToggle={toggleSidebar}
            isMobile={isMobile}
          />
        )}

        <Box className={`${classes.mainContent} ${!isMobile && sidebarOpen ? classes.mainContentOpen : classes.mainContentClosed}`}>
          <Box className={`${classes.contentArea} ${isMobile && isChatOpen ? classes.contentAreaChatOpen : ''}`}>
            <Outlet context={{ sidebarState }} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;