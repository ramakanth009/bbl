import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CharacterGrid from '../../components/dashboard/character/CharacterGrid';

const useStyles = makeStyles({
  historyContainer: {
    flex: 1,
    padding: '24px',
    overflow: 'auto',
    minHeight: '100vh',
    background: 'transparent',
    '@media (max-width: 960px)': {
      padding: '16px',
    },
    '@media (max-width: 600px)': {
      padding: '12px',
    },
  },
  contentWrapper: {
    maxWidth: '100%',
    margin: '0 auto',
    '& .MuiBox-root': {
      '& .sectionHeader': {
        marginBottom: '24px', // Consistent spacing for section headers
      },
    },
  },
});

const History = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.historyContainer}>
      <Box className={classes.contentWrapper}>
        <CharacterGrid 
          {...props}
          activeSection="History"
        />
      </Box>
    </Box>
  );
};

export default History;