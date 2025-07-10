import React, { useEffect, useState } from "react";
import { List, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Chip } from "@mui/material";
import { Palette, Science, Movie } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import apiService from "../../../services/api";

const iconMap = {
  "art_culture": <Palette sx={{ fontSize: 16 }} />,
  "science": <Science sx={{ fontSize: 16 }} />,
  "entertainment": <Movie sx={{ fontSize: 16 }} />,
};

const CategoriesList = ({ onCategorySelect, activeCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    apiService.getCategories()
      .then(data => {
        if (mounted && data.categories) {
          setCategories(Object.entries(data.categories));
        }
      })
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="body2" color="text.secondary">Loading categories...</Typography>
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
            onClick={() => {
              if (onCategorySelect) onCategorySelect(key);
              navigate(`/categories/${key}`);
            }}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              px: 2,
              color: '#ccc',
              fontSize: '13px',
              fontWeight: 400,
              "&.Mui-selected, &:hover": {
                backgroundColor: '#252525',
              }
            }}
          >
            <ListItemIcon sx={{ color: "#888", minWidth: 26, mr: 1.25 }}>
              {iconMap[key] || <Palette sx={{ fontSize: 16 }} />}
            </ListItemIcon>
            <ListItemText
              primary={value}
              primaryTypographyProps={{
                fontSize: "13px",
                fontWeight: 400,
                color: 'inherit'
              }}
            />
            {/* Example: <Chip label="New" size="small" /> */}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default CategoriesList;
