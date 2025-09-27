import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  FaCrown,
  FaLandmark,
  FaUniversity,
  FaChartLine,
  FaStar,
  FaMask,
  FaLanguage,
  FaBrain,
  FaGlobe,
  FaArrowRight
} from 'react-icons/fa';

const useStyles = makeStyles(() => ({
  section: {
    paddingTop: '40px',
    paddingBottom: '40px',
    backgroundColor: '#1f1f23',
    '@media (max-width: 1200px)': {
      paddingTop: '35px',
      paddingBottom: '35px',
    },
    '@media (max-width: 960px)': {
      paddingTop: '30px',
      paddingBottom: '30px',
    },
    '@media (max-width: 600px)': {
      paddingTop: '50px',
      paddingBottom: '50px',
    },
    '@media (max-width: 480px)': {
      paddingTop: '40px',
      paddingBottom: '40px',
    },
    '@media (max-width: 375px)': {
      paddingTop: '30px',
      paddingBottom: '30px',
    },
  },
  container: {
    maxWidth: '1280px !important',
    '@media (max-width: 1200px)': {
      maxWidth: '1080px !important',
    },
    '@media (max-width: 960px)': {
      maxWidth: '960px !important',
    },
    '@media (max-width: 600px)': {
      maxWidth: '100% !important',
      paddingLeft: '16px !important',
      paddingRight: '16px !important',
    },
  },
  titleWrapper: {
    textAlign: 'center',
    marginBottom: '48px',
    '@media (max-width: 960px)': {
      marginBottom: '36px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '24px',
    },
  },
  sectionTitle: {
    position: 'relative',
    display: 'inline-block',
    fontSize: '1.875rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '16px',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '60%',
      height: '4px',
      bottom: '-10px',
      left: '20%',
      background: 'linear-gradient(90deg, #6366f1, #818cf8)',
      borderRadius: '2px',
    },
    '@media (min-width: 640px)': {
      fontSize: '2.25rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.75rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.5rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.25rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1.1rem',
    },
  },
  subtitle: {
    color: '#a0a0a0',
    fontSize: '1.125rem',
    '@media (max-width: 960px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
    },
  },
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    '@media (max-width: 1200px)': {
      gap: '20px',
    },
    '@media (max-width: 960px)': {
      gap: '16px',
    },
  },
  card: {
    padding: '24px',
    borderRadius: '16px',
    backgroundColor: '#28282c',
    border: '1px solid #3a3a3e',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #6366f1, #818cf8)',
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.4s ease',
      zIndex: 2,
    },
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.3)',
      backgroundColor: '#35353a',
      borderColor: 'rgba(99, 102, 241, 0.3)',
      '&::before': {
        transform: 'scaleX(1)',
      },
      '& $iconWrapper': {
        background: 'rgba(99, 102, 241, 0.2)',
        transform: 'scale(1.1)',
      },
      '& $learnMore': {
        opacity: 1,
        color: '#6366f1',
        '& $arrowIcon': {
          transform: 'translateX(4px)',
        },
      },
    },
    '@media (max-width: 600px)': {
      padding: '20px',
      borderRadius: '14px',
    },
    '@media (max-width: 480px)': {
      padding: '16px',
      borderRadius: '12px',
    },
  },
  iconWrapper: {
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    background: 'rgba(99, 102, 241, 0.1)',
    marginBottom: '16px',
    transition: 'all 0.3s ease',
    color: '#818cf8',
    fontSize: '24px',
    '@media (max-width: 600px)': {
      width: '48px',
      height: '48px',
      fontSize: '20px',
      marginBottom: '12px',
    },
    '@media (max-width: 480px)': {
      width: '44px',
      height: '44px',
      fontSize: '18px',
      marginBottom: '10px',
    },
  },
  cardTitle: {
    fontWeight: 600,
    color: '#ffffff',
    fontSize: '1.125rem',
    marginBottom: '8px',
    '@media (max-width: 960px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.95rem',
      marginBottom: '6px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
      marginBottom: '4px',
    },
  },
  cardDescription: {
    fontSize: '0.875rem',
    color: '#a0a0a0',
    marginBottom: '16px',
    flex: 1,
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
      marginBottom: '12px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.75rem',
      marginBottom: '10px',
    },
  },
  learnMore: {
    opacity: 0.7,
    transition: 'all 0.3s ease',
    color: '#818cf8',
    fontWeight: 500,
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    textDecoration: 'none',
    cursor: 'pointer',
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.75rem',
    },
  },
  arrowIcon: {
    fontSize: '12px',
    transition: 'transform 0.3s ease',
  },
}));

