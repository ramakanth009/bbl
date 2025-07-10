import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import Sidebar from '../components/dashboard/main/Sidebar';
import CharacterGrid from '../components/dashboard/character/CharacterGrid';
import ApiService from '../services/api';
// Import the actual CharacterCard component
import CharacterCard from '../components/dashboard/character/CharacterCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('Discover');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  // Set active section based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/category/')) {
      const categoryKey = path.split('/category/')[1];
      setCurrentCategory(categoryKey);
      loadCategoryName(categoryKey);
    } else if (path.includes('/history')) {
      setActiveSection('History');
      setCurrentCategory(null);
    } else {
      setActiveSection('Discover');
      setCurrentCategory(null);
      setCategoryName('');
    }
  }, [location.pathname]);

  const loadCategoryName = async (categoryKey) => {
    try {
      const response = await ApiService.getCategories();
      if (response.categories && response.categories[categoryKey]) {
        setCategoryName(response.categories[categoryKey]);
        setActiveSection(response.categories[categoryKey]);
      }
    } catch (error) {
      console.error('Failed to load category name:', error);
      setActiveSection('Category');
    }
  };

  const handleSectionChange = (section, options = null) => {
    if (options?.type === 'category') {
      setCurrentCategory(options.categoryKey);
      navigate(`/dashboard/category/${options.categoryKey}`);
    } else {
      setCurrentCategory(null);
      setCategoryName('');
      setActiveSection(section);
      switch (section) {
        case 'Discover':
          navigate('/dashboard');
          break;
        case 'History':
          navigate('/dashboard/history');
          break;
        default:
          navigate('/dashboard');
      }
    }
  };

  const handleCharacterCreated = (newCharacter) => {
    console.log('New character created:', newCharacter);
  };

  const handleCharacterClick = (character, sessionData = null) => {
    // Handle character click - navigate to chat or open chat modal
    console.log('Character clicked:', character, sessionData);
    // Implement your chat opening logic here
  };

  const handleSessionOpen = (sessionWithMessages) => {
    // Handle session opening from history
    console.log('Session opened:', sessionWithMessages);
    // Implement your session opening logic here
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f0f0f' }}>
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onCharacterCreated={handleCharacterCreated}
      />
      
      <Box
        sx={{
          flex: 1,
          marginLeft: '280px',
          padding: 3,
          overflow: 'auto'
        }}
      >
        <Routes>
          <Route 
            path="/" 
            element={
              <CharacterGrid
                onCharacterClick={handleCharacterClick}
                activeSection={activeSection}
                onSessionOpen={handleSessionOpen}
              />
            } 
          />
          <Route 
            path="/history" 
            element={
              <CharacterGrid
                onCharacterClick={handleCharacterClick}
                activeSection="History"
                onSessionOpen={handleSessionOpen}
              />
            } 
          />
          <Route 
            path="/category/:categoryKey" 
            element={
              <CategoryPage 
                categoryKey={currentCategory}
                categoryName={categoryName}
                onCharacterClick={handleCharacterClick}
                onSessionOpen={handleSessionOpen}
              />
            } 
          />
        </Routes>
      </Box>
    </Box>
  );
};

// CategoryPage component using CharacterGrid
const CategoryPage = ({ categoryKey, categoryName, onCharacterClick, onSessionOpen }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState(null);

  useEffect(() => {
    const loadCategoryCharacters = async () => {
      if (!categoryKey) return;
      
      try {
        setLoading(true);
        const response = await ApiService.getCharactersByCategory(categoryKey);
        setCharacters(response.characters || []);
        setCategoryInfo({
          name: response.category_name,
          count: response.count
        });
      } catch (error) {
        console.error('Failed to load category characters:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryCharacters();
  }, [categoryKey]);

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px',
          color: 'white'
        }}
      >
        <CircularProgress sx={{ color: '#6366f1' }} />
      </Box>
    );
  }

  return (
    <CategoryCharacterGrid
      characters={characters}
      categoryInfo={categoryInfo}
      categoryName={categoryName}
      onCharacterClick={onCharacterClick}
      onSessionOpen={onSessionOpen}
    />
  );
};

// Custom CharacterGrid component for categories
const CategoryCharacterGrid = ({ characters, categoryInfo, categoryName, onCharacterClick, onSessionOpen }) => {
  const [displayCharacters, setDisplayCharacters] = useState([]);

  useEffect(() => {
    setDisplayCharacters(characters);
  }, [characters]);

  // Create a modified CharacterGrid that uses the category data
  return (
    <Box>
      {/* Category Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'white', 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 1
          }}
        >
          {categoryInfo?.name || categoryName || 'Category'}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: '#9ca3af' }}
        >
          {categoryInfo?.count || characters.length} legendary characters in this category
        </Typography>
      </Box>

      {/* Character Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: 3,
        '@media (max-width: 600px)': {
          gridTemplateColumns: '1fr',
        },
      }}>
        {displayCharacters.map((character) => (
          <CharacterCard 
            key={character.id} 
            character={character}
            onStartChat={onCharacterClick}
          />
        ))}
      </Box>

      {displayCharacters.length === 0 && (
        <Box 
          sx={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#9ca3af',
            background: 'rgba(26, 26, 26, 0.3)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
          }}
        >
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
            No characters found
          </Typography>
          <Typography variant="body2">
            This category doesn't have any characters yet.
          </Typography>
        </Box>
      )}
    </Box>
  );
};



export default Dashboard;