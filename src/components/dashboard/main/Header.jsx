import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Logo from "../../../assets/Gigaspace_logo-removebg-preview.png"

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
    '@media (max-width: 1200px)': {
      marginBottom: '7px',
    },
    '@media (max-width: 960px)': {
      marginBottom: '6px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '5px',
    },
    '@media (max-width: 480px)': {
      marginBottom: '4px',
    },
    '@media (max-width: 375px)': {
      marginBottom: '3px',
    },
  },
  logoImage: {
    height: '80px',
    width: 'auto',
    maxWidth: '300px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
    '@media (max-width: 1200px)': {
      height: '72px',
      maxWidth: '270px',
    },
    '@media (max-width: 960px)': {
      height: '64px',
      maxWidth: '240px',
    },
    '@media (max-width: 600px)': {
      height: '56px',
      maxWidth: '210px',
    },
    '@media (max-width: 480px)': {
      height: '48px',
      maxWidth: '180px',
    },
    '@media (max-width: 375px)': {
      height: '40px',
      maxWidth: '150px',
    },
  },
  logoPlaceholder: {
    height: '80px',
    width: '300px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '2px dashed rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
    '@media (max-width: 1200px)': {
      height: '72px',
      width: '270px',
      fontSize: '13px',
    },
    '@media (max-width: 960px)': {
      height: '64px',
      width: '240px',
      fontSize: '12px',
    },
    '@media (max-width: 600px)': {
      height: '56px',
      width: '210px',
      fontSize: '11px',
    },
    '@media (max-width: 480px)': {
      height: '48px',
      width: '180px',
      fontSize: '10px',
    },
    '@media (max-width: 375px)': {
      height: '40px',
      width: '150px',
      fontSize: '9px',
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

const Header = ({ logoSrc }) => {
  const classes = useStyles();
  
  return (
    <Box className={classes.headerContainer}>
      <Box className={classes.logoContainer}>
        {logoSrc ? (
          <img
            src={logoSrc}
            alt="Bring Back Legends Logo"
            className={classes.logoImage}
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Placeholder div - shows when no logoSrc or image fails to load */}
        
          <img src={Logo} alt="Logo" />
          
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