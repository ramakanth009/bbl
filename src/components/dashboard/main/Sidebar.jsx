import React, { useState, useEffect } from "react";
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
  useMediaQuery,
  useTheme,
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
      width: '280px !important',
      height: '100vh !important',
      backgroundColor: 'rgba(26, 26, 26, 0.7) !important',
      borderRight: '1px solid rgba(42, 42, 42, 0.5) !important',
      padding: '20px !important',
      display: 'flex !important',
      flexDirection: 'column !important',
      overflow: 'hidden !important',
      position: 'fixed !important',
      left: '0 !important',
      top: '0 !important',
      zIndex: '1200 !important',
      transition: 'transform 0.3s ease !important',
      '@media (max-width: 1200px)': {
        width: '260px !important',
        padding: '18px !important',
      },
      '@media (max-width: 960px)': {
        width: '240px !important',
        padding: '16px !important',
      },
      '@media (max-width: 900px)': {
        width: '280px !important',
        zIndex: '1300 !important',
      },
      '@media (max-width: 600px)': {
        width: '280px !important',
        padding: '14px !important',
      },
      '@media (max-width: 480px)': {
        width: '260px !important',
        padding: '12px !important',
      },
      '@media (max-width: 375px)': {
        width: '240px !important',
        padding: '10px !important',
      },
    },
  },
  contentWrapper: {
    height: '100% !important',
    display: 'flex !important',
    flexDirection: 'column !important',
    overflow: 'hidden !important'
  },
  logoWrapper: {
    display: "flex !important",
    alignItems: "center !important",
    gap: '12px !important',
    marginBottom: '20px !important',
    '@media (max-width: 1200px)': {
      gap: '10px !important',
      marginBottom: '18px !important',
    },
    '@media (max-width: 960px)': {
      gap: '8px !important',
      marginBottom: '16px !important',
    },
    '@media (max-width: 600px)': {
      gap: '6px !important',
      marginBottom: '14px !important',
    },
    '@media (max-width: 480px)': {
      gap: '4px !important',
      marginBottom: '12px !important',
    },
    '@media (max-width: 375px)': {
      gap: '2px !important',
      marginBottom: '10px !important',
    },
  },
  logoIcon: {
    width: '28px !important',
    height: '28px !important',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    borderRadius: '6px !important',
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "center !important",
    color: "white !important",
    fontSize: '14px !important',
    '@media (max-width: 1200px)': {
      width: '26px !important',
      height: '26px !important',
      fontSize: '13px !important',
    },
    '@media (max-width: 960px)': {
      width: '24px !important',
      height: '24px !important',
      fontSize: '12px !important',
    },
    '@media (max-width: 600px)': {
      width: '22px !important',
      height: '22px !important',
      fontSize: '11px !important',
    },
    '@media (max-width: 480px)': {
      width: '20px !important',
      height: '20px !important',
      fontSize: '10px !important',
    },
    '@media (max-width: 375px)': {
      width: '18px !important',
      height: '18px !important',
      fontSize: '9px !important',
    },
  },
  logoText: {
    fontSize: '16px !important',
    fontWeight: '600 !important',
    color: '#ffffff !important',
    '@media (max-width: 1200px)': {
      fontSize: '15px !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '14px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '13px !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '12px !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '11px !important',
    },
  },
  createButton: {
    width: "100% !important",
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    color: 'white !important',
    padding: '10px 16px !important',
    borderRadius: '8px !important',
    fontSize: '14px !important',
    fontWeight: '500 !important',
    marginBottom: '30px !important',
    textTransform: 'none !important',
    transition: 'all 0.2s ease !important',
    "&:hover": {
      background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%) !important',
      transform: 'translateY(-1px) !important',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4) !important',
    },
    '@media (max-width: 1200px)': {
      padding: '9px 14px !important',
      fontSize: '13px !important',
      marginBottom: '26px !important',
      borderRadius: '7px !important',
    },
    '@media (max-width: 960px)': {
      padding: '8px 12px !important',
      fontSize: '12px !important',
      marginBottom: '22px !important',
      borderRadius: '6px !important',
    },
    '@media (max-width: 600px)': {
      padding: '7px 10px !important',
      fontSize: '11px !important',
      marginBottom: '18px !important',
      borderRadius: '5px !important',
    },
    '@media (max-width: 480px)': {
      padding: '6px 8px !important',
      fontSize: '10px !important',
      marginBottom: '14px !important',
      borderRadius: '4px !important',
    },
    '@media (max-width: 375px)': {
      padding: '5px 6px !important',
      fontSize: '9px !important',
      marginBottom: '10px !important',
      borderRadius: '3px !important',
    },
  },
  navSectionWrapper: {
    marginBottom: '24px !important',
    '@media (max-width: 1200px)': {
      marginBottom: '20px !important',
    },
    '@media (max-width: 960px)': {
      marginBottom: '18px !important',
    },
    '@media (max-width: 600px)': {
      marginBottom: '16px !important',
    },
    '@media (max-width: 480px)': {
      marginBottom: '14px !important',
    },
    '@media (max-width: 375px)': {
      marginBottom: '12px !important',
    },
  },
  sectionTitle: {
    fontSize: '11px !important',
    fontWeight: '600 !important',
    color: '#666 !important',
    textTransform: 'uppercase !important',
    letterSpacing: '0.5px !important',
    marginBottom: '8px !important',
    '@media (max-width: 1200px)': {
      fontSize: '10px !important',
      marginBottom: '7px !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '9px !important',
      marginBottom: '6px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '8px !important',
      marginBottom: '5px !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '7px !important',
      marginBottom: '4px !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '6px !important',
      marginBottom: '3px !important',
    },
  },
  listItem: {
    borderRadius: '6px !important',
    marginBottom: '1px !important',
    padding: '8px 12px !important',
    color: '#ccc !important',
    fontSize: '13px !important',
    fontWeight: '400 !important',
    transition: 'all 0.2s ease !important',
    "&:hover": {
      backgroundColor: '#252525 !important',
    },
    "&.active": {
      backgroundColor: '#252525 !important',
      "& .MuiListItemIcon-root": {
        color: '#6366f1 !important',
      },
    },
    '@media (max-width: 1200px)': {
      padding: '7px 10px !important',
      fontSize: '12px !important',
      borderRadius: '5px !important',
    },
    '@media (max-width: 960px)': {
      padding: '6px 8px !important',
      fontSize: '11px !important',
      borderRadius: '4px !important',
    },
    '@media (max-width: 600px)': {
      padding: '5px 6px !important',
      fontSize: '10px !important',
      borderRadius: '3px !important',
    },
    '@media (max-width: 480px)': {
      padding: '4px 5px !important',
      fontSize: '9px !important',
      borderRadius: '2px !important',
    },
    '@media (max-width: 375px)': {
      padding: '3px 4px !important',
      fontSize: '8px !important',
      borderRadius: '1px !important',
    },
  },
  scrollableContent: {
    flex: '1 !important',
    overflow: 'hidden !important',
    '&:hover': {
      overflowY: 'auto !important'
    }
  },
  chip: {
    height: '16px !important',
    fontSize: '10px !important',
    backgroundColor: '#fff3cd !important',
    color: '#856404 !important',
    fontWeight: '500 !important',
    marginLeft: 'auto !important',
    '& .MuiChip-label': {
      padding: '0 6px !important',
    },
    '@media (max-width: 1200px)': {
      height: '14px !important',
      fontSize: '9px !important',
      '& .MuiChip-label': {
        padding: '0 5px !important',
      },
    },
    '@media (max-width: 960px)': {
      height: '12px !important',
      fontSize: '8px !important',
      '& .MuiChip-label': {
        padding: '0 4px !important',
      },
    },
    '@media (max-width: 600px)': {
      height: '10px !important',
      fontSize: '7px !important',
      '& .MuiChip-label': {
        padding: '0 3px !important',
      },
    },
    '@media (max-width: 480px)': {
      height: '8px !important',
      fontSize: '6px !important',
      '& .MuiChip-label': {
        padding: '0 2px !important',
      },
    },
    '@media (max-width: 375px)': {
      height: '6px !important',
      fontSize: '5px !important',
      '& .MuiChip-label': {
        padding: '0 1px !important',
      },
    },
  },
  footerWrapper: {
    paddingTop: '5px !important',
    borderTop: '1px solid #333 !important',
    marginTop: 'auto !important',
    '@media (max-width: 1200px)': {
      paddingTop: '10px !important',
    },
    '@media (max-width: 960px)': {
      paddingTop: '8px !important',
    },
    '@media (max-width: 600px)': {
      paddingTop: '6px !important',
    },
    '@media (max-width: 480px)': {
      paddingTop: '4px !important',
    },
    '@media (max-width: 375px)': {
      paddingTop: '2px !important',
    },
  },
  iconSizing: {
    fontSize: '16px !important',
    '@media (max-width: 1200px)': {
      fontSize: '15px !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '14px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '13px !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '12px !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '11px !important',
    },
  },
  listItemText: {
    fontSize: "13px !important",
    fontWeight: '400 !important',
    color: 'inherit !important',
    '@media (max-width: 1200px)': {
      fontSize: '12px !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '11px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '10px !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '9px !important',
    },
    '@media (max-width: 375px)': {
      fontSize: '8px !important',
    },
  },
}));

