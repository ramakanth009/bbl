import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { WorkspacePremium } from '@mui/icons-material';

// Styles using makeStyles
const useStyles = makeStyles({
  headerContainer: {
    marginBottom: '32px', // theme.spacing(4)
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 1200px)': {
      marginBottom: '28px',
    },
    '@media (max-width: 960px)': {
      marginBottom: '24px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '20px',
    },
    '@media (max-width: 480px)': {
      marginBottom: '16px',
    },
    '@media (max-width: 375px)': {
      marginBottom: '12px',
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
    gap: '16px',
    '@media (max-width: 1200px)': {
      gap: '14px',
      marginBottom: '7px',
    },
    '@media (max-width: 960px)': {
      gap: '12px',
      marginBottom: '6px',
    },
    '@media (max-width: 600px)': {
      gap: '10px',
      marginBottom: '5px',
    },
    '@media (max-width: 480px)': {
      gap: '8px',
      marginBottom: '4px',
    },
    '@media (max-width: 375px)': {
      gap: '6px',
      marginBottom: '3px',
    },
  },
  logoIcon: {
    fontSize: '40px',
    filter: 'drop-shadow(0 1px 4px #bbb)',
    '@media (max-width: 1200px)': {
      fontSize: '36px',
    },
    '@media (max-width: 960px)': {
      fontSize: '32px',
    },
    '@media (max-width: 600px)': {
      fontSize: '28px',
    },
    '@media (max-width: 480px)': {
      fontSize: '24px',
    },
    '@media (max-width: 375px)': {
      fontSize: '20px',
    },
  },
  titleText: {
    color: '#fff',
    fontSize: '2.1rem',
    letterSpacing: '0.01em',
    background: 'linear-gradient(90deg, #fff 0%, #bbb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    '@media (max-width: 1200px)': {
      fontSize: '1.9rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.7rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.5rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.3rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1.1rem',
    },
  },
  subtitleText: {
    color: '#fff',
    marginBottom: '16px',
    fontSize: '1.15rem',
    textShadow: '0 1px 6px #23252655',
    '@media (max-width: 1200px)': {
      fontSize: '1.1rem',
      marginBottom: '14px',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.05rem',
      marginBottom: '12px',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
      marginBottom: '10px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.95rem',
      marginBottom: '8px',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.9rem',
      marginBottom: '6px',
    },
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <Box className={classes.headerContainer}>
      <Box className={classes.logoContainer}>
        <WorkspacePremium 
          htmlColor="#fff"
          className={classes.logoIcon}
        />
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          gutterBottom
          className={classes.titleText}
        >
          Bring Back Legends
        </Typography>
      </Box>
      <Typography
        variant="body1"
        align="center"
        className={classes.subtitleText}
      >
        Your journey to legendary status starts here. Explore insights, set goals, and make every moment count!
      </Typography>
    </Box>
  );
};

export default Header;