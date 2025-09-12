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
    justifyContent: 'space-between',
    gap: '12px',
    color: '#aaa',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '8px',
      textAlign: 'center',
    },
  },
  footerLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '@media (max-width: 600px)': {
      gap: '12px',
    },
  },
  footerLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 600,
    borderBottom: '1px dashed rgba(255,255,255,0.35)',
    transition: 'opacity 0.2s ease',
    '&:hover': {
      opacity: 0.85,
    },
  },
  copyright: {
    color: '#aaa',
    fontSize: '0.9rem',
  },
}));

const AuthFooter = () => {
  const classes = useStyles();
  return (
    <Box component="footer" className={classes.footerContainer}>
      <Box className={classes.footerInner}>
        <Box className={classes.footerLinks}>
          <Link to="/blog" className={classes.footerLink}>Blog</Link>
        </Box>
        <Typography variant="body2" className={classes.copyright}>
          © {new Date().getFullYear()} GigaSpace. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthFooter;
