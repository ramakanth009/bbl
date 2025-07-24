import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CharacterGrid from '../../components/dashboard/character/CharacterGrid';

// Styles using makeStyles
const useStyles = makeStyles({
  contentArea: {
    flex: 1,
    padding: '14px',
    overflow: 'auto',
    transition: 'all 0.3s ease',
    display: 'block',
    '@media (max-width: 1200px)': {
      padding: '12px',
    },
    '@media (max-width: 960px)': {
      padding: '10px',
    },
    '@media (max-width: 900px)': {
      padding: '16px',
    },
    '@media (max-width: 600px)': {
      padding: '8px',
    },
    '@media (max-width: 480px)': {
      padding: '6px',
    },
    '@media (max-width: 375px)': {
      padding: '4px',
    },
  },
});

const History = (props) => {
  const classes = useStyles();
  
  return (
    <Box className={classes.contentArea}>
      <CharacterGrid 
        {...props}
        activeSection="History"
      />
    </Box>
  );
};

export default History;