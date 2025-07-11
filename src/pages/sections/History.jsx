import React from 'react';
import CharacterGrid from '../../components/dashboard/character/CharacterGrid';

const History = (props) => {
  // No longer need state management for chat since routing handles it
  return (
    <CharacterGrid 
      {...props}
      activeSection="History"
    />
  );
};

export default History;