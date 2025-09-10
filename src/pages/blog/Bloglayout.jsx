import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Button,
  IconButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { WorkspacePremium, Menu } from '@mui/icons-material';
import Logo from '../../assets/Gigaspace_logo-removebg-preview.png';

const useStyles = makeStyles(() => ({
  appBar: {
    background: 'linear-gradient(135deg, #0c0c0c 0%, #1f1f23 100%) !important',
    borderBottom: '1px solid #2a2a2e !important',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4) !important',
    backdropFilter: 'blur(10px) !important',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.03) 0%, transparent 50%, rgba(99, 102, 241, 0.03) 100%)',
      pointerEvents: 'none',
    }
  },
  toolbar: {
    justifyContent: 'space-between',
    padding: '0 24px !important',
    minHeight: '80px !important',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 960px)': {
      padding: '0 16px !important',
      minHeight: '70px !important',
    },
    '@media (max-width: 600px)': {
      padding: '0 12px !important',
      minHeight: '65px !important',
    }
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none !important',
    transition: 'all 0.3s ease !important',
    '&:hover': {
      transform: 'translateY(-1px)',
      filter: 'drop-shadow(0 4px 8px rgba(99, 102, 241, 0.3))',
    }
  },
  logoImage: {
    height: '45px',
    width: 'auto',
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
    '@media (max-width: 960px)': {
      height: '40px',
    },
    '@media (max-width: 600px)': {
      height: '35px',
    }
  },
  logoFallback: {
    width: '40px !important',
    height: '40px !important',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    borderRadius: '8px !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    '@media (max-width: 960px)': {
      width: '36px !important',
      height: '36px !important',
    },
    '@media (max-width: 600px)': {
      width: '32px !important',
      height: '32px !important',
    }
  },

  navigation: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '@media (max-width: 960px)': {
      gap: '4px',
    },
    '@media (max-width: 768px)': {
      display: 'none !important',
    }
  },
  navButton: {
    color: '#a0a0a0 !important',
    textTransform: 'none !important',
    fontWeight: '500 !important',
    fontSize: '0.875rem !important',
    padding: '8px 16px !important',
    borderRadius: '20px !important',
    transition: 'all 0.3s ease !important',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.1) !important',
      color: '#ffffff !important',
      transform: 'translateY(-1px)',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      transition: 'left 0.5s ease',
    },
    '&:hover:before': {
      left: '100%',
    },
    '@media (max-width: 960px)': {
      padding: '6px 12px !important',
      fontSize: '0.8rem !important',
    }
  },
  ctaButton: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    color: '#ffffff !important',
    textTransform: 'none !important',
    fontWeight: '600 !important',
    padding: '10px 20px !important',
    fontSize: '0.875rem !important',
    borderRadius: '25px !important',
    transition: 'all 0.3s ease !important',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4) !important',
    '&:hover': {
      background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%) !important',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(99, 102, 241, 0.6) !important',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.5s ease',
    },
    '&:hover:before': {
      left: '100%',
    },
    '@media (max-width: 960px)': {
      padding: '8px 16px !important',
      fontSize: '0.8rem !important',
    }
  },
  mobileMenu: {
    display: 'none !important',
    '@media (max-width: 768px)': {
      display: 'flex !important',
    }
  },
  mobileMenuButton: {
    color: '#ffffff !important',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.1) !important',
    }
  },
  main: {
    minHeight: '100vh',
    background: 'radial-gradient(ellipse at top, #0c0c0c 0%, #050505 100%)',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(99, 102, 241, 0.03) 0%, transparent 50%)
      `,
      pointerEvents: 'none',
      zIndex: 0,
    },
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    paddingTop: '80px',
    '@media (max-width: 960px)': {
      paddingTop: '70px',
    },
    '@media (max-width: 600px)': {
      paddingTop: '65px',
    }
  },
  footer: {
    background: 'linear-gradient(135deg, #0c0c0c 0%, #1f1f23 100%)',
    borderTop: '1px solid #2a2a2e',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent 0%, #6366f1 50%, transparent 100%)',
    }
  },
  footerContent: {
    padding: '60px 0 40px 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '30px',
      padding: '40px 0 30px 0',
    }
  },
  footerSection: {
    '& h3': {
      color: '#ffffff',
      marginBottom: '20px',
      fontSize: '1.1rem',
      fontWeight: '600',
      background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    '& p': {
      color: '#a0a0a0',
      lineHeight: '1.6',
      fontSize: '0.875rem',
    },
    '& ul': {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      '& li': {
        marginBottom: '12px',
        '& a': {
          color: '#a0a0a0',
          textDecoration: 'none',
          fontSize: '0.875rem',
          transition: 'all 0.3s ease',
          position: 'relative',
          '&:hover': {
            color: '#6366f1',
            paddingLeft: '8px',
          }
        }
      }
    }
  },
  footerBottom: {
    borderTop: '1px solid #2a2a2e',
    paddingTop: '30px',
    paddingBottom: '30px',
    textAlign: 'center',
    '& p': {
      color: '#666666',
      fontSize: '0.8125rem',
      margin: 0,
      '& span': {
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: '600',
      }
    }
  }
}));

export default function BlogLayout() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <Helmet>
        <title>GigaSpace Blog - Singularity of AI Conversations</title>
        <meta name="description" content="Explore the convergence of AI technology, legendary personalities, and human consciousness. Discover insights about chatting with historical figures and famous icons on GigaSpace." />
        <meta name="keywords" content="GigaSpace blog, AI singularity, chat with legends, AI consciousness, famous personalities, AI technology" />
        <meta property="og:title" content="GigaSpace Blog - Singularity of AI Conversations" />
        <meta property="og:description" content="Explore the convergence of AI technology and human consciousness through conversations with legendary figures." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Box 
              component={Link}
              to="/blog"
              className={classes.logoSection}
            >
              {Logo ? (
                <img 
                  src={Logo} 
                  alt="GigaSpace" 
                  className={classes.logoImage}
                />
              ) : (
                <Box className={classes.logoFallback}>
                  <WorkspacePremium sx={{ fontSize: '24px', color: '#ffffff' }} />
                </Box>
              )}
             
            </Box>
            
            <Box className={classes.navigation}>
             
              <Button 
                onClick={() => navigate('/dashboard')}
                className={classes.ctaButton}
              >
                Enter GigaSpace
              </Button>
            </Box>

            <Box className={classes.mobileMenu}>
              <IconButton 
                className={classes.mobileMenuButton}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="main" className={classes.main}>
          <Box className={classes.contentWrapper}>
            <Outlet />
          </Box>
        </Box>

        <Box component="footer" className={classes.footer}>
          <Container maxWidth="lg">
            <Box className={classes.footerContent}>
              <Box className={classes.footerSection}>
                <Typography variant="h3">The Singularity</Typography>
                <Typography>
                  Where artificial intelligence meets human consciousness. 
                  Experience conversations that transcend the boundaries between 
                  technology and wisdom, connecting you with the greatest minds in history.
                </Typography>
              </Box>
              
              <Box className={classes.footerSection}>
                <Typography variant="h3">Neural Networks</Typography>
                <Box component="ul">
                  <li><Link to="/blog/category/ai-technology">AI Consciousness</Link></li>
                  <li><Link to="/blog/category/famous-personalities">Digital Legends</Link></li>
                  <li><Link to="/blog/category/historical-figures">Temporal Echoes</Link></li>
                  <li><Link to="/blog/category/how-to-guides">Neural Pathways</Link></li>
                  <li><Link to="/blog/category/success-stories">Emergence Stories</Link></li>
                </Box>
              </Box>
              
              <Box className={classes.footerSection}>
                <Typography variant="h3">Interface</Typography>
                <Box component="ul">
                  <li><Link to="/dashboard">Main Terminal</Link></li>
                  <li><Link to="/dashboard/discover">Entity Discovery</Link></li>
                  <li><Link to="/dashboard/featured">Prime Entities</Link></li>
                  <li><Link to="/dashboard/trending">Trending Minds</Link></li>
                </Box>
              </Box>
              
              <Box className={classes.footerSection}>
                <Typography variant="h3">Network</Typography>
                <Typography>
                  Join the convergence of human curiosity and artificial intelligence. 
                  Connect with minds across time and space through the GigaSpace neural network.
                </Typography>
              </Box>
            </Box>
            
            <Box className={classes.footerBottom}>
              <Typography>
                © 2025 <span>GigaSpace</span>. All quantum states reserved. | 
                The Singularity of Conversations | AI Neural Network Platform
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}