import React, { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  Chip,
} from "@mui/material";
import {
  LocationOn,
  Add,
  Explore,
  Star,
  Whatshot,
  Favorite,
  Schedule,
  History,
  Logout,
} from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import CharacterCreationForm from "../character/creation/CharacterCreationForm";
import CategoriesList from './CategoriesList';

const useStyles = makeStyles(() => ({
  drawer: {
    '& .MuiDrawer-paper': {
      width: 280,
      height: '100vh',
      backgroundColor: 'rgba(26, 26, 26, 0.7)',
      borderRight: '1px solid rgba(42, 42, 42, 0.5)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'fixed',
      left: 0,
      top: 0,
    },
  },
  contentWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: '12px',
    marginBottom: '20px',
  },
  logoIcon: {
    width: 28,
    height: 28,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: '14px',
  },
  createButton: {
    width: "100%",
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    padding: '10px 16px',
    borderRadius: 8,
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '30px',
    textTransform: 'none',
    transition: 'all 0.2s ease',
    "&:hover": {
      background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
    },
  },
  navSectionWrapper: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
  },
  listItem: {
    borderRadius: 6,
    marginBottom: 1,
    padding: '8px 12px',
    color: '#ccc',
    fontSize: '13px',
    fontWeight: 400,
    transition: 'all 0.2s ease',
    "&:hover": {
      backgroundColor: '#252525',
    },
    "&.active": {
      backgroundColor: '#252525',
      "& .MuiListItemIcon-root": {
        color: '#6366f1',
      },
    },
  },
  scrollableContent: {
    flex: 1,
    overflow: 'hidden',
    '&:hover': {
      overflowY: 'auto'
    }
  },
  chip: {
    height: 16,
    fontSize: '10px',
    backgroundColor: '#fff3cd',
    color: '#856404',
    fontWeight: 500,
    marginLeft: 'auto',
    '& .MuiChip-label': {
      padding: '0 6px',
    },
  },
  footerWrapper: {
    paddingTop: '12px',
    borderTop: '1px solid #333',
    marginTop: 'auto',
  },
}));

const Sidebar = ({ onCharacterCreated }) => {
  const classes = useStyles();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showCharacterForm, setShowCharacterForm] = useState(false);

  // Get current active section from URL
  const currentPath = location.pathname;
  const isCategory = currentPath.startsWith('/dashboard/categories/');
  const activeCategory = isCategory ? currentPath.split('/').pop() : null;
  const activeSection = currentPath.split('/').pop();

  const mainNavItems = [
    { text: "Discover", path: "discover", icon: <Explore sx={{ fontSize: 16 }} />, comingSoon: false },
    { text: "Featured", path: "featured", icon: <Star sx={{ fontSize: 16 }} />, comingSoon: false },
    { text: "Trending", path: "trending", icon: <Whatshot sx={{ fontSize: 16 }} />, comingSoon: true },
    { text: "For You", path: "foryou", icon: <Favorite sx={{ fontSize: 16 }} />, comingSoon: true },
    { text: "Recent", path: "recent", icon: <Schedule sx={{ fontSize: 16 }} />, comingSoon: true },
  ];

  const historyItems = [
    { text: "History", path: "history", icon: <History sx={{ fontSize: 16 }} />, comingSoon: false },
  ];

  const handleNavClick = (path, comingSoon) => {
    if (!comingSoon) {
      navigate(`/dashboard/${path}`);
    }
  };

  const handleCreateClick = () => {
    setShowCharacterForm(true);
  };

  const handleCharacterFormClose = () => {
    setShowCharacterForm(false);
  };

  const handleCharacterCreated = (newCharacter) => {
    setShowCharacterForm(false);
    navigate('/dashboard/discover');
    
    if (onCharacterCreated) {
      onCharacterCreated(newCharacter);
    }
  };

  const handleCategorySelect = (categoryKey) => {
    navigate(`/dashboard/categories/${categoryKey}`);
  };

  const renderNavSection = (items, title) => (
    <Box className={classes.navSectionWrapper}>
      {title && <Typography className={classes.sectionTitle}>{title}</Typography>}
      <List dense disablePadding>
        {items.map((item) => (
          <ListItemButton
            key={item.text}
            className={`${classes.listItem} ${activeSection === item.path ? "active" : ""}`}
            onClick={() => handleNavClick(item.path, item.comingSoon)}
          >
            <ListItemIcon sx={{ color: "#888", minWidth: 26, marginRight: 1.25 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ 
                fontSize: "13px", 
                fontWeight: 400,
                color: 'inherit'
              }}
            />
            {item.comingSoon && (
              <Chip label="Coming Soon" size="small" className={classes.chip} />
            )}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer variant="permanent" className={classes.drawer}>
        <Box className={classes.contentWrapper}>
          <Box className={classes.logoWrapper}>
            <Box className={classes.logoIcon}>
              <LocationOn sx={{ fontSize: 14 }} />
            </Box>
            <Typography 
              sx={{ 
                fontSize: '16px', 
                fontWeight: 600, 
                color: '#ffffff' 
              }}
            >
              Bring Back Legend
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Add sx={{ fontSize: 16 }} />}
            onClick={handleCreateClick}
            className={classes.createButton}
          >
            Create
          </Button>

          {/* Main and history sections (no scroll) */}
          {renderNavSection(mainNavItems, "EXPLORE")}
          {renderNavSection(historyItems, "ACTIVITY")}

          {/* Dynamic categories section - scrollable */}
          <Box className={classes.scrollableContent}>
            <CategoriesList 
              onCategorySelect={handleCategorySelect}
              activeCategory={activeCategory}
            />
          </Box>

          <Box className={classes.footerWrapper}>
            <ListItemButton onClick={logout} className={classes.listItem}>
              <ListItemIcon sx={{ color: "#888", minWidth: 26, marginRight: 1.25 }}>
                <Logout sx={{ fontSize: 16 }} />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ 
                  fontSize: "13px", 
                  fontWeight: 400,
                  color: 'inherit'
                }}
              />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>

      <CharacterCreationForm
        open={showCharacterForm}
        onClose={handleCharacterFormClose}
        onCharacterCreated={handleCharacterCreated}
      />
    </>
  );
};

export default Sidebar;