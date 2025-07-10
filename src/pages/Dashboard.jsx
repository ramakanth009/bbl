import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import Sidebar from '../components/dashboard/main/Sidebar';
import ApiService from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('Discover');
  const [currentCategory, setCurrentCategory] = useState(null);

  // Set active section based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/category/')) {
      const categoryKey = path.split('/category/')[1];
      setCurrentCategory(categoryKey);
      setActiveSection('Category');
    } else if (path.includes('/history')) {
      setActiveSection('History');
    } else {
      setActiveSection('Discover');
      setCurrentCategory(null);
    }
  }, [location.pathname]);

  const handleSectionChange = (section, options = null) => {
    setActiveSection(section);

    if (options?.type === 'category') {
      setCurrentCategory(options.categoryKey);
      navigate(`/dashboard/category/${options.categoryKey}`);
    } else {
      setCurrentCategory(null);
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
          padding: 0,
          overflow: 'hidden'
        }}
      >
        <Routes>
          <Route path="/" element={<DiscoverPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/category/:categoryKey" element={<CategoryPage categoryKey={currentCategory} />} />
        </Routes>
      </Box>
    </Box>
  );
};

// Placeholder DiscoverPage - replace with your actual component
const DiscoverPage = () => (
  <Box sx={{ padding: 3, color: 'white' }}>
    <Typography variant="h4" gutterBottom>
      Discover Characters
    </Typography>
    <Typography>
      Your existing discover page content goes here
    </Typography>
  </Box>
);

// Placeholder HistoryPage - replace with your actual component  
const HistoryPage = () => (
  <Box sx={{ padding: 3, color: 'white' }}>
    <Typography variant="h4" gutterBottom>
      Chat History
    </Typography>
    <Typography>
      Your existing history page content goes here
    </Typography>
  </Box>
);

// CategoryPage component
const CategoryPage = ({ categoryKey }) => {
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
          height: '100vh',
          color: 'white'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, color: 'white' }}>
      <Typography variant="h4" gutterBottom>
        {categoryInfo?.name || 'Category'}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {categoryInfo?.count || characters.length} characters
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: 2 
      }}>
        {characters.map((character) => (
          <Box 
            key={character.id}
            sx={{
              p: 2,
              border: '1px solid #333',
              borderRadius: 1,
              backgroundColor: '#1a1a1a'
            }}
          >
            <Typography variant="h6">{character.name}</Typography>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              {character.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;