const Sidebar = ({ open, onToggle, onCharacterCreated }) => {
  const classes = useStyles();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showCharacterForm, setShowCharacterForm] = useState(false);
  const [stylesReady, setStylesReady] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setStylesReady(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

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
      // Close sidebar on mobile after navigation
      if (isMobile && onToggle) {
        onToggle();
      }
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
    // Close sidebar on mobile after navigation
    if (isMobile && onToggle) {
      onToggle();
    }
  };

  const handleDrawerClose = () => {
    if (isMobile && onToggle) {
      onToggle();
    }
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
              color: "#888 !important", 
              minWidth: '26px !important', 
              marginRight: '10px !important',
              '@media (max-width: 1200px)': {
                minWidth: '24px !important',
                marginRight: '9px !important',
              },
              '@media (max-width: 960px)': {
                minWidth: '22px !important',
                marginRight: '8px !important',
              },
              '@media (max-width: 600px)': {
                minWidth: '20px !important',
                marginRight: '6px !important',
              },
              '@media (max-width: 480px)': {
                minWidth: '18px !important',
                marginRight: '5px !important',
              },
              '@media (max-width: 375px)': {
                minWidth: '16px !important',
                marginRight: '3px !important',
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

  // Show skeleton loader while styles are loading
  if (!stylesReady) {
    return (
      <Box sx={{
        position: 'fixed !important',
        left: '0 !important',
        top: '0 !important',
        width: '280px !important',
        height: '100vh !important',
        backgroundColor: 'rgba(26, 26, 26, 0.7) !important',
        borderRight: '1px solid rgba(42, 42, 42, 0.5) !important',
        padding: '20px !important',
        display: 'flex !important',
        flexDirection: 'column !important',
        overflow: 'hidden !important',
        zIndex: 1200,
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        '@media (max-width: 1200px)': {
          width: '260px !important',
          padding: '18px !important',
        },
        '@media (max-width: 960px)': {
          width: '240px !important',
          padding: '16px !important',
        },
        '@media (max-width: 900px)': {
          width: '280px !important',
        },
      }}>
        {/* Logo skeleton */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}>
          <Box sx={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'rgba(99, 102, 241, 0.3)',
            animation: 'pulse 1.5s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 0.4 },
              '50%': { opacity: 0.6 },
            },
          }} />
          <Box sx={{
            width: '120px',
            height: '16px',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.3)',
            animation: 'pulse 1.5s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 0.4 },
              '50%': { opacity: 0.6 },
            },
          }} />
        </Box>
        
        {/* Button skeleton */}
        <Box sx={{
          width: '100%',
          height: '40px',
          borderRadius: '8px',
          background: 'rgba(99, 102, 241, 0.3)',
          marginBottom: '30px',
          animation: 'pulse 1.5s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.4 },
            '50%': { opacity: 0.6 },
          },
        }} />
        
        {/* Navigation items skeleton */}
        {Array.from({ length: 6 }).map((_, index) => (
          <Box key={index} sx={{
            width: '100%',
            height: '36px',
            borderRadius: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            marginBottom: '2px',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: `${index * 0.1}s`,
            '@keyframes pulse': {
              '0%, 100%': { opacity: 0.4 },
              '50%': { opacity: 0.6 },
            },
          }} />
        ))}
      </Box>
    );
  }

  return (
    <>
      <Drawer 
        variant={isMobile ? "temporary" : "persistent"}
        open={open}
        onClose={handleDrawerClose}
        className={classes.drawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
      >
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

          {/* Categories heading - fixed */}
          <Typography className={classes.sectionTitle}>
            CATEGORIES
          </Typography>
          
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
                color: "#888 !important", 
                minWidth: '26px !important', 
                marginRight: '10px !important',
                '@media (max-width: 1200px)': {
                  minWidth: '24px !important',
                  marginRight: '9px !important',
                },
                '@media (max-width: 960px)': {
                  minWidth: '22px !important',
                  marginRight: '8px !important',
                },
                '@media (max-width: 600px)': {
                  minWidth: '20px !important',
                  marginRight: '6px !important',
                },
                '@media (max-width: 480px)': {
                  minWidth: '18px !important',
                  marginRight: '5px !important',
                },
                '@media (max-width: 375px)': {
                  minWidth: '16px !important',
                  marginRight: '3px !important',
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