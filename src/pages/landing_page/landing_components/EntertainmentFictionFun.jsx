import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FaTheaterMasks, FaDragon, FaHeart } from 'react-icons/fa';

const useStyles = makeStyles(() => ({
  section: {
    paddingTop: '40px',
    paddingBottom: '40px',
    backgroundColor: '#1f1f23',
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
  cardsContainer: {
    display: 'flex',
    gap: '24px',
    '@media (max-width: 1200px)': {
      gap: '20px',
    },
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      gap: '16px',
    },
    '@media (max-width: 600px)': {
      gap: '12px',
    },
  },
  card: {
    flex: '1',
    padding: '32px',
    borderRadius: '16px',
    backgroundColor: '#2a2a2e',
    border: '1px solid #3a3a3e',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.3)',
      backgroundColor: '#35353a',
      borderColor: 'rgba(99, 102, 241, 0.3)',
      '& $iconWrapper': {
        transform: 'scale(1.1)',
      },
    },
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
  iconWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    border: '2px solid #61dafb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    transition: 'all 0.3s ease',
    color: '#61dafb',
    fontSize: '28px',
    '@media (max-width: 600px)': {
      width: '56px',
      height: '56px',
      fontSize: '24px',
      marginBottom: '16px',
    },
    '@media (max-width: 480px)': {
      width: '48px',
      height: '48px',
      fontSize: '20px',
      marginBottom: '12px',
    },
  },
  cardTitle: {
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
  cardDescription: {
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
}));

const entertainmentFeatures = [
  {
    icon: FaTheaterMasks,
    title: 'Celebrity Conversations',
    description: 'You can chat with celebrities, artists, and entertainers who defined creativity and culture. Want to know how an actor prepares for an iconic role or how a musician composes melodies? Gigaspace gives you a personal backstage pass.',
  },
  {
    icon: FaDragon,
    title: 'Fiction & Anime Heroes',
    description: 'But it doesn\'t stop there. You can dive into the worlds of fiction and anime. Ask Loki how he would outsmart his enemies today, learn about determination from Naruto, or explore Uchiha Itachi\'s thoughts on sacrifice.',
  },
  {
    icon: FaHeart,
    title: 'Inspiring Mindsets',
    description: 'Even Rocky Bhai\'s fearless mindset can inspire you in powerful ways. Entertainment meets imagination — and it\'s all just a conversation away.',
  },
];

const EntertainmentFictionFun = () => {
  const classes = useStyles();

  return (
    <Box component="section" className={classes.section}>
      <Container className={classes.container}>
        <Box className={classes.titleWrapper}>
          <Typography component="h2" className={classes.sectionTitle}>
            Entertainment, Fiction & Fun with Gigaspace
          </Typography>
          <Typography className={classes.subtitle}>
            Gigaspace isn't only about learning — it's also your portal to entertainment and imagination.
          </Typography>
        </Box>

        <Box className={classes.cardsContainer}>
          {entertainmentFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Paper key={index} elevation={0} className={classes.card}>
                <Box className={classes.iconWrapper}>
                  <IconComponent />
                </Box>
                <Typography className={classes.cardTitle}>
                  {feature.title}
                </Typography>
                <Typography className={classes.cardDescription}>
                  {feature.description}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default EntertainmentFictionFun;