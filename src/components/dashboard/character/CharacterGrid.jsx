import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, CircularProgress, Alert, Chip, InputBase, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CharacterCard from './CharacterCard';
import ChatHistoryGrid from '../chat/history/ChatHistoryGrid';
import apiService from '../../../services/api';

// Styles using makeStyles (no theme.spacing)
const useStyles = makeStyles({
  section: {
    marginBottom: '48px', // theme.spacing(6)
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px', // theme.spacing(2)
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px', // theme.spacing(1)
  },
  viewAllLink: {
    color: '#888',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.875rem',
    cursor: 'pointer',
    '&:hover': {
      color: '#222',
    },
  },
  characterBoxContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px', // theme.spacing(2)
    '& > *': {
      flex: '1 1 calc(33.333% - 12px)',
      minWidth: '280px',
      maxWidth: 'calc(33.333% - 12px)',
    },
    '@media (max-width: 600px)': {
      '& > *': {
        flex: '1 1 100%',
        maxWidth: '100%',
      },
    },
  },
  emptyState: {
    textAlign: 'center',
    padding: '48px', // theme.spacing(6)
    color: '#888',
  },
  searchPaper: {
    padding: '2px 8px',
    display: 'flex',
    alignItems: 'center',
    width: 220,
    boxShadow: 'none',
    backgroundColor: 'rgba(30,30,30,0.96)', // dark background
    border: '1.5px solid #333',             // darker border
    borderRadius: 16,
    transition: 'background 0.2s, border 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(40,40,40,1)',
      border: '1.5px solid #555',
    },
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: '#fff', // white text
    fontSize: '0.98rem',
    '&::placeholder': {
      color: '#bbb',
      opacity: 1,
    },
  },
});

const Section = ({ children, className }) => {
  const classes = useStyles();
  return <Box className={`${classes.section} ${className}`}>{children}</Box>;
};

const SectionHeader = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.sectionHeader}>{children}</Box>;
};

const SectionTitle = ({ children }) => {
  const classes = useStyles();
  return <Typography className={classes.sectionTitle}>{children}</Typography>;
};

const ViewAllLink = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Link className={classes.viewAllLink} {...props}>
      {children}
    </Link>
  );
};

const CharacterBoxContainer = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.characterBoxContainer}>{children}</Box>;
};

const EmptyState = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.emptyState}>{children}</Box>;
};

