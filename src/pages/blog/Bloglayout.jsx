import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#1a1a2e !important',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3) !important',
  },
  toolbar: {
    justifyContent: 'space-between',
    padding: '0 16px !important',
  },
  logo: {
    fontWeight: '700 !important',
    fontSize: '1.5rem !important',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important',
    WebkitBackgroundClip: 'text !important',
    WebkitTextFillColor: 'transparent !important',
    backgroundClip: 'text !important',
    textDecoration: 'none !important',
    '&:hover': {
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important',
      WebkitBackgroundClip: 'text !important',
      WebkitTextFillColor: 'transparent !important',
      backgroundClip: 'text !important',
    }
  },
  navButtons: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  navButton: {
    color: '#ffffff !important',
    textTransform: 'none !important',
    fontWeight: '500 !important',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1) !important',
    }
  },
  ctaButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important',
    color: '#ffffff !important',
    textTransform: 'none !important',
    fontWeight: '600 !important',
    padding: '8px 20px !important',
    borderRadius: '25px !important',
    '&:hover': {
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4) !important',
    }
  },
  main: {
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: '#0f0f23',
    paddingTop: '64px',
  },
  footer: {
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    padding: '40px 0',
    marginTop: '80px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '30px',
  },
  footerSection: {
    '& h3': {
      color: '#ffffff',
      marginBottom: '16px',
      fontSize: '1.1rem',
      fontWeight: '600',
    },
    '& p, & a': {
      color: '#9ca3af',
      textDecoration: 'none',
      lineHeight: '1.6',
      '&:hover': {
        color: '#ffffff',
      }
    },
    '& ul': {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      '& li': {
        marginBottom: '8px',
      }
    }
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '20px',
    textAlign: 'center',
    color: '#9ca3af',
  }
}));

export default function BlogLayout() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>GigaSpace Blog - Chat with AI Legends & Famous Personalities</title>
        <meta name="description" content="Discover insights about AI chat technology, historical figures, and famous personalities on GigaSpace blog. Learn how to chat with legends and enhance your conversations." />
        <meta name="keywords" content="GigaSpace blog, AI chat, chat with legends, famous personalities, AI technology, historical figures" />
        <meta property="og:title" content="GigaSpace Blog - Chat with AI Legends & Famous Personalities" />
        <meta property="og:description" content="Discover insights about AI chat technology, historical figures, and famous personalities on GigaSpace blog." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h6"
              component={Link}
              to="/blog"
              className={classes.logo}
            >
              GigaSpace Blog
            </Typography>
            
            <Box className={classes.navButtons}>
              <Button 
                component={Link} 
                to="/blog" 
                className={classes.navButton}
              >
                Home
              </Button>
              <Button 
                component={Link} 
                to="/blog/category/ai-technology" 
                className={classes.navButton}
              >
                AI Technology
              </Button>
              <Button 
                component={Link} 
                to="/blog/category/famous-personalities" 
                className={classes.navButton}
              >
                Personalities
              </Button>
              <Button 
                component={Link} 
                to="/blog/category/how-to-guides" 
                className={classes.navButton}
              >
                Guides
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className={classes.ctaButton}
              >
                Try GigaSpace
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="main" className={classes.main}>
          <Outlet />
        </Box>

        <Box component="footer" className={classes.footer}>
          <Container maxWidth="lg">
            <Box className={classes.footerContent}>
              <Box className={classes.footerSection}>
                <Typography variant="h3">About GigaSpace</Typography>
                <Typography>
                  Connect with legendary personalities through AI-powered conversations. 
                  Chat with historical figures, entrepreneurs, scientists, and celebrities 
                  in multiple languages.
                </Typography>
              </Box>
              
              <Box className={classes.footerSection}>
                <Typography variant="h3">Categories</Typography>
                <Box component="ul">
                  <li><Link to="/blog/category/ai-technology">AI Technology</Link></li>
                  <li><Link to="/blog/category/famous-personalities">Famous Personalities</Link></li>
                  <li><Link to="/blog/category/historical-figures">Historical Figures</Link></li>
                  <li><Link to="/blog/category/how-to-guides">How-to Guides</Link></li>
                  <li><Link to="/blog/category/success-stories">Success Stories</Link></li>
                </Box>
              </Box>
              
              <Box className={classes.footerSection}>
                <Typography variant="h3">Quick Links</Typography>
                <Box component="ul">
                  <li><Link to="/dashboard">Start Chatting</Link></li>
                  <li><Link to="/dashboard/discover">Discover Characters</Link></li>
                  <li><Link to="/dashboard/featured">Featured</Link></li>
                  <li><Link to="/dashboard/trending">Trending</Link></li>
                </Box>
              </Box>
              
              <Box className={classes.footerSection}>
                <Typography variant="h3">Connect</Typography>
                <Typography>
                  Follow us for the latest updates on AI conversations and new personality additions.
                </Typography>
              </Box>
            </Box>
            
            <Box className={classes.footerBottom}>
              <Typography>
                © 2025 GigaSpace. All rights reserved. | 
                Chat with Legends | AI Chat Platform
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
