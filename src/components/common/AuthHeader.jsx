import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  headerContainer: {
    width: '100%',
    padding: '16px 24px',
    position: 'fixed',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1100,
    '@media (max-width: 600px)': {
      padding: '12px 16px',
    },
  },
  headerLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    '@media (max-width: 600px)': {
      gap: '16px',
    },
  },
  headerLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.95rem',
    padding: '6px 0',
    borderBottom: '1px solid transparent',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderBottom: '1px solid #fff',
      opacity: 0.9,
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
  },
}));

const AuthHeader = () => {
  const classes = useStyles();
  
  return (
    <Box component="header" className={classes.headerContainer}>
      <Box className={classes.headerLinks}>
        <Link to="/blog" className={classes.headerLink}>
          Blog
        </Link>
        <Link to="/faq" className={classes.headerLink}>
          FAQ
        </Link>
        <Link to="/terms" className={classes.headerLink}>
          Terms
        </Link>
      </Box>
    </Box>
  );
};

export default AuthHeader;
