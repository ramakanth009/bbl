import React from 'react';
import CharacterGrid from '../../components/dashboard/character/CharacterGrid';
import Header from '../../components/dashboard/main/Header';

const Discover = ({ onCharacterClick, characters }) => (
  <div>
    <Header title="Discover" />
    <CharacterGrid 
      onCharacterClick={onCharacterClick}
      characters={characters}
      activeSection="Discover"
    />
  </div>
);

export default Discover;