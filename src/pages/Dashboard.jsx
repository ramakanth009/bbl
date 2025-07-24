import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/main/Sidebar";
import StarField from "../components/common/StarField";

// Styles using makeStyles
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
    '@media (max-width: 600px)': {
      padding: "12px",
    },
    '@media (max-width: 480px)': {
      padding: "8px",
    },
    '@media (max-width: 375px)': {
      padding: "4px",
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
    "@media (max-width: 900px)": {
      marginLeft: 0,
    },
    '@media (max-width: 600px)': {
      padding: '12px !important',
    },
    '@media (max-width: 480px)': {
      padding: '8px !important',
    },
    '@media (max-width: 375px)': {
      padding: '4px !important',
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
    "@media (max-width: 900px)": {
      marginLeft: 0,
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
    "@media (max-width: 900px)": {
      marginLeft: 0,
    },
  },
  contentArea: {
    flex: 1,
    overflow: "hidden",
    '@media (max-width: 600px)': {
      overflow: "auto",
    },
  },
  menuButton: {
    position: 'fixed !important',
    top: '5% !important',
    transform: 'translateY(-50%) !important',
    zIndex: '1300 !important',
    transition: 'all 0.3s ease !important',
    color: 'white !important',
    '@media (max-width: 900px)': {
      top: '20px !important',
      transform: 'none !important',
      left: '20px !important',
      backgroundColor: 'rgba(26, 26, 26, 0.9) !important',
      border: '1px solid rgba(42, 42, 42, 0.9) !important',
      borderRadius: '8px !important',
      padding: '8px !important',
      '&:hover': {
        backgroundColor: 'rgba(42, 42, 42, 0.9) !important',
      },
    },
    '@media (max-width: 600px)': {
      top: '12px !important',
      left: '12px !important',
      padding: '6px !important',
    },
    '@media (max-width: 480px)': {
      top: '8px !important',
      left: '8px !important',
      padding: '4px !important',
    },
    '@media (max-width: 375px)': {
      top: '4px !important',
      left: '4px !important',
      padding: '2px !important',
    },
  },
  menuButtonOpen: {
    left: '280px !important',
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
});

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const classes = useStyles();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <StarField />
      <IconButton
        className={`${classes.menuButton} ${sidebarOpen ? classes.menuButtonOpen : classes.menuButtonClosed}`}
        onClick={toggleSidebar}
        aria-label="toggle sidebar"
      >
        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
      <Box className={classes.dashboardContainer}>
        <Sidebar 
          open={sidebarOpen}
          onToggle={toggleSidebar}
        />
        <Box className={`${classes.mainContent} ${sidebarOpen ? classes.mainContentOpen : classes.mainContentClosed}`}>
          <Box className={classes.contentArea}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;