const features = [
  {
    icon: FaCrown,
    title: 'Chat with Legends',
    description: 'from history, politics, cinema, innovation, and fiction',
    action: 'Meet the legends',
    link: '#',
  },
  {
    icon: FaLandmark,
    title: 'Historical Figures',
    description: 'AI Historical Figures Chat to explore timeless wisdom.',
    action: 'Explore history',
    link: '#',
  },
  {
    icon: FaUniversity,
    title: 'Political Leaders',
    description: 'Chat with Political Leaders to understand governance and leadership.',
    action: 'Understand leadership',
    link: '#',
  },
  {
    icon: FaChartLine,
    title: 'Entrepreneurs',
    description: 'Chat with Famous Entrepreneurs to unlock insights into startups and business growth.',
    action: 'Gain insights',
    link: '#',
  },
  {
    icon: FaStar,
    title: 'Celebrities',
    description: 'Chat with Celebrities to dive into art, creativity, and cultural influence.',
    action: 'Discover culture',
    link: '#',
  },
  {
    icon: FaMask,
    title: 'Fiction & Anime',
    description: 'Conversations with Loki, Rocky Bhai, Naruto, and Uchiha Itachi.',
    action: 'Enter the story',
    link: '#',
  },
  {
    icon: FaLanguage,
    title: '10+ Language Support',
    description: 'Including English, Hindi, Telugu, Marathi, Bengali, French, and more.',
    action: 'Change language',
    link: '#',
  },
  {
    icon: FaBrain,
    title: 'Mindset Simulation',
    description: 'Mindset Simulation Layer for realistic responses.',
    action: 'Experience AI',
    link: '#',
  },
  {
    icon: FaGlobe,
    title: 'One AI Platform',
    description: 'One AI Chat Platform that blends education, entertainment, and personal growth.',
    action: 'Start exploring',
    link: '#',
  },
];

const KeyFeatures = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const handleFeatureClick = () => {
    navigate('/dashboard');
  };

  return (
    <Box component="section" id="features" className={classes.section}>
      <Container className={classes.container}>
        <Box className={classes.titleWrapper}>
          <Typography component="h2" className={classes.sectionTitle}>
            Key Features of Gigaspace
          </Typography>
          <Typography className={classes.subtitle}>
            Explore the vast possibilities with Gigaspace.
          </Typography>
        </Box>

        <Box className={classes.gridContainer}>
          {features.map((feature, index) => (
            <Box 
              key={index} 
              sx={{
                width: { xs: '100%', sm: 'calc(50% - 12px)', lg: 'calc(33.333% - 16px)' },
                minWidth: { xs: '100%', sm: 'calc(50% - 12px)', lg: 'calc(33.333% - 16px)' },
                flex: '1 1 auto',
                '@media (max-width: 900px)': {
                  width: 'calc(50% - 10px)',
                  minWidth: 'calc(50% - 10px)',
                },
                '@media (max-width: 600px)': {
                  width: '100%',
                  minWidth: '100%',
                },
              }}
            >
              <Paper elevation={0} className={classes.card}>
                <Box className={classes.iconWrapper}>
                  <feature.icon />
                </Box>
                <Typography className={classes.cardTitle}>
                  {feature.title}
                </Typography>
                <Typography className={classes.cardDescription}>
                  {feature.description}
                </Typography>
                <Box
                  component="button"
                  onClick={handleFeatureClick}
                  className={classes.learnMore}
                  sx={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'left',
                    '&:hover': {
                      color: '#818cf8',
                      '& svg': {
                        transform: 'translateX(4px)',
                      },
                    },
                  }}
                >
                  {feature.action}
                  <FaArrowRight className={classes.arrowIcon} />
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default KeyFeatures;