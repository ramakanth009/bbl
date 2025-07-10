// src/pages/sections/Trending.jsx
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Whatshot, TrendingUp } from '@mui/icons-material';

const useStyles = makeStyles({
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '24px',
  },
  headerSection: {
    marginBottom: '32px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px',
  },
  sectionDescription: {
    color: '#9ca3af',
    fontSize: '1rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  comingSoonCard: {
    background: 'rgba(26, 26, 26, 0.8)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(99, 102, 241, 0.1)',
    padding: '40px',
    textAlign: 'center',
    marginTop: '40px',
  },
  comingSoonIcon: {
    fontSize: '4rem',
    color: '#ff6b35',
    marginBottom: '16px',
  },
});

const Trending = ({ onCharacterClick, characters }) => {
  const classes = useStyles();
  
  return (
    <Box className={classes.sectionContainer}>
      <Box className={classes.headerSection}>
        <Typography className={classes.sectionTitle}>
          Trending Characters
        </Typography>
        <Typography className={classes.sectionDescription}>
          Explore the most popular characters right now - see what's capturing everyone's imagination
        </Typography>
      </Box>
      
      <Card className={classes.comingSoonCard}>
        <CardContent>
          <Whatshot className={classes.comingSoonIcon} />
          <Typography variant="h5" sx={{ color: '#ffffff', marginBottom: '16px', fontWeight: 600 }}>
            Coming Soon
          </Typography>
          <Typography sx={{ color: '#9ca3af' }}>
            We're preparing trending analytics to show you the hottest characters based on user interactions. 
            Get ready to discover what's trending!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Trending;
