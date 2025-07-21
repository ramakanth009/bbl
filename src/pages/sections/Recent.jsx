// Recent.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useRecentStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    padding: '0 20px',
    '@media (max-width: 1200px)': {
      height: '55vh',
      padding: '0 18px',
    },
    '@media (max-width: 960px)': {
      height: '50vh',
      padding: '0 16px',
    },
    '@media (max-width: 600px)': {
      height: '45vh',
      padding: '0 14px',
    },
    '@media (max-width: 480px)': {
      height: '40vh',
      padding: '0 12px',
    },
    '@media (max-width: 375px)': {
      height: '35vh',
      padding: '0 8px',
    },
  },
  title: {
    '@media (max-width: 960px)': {
      fontSize: '1.8rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.6rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.4rem !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '1.2rem !important',
    },
  },
  subtitle: {
    '@media (max-width: 600px)': {
      fontSize: '1.1rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1rem !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.9rem !important',
    },
  },
});

const Recent = () => {
  const classes = useRecentStyles();
  return (
    <Box className={classes.container}>
      <Typography variant="h4" color="text.secondary" gutterBottom className={classes.title}>
        Recent
      </Typography>
      <Typography variant="h6" color="text.disabled" className={classes.subtitle}>
        Coming Soon
      </Typography>
    </Box>
  );
};

export default Recent;
