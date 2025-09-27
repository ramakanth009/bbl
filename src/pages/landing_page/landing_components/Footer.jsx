import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GigaspaceLogo from '../../../assets/Gigaspace_logo-removebg-preview.png';

const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: '#0a0a0a',
    borderTop: '1px solid #1f1f1f',
    paddingTop: '80px',
    paddingBottom: '40px',
    '@media (max-width: 960px)': {
      paddingTop: '60px',
      paddingBottom: '32px',
    },
    '@media (max-width: 600px)': {
      paddingTop: '48px',
      paddingBottom: '24px',
    },
  },
  container: {
    maxWidth: '1200px !important',
    '@media (max-width: 600px)': {
      maxWidth: '100% !important',
      paddingLeft: '20px !important',
      paddingRight: '20px !important',
    },
  },
  footerContent: {
    marginBottom: '64px',
    '@media (max-width: 600px)': {
      marginBottom: '48px',
    },
  },
  
  // Main sections container
  sectionsContainer: {
    display: 'flex',
    width: '100%',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      gap: '40px',
    },
    '@media (max-width: 600px)': {
      gap: '32px',
    },
  },
  
  // Individual section boxes
  sectionBox: {
    flex: '1 1 33.333%',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 960px)': {
      flex: 'none',
      textAlign: 'center',
    },
  },
  
  // Brand Section
  brandSection: {
    '@media (max-width: 960px)': {
      alignItems: 'center',
    },
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '16px',
    '@media (max-width: 960px)': {
      justifyContent: 'center',
    },
  },
  brandLogo: {
    width: '200px',
    objectFit: 'contain',
    flexShrink: 0,
  },
  brandTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#ffffff',
    margin: 0,
  },
  brandDescription: {
    fontSize: '14px',
    color: '#9ca3af',
    lineHeight: 1.5,
    maxWidth: '280px',
    margin: 0,
    '@media (max-width: 960px)': {
      maxWidth: '100%',
      textAlign: 'center',
    },
  },
  
  // Section Styling
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '24px',
    '@media (max-width: 960px)': {
      textAlign: 'center',
    },
    '@media (max-width: 600px)': {
      fontSize: '15px',
      marginBottom: '20px',
    },
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    '@media (max-width: 960px)': {
      textAlign: 'center',
    },
  },
  linkItem: {
    marginBottom: '12px',
    '@media (max-width: 600px)': {
      marginBottom: '10px',
    },
  },
  footerLink: {
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '14px',
    lineHeight: 1.5,
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      color: '#ffffff',
    },
    '@media (max-width: 600px)': {
      fontSize: '13px',
    },
  },
  
  // Bottom Bar
  bottomBar: {
    borderTop: '1px solid #1f1f1f',
    paddingTop: '32px',
    textAlign: 'center',
    '@media (max-width: 600px)': {
      paddingTop: '24px',
    },
  },
  copyright: {
    color: '#6b7280',
    fontSize: '14px',
    margin: 0,
    '@media (max-width: 600px)': {
      fontSize: '13px',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  return (
    <Box component="footer" className={classes.footer}>
      <Container className={classes.container}>
        <Box className={classes.footerContent}>
          <Box className={classes.sectionsContainer}>
            {/* Brand Section */}
            <Box className={`${classes.sectionBox} ${classes.brandSection}`}>
              <Box className={classes.brandContainer}>
                <img
                  src={GigaspaceLogo}
                  alt="Gigaspace Logo"
                  className={classes.brandLogo}
                />
              </Box>
              <Typography className={classes.brandDescription}>
                A flagship product of Gigaversity
              </Typography>
            </Box>

            {/* Company Section */}
            <Box className={classes.sectionBox}>
              <Typography className={classes.sectionTitle}>
                Company
              </Typography>
              <Box component="ul" className={classes.linkList}>
                <li className={classes.linkItem}>
                  <Typography
                    className={classes.footerLink}
                    onClick={() => handleLinkClick('/about')}
                  >
                    About
                  </Typography>
                </li>
                <li className={classes.linkItem}>
                  <Typography
                    className={classes.footerLink}
                    onClick={() => handleLinkClick('/blog')}
                  >
                    Blog
                  </Typography>
                </li>
                <li className={classes.linkItem}>
                  <Typography
                    className={classes.footerLink}
                    onClick={() => handleLinkClick('/careers')}
                  >
                    Careers
                  </Typography>
                </li>
              </Box>
            </Box>

            {/* Legal Section */}
            <Box className={classes.sectionBox}>
              <Typography className={classes.sectionTitle}>
                Legal
              </Typography>
              <Box component="ul" className={classes.linkList}>
                <li className={classes.linkItem}>
                  <Typography
                    className={classes.footerLink}
                    onClick={() => handleLinkClick('/privacy-policy')}
                  >
                    Privacy Policy
                  </Typography>
                </li>
                <li className={classes.linkItem}>
                  <Typography
                    className={classes.footerLink}
                    onClick={() => handleLinkClick('/terms-of-service')}
                  >
                    Terms of Service
                  </Typography>
                </li>
                <li className={classes.linkItem}>
                  <Typography
                    className={classes.footerLink}
                    onClick={() => handleLinkClick('/cookie-policy')}
                  >
                    Cookie Policy
                  </Typography>
                </li>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Box className={classes.bottomBar}>
          <Typography className={classes.copyright}>
            © 2023 Gigaspace. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;