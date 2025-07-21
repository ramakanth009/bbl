import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/main/Sidebar";
import StarField from "../components/common/StarField";

// Styles using makeStyles
const useStyles = makeStyles({
  dashboardContainer: {
    display: "flex",
    // minHeight: "100vh",
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
    marginLeft: 260,
    padding: '20px !important',
    flex: 1,
    display: "flex",
    '@media (max-width: 1200px)': {
      marginLeft: 240,
      padding: '18px !important',
    },
    '@media (max-width: 960px)': {
      marginLeft: 220,
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
  contentArea: {
    flex: 1,
    overflow: "hidden",
    '@media (max-width: 600px)': {
      overflow: "auto",
    },
  },
});

const Dashboard = () => {
  const classes = useStyles();

  return (
    <>
      <StarField />
      <Box className={classes.dashboardContainer}>
        <Sidebar />
        <Box className={classes.mainContent}>
          <Box className={classes.contentArea}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;