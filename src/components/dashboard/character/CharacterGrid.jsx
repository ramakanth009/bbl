import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Link, 
  CircularProgress, 
  Alert, 
  Chip, 
  InputBase, 
  Paper,
  Pagination,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
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
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '24px',
    padding: '16px',
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: '8px',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '16px',
    },
  },
  paginationInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '8px',
      textAlign: 'center',
    },
  },
  pageSizeSelect: {
    minWidth: 120,
  },
  loadingOverlay: {
    position: 'relative',
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

const CharacterGrid = ({ onCharacterClick, activeSection, onSessionOpen }) => {
  const classes = useStyles();
  const [characters, setCharacters] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [allCharacters, setAllCharacters] = useState([]); // Store all characters for filtering

  useEffect(() => {
    loadData();
  }, [activeSection]);

  useEffect(() => {
    if (activeSection !== 'History') {
      loadCharactersPage(1, pageSize);
    }
  }, [pageSize, activeSection]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (activeSection === 'History') {
        await loadChatHistory();
      } else {
        await loadCharactersPage(1, pageSize);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      setError('Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadCharactersPage = async (page = 1, limit = pageSize) => {
    try {
      if (page !== 1) {
        setPaginationLoading(true);
      }
      
      const response = await apiService.getCharactersPaginated(page, limit);
      
      // Transform characters with additional metadata
      const transformedCharacters = response.characters.map((char) => ({
        ...char,
        creator: extractCreator(char.name) || 'LegendsAI',
        type: extractType(char.name) || 'Historical Figure',
        messages: generateStats().messages,
        likes: generateStats().likes,
        category: extractCategory(char.name),
        isIndian: isIndianCharacter(char.name),
        popularity: Math.floor(Math.random() * 1000) + 100,
      }));

      // Apply section-based filtering
      const filteredCharacters = filterCharactersBySection(transformedCharacters);
      
      setCharacters(filteredCharacters);
      setAllCharacters(transformedCharacters); // Store unfiltered for search
      setCurrentPage(response.page);
      setTotalPages(response.total_pages);
      setTotalCount(response.total_count);
      
    } catch (error) {
      console.error('Failed to load characters:', error);
      throw error;
    } finally {
      setPaginationLoading(false);
    }
  };

  const loadChatHistory = async () => {
    const userSessions = await apiService.getSessions();
    setSessions(userSessions);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    loadCharactersPage(newPage, pageSize);
    // Scroll to top of character grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = event.target.value;
    setPageSize(newPageSize);
    setCurrentPage(1);
    // loadCharactersPage will be called by useEffect
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
          .slice(0, Math.min(8, characters.length));
      
      case 'For You':
        return characters
          .filter(char => ['science', 'technology', 'leadership'].includes(char.category))
          .slice(0, Math.min(6, characters.length));
      
      case 'Recent':
        return characters.slice(0, Math.min(4, characters.length));
      
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

  const handleSessionOpen = (sessionWithMessages) => {
    if (onSessionOpen) {
      onSessionOpen(sessionWithMessages);
    } else {
      if (onCharacterClick) {
        const character = characters.find(c => c.name === sessionWithMessages.character);
        if (character) {
          onCharacterClick(character, sessionWithMessages);
        } else {
          const tempCharacter = {
            name: sessionWithMessages.character,
            id: `temp_${sessionWithMessages.character}`,
            creator: 'LegendsAI',
            type: 'Historical Figure',
            category: 'general',
            messages: '0k',
            likes: '0k',
          };
          onCharacterClick(tempCharacter, sessionWithMessages);
        }
      }
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
        <ChatHistoryGrid sessions={sessions} onSessionOpen={handleSessionOpen} />
      </Box>
    );
  }

  if (characters.length === 0 && !paginationLoading) {
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
            <Chip label={`${totalCount} total characters`} size="small" />
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
      
      {paginationLoading ? (
        <Box className={classes.loadingOverlay}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box className={classes.characterBoxContainer}>
            {displayedCharacters.map((character) => (
              <CharacterCard 
                key={character.id} 
                character={character}
                onStartChat={handleStartChat}
              />
            ))}
          </Box>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Box className={classes.paginationContainer}>
              <Box className={classes.paginationInfo}>
                <Typography variant="body2" color="text.secondary">
                  Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, totalCount)} of {totalCount} characters
                </Typography>
                
                <FormControl size="small" className={classes.pageSizeSelect}>
                  <InputLabel>Per page</InputLabel>
                  <Select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    label="Per page"
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  size="large"
                />
              </Stack>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CharacterGrid;