const CharacterGrid = ({ onCharacterClick, activeSection }) => {
  const classes = useStyles();
  const [characters, setCharacters] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadData();
  }, [activeSection]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (activeSection === 'History') {
        await loadChatHistory();
      } else {
        await loadCharacters();
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      setError('Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadCharacters = async () => {
    const apiCharacters = await apiService.getCharacters();
    const transformedCharacters = apiCharacters.map((char) => ({
      ...char,
      creator: extractCreator(char.name) || 'LegendsAI',
      type: extractType(char.name) || 'Historical Figure',
      messages: generateStats().messages,
      likes: generateStats().likes,
      category: extractCategory(char.name),
      isIndian: isIndianCharacter(char.name),
      popularity: Math.floor(Math.random() * 1000) + 100, // Simulated popularity score
    }));

    const filteredCharacters = filterCharactersBySection(transformedCharacters);
    setCharacters(filteredCharacters);
  };

  const loadChatHistory = async () => {
    const userSessions = await apiService.getSessions();
    setSessions(userSessions);
  };

  const filterCharactersBySection = (characters) => {
    switch (activeSection) {
      case 'Discover':
        return characters; // Show all characters
      
      case 'Featured':
        return characters.filter(char => char.isIndian);
      
      case 'Trending':
        return characters
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 8);
      
      case 'For You':
        // TODO: Implement recommendation based on user's chat history
        return characters
          .filter(char => ['science', 'technology', 'leadership'].includes(char.category))
          .slice(0, 6);
      
      case 'Recent':
        // TODO: Implement based on actual user interaction data
        return characters.slice(0, 4);
      
      case 'Art & Culture':
        return characters.filter(char => 
          ['art', 'culture', 'literature', 'music'].includes(char.category)
        );
      
      case 'Science':
        return characters.filter(char => 
          ['science', 'technology', 'medicine'].includes(char.category)
        );
      
      case 'Entertainment':
        return characters.filter(char => 
          ['entertainment', 'sports', 'film'].includes(char.category)
        );
      
      default:
        return characters;
    }
  };

  const extractCreator = (name) => {
    const creatorMap = {
      'N.T. Rama Rao': 'TeluguLegends',
      'APJ Abdul Kalam': 'IndianPioneers',
      'Steve Jobs': 'TechVisionaries',
      'Albert Einstein': 'PhysicsGenius',
      'Marie Curie': 'ScienceGreats',
      'Leonardo da Vinci': 'Renaissance',
      'Mahatma Gandhi': 'IndianPioneers',
      'Rabindranath Tagore': 'LiteraryGenius',
      'Sachin Tendulkar': 'SportsLegends',
      'Shah Rukh Khan': 'BollywoodStars',
    };
    return creatorMap[name] || 'LegendsAI';
  };

  const extractType = (name) => {
    const typeMap = {
      'N.T. Rama Rao': 'Actor, Politician',
      'APJ Abdul Kalam': 'Scientist, President',
      'Steve Jobs': 'Entrepreneur, Innovator',
      'Albert Einstein': 'Physicist, Philosopher',
      'Marie Curie': 'Physicist, Chemist',
      'Leonardo da Vinci': 'Artist, Inventor',
      'Mahatma Gandhi': 'Freedom Fighter, Philosopher',
      'Rabindranath Tagore': 'Poet, Philosopher',
      'Sachin Tendulkar': 'Cricket Legend',
      'Shah Rukh Khan': 'Actor, Producer',
    };
    return typeMap[name] || 'Historical Figure';
  };

  const extractCategory = (name) => {
    const categoryMap = {
      'N.T. Rama Rao': 'entertainment',
      'APJ Abdul Kalam': 'science',
      'Steve Jobs': 'technology',
      'Albert Einstein': 'science',
      'Marie Curie': 'science',
      'Leonardo da Vinci': 'art',
      'Mahatma Gandhi': 'leadership',
      'Rabindranath Tagore': 'literature',
      'Sachin Tendulkar': 'sports',
      'Shah Rukh Khan': 'entertainment',
    };
    return categoryMap[name] || 'general';
  };

  const isIndianCharacter = (name) => {
    const indianCharacters = [
      'N.T. Rama Rao', 'APJ Abdul Kalam', 'Mahatma Gandhi', 
      'Rabindranath Tagore', 'Sachin Tendulkar', 'Shah Rukh Khan'
    ];
    return indianCharacters.includes(name);
  };

  const generateStats = () => {
    const messages = Math.floor(Math.random() * 300) + 50;
    const likes = Math.floor(messages * 0.15);
    return {
      messages: `${messages}k`,
      likes: `${likes}k`
    };
  };

  const getSectionDescription = () => {
    const descriptions = {
      'Discover': 'Explore all available legendary figures',
      'Featured': 'Celebrating Indian legends and their contributions',
      'Trending': 'Most popular characters worldwide',
      'For You': 'Recommended based on your interests',
      'Recent': 'Characters you recently interacted with',
      'History': 'Your complete conversation history',
      'Art & Culture': 'Artists, writers, and cultural icons',
      'Science': 'Scientists, inventors, and innovators',
      'Entertainment': 'Actors, musicians, and entertainers',
    };
    return descriptions[activeSection] || '';
  };

  const handleStartChat = (character) => {
    if (onCharacterClick) {
      onCharacterClick(character);
    }
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

  // Special handling for History section
  if (activeSection === 'History') {
    return (
      <Box className={classes.section}>
        <Box className={classes.sectionHeader}>
          <Typography className={classes.sectionTitle}>
            Chat History
            <Chip label={`${sessions.length} conversations`} size="small" />
          </Typography>
        </Box>
        <ChatHistoryGrid sessions={sessions} />
      </Box>
    );
  }

  if (characters.length === 0) {
    return (
      <Box className={classes.emptyState}>
        <Typography variant="h6" gutterBottom>
          No characters found
        </Typography>
        <Typography variant="body2">
          {activeSection === 'Recent' 
            ? 'Start chatting with characters to see them here!'
            : 'Please check back later or try a different section.'
          }
        </Typography>
      </Box>
    );
  }

  // Filtered characters based on search
  const displayedCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box className={classes.section}>
      <Box className={classes.sectionHeader}>
        <Box>
          <Typography className={classes.sectionTitle}>
            {activeSection}
            <Chip label={`${characters.length} characters`} size="small" />
          </Typography>
          {getSectionDescription() && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {getSectionDescription()}
            </Typography>
          )}
        </Box>
        <Paper
          component="form"
          className={classes.searchPaper}
          onSubmit={e => e.preventDefault()}
        >
          <InputBase
            className={classes.searchInput}
            placeholder="Search characters"
            inputProps={{ 'aria-label': 'search characters' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Paper>
      </Box>
      
      <Box className={classes.characterBoxContainer}>
        {displayedCharacters.map((character) => (
          <CharacterCard 
            key={character.id} 
            character={character}
            onStartChat={handleStartChat}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CharacterGrid;