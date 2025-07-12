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
    minHeight: "100vh",
    padding:"20px"
  },
  mainContent: {
    marginLeft: 260,
    padding: '20px !important',
    flex: 1,
    display: "flex",
    "@media (max-width: 900px)": {
      marginLeft: 0,
    },
  },
  contentArea: {
    flex: 1,
    overflow: "hidden",
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