import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Tab, 
  Tabs, 
  IconButton, 
  Typography, 
  Menu, 
  MenuItem,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Explore,
  Star,
  Whatshot,
  Favorite,
  Schedule,
  History,
  MoreVert,
  Menu as MenuIcon,
  Search,
  LocationOn
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useCategories } from '../../../context/CategoriesContext';

const useStyles = makeStyles({
  topBar: {
    position: 'fixed !important',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1300,
    background: 'rgba(26, 26, 26, 0.95) !important',
    backdropFilter: 'blur(20px) !important',
    borderBottom: '1px solid rgba(99, 102, 241, 0.2) !important',
    display: 'none !important',
    '@media (max-width: 900px)': {
      display: 'block !important',
    },
  },
  header: {
    display: 'flex !important',
    alignItems: 'center !important',
    padding: '12px 16px 8px 16px !important',
    gap: '12px !important',
    minHeight: '56px !important',
  },
  logo: {
    display: 'flex !important',
    alignItems: 'center !important',
    gap: '8px !important',
  },
  logoIcon: {
    width: '24px !important',
    height: '24px !important',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    borderRadius: '6px !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    color: 'white !important',
  },
  logoText: {
    fontSize: '16px !important',
    fontWeight: '600 !important',
    color: '#ffffff !important',
  },
  headerActions: {
    marginLeft: 'auto !important',
    display: 'flex !important',
    alignItems: 'center !important',
    gap: '4px !important',
  },
  actionButton: {
    color: '#9ca3af !important',
    padding: '8px !important',
    '&:hover': {
      color: '#ffffff !important',
      background: 'rgba(99, 102, 241, 0.1) !important',
    },
  },
  tabsContainer: {
    '& .MuiTabs-root': {
      minHeight: '42px !important',
    },
    '& .MuiTabs-flexContainer': {
      gap: '4px !important',
      paddingLeft: '16px !important',
      paddingRight: '16px !important',
    },
    '& .MuiTabs-indicator': {
      height: '2px !important',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
      borderRadius: '1px !important',
    },
    '& .MuiTabs-scroller': {
      '&::-webkit-scrollbar': {
        display: 'none !important',
      },
      scrollbarWidth: 'none !important',
      msOverflowStyle: 'none !important',
    },
  },
  tab: {
    minWidth: 'auto !important',
    minHeight: '42px !important',
    padding: '8px 12px !important',
    fontSize: '13px !important',
    fontWeight: '500 !important',
    textTransform: 'none !important',
    color: '#9ca3af !important',
    borderRadius: '8px !important',
    transition: 'all 0.2s ease !important',
    '&.Mui-selected': {
      color: '#ffffff !important',
      background: 'rgba(99, 102, 241, 0.1) !important',
    },
    '&:hover': {
      color: '#ffffff !important',
      background: 'rgba(99, 102, 241, 0.05) !important',
    },
  },
  comingSoonChip: {
    height: '14px !important',
    fontSize: '8px !important',
    backgroundColor: 'rgba(251, 191, 36, 0.2) !important',
    color: '#fbbf24 !important',
    fontWeight: '500 !important',
    marginLeft: '4px !important',
    '& .MuiChip-label': {
      padding: '0 4px !important',
    },
  },
  menuItem: {
    fontSize: '14px !important',
    color: '#ffffff !important',
    padding: '12px 16px !important',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.1) !important',
    },
  },
  menuPaper: {
    background: 'rgba(26, 26, 26, 0.95) !important',
    backdropFilter: 'blur(20px) !important',
    border: '1px solid rgba(99, 102, 241, 0.2) !important',
    borderRadius: '12px !important',
    marginTop: '8px !important',
  },
});

