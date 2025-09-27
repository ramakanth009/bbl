import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  section: {
    paddingTop: '40px',
    paddingBottom: '40px',
    backgroundColor: '#0c0c0c',
    '@media (max-width: 1200px)': {
      paddingTop: '36px',
      paddingBottom: '36px',
    },
    '@media (max-width: 960px)': {
      paddingTop: '32px',
      paddingBottom: '32px',
    },
    '@media (max-width: 600px)': {
      paddingTop: '24px',
      paddingBottom: '24px',
    },
    '@media (max-width: 480px)': {
      paddingTop: '20px',
      paddingBottom: '20px',
    },
    '@media (max-width: 375px)': {
      paddingTop: '16px',
      paddingBottom: '16px',
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
    lineHeight: 1.6,
    maxWidth: '900px',
    margin: '0 auto',
    '@media (max-width: 960px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
    },
  },
  stepsContainer: {
    display: 'flex',
    gap: '24px',
    marginBottom: '64px',
    '@media (max-width: 1200px)': {
      gap: '20px',
      marginBottom: '56px',
    },
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '48px',
    },
    '@media (max-width: 600px)': {
      gap: '12px',
      marginBottom: '36px',
    },
  },
  stepCard: {
    flex: '1',
    padding: '32px',
    borderRadius: '16px',
    backgroundColor: '#1f1f23',
    border: '1px solid #2a2a2e',
    textAlign: 'center',
    position: 'relative',
    '@media (max-width: 960px)': {
      padding: '28px',
      borderRadius: '14px',
    },
    '@media (max-width: 600px)': {
      padding: '24px',
      borderRadius: '12px',
    },
    '@media (max-width: 480px)': {
      padding: '20px',
    },
  },
  stepNumber: {
    fontSize: '3rem',
    fontWeight: 700,
    color: '#6366f1',
    marginBottom: '20px',
    '@media (max-width: 960px)': {
      fontSize: '2.5rem',
      marginBottom: '16px',
    },
    '@media (max-width: 600px)': {
      fontSize: '2rem',
      marginBottom: '12px',
    },
  },
  stepTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '16px',
    '@media (max-width: 960px)': {
      fontSize: '1.375rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.25rem',
      marginBottom: '12px',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.125rem',
      marginBottom: '10px',
    },
  },
  stepDescription: {
    fontSize: '1rem',
    color: '#a0a0a0',
    lineHeight: 1.6,
    '@media (max-width: 960px)': {
      fontSize: '0.95rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
    },
  },
  bottomText: {
    textAlign: 'center',
    fontSize: '1.125rem',
    color: '#a0a0a0',
    lineHeight: 1.6,
    maxWidth: '1000px',
    margin: '0 auto',
    '@media (max-width: 960px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
    },
  },
}));

const steps = [
  {
    number: '1',
    title: 'Advanced Training',
    description: 'Every great mind offers a unique way to overcome challenges. With Gigaspace, you can seek guidance tailored to your situation.',
  },
  {
    number: '2',
    title: 'Mindset Reflection',
    description: 'Gain strategic thinking from a political leader, business advice from a famous entrepreneur, or resilience lessons from an anime hero.',
  },
  {
    number: '3',
    title: 'Authentic Conversations',
    description: 'The mindset simulation ensures responses aren\'t generic — they feel like true advice shaped by the personality you\'re speaking to.',
  },
];

const HowGigaspaceWorks = () => {
  const classes = useStyles();

  return (
    <Box component="section" id="how-it-works" className={classes.section}>
      <Container className={classes.container}>
        <Box className={classes.titleWrapper}>
          <Typography component="h2" className={classes.sectionTitle}>
            How Gigaspace Works
          </Typography>
          <Typography className={classes.subtitle}>
            Behind the scenes, Gigaspace is powered by advanced training on large datasets, but with a unique twist — every personality is trained to reflect their mindset, tone, and decision-making style.
          </Typography>
        </Box>

        <Box className={classes.stepsContainer}>
          {steps.map((step, index) => (
            <Paper key={index} elevation={0} className={classes.stepCard}>
              <Typography className={classes.stepNumber}>
                {step.number}
              </Typography>
              <Typography className={classes.stepTitle}>
                {step.title}
              </Typography>
              <Typography className={classes.stepDescription}>
                {step.description}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Typography className={classes.bottomText}>
          That's why when you ask Naruto about chasing dreams, or Ambedkar about building equality, the answers feel authentic, as if you're speaking directly to them. The result? A conversation that feels human, immersive, and unforgettable.
        </Typography>
      </Container>
    </Box>
  );
};

export default HowGigaspaceWorks;