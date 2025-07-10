import React from 'react';
import CharacterGrid from '../../components/dashboard/character/CharacterGrid';

const Discover = ({ onCharacterClick, characters }) => (
  <CharacterGrid 
    onCharacterClick={onCharacterClick}
    characters={characters}
    activeSection="Discover"
  />
);

export default Discover;
