import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FaBrain, FaGamepad, FaLightbulb, FaHeart } from 'react-icons/fa';

const useStyles = makeStyles(() => ({
  section: {
    paddingTop: '80px',
    paddingBottom: '80px',
    backgroundColor: '#0c0c0c',
    '@media (max-width: 1200px)': {
      paddingTop: '70px',
      paddingBottom: '70px',
    },
    '@media (max-width: 960px)': {
      paddingTop: '60px',
      paddingBottom: '60px',
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
    marginBottom: '24px',
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
  mainDescription: {
    fontSize: '1.25rem',
    color: '#a0a0a0',
    lineHeight: 1.7,
    textAlign: 'center',
    maxWidth: '900px',
    margin: '0 auto 48px auto',
    '@media (max-width: 960px)': {
      fontSize: '1.125rem',
      marginBottom: '36px',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
      marginBottom: '24px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    },
  },
}));



const GigaspaceAdvantage = () => {
  const classes = useStyles();

  return (
    <Box component="section" className={classes.section}>
      <Container className={classes.container}>
        <Box className={classes.titleWrapper}>
          <Typography component="h2" className={classes.sectionTitle}>
            The Gigaspace Advantage
          </Typography>
        </Box>

        <Typography className={classes.mainDescription}>
          The real strength of Gigaspace lies in its ability to combine intelligence with mindset. It doesn't just provide answers - it delivers perspective, shaped by the personality you're engaging with.
        </Typography>

        <Typography className={classes.mainDescription}>
        Whether you want to learn smarter, get entertained, solve challenges, or simply have fun, Gigaspace is designed to inspire and engage at every step.
        </Typography>
      </Container>
    </Box>
  );
};

export default GigaspaceAdvantage;