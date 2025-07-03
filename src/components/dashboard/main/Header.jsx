import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { WorkspacePremium } from '@mui/icons-material';

// Styles using makeStyles
const useStyles = makeStyles({
  headerContainer: {
    marginBottom: '32px', // theme.spacing(4)
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <Box className={classes.headerContainer}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
          gap: 2,
        }}
      >
        <WorkspacePremium 
          htmlColor="#fff"
          sx={{ fontSize: 40, filter: 'drop-shadow(0 1px 4px #bbb)' }} 
        />
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{
            color: '#fff',
            fontSize: '2.1rem',
            letterSpacing: '0.01em',
            background: 'linear-gradient(90deg, #fff 0%, #bbb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Bring Back Legends
        </Typography>
      </Box>
      <Typography
        variant="body1"
        align="center"
        sx={{
          color: '#fff',
          mb: 2,
          fontSize: '1.15rem',
          textShadow: '0 1px 6px #23252655',
        }}
      >
        Your journey to legendary status starts here. Explore insights, set goals, and make every moment count!
      </Typography>
    </Box>
  );
};

export default Header;