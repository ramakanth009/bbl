import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import CharacterCard from './CharacterCard';
import apiService from '../../services/api';

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
}));

const ViewAllLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '0.875rem',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

const CharacterBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  '& > *': {
    flex: '1 1 calc(25% - 12px)',
    minWidth: '250px',
    maxWidth: 'calc(25% - 12px)',
    [theme.breakpoints.down('lg')]: {
      flex: '1 1 calc(33.333% - 12px)',
      maxWidth: 'calc(33.333% - 12px)',
    },
    [theme.breakpoints.down('md')]: {
      flex: '1 1 calc(50% - 8px)',
      maxWidth: 'calc(50% - 8px)',
    },
    [theme.breakpoints.down('sm')]: {
      flex: '1 1 100%',
      maxWidth: '100%',
    },
  },
}));

const CharacterGrid = ({ onCharacterClick }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        const apiCharacters = await apiService.getCharacters();
        
        // Transform API data to include additional fields for UI
        const transformedCharacters = apiCharacters.map((char, index) => ({
          ...char,
          creator: extractCreator(char.description) || 'LegendsAI',
          type: extractType(char.description) || 'Historical Figure',
          messages: generateStats().messages,
          likes: generateStats().likes
        }));
        
        setCharacters(transformedCharacters);
        setError(null);
      } catch (error) {
        console.error('Failed to load characters:', error);
        setError('Failed to load characters. Please try again.');
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  // Helper function to extract creator from description or character name
  const extractCreator = (description) => {
    if (description?.includes('N.T. Rama Rao')) return 'TeluguLegends';
    if (description?.includes('APJ Abdul Kalam')) return 'IndianPioneers';
    if (description?.includes('Steve Jobs')) return 'TechVisionaries';
    if (description?.includes('Einstein')) return 'PhysicsGenius';
    if (description?.includes('Marie Curie')) return 'ScienceGreats';
    if (description?.includes('Leonardo')) return 'Renaissance';
    return 'LegendsAI';
  };

  // Helper function to extract type from description
  const extractType = (description) => {
    if (description?.includes('actor') && description?.includes('political')) return 'Actor, Politician';
    if (description?.includes('scientist') && description?.includes('president')) return 'Scientist, President';
    if (description?.includes('entrepreneur')) return 'Entrepreneur, Innovator';
    if (description?.includes('physicist') && description?.includes('Nobel')) return 'Physicist, Chemist';
    if (description?.includes('physicist')) return 'Physicist, Philosopher';
    if (description?.includes('artist') && description?.includes('inventor')) return 'Artist, Inventor';
    return 'Historical Figure';
  };

  // Generate realistic stats for UI
  const generateStats = () => {
    const messages = Math.floor(Math.random() * 300) + 50; // 50-350k
    const likes = Math.floor(messages * 0.15); // ~15% like rate
    return {
      messages: `${messages}k`,
      likes: `${likes}k`
    };
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={4}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (characters.length === 0) {
    return (
      <Box py={4}>
        <Alert severity="info">
          No characters available. Please check back later.
        </Alert>
      </Box>
    );
  }

  const renderSection = (title, sectionCharacters, viewAllLink = '#') => (
    <Section>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <ViewAllLink onClick={() => console.log(`View all ${title}`)}>
          View all
        </ViewAllLink>
      </SectionHeader>
      <CharacterBoxContainer>
        {sectionCharacters.map((character) => (
          <CharacterCard 
            key={character.id} 
            character={character} 
            onClick={onCharacterClick} 
          />
        ))}
      </CharacterBoxContainer>
    </Section>
  );

  // Distribute characters across sections to show all 10
  const getCharactersForSection = (section) => {
    switch (section) {
      case 'for-you':
        return characters.slice(0, Math.ceil(characters.length / 2)); // First half
      case 'featured':
        return characters.slice(Math.ceil(characters.length / 2)); // Second half
      default:
        return characters;
    }
  };

  return (
    <Box>
      {characters.length > 0 && renderSection('For you', getCharactersForSection('for-you'))}
      {characters.length > 0 && renderSection('Featured', getCharactersForSection('featured'))}
    </Box>
  );
};

export default CharacterGrid;