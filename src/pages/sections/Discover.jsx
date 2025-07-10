// src/pages/sections/Discover.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CharacterGrid from '../../components/dashboard/character/CharacterGrid';
import Header from '../../components/dashboard/main/Header';

const useStyles = makeStyles({
  discoverContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
});

const Discover = ({ onCharacterClick, characters, onCharacterCreated }) => {
  const classes = useStyles();
  
  return (
    <Box className={classes.discoverContainer}>
      <Header />
      <CharacterGrid 
        onCharacterClick={onCharacterClick}
        characters={characters}
        activeSection="Discover"
        onCharacterCreated={onCharacterCreated}
      />
    </Box>
  );
};

export default Discover;