const TopBar = ({ activeSection, onSectionChange, onMenuToggle, onSearchToggle }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { categories, loading } = useCategories();
  const [menuAnchor, setMenuAnchor] = useState(null);

  const mainTabs = [
    { 
      label: 'Discover', 
      value: 'discover', 
      icon: <Explore sx={{ fontSize: 16 }} />,
      comingSoon: false 
    },
    // { 
    //   label: 'Featured', 
    //   value: 'featured', 
    //   icon: <Star sx={{ fontSize: 16 }} />,
    //   comingSoon: false 
    // },
    // { 
    //   label: 'Trending', 
    //   value: 'trending', 
    //   icon: <Whatshot sx={{ fontSize: 16 }} />,
    //   comingSoon: true 
    // },
    // { 
    //   label: 'For You', 
    //   value: 'foryou', 
    //   icon: <Favorite sx={{ fontSize: 16 }} />,
    //   comingSoon: true 
    // },
    // { 
    //   label: 'Recent', 
    //   value: 'recent', 
    //   icon: <Schedule sx={{ fontSize: 16 }} />,
    //   comingSoon: true 
    // },
    { 
      label: 'History', 
      value: 'history', 
      icon: <History sx={{ fontSize: 16 }} />,
      comingSoon: false 
    },
  ];

  // Add popular categories to tabs
  const categoryTabs = Object.keys(categories).slice(0, 4).map(categoryKey => ({
    label: categories[categoryKey],
    value: `category-${categoryKey}`,
    comingSoon: false
  }));

  const allTabs = [...mainTabs, ...categoryTabs];

  const handleTabChange = (event, newValue) => {
    if (newValue.startsWith('category-')) {
      const categoryKey = newValue.replace('category-', '');
      onSectionChange(`categories/${categoryKey}`);
    } else {
      onSectionChange(newValue);
    }
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const getCurrentTabValue = () => {
    if (activeSection.startsWith('categories/')) {
      const categoryKey = activeSection.replace('categories/', '');
      return `category-${categoryKey}`;
    }
    return activeSection;
  };

  const renderTab = (tab) => {
    const isDisabled = tab.comingSoon;
    
    return (
      <Tab
        key={tab.value}
        value={tab.value}
        disabled={isDisabled}
        className={classes.tab}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {tab.icon && tab.icon}
            <span>{tab.label}</span>
            {tab.comingSoon && (
              <Chip 
                label="Soon" 
                size="small" 
                className={classes.comingSoonChip} 
              />
            )}
          </Box>
        }
      />
    );
  };

  if (!isMobile) return null;

  return (
    <Box className={classes.topBar}>
      {/* Header */}
      <Box className={classes.header}>
        {/* <IconButton 
          className={classes.actionButton}
          onClick={onMenuToggle}
        >
          <MenuIcon />
        </IconButton> */}
        
        <Box className={classes.logo}>
          <Box className={classes.logoIcon}>
            <LocationOn sx={{ fontSize: 14 }} />
          </Box>
          <Typography className={classes.logoText}>
            Legends
          </Typography>
        </Box>

        <Box className={classes.headerActions}>
          {/* <IconButton 
            className={classes.actionButton}
            onClick={onSearchToggle}
          >
            <Search />
          </IconButton> */}
          
          {/* <IconButton 
            className={classes.actionButton}
            onClick={handleMenuOpen}
          >
            <MoreVert />
          </IconButton> */}
        </Box>
      </Box>

      {/* Tabs */}
      <Box className={classes.tabsContainer}>
        <Tabs
          value={getCurrentTabValue()}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false}
          allowScrollButtonsMobile
        >
          {allTabs.map(renderTab)}
        </Tabs>
      </Box>

      {/* Menu */}
      {/* <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          className: classes.menuPaper
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose} className={classes.menuItem}>
          Settings
        </MenuItem>
        <MenuItem onClick={handleMenuClose} className={classes.menuItem}>
          Help & Support
        </MenuItem>
        <MenuItem onClick={handleMenuClose} className={classes.menuItem}>
          About
        </MenuItem>
      </Menu> */}
    </Box>
  );
};

export default TopBar;