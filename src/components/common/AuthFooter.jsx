import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  footerContainer: {
    width: '100%',
    padding: '12px 16px',
    position: 'fixed',
    left: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    zIndex: 10,
  },
  footerInner: {
    width: '100%',
    maxWidth: 960,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa',
    textAlign: 'center',
  },
  copyright: {
    color: '#aaa',
    fontSize: '0.9rem',
    width: '100%',
  },
}));

const AuthFooter = () => {
  const classes = useStyles();
  return (
    <Box component="footer" className={classes.footerContainer}>
      <Box className={classes.footerInner}>
        <Typography variant="body2" className={classes.copyright}>
          © {new Date().getFullYear()} GigaSpace. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthFooter;
