import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Link, CircularProgress } from '@mui/material';
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
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

// Mock data that matches prototype
const mockCharacters = [
  {
    id: 1,
    name: 'N.T. Rama Rao',
    img: 'https://m.media-amazon.com/images/M/MV5BM2FmMmFmMzEtMDM1MC00MWQ4LThlNTgtNmNiMDZiMjY1ZGU2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    description: 'Telugu people\'s self-respect is the foundation of our progress. A legendary actor who became a transformative political leader.',
    creator: 'TeluguLegends',
    type: 'Actor, Politician',
    messages: '82.3k',
    likes: '12.1k'
  },
  {
    id: 2,
    name: 'APJ Abdul Kalam',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/A._P._J._Abdul_Kalam.jpg/256px-A._P._J._Abdul_Kalam.jpg',
    description: 'Dream is not that which you see while sleeping, it is something that does not let you sleep. India\'s beloved People\'s President.',
    creator: 'IndianPioneers',
    type: 'Scientist, President',
    messages: '156k',
    likes: '28.4k'
  },
  {
    id: 3,
    name: 'Steve Jobs',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg/256px-Steve_Jobs_Headshot_2010-CROP2.jpg',
    description: 'Innovation distinguishes between a leader and a follower. Revolutionary who changed how we interact with technology.',
    creator: 'TechVisionaries',
    type: 'Entrepreneur, Innovator',
    messages: '245k',
    likes: '42.1k'
  },
  {
    id: 4,
    name: 'Marie Curie',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/256px-Marie_Curie_c1920.jpg',
    description: 'Nothing in life is to be feared, it is only to be understood. First woman to win a Nobel Prize and only person to win in two different sciences.',
    creator: 'ScienceGreats',
    type: 'Physicist, Chemist',
    messages: '134k',
    likes: '19.7k'
  },
  {
    id: 5,
    name: 'Leonardo da Vinci',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Leonardo_self.jpg/256px-Leonardo_self.jpg',
    description: 'Learning never exhausts the mind. The ultimate Renaissance man who mastered art, science, and invention.',
    creator: 'Renaissance',
    type: 'Artist, Inventor',
    messages: '178k',
    likes: '29.4k'
  },
  {
    id: 6,
    name: 'Albert Einstein',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/256px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
    description: 'Imagination is more important than knowledge. The brilliant physicist who revolutionized our understanding of space and time.',
    creator: 'PhysicsGenius',
    type: 'Physicist, Philosopher',
    messages: '267k',
    likes: '45.3k'
  }
];

const CharacterGrid = ({ onCharacterClick }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        // Try to fetch from API first
        const apiCharacters = await apiService.getCharacters();
        setCharacters(apiCharacters.length > 0 ? apiCharacters : mockCharacters);
      } catch (error) {
        // Fallback to mock data if API fails
        console.log('Using mock data as API is not available');
        setCharacters(mockCharacters);
      }
      setLoading(false);
    };

    loadCharacters();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  const renderSection = (title, characters, viewAllLink = '#') => (
    <Section>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <ViewAllLink href={viewAllLink}>View all</ViewAllLink>
      </SectionHeader>
      <Grid container spacing={2}>
        {characters.map((character) => (
          <Grid item xs={12} sm={6} lg={4} key={character.id}>
            <CharacterCard character={character} onClick={onCharacterClick} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );

  return (
    <Box>
      {renderSection('For you', characters.slice(0, 4))}
      {renderSection('Featured', characters.slice(2, 5))}
      {renderSection('Popular', characters.slice(1, 2))}
    </Box>
  );
};

export default CharacterGrid;