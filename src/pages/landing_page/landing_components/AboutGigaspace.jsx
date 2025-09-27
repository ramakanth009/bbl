import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  section: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '64px 0',
    background: 'rgba(31,31,35,0.2)',
    '@media (max-width: 1200px)': {
      padding: '56px 0',
    },
    '@media (max-width: 960px)': {
      padding: '48px 0',
      minHeight: 'auto',
    },
    '@media (max-width: 600px)': {
      padding: '40px 0',
    },
    '@media (max-width: 480px)': {
      padding: '32px 0',
    },
  },
  container: {
    width: '100%',
    margin: '0 auto',
    padding: '0 32px',
    '@media (max-width: 1440px)': {
      padding: '0 28px',
    },
    '@media (max-width: 1200px)': {
      padding: '0 24px',
    },
    '@media (max-width: 960px)': {
      padding: '0 20px',
    },
    '@media (max-width: 600px)': {
      padding: '0 16px',
    },
    '@media (max-width: 480px)': {
      padding: '0 12px',
    },
  },
  titleWrapper: {
    textAlign: 'center',
    margin: '0 auto 48px',
    maxWidth: 896,
    '@media (max-width: 960px)': {
      margin: '0 auto 40px',
    },
    '@media (max-width: 600px)': {
      margin: '0 auto 32px',
    },
    '@media (max-width: 480px)': {
      margin: '0 auto 24px',
    },
  },
  title: {
    display: 'inline-block',
    fontSize: '3.5rem',
    fontWeight: 800,
    color: '#ffffff',
    position: 'relative',
    textShadow: '0 0 15px rgba(99,102,241,0.5)',
    lineHeight: 1.2,
    '@media (max-width: 1440px)': {
      fontSize: '3.25rem',
    },
    '@media (max-width: 1200px)': {
      fontSize: '3rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '2.75rem',
    },
    '@media (max-width: 768px)': {
      fontSize: '2.5rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '2.25rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '2rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1.875rem',
    },
    '@media (max-width: 320px)': {
      fontSize: '1.75rem',
    },
  },
  bubbles: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
    padding: '16px 0',
    maxWidth: '100%',
    overflowX: 'auto',
    '@media (max-width: 1200px)': {
      gap: '24px',
    },
    '@media (max-width: 960px)': {
      flexWrap: 'wrap',
      gap: '20px',
      flexDirection: 'column',
      alignItems: 'center',
      overflowX: 'visible',
    },
    '@media (max-width: 600px)': {
      gap: '16px',
      padding: '8px 0',
    },
  },
  bubble: {
    width: 420,
    height: 420,
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.15), rgba(31,31,35,0.9))',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(99,102,241,0.25)',
    boxShadow: '0 0 25px rgba(99,102,241,0.2), inset 0 0 20px rgba(255,255,255,0.1)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.5s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 'none',
    '@media (max-width: 1440px)': {
      width: 400,
      height: 400,
    },
    '@media (max-width: 1200px)': {
      width: 380,
      height: 380,
    },
    '@media (max-width: 960px)': {
      width: 360,
      height: 360,
      maxWidth: '90vw',
      maxHeight: '90vw',
    },
    '@media (max-width: 768px)': {
      width: 340,
      height: 340,
    },
    '@media (max-width: 600px)': {
      width: 320,
      height: 320,
    },
    '@media (max-width: 480px)': {
      width: 300,
      height: 300,
    },
    '@media (max-width: 375px)': {
      width: 280,
      height: 280,
    },
    '@media (max-width: 320px)': {
      width: 260,
      height: 260,
    },
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 0 35px rgba(99,102,241,0.3), inset 0 0 25px rgba(255,255,255,0.15)',
      '@media (max-width: 768px)': {
        transform: 'scale(1.02)',
      },
      '@media (max-width: 480px)': {
        transform: 'scale(1.01)',
      },
    }
  },
  bubbleContent: {
    position: 'relative',
    zIndex: 2,
    padding: '40px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    '@media (max-width: 1200px)': {
      padding: '36px',
    },
    '@media (max-width: 960px)': {
      padding: '32px',
    },
    '@media (max-width: 600px)': {
      padding: '28px',
    },
    '@media (max-width: 480px)': {
      padding: '24px',
    },
    '@media (max-width: 375px)': {
      padding: '20px',
    },
    '@media (max-width: 320px)': {
      padding: '18px',
    },
  },
  bubbleText: {
    fontSize: '1.1rem',
    lineHeight: 1.6,
    color: '#e0e0e0',
    margin: 0,
    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
    textAlign: 'center',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'auto',
    maxWidth: '100%',
    '@media (max-width: 1200px)': {
      fontSize: '1.05rem',
      lineHeight: 1.55,
    },
    '@media (max-width: 960px)': {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    '@media (max-width: 768px)': {
      fontSize: '0.95rem',
      lineHeight: 1.45,
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      lineHeight: 1.4,
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
      lineHeight: 1.35,
    },
    '@media (max-width: 375px)': {
      fontSize: '0.8rem',
      lineHeight: 1.3,
    },
    '@media (max-width: 320px)': {
      fontSize: '0.75rem',
      lineHeight: 1.25,
    },
  },
});

const AboutGigaspace = () => {
  const classes = useStyles();

  return (
    <Box component="section" className={classes.section}>
      <Box className={classes.container}>
        <Box className={classes.titleWrapper}>
          <Typography component="h2" className={classes.title}>
            About Gigaspace
          </Typography>
        </Box>

        <Box className={classes.bubbles}>
          <Box className={classes.bubble}>
            <Box className={classes.bubbleContent}>
              <Typography className={classes.bubbleText}>
                Gigaspace is designed to make conversations truly meaningful. Built by Gigaversity, it reflects the mindset, wisdom, and communication style of real and fictional figures from across history, politics, cinema, business, and culture.
              </Typography>
            </Box>
          </Box>
          
          <Box className={classes.bubble}>
            <Box className={classes.bubbleContent}>
              <Typography className={classes.bubbleText}>
                Unlike ordinary AI that gives robotic answers, Gigaspace delivers authentic exchanges. Every chat mirrors how a personality would genuinely analyze, respond, and inspire — whether it's a leader sharing governance insights, an entrepreneur offering startup advice, or an anime hero teaching resilience.
              </Typography>
            </Box>
          </Box>
          
          <Box className={classes.bubble}>
            <Box className={classes.bubbleContent}>
              <Typography className={classes.bubbleText}>
                By combining advanced AI with Gigaversity's innovation-first vision, Gigaspace offers a platform where learning, entertainment, and personal growth all merge into one seamless experience.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutGigaspace;