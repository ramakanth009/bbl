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
  contentCard: {
    padding: '48px',
    borderRadius: '16px',
    backgroundColor: '#1f1f23',
    border: '1px solid #2a2a2e',
    '@media (max-width: 960px)': {
      padding: '40px',
      borderRadius: '14px',
    },
    '@media (max-width: 600px)': {
      padding: '32px',
      borderRadius: '12px',
    },
    '@media (max-width: 480px)': {
      padding: '24px',
    },
  },
  introText: {
    fontSize: '1.125rem',
    color: '#a0a0a0',
    lineHeight: 1.6,
    marginBottom: '32px',
    textAlign: 'center',
    '@media (max-width: 960px)': {
      fontSize: '1rem',
      marginBottom: '28px',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      marginBottom: '24px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
      marginBottom: '20px',
    },
  },
  languageChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '32px',
    '@media (max-width: 960px)': {
      gap: '10px',
      marginBottom: '28px',
    },
    '@media (max-width: 600px)': {
      gap: '8px',
      marginBottom: '24px',
    },
    '@media (max-width: 480px)': {
      gap: '6px',
      marginBottom: '20px',
    },
  },
  languageChip: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #6366f1, #818cf8)',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '25px',
    fontSize: '0.95rem',
    fontWeight: 600,
    minWidth: '80px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
    },
    '@media (max-width: 960px)': {
      padding: '10px 16px',
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      padding: '8px 14px',
      fontSize: '0.85rem',
      minWidth: '70px',
    },
    '@media (max-width: 480px)': {
      padding: '6px 12px',
      fontSize: '0.8rem',
      minWidth: '60px',
    },
  },
  bottomText: {
    fontSize: '1.125rem',
    color: '#a0a0a0',
    lineHeight: 1.6,
    textAlign: 'center',
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

// Languages with native script representation where applicable
const languages = [
  { name: 'English', native: 'English' },
  { name: 'Hindi', native: 'हिंदी' },
  { name: 'Telugu', native: 'తెలుగు' },
  { name: 'Marathi', native: 'मराठी' },
  { name: 'Bengali', native: 'বাংলা' },
  { name: 'Français', native: 'Français' },
  { name: '+ More', native: '+ More' },
];

const ConversationsInLanguages = () => {
  const classes = useStyles();

  return (
    <Box component="section" className={classes.section}>
      <Container className={classes.container}>
        <Box className={classes.titleWrapper}>
          <Typography component="h2" className={classes.sectionTitle}>
            Conversations in 10+ Languages
          </Typography>
        </Box>

        <Paper elevation={0} className={classes.contentCard}>
          <Typography className={classes.introText}>
            True wisdom knows no boundaries. With Gigaspace, you can chat in 10+ languages, including
          </Typography>

          <Box className={classes.languageChips}>
            {languages.map((language, index) => (
              <Box key={index} className={classes.languageChip}>
                {language.native}
              </Box>
            ))}
          </Box>

          <Typography className={classes.bottomText}>
            This multilingual experience makes the platform inclusive for global users. Whether you want to connect in your native language or practice a new one, Gigaspace adapts seamlessly.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ConversationsInLanguages;