// import React from "react";
// import { Box } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/dashboard/main/Sidebar";
// import StarField from "../components/common/StarField";

// // Styles using makeStyles
// const useStyles = makeStyles({
//   dashboardContainer: {
//     display: "flex",
//     // minHeight: "100vh",
//     padding: "20px",
//     '@media (max-width: 1200px)': {
//       padding: "18px",
//     },
//     '@media (max-width: 960px)': {
//       padding: "16px",
//     },
//     '@media (max-width: 600px)': {
//       padding: "12px",
//     },
//     '@media (max-width: 480px)': {
//       padding: "8px",
//     },
//     '@media (max-width: 375px)': {
//       padding: "4px",
//     },
//   },
//   mainContent: {
//     marginLeft: 260,
//     padding: '20px !important',
//     flex: 1,
//     display: "flex",
//     '@media (max-width: 1200px)': {
//       marginLeft: 240,
//       padding: '18px !important',
//     },
//     '@media (max-width: 960px)': {
//       marginLeft: 220,
//       padding: '16px !important',
//     },
//     "@media (max-width: 900px)": {
//       marginLeft: 0,
//     },
//     '@media (max-width: 600px)': {
//       padding: '12px !important',
//     },
//     '@media (max-width: 480px)': {
//       padding: '8px !important',
//     },
//     '@media (max-width: 375px)': {
//       padding: '4px !important',
//     },
//   },
//   contentArea: {
//     flex: 1,
//     overflow: "hidden",
//     '@media (max-width: 600px)': {
//       overflow: "auto",
//     },
//   },
// });

// const Dashboard = () => {
//   const classes = useStyles();

//   return (
//     <>
//       <StarField />
//       <Box className={classes.dashboardContainer}>
//         <Sidebar />
//         <Box className={classes.mainContent}>
//           <Box className={classes.contentArea}>
//             <Outlet />
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Dashboard;
import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
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
    marginLeft: (props) => props.sidebarOpen ? 280 : 0,
    padding: '20px !important',
    flex: 1,
    display: "flex",
    transition: 'margin-left 0.3s ease !important',
    '@media (max-width: 1200px)': {
      marginLeft: (props) => props.sidebarOpen ? 260 : 0,
      padding: '18px !important',
    },
    '@media (max-width: 960px)': {
      marginLeft: (props) => props.sidebarOpen ? 240 : 0,
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
  menuButton: {
    position: 'fixed !important',
    top: '20px !important',
    left: (props) => props.sidebarOpen ? '300px' : '20px',
    zIndex: '1300 !important',
    backgroundColor: 'rgba(26, 26, 26, 0.9) !important',
    color: 'white !important',
    border: '1px solid rgba(42, 42, 42, 0.5) !important',
    borderRadius: '8px !important',
    padding: '8px !important',
    transition: 'left 0.3s ease !important',
    '&:hover': {
      backgroundColor: 'rgba(42, 42, 42, 0.9) !important',
    },
    '@media (max-width: 1200px)': {
      left: (props) => props.sidebarOpen ? '280px' : '18px',
      top: '18px !important',
    },
    '@media (max-width: 960px)': {
      left: (props) => props.sidebarOpen ? '260px' : '16px',
      top: '16px !important',
    },
    '@media (max-width: 900px)': {
      left: '16px !important',
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
});

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const classes = useStyles({ sidebarOpen });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <StarField />
      <IconButton
        className={classes.menuButton}
        onClick={toggleSidebar}
        aria-label="toggle sidebar"
      >
        <MenuIcon />
      </IconButton>
      <Box className={classes.dashboardContainer}>
        <Sidebar 
          open={sidebarOpen}
          onToggle={toggleSidebar}
        />
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