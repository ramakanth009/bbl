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
    padding: '48px 0',
    background: 'rgba(31,31,35,0.2)',
  },
  container: {
    width: '100%',
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 16px',
  },
  titleWrapper: {
    textAlign: 'center',
    margin: '0 auto 32px',
    maxWidth: 896,
  },
  title: {
    display: 'inline-block',
    fontSize: '2.5rem',
    fontWeight: 800,
    color: '#ffffff',
    position: 'relative',
    textShadow: '0 0 15px rgba(99,102,241,0.5)',
    '@media (min-width: 600px)': {
      fontSize: '3rem',
    },
  },
  bubbles: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    padding: '16px 0',
  },
  bubble: {
    width: 350,
    height: 350,
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
    '@media (max-width: 768px)': {
      width: 280,
      height: 280,
      margin: '16px 0',
    },
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 0 35px rgba(99,102,241,0.3), inset 0 0 25px rgba(255,255,255,0.15)'
    }
  },
  bubbleContent: {
    position: 'relative',
    zIndex: 2,
    padding: '24px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bubbleText: {
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: '#e0e0e0',
    margin: 0,
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
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
