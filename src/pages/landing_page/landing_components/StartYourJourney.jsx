import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Container, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FaCrown, FaHistory, FaSmile } from 'react-icons/fa';

const useStyles = makeStyles(() => ({
  section: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '20px',
    backgroundColor: '#0c0c0c',
    '@media (max-width: 1200px)': {
      paddingTop: '10px',
      paddingBottom: '18px',
    },
    '@media (max-width: 960px)': {
      paddingTop: '8px',
      paddingBottom: '16px',
    },
    '@media (max-width: 600px)': {
      paddingTop: '6px',
      paddingBottom: '12px',
    },
  },
  container: {
    maxWidth: '1280px !important',
    textAlign: 'center',
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
  contentCard: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '64px',
    borderRadius: '24px',
    backgroundColor: '#1f1f23',
    border: '1px solid #2a2a2e',
    '@media (max-width: 960px)': {
      padding: '48px',
      borderRadius: '20px',
    },
    '@media (max-width: 600px)': {
      padding: '32px',
      borderRadius: '16px',
    },
    '@media (max-width: 480px)': {
      padding: '24px',
    },
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '24px',
    '@media (max-width: 960px)': {
      fontSize: '2.25rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.75rem',
      marginBottom: '16px',
    },
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#a0a0a0',
    lineHeight: 1.6,
    marginBottom: '48px',
    '@media (max-width: 960px)': {
      fontSize: '1.125rem',
      marginBottom: '40px',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
      marginBottom: '32px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
      marginBottom: '24px',
    },
  },
  featuresContainer: {
    display: 'flex',
    gap: '24px',
    marginBottom: '48px',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '40px',
    },
    '@media (max-width: 600px)': {
      gap: '12px',
      marginBottom: '32px',
    },
  },
  featureCard: {
    flex: '1',
    padding: '24px',
    borderRadius: '16px',
    backgroundColor: '#28282c',
    border: '1px solid #3a3a3e',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-4px)',
      backgroundColor: '#35353a',
      borderColor: 'rgba(99, 102, 241, 0.3)',
    },
    '@media (max-width: 960px)': {
      flexDirection: 'row',
      textAlign: 'left',
      padding: '20px',
    },
    '@media (max-width: 600px)': {
      padding: '16px',
      borderRadius: '12px',
    },
  },
  featureIcon: {
    fontSize: '2rem',
    color: '#6366f1',
    '@media (max-width: 960px)': {
      fontSize: '1.5rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.25rem',
    },
  },
  featureText: {
    fontSize: '1rem',
    color: '#ffffff',
    fontWeight: 500,
    textAlign: 'center',
    '@media (max-width: 960px)': {
      textAlign: 'left',
      flex: 1,
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
    },
  },
  ctaContainer: {
    fontSize: '1.25rem',
    color: '#a0a0a0',
    lineHeight: 1.6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    '@media (max-width: 960px)': {
      fontSize: '1.125rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
      flexDirection: 'column',
      gap: '12px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    },
  },
  ctaButton: {
    backgroundColor: '#6366f1',
    color: '#ffffff',
    fontSize: '1.25rem',
    fontWeight: 700,
    padding: '12px 32px',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#5145cd',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px -4px rgba(99, 102, 241, 0.4)',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.125rem',
      padding: '10px 28px',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
      padding: '8px 24px',
    },
  },
}));

const features = [
  {
    icon: FaCrown,
    text: 'Chat with legends',
  },
  {
    icon: FaHistory,
    text: 'Learn from historical figures',
  },
  {
    icon: FaSmile,
    text: 'Have fun with celebrities',
  },
];

const StartYourJourney = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <Box component="section" id="start-journey" className={classes.section}>
      <Container className={classes.container}>
        <Paper elevation={0} className={classes.contentCard}>
          <Typography component="h2" className={classes.title}>
            Start Your Journey with Gigaspace
          </Typography>
          
          <Typography className={classes.subtitle}>
            The best conversations happen here. With Gigaspace, you can explore knowledge, entertainment, and imagination—all through meaningful chats
          </Typography>

          <Box className={classes.featuresContainer}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Box key={index} className={classes.featureCard}>
                  <IconComponent className={classes.featureIcon} />
                  <Typography className={classes.featureText}>
                    {feature.text}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Box className={classes.ctaContainer}>
            <Typography component="span" style={{ color: '#a0a0a0' }}>
              Don't just imagine greatness.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.ctaButton}
              onClick={handleGetStarted}
            >
              Talk to it
            </Button>
            <Typography component="span" style={{ color: '#a0a0a0' }}>
              Start your journey with Gigaspace today.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StartYourJourney;