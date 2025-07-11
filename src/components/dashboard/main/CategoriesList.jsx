import React, { useEffect, useState } from "react";
import { List, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from "@mui/material";
import { 
  Palette, 
  Science, 
  Movie, 
  EmojiEvents, 
  Psychology, 
  Lightbulb,
  Groups,
  Category
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import apiService from "../../../services/api";

// Enhanced icon mapping with more category types
const iconMap = {
  "entertainment_arts": <Movie sx={{ fontSize: 16 }} />,
  "fictional_anime": <Psychology sx={{ fontSize: 16 }} />,
  "innovators_visionaries": <Lightbulb sx={{ fontSize: 16 }} />,
  "leaders_historical": <Groups sx={{ fontSize: 16 }} />,
  "spiritual_social": <Palette sx={{ fontSize: 16 }} />,
  "sports_champions": <EmojiEvents sx={{ fontSize: 16 }} />,
  "art_culture": <Palette sx={{ fontSize: 16 }} />,
  "science": <Science sx={{ fontSize: 16 }} />,
  "entertainment": <Movie sx={{ fontSize: 16 }} />,
};

const CategoriesList = ({ onCategorySelect, activeCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    
    const loadCategories = async () => {
      try {
        const data = await apiService.getCategories();
        if (mounted && data.categories) {
          setCategories(Object.entries(data.categories));
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
        if (mounted) {
          setError('Failed to load categories');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCategories();
    return () => { mounted = false; };
  }, []);

  const handleCategoryClick = (categoryKey) => {
    if (onCategorySelect) {
      onCategorySelect(categoryKey);
    }
    navigate(`/dashboard/categories/${categoryKey}`);
  };

  if (loading) {
    return (
      <Box sx={{ px: 2, py: 1 }}>
        <Typography sx={{
          fontSize: '11px',
          fontWeight: 600,
          color: '#666',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          mb: 1
        }}>
          CATEGORIES
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px' }}>
          Loading categories...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: 2, py: 1 }}>
        <Typography sx={{
          fontSize: '11px',
          fontWeight: 600,
          color: '#666',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          mb: 1
        }}>
          CATEGORIES
        </Typography>
        <Typography variant="body2" color="error" sx={{ fontSize: '13px' }}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (categories.length === 0) {
    return (
      <Box sx={{ px: 2, py: 1 }}>
        <Typography sx={{
          fontSize: '11px',
          fontWeight: 600,
          color: '#666',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          mb: 1
        }}>
          CATEGORIES
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px' }}>
          No categories available
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography sx={{
        fontSize: '11px',
        fontWeight: 600,
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        mb: 1,
        px: 2
      }}>
        CATEGORIES
      </Typography>
      <List dense disablePadding>
        {categories.map(([key, value]) => (
          <ListItemButton
            key={key}
            selected={activeCategory === key}
            onClick={() => handleCategoryClick(key)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              px: 2,
              color: '#ccc',
              fontSize: '13px',
              fontWeight: 400,
              transition: 'all 0.2s ease',
              "&.Mui-selected": {
                backgroundColor: '#252525',
                "& .MuiListItemIcon-root": {
                  color: '#6366f1',
                },
                "& .MuiListItemText-primary": {
                  color: '#ffffff',
                  fontWeight: 500,
                },
              },
              "&:hover": {
                backgroundColor: '#252525',
              }
            }}
          >
            <ListItemIcon sx={{ color: "#888", minWidth: 26, mr: 1.25 }}>
              {iconMap[key] || <Category sx={{ fontSize: 16 }} />}
            </ListItemIcon>
            <ListItemText
              primary={value}
              primaryTypographyProps={{
                fontSize: "13px",
                fontWeight: 400,
                color: 'inherit'
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default CategoriesList;