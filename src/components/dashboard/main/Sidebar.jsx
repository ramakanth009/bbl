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
      '@media (max-width: 1200px)': {
        width: 260,
        padding: '18px',
      },
      '@media (max-width: 960px)': {
        width: 240,
        padding: '16px',
      },
      '@media (max-width: 900px)': {
        width: 260,
        transform: 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        zIndex: 1300,
      },
      '@media (max-width: 600px)': {
        width: '280px',
        padding: '14px',
      },
      '@media (max-width: 480px)': {
        width: '260px',
        padding: '12px',
      },
      '@media (max-width: 375px)': {
        width: '240px',
        padding: '10px',
      },
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
    '@media (max-width: 1200px)': {
      gap: '10px',
      marginBottom: '18px',
    },
    '@media (max-width: 960px)': {
      gap: '8px',
      marginBottom: '16px',
    },
    '@media (max-width: 600px)': {
      gap: '6px',
      marginBottom: '14px',
    },
    '@media (max-width: 480px)': {
      gap: '4px',
      marginBottom: '12px',
    },
    '@media (max-width: 375px)': {
      gap: '2px',
      marginBottom: '10px',
    },
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
    '@media (max-width: 1200px)': {
      width: 26,
      height: 26,
      fontSize: '13px',
    },
    '@media (max-width: 960px)': {
      width: 24,
      height: 24,
      fontSize: '12px',
    },
    '@media (max-width: 600px)': {
      width: 22,
      height: 22,
      fontSize: '11px',
    },
    '@media (max-width: 480px)': {
      width: 20,
      height: 20,
      fontSize: '10px',
    },
    '@media (max-width: 375px)': {
      width: 18,
      height: 18,
      fontSize: '9px',
    },
  },
  logoText: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
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
    '@media (max-width: 1200px)': {
      padding: '9px 14px',
      fontSize: '13px',
      marginBottom: '26px',
      borderRadius: 7,
    },
    '@media (max-width: 960px)': {
      padding: '8px 12px',
      fontSize: '12px',
      marginBottom: '22px',
      borderRadius: 6,
    },
    '@media (max-width: 600px)': {
      padding: '7px 10px',
      fontSize: '11px',
      marginBottom: '18px',
      borderRadius: 5,
    },
    '@media (max-width: 480px)': {
      padding: '6px 8px',
      fontSize: '10px',
      marginBottom: '14px',
      borderRadius: 4,
    },
    '@media (max-width: 375px)': {
      padding: '5px 6px',
      fontSize: '9px',
      marginBottom: '10px',
      borderRadius: 3,
    },
  },
  navSectionWrapper: {
    marginBottom: '24px',
    '@media (max-width: 1200px)': {
      marginBottom: '20px',
    },
    '@media (max-width: 960px)': {
      marginBottom: '18px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '16px',
    },
    '@media (max-width: 480px)': {
      marginBottom: '14px',
    },
    '@media (max-width: 375px)': {
      marginBottom: '12px',
    },
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    '@media (max-width: 1200px)': {
      fontSize: '10px',
      marginBottom: '7px',
    },
    '@media (max-width: 960px)': {
      fontSize: '9px',
      marginBottom: '6px',
    },
    '@media (max-width: 600px)': {
      fontSize: '8px',
      marginBottom: '5px',
    },
    '@media (max-width: 480px)': {
      fontSize: '7px',
      marginBottom: '4px',
    },
    '@media (max-width: 375px)': {
      fontSize: '6px',
      marginBottom: '3px',
    },
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
    '@media (max-width: 1200px)': {
      padding: '7px 10px',
      fontSize: '12px',
      borderRadius: 5,
    },
    '@media (max-width: 960px)': {
      padding: '6px 8px',
      fontSize: '11px',
      borderRadius: 4,
    },
    '@media (max-width: 600px)': {
      padding: '5px 6px',
      fontSize: '10px',
      borderRadius: 3,
    },
    '@media (max-width: 480px)': {
      padding: '4px 5px',
      fontSize: '9px',
      borderRadius: 2,
    },
    '@media (max-width: 375px)': {
      padding: '3px 4px',
      fontSize: '8px',
      borderRadius: 1,
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
    '@media (max-width: 1200px)': {
      height: 14,
      fontSize: '9px',
      '& .MuiChip-label': {
        padding: '0 5px',
      },
    },
    '@media (max-width: 960px)': {
      height: 12,
      fontSize: '8px',
      '& .MuiChip-label': {
        padding: '0 4px',
      },
    },
    '@media (max-width: 600px)': {
      height: 10,
      fontSize: '7px',
      '& .MuiChip-label': {
        padding: '0 3px',
      },
    },
    '@media (max-width: 480px)': {
      height: 8,
      fontSize: '6px',
      '& .MuiChip-label': {
        padding: '0 2px',
      },
    },
    '@media (max-width: 375px)': {
      height: 6,
      fontSize: '5px',
      '& .MuiChip-label': {
        padding: '0 1px',
      },
    },
  },
  footerWrapper: {
    paddingTop: '12px',
    borderTop: '1px solid #333',
    marginTop: 'auto',
    '@media (max-width: 1200px)': {
      paddingTop: '10px',
    },
    '@media (max-width: 960px)': {
      paddingTop: '8px',
    },
    '@media (max-width: 600px)': {
      paddingTop: '6px',
    },
    '@media (max-width: 480px)': {
      paddingTop: '4px',
    },
    '@media (max-width: 375px)': {
      paddingTop: '2px',
    },
  },
  iconSizing: {
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
    { text: "Discover", path: "discover", icon: <Explore className={classes.iconSizing} />, comingSoon: false },
    { text: "Featured", path: "featured", icon: <Star className={classes.iconSizing} />, comingSoon: false },
    { text: "Trending", path: "trending", icon: <Whatshot className={classes.iconSizing} />, comingSoon: true },
    { text: "For You", path: "foryou", icon: <Favorite className={classes.iconSizing} />, comingSoon: true },
    { text: "Recent", path: "recent", icon: <Schedule className={classes.iconSizing} />, comingSoon: true },
  ];

  const historyItems = [
    { text: "History", path: "history", icon: <History className={classes.iconSizing} />, comingSoon: false },
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
            <ListItemIcon sx={{ 
              color: "#888", 
              minWidth: 26, 
              marginRight: 1.25,
              '@media (max-width: 1200px)': {
                minWidth: 24,
                marginRight: 1.1,
              },
              '@media (max-width: 960px)': {
                minWidth: 22,
                marginRight: 1,
              },
              '@media (max-width: 600px)': {
                minWidth: 20,
                marginRight: 0.8,
              },
              '@media (max-width: 480px)': {
                minWidth: 18,
                marginRight: 0.6,
              },
              '@media (max-width: 375px)': {
                minWidth: 16,
                marginRight: 0.4,
              },
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ 
                className: classes.listItemText
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
            <Typography className={classes.logoText}>
              Bring Back Legend
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Add className={classes.iconSizing} />}
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
              <ListItemIcon sx={{ 
                color: "#888", 
                minWidth: 26, 
                marginRight: 1.25,
                '@media (max-width: 1200px)': {
                  minWidth: 24,
                  marginRight: 1.1,
                },
                '@media (max-width: 960px)': {
                  minWidth: 22,
                  marginRight: 1,
                },
                '@media (max-width: 600px)': {
                  minWidth: 20,
                  marginRight: 0.8,
                },
                '@media (max-width: 480px)': {
                  minWidth: 18,
                  marginRight: 0.6,
                },
                '@media (max-width: 375px)': {
                  minWidth: 16,
                  marginRight: 0.4,
                },
              }}>
                <Logout className={classes.iconSizing} />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ 
                  className: classes.listItemText
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