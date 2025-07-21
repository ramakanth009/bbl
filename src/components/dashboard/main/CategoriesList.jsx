import React from "react";
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
import { useCategories } from "../../../context/CategoriesContext";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  sectionTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    paddingLeft: '16px',
    '@media (max-width: 1200px)': {
      fontSize: '10px',
      marginBottom: '7px',
      paddingLeft: '14px',
    },
    '@media (max-width: 960px)': {
      fontSize: '9px',
      marginBottom: '6px',
      paddingLeft: '12px',
    },
    '@media (max-width: 600px)': {
      fontSize: '8px',
      marginBottom: '5px',
      paddingLeft: '10px',
    },
    '@media (max-width: 480px)': {
      fontSize: '7px',
      marginBottom: '4px',
      paddingLeft: '8px',
    },
    '@media (max-width: 375px)': {
      fontSize: '6px',
      marginBottom: '3px',
      paddingLeft: '6px',
    },
  },
  statusText: {
    fontSize: '13px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '4px',
    '@media (max-width: 1200px)': {
      fontSize: '12px',
      paddingLeft: '14px',
      paddingRight: '14px',
    },
    '@media (max-width: 960px)': {
      fontSize: '11px',
      paddingLeft: '12px',
      paddingRight: '12px',
    },
    '@media (max-width: 600px)': {
      fontSize: '10px',
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    '@media (max-width: 480px)': {
      fontSize: '9px',
      paddingLeft: '8px',
      paddingRight: '8px',
    },
    '@media (max-width: 375px)': {
      fontSize: '8px',
      paddingLeft: '6px',
      paddingRight: '6px',
    },
  },
  listItemButton: {
    borderRadius: '4px',
    marginBottom: '2px',
    paddingLeft: '16px',
    paddingRight: '16px',
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
    },
    '@media (max-width: 1200px)': {
      paddingLeft: '14px',
      paddingRight: '14px',
      fontSize: '12px',
    },
    '@media (max-width: 960px)': {
      paddingLeft: '12px',
      paddingRight: '12px',
      fontSize: '11px',
    },
    '@media (max-width: 600px)': {
      paddingLeft: '10px',
      paddingRight: '10px',
      fontSize: '10px',
    },
    '@media (max-width: 480px)': {
      paddingLeft: '8px',
      paddingRight: '8px',
      fontSize: '9px',
    },
    '@media (max-width: 375px)': {
      paddingLeft: '6px',
      paddingRight: '6px',
      fontSize: '8px',
    },
  },
  listItemIcon: {
    color: "#888",
    minWidth: '26px',
    marginRight: '10px',
    '@media (max-width: 1200px)': {
      minWidth: '24px',
      marginRight: '9px',
    },
    '@media (max-width: 960px)': {
      minWidth: '22px',
      marginRight: '8px',
    },
    '@media (max-width: 600px)': {
      minWidth: '20px',
      marginRight: '7px',
    },
    '@media (max-width: 480px)': {
      minWidth: '18px',
      marginRight: '6px',
    },
    '@media (max-width: 375px)': {
      minWidth: '16px',
      marginRight: '5px',
    },
  },
  iconSize: {
    fontSize: '16px',
    '@media (max-width: 1200px)': {
      fontSize: '15px',
    },
    '@media (max-width: 960px)': {
      fontSize: '14px',
    },
    '@media (max-width: 600px)': {
      fontSize: '13px',
    },
    '@media (max-width: 480px)': {
      fontSize: '12px',
    },
    '@media (max-width: 375px)': {
      fontSize: '11px',
    },
  },
  listItemText: {
    fontSize: "13px",
    fontWeight: 400,
    color: 'inherit',
    '@media (max-width: 1200px)': {
      fontSize: '12px',
    },
    '@media (max-width: 960px)': {
      fontSize: '11px',
    },
    '@media (max-width: 600px)': {
      fontSize: '10px',
    },
    '@media (max-width: 480px)': {
      fontSize: '9px',
    },
    '@media (max-width: 375px)': {
      fontSize: '8px',
    },
  },
}));

// Enhanced icon mapping with more category types
const iconMap = {
  "entertainment_arts": <Movie />,
  "fictional_anime": <Psychology />,
  "innovators_visionaries": <Lightbulb />,
  "leaders_historical": <Groups />,
  "spiritual_social": <Palette />,
  "sports_champions": <EmojiEvents />,
  "art_culture": <Palette />,
  "science": <Science />,
  "entertainment": <Movie />,
};

const CategoriesList = ({ onCategorySelect, activeCategory }) => {
  const classes = useStyles();
  const { categories, loading, error } = useCategories();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryKey) => {
    if (onCategorySelect) {
      onCategorySelect(categoryKey);
    }
    navigate(`/dashboard/categories/${categoryKey}`);
  };

  if (loading) {
    return (
      <Box>
        <Typography className={classes.sectionTitle}>
          CATEGORIES
        </Typography>
        <Typography variant="body2" color="text.secondary" className={classes.statusText}>
          Loading categories...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography className={classes.sectionTitle}>
          CATEGORIES
        </Typography>
        <Typography variant="body2" color="error" className={classes.statusText}>
          {error}
        </Typography>
      </Box>
    );
  }

  const categoriesArray = Object.entries(categories);

  if (categoriesArray.length === 0) {
    return (
      <Box>
        <Typography className={classes.sectionTitle}>
          CATEGORIES
        </Typography>
        <Typography variant="body2" color="text.secondary" className={classes.statusText}>
          No categories available
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography className={classes.sectionTitle}>
        CATEGORIES
      </Typography>
      <List dense disablePadding>
        {categoriesArray.map(([key, value]) => (
          <ListItemButton
            key={key}
            selected={activeCategory === key}
            onClick={() => handleCategoryClick(key)}
            className={classes.listItemButton}
          >
            <ListItemIcon className={classes.listItemIcon}>
              {React.cloneElement(
                iconMap[key] || <Category />, 
                { className: classes.iconSize }
              )}
            </ListItemIcon>
            <ListItemText
              primary={value}
              primaryTypographyProps={{
                className: classes.listItemText
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default CategoriesList;