import React, { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/dashboard/main/Sidebar";
import TopBar from "../components/dashboard/main/TopBar";
import StarField from "../components/common/StarField";
import { createSidebarState, isMobileViewport, getSidebarWidth } from "../utils/sidebarUtils";

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
    // padding: '20px !important',
    flex: 1,
    display: "flex",
    transition: 'margin-left 0.3s ease !important',
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
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );
  
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = isMobileViewport(viewportWidth);
  const navigate = useNavigate();
  const location = useLocation();

  // Enhanced viewport width tracking
  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    
    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  // Save and restore desktop sidebar state
  useEffect(() => {
    if (!isMobile) {
      const savedState = localStorage.getItem('sidebar_desktop_open');
      if (savedState !== null) {
        setSidebarOpen(JSON.parse(savedState));
      }
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('sidebar_desktop_open', JSON.stringify(sidebarOpen));
    }
  }, [sidebarOpen, isMobile]);

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

  // Use centralized sidebar width calculation
  const currentSidebarWidth = getSidebarWidth(viewportWidth, isMobile ? mobileSidebarOpen : sidebarOpen, isMobile);

  // Use centralized sidebar state creation
  const sidebarState = createSidebarState({
    sidebarOpen,
    mobileSidebarOpen,
    viewportWidth,
    isMobile
  });

  // Debug logging for development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Dashboard] Sidebar State Updated:', {
        isOpen: sidebarState.isOpen,
        isMobile: sidebarState.isMobile,
        viewportWidth: sidebarState.viewportWidth,
        sidebarWidth: sidebarState.sidebarWidth,
        actualWidth: sidebarState.actualWidth,
        isCollapsed: sidebarState.isCollapsed
      });
    }
  }, [
    sidebarOpen,
    mobileSidebarOpen,
    isMobile,
    viewportWidth
  ]);

  return (
    <>
      <StarField />
      
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
            sidebarState={sidebarState} // Pass enhanced state to Sidebar
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