import React, { useState } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Sidebar from '../components/dashboard/main/Sidebar';
import StarField from '../components/common/StarField';
import Discover from './sections/Discover';

// Styles using makeStyles
const useStyles = makeStyles({
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
  },
  mainContent: {
    marginLeft: 300,
    flex: 1,
    display: 'flex',
    '@media (max-width: 900px)': {
      marginLeft: 0,
    },
  },
  contentArea: {
    flex: 1,
    overflow: 'hidden',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [activeSection, setActiveSection] = useState('Discover');

  const renderSection = () => {
    switch (activeSection) {
      case 'Discover':
        return <Discover />;
      case 'History':
        return <Discover />; // You can create separate components for other sections later
      default:
        return <Discover />;
    }
  };

  return (
    <>
      <StarField />
      <Box className={classes.dashboardContainer}>
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <Box className={classes.mainContent}>
          <Box className={classes.contentArea}>
            {renderSection()}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;