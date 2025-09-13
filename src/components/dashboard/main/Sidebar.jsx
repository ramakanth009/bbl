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
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  WorkspacePremium,
  Add,
  Explore,
  Star,
  Whatshot,
  Favorite,
  Schedule,
  History,
  Logout,
  Category,
  ChevronRight,
  ChevronLeft,
} from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import { isMobileViewport, SIDEBAR_WIDTHS, BREAKPOINTS } from "../../../utils/sidebarUtils";

import CategoriesList from './CategoriesList';
import CreateFeaturePopup from "../character/creation/CreateFeaturePopup";

const useStyles = makeStyles(() => ({
  drawer: {
    '& .MuiDrawer-paper': {
      width: `${SIDEBAR_WIDTHS.EXPANDED.DESKTOP}px !important`,
      height: '100vh !important',
      backgroundColor: 'rgba(26, 26, 26, 0.7) !important',
      borderRight: '1px solid rgba(42, 42, 42, 0.5) !important',
      padding: '20px 20px 5px 20px !important',
      display: 'flex !important',
      flexDirection: 'column !important',
      overflow: 'hidden !important',
      position: 'fixed !important',
      left: '0 !important',
      top: '0 !important',
      zIndex: '1200 !important',
      transition: 'all 0.3s ease !important',
      // FIXED: Unified tablet range (901-1200px)
      [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
        width: `${SIDEBAR_WIDTHS.EXPANDED.TABLET}px !important`,
        padding: '16px !important',
      },
      // FIXED: Mobile only (≤900px)
      [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
        width: `${SIDEBAR_WIDTHS.EXPANDED.MOBILE}px !important`,
        zIndex: '1300 !important',
      },
      '@media (max-width: 600px)': {
        width: `${SIDEBAR_WIDTHS.EXPANDED.MOBILE}px !important`,
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
  drawerCollapsed: {
    '& .MuiDrawer-paper': {
      width: `${SIDEBAR_WIDTHS.COLLAPSED.DESKTOP}px !important`,
      padding: '20px 10px !important',
      display: 'flex !important',
      flexDirection: 'column !important',
      alignItems: 'center !important',
      // FIXED: Unified tablet range (901-1200px)
      [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
        width: `${SIDEBAR_WIDTHS.COLLAPSED.TABLET}px !important`,
        padding: '16px 6px !important',
      },
      // FIXED: Mobile only (≤900px)
      [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
        width: `${SIDEBAR_WIDTHS.EXPANDED.MOBILE}px !important`,
        padding: '20px !important',
        alignItems: 'stretch !important',
      },
    },
  },
  contentWrapper: {
    height: '100% !important',
    display: 'flex !important',
    flexDirection: 'column !important',
    overflow: 'hidden !important',
    width: '100% !important',
  },
  contentWrapperCollapsed: {
    alignItems: 'center !important',
    [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
      alignItems: 'stretch !important',
    },
  },
  logoWrapper: {
    display: "flex !important",
    alignItems: "center !important",
    gap: '12px !important',
    marginBottom: '20px !important',
    justifyContent: 'flex-start !important',
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
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
  logoWrapperCollapsed: {
    justifyContent: 'center !important',
    [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
      justifyContent: 'flex-start !important',
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
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
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
    fontSize: '24px !important',
    fontWeight: '600 !important',
    color: '#ffffff !important',
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
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
  expandButton: {
    width: '40px !important',
    height: '40px !important',
    minWidth: '40px !important',
    padding: '0 !important',
    backgroundColor: '#333 !important',
    color: '#ccc !important',
    borderRadius: '6px !important',
    transition: 'all 0.2s ease !important',
    border: '1px solid rgba(255, 255, 255, 0.1) !important',
    marginBottom: '16px !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    '&:hover': {
      backgroundColor: '#404040 !important',
      color: '#6366f1 !important',
      borderColor: 'rgba(99, 102, 241, 0.3) !important',
    },
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
      width: '32px !important',
      height: '32px !important',
      minWidth: '32px !important',
      marginBottom: '12px !important',
    },
    [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
      display: 'none !important', // Hide on mobile since sidebar behavior is different
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
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
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
  createButtonCollapsed: {
    minWidth: '40px !important',
    width: '40px !important',
    height: '40px !important',
    padding: '0 !important',
    marginBottom: '20px !important',
    borderRadius: '8px !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    margin: '0 auto 20px auto !important',
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
      minWidth: '32px !important',
      width: '32px !important',
      height: '32px !important',
      margin: '0 auto 16px auto !important',
    },
    [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
      width: "100% !important",
      height: 'auto !important',
      padding: '10px 16px !important',
      margin: '0 0 30px 0 !important',
    },
  },
  navSectionWrapper: {
    marginBottom: '24px !important',
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
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
  navSectionWrapperCollapsed: {
    marginBottom: '16px !important',
    [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
      marginBottom: '24px !important',
    },
  },
  sectionTitle: {
    fontSize: '11px !important',
    fontWeight: '600 !important',
    color: '#666 !important',
    textTransform: 'uppercase !important',
    letterSpacing: '0.5px !important',
    marginBottom: '8px !important',
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
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
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
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
  listItemCollapsed: {
    padding: '8px 4px !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    minHeight: '40px !important',
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
      padding: '6px 2px !important',
      minHeight: '32px !important',
    },
    [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
      padding: '8px 12px !important',
      justifyContent: 'flex-start !important',
      minHeight: 'auto !important',
    },
  },
  scrollableContent: {
    flex: '1 !important',
    overflow: 'hidden !important',
    '&:hover': {
      overflowY: 'auto !important'
    }
  },
  scrollableContentCollapsed: {
    display: 'none !important',
    [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
      display: 'block !important',
    },
  },
  categoriesIconWrapper: {
    display: 'flex !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    marginBottom: '16px !important',
    [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
      display: 'none !important',
    },
  },
  categoriesIcon: {
    padding: '8px 4px !important',
    borderRadius: '6px !important',
    color: '#ccc !important',
    transition: 'all 0.2s ease !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    minWidth: '40px !important',
    minHeight: '40px !important',
    "&:hover": {
      backgroundColor: '#252525 !important',
    },
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
      padding: '6px 2px !important',
      minWidth: '32px !important',
      minHeight: '32px !important',
    },
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
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
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
    marginTop: 'auto',
    paddingTop: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  },
  versionChipContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: '8px 0 0 0 !important',
    padding: '0 !important',
  },
  versionChip: {
    backgroundColor: 'transparent',
    color: '#6366f1',
    fontWeight: 500,
    fontSize: '11px',
    height: '22px',
    borderRadius: '6px',
    letterSpacing: '0.5px',
    padding: '0 12px',
    boxShadow: 'none',
    opacity: 1,
    '&.MuiChip-sizeSmall': {
      fontSize: '10px',
      height: '18px',
      padding: '0 8px',
    },
    '&.MuiChip-root': {
      margin: '8px 0 0 0 !important',
    },
    '&.MuiChip-sizeSmall': {
      fontSize: '10px',
      height: '18px',
      padding: '0 8px',
    },
    '& .css-1tg7bjp': {
      margin: '0 !important',
      padding: '0 !important',
    },
  },
  iconSizing: {
    fontSize: '16px !important',
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
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
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
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
  listItemIcon: {
    color: "#888 !important", 
    minWidth: '26px !important', 
    marginRight: '10px !important',
    // FIXED: Unified tablet range
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
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
  },
  listItemIconCollapsed: {
    minWidth: 'auto !important',
    marginRight: '0 !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
      minWidth: '26px !important',
      marginRight: '10px !important',
    },
  },
  logoutButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.05)',
    '&:hover': {
      backgroundColor: 'rgba(244, 67, 54, 0.08)',
    },
  },
}));

const Sidebar = ({ open, onToggle, onCharacterCreated, isMobile }) => {
  const classes = useStyles();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobileView = isMobileViewport(window.innerWidth);

  const [stylesReady, setStylesReady] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

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
    // { text: "Featured", path: "featured", icon: <Star className={classes.iconSizing} />, comingSoon: true },
    // { text: "Trending", path: "trending", icon: <Whatshot className={classes.iconSizing} />, comingSoon: true },
    // { text: "For You", path: "foryou", icon: <Favorite className={classes.iconSizing} />, comingSoon: true },
    // { text: "Recent", path: "recent", icon: <Schedule className={classes.iconSizing} />, comingSoon: true },
  ];

  const historyItems = [
    { text: "History", path: "history", icon: <History className={classes.iconSizing} />, comingSoon: false },
  ];

  const handleNavClick = (path, comingSoon) => {
    if (!comingSoon) {
      // When navigating to Discover, include a reset flag in state so search boxes can clear
      if (path === 'discover') {
        navigate(`/dashboard/${path}`,
          { state: { resetSearch: Date.now() } }
        );
      } else {
        navigate(`/dashboard/${path}`);
      }
      // Close sidebar on mobile after navigation
      if (isMobileView && onToggle) {
        onToggle();
      }
    }
  };

  const handleCreateClick = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleCategorySelect = (categoryKey) => {
    // Include reset flag for category navigation
    navigate(`/dashboard/categories/${categoryKey}`, { 
      state: { resetSearch: Date.now() } 
    });
    // Close sidebar on mobile after navigation
    if (isMobileView && onToggle) {
      onToggle();
    }
  };

  const handleCategoryIconClick = () => {
    // Expand sidebar when category icon is clicked in collapsed state
    if (!open && onToggle) {
      onToggle();
    }
  };

  const handleDrawerClose = () => {
    if (isMobileView && onToggle) {
      onToggle();
    }
  };

  // Handle expand button click
  const handleExpandClick = () => {
    if (onToggle) {
      onToggle();
    }
  };

  // Handle collapse button click
  const handleCollapseClick = () => {
    if (onToggle) {
      onToggle();
    }
  };

  const renderNavItem = (item) => {
    const isActive = activeSection === item.path;
    const content = (
      <ListItemButton
        key={item.text}
        className={`${classes.listItem} ${!open ? classes.listItemCollapsed : ""} ${isActive ? "active" : ""}`}
        onClick={() => handleNavClick(item.path, item.comingSoon)}
      >
        <ListItemIcon className={`${classes.listItemIcon} ${!open ? classes.listItemIconCollapsed : ""}`}>
          {item.icon}
        </ListItemIcon>
        {open && (
          <>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ 
                className: classes.listItemText
              }}
            />
            {item.comingSoon && (
              <Chip label="Coming Soon" size="small" className={classes.chip} />
            )}
          </>
        )}
      </ListItemButton>
    );

    // Wrap with tooltip when collapsed (except on mobile)
    if (!open && !isMobileView) {
      return (
        <Tooltip key={item.text} title={item.text} placement="right" arrow>
          {content}
        </Tooltip>
      );
    }

    return content;
  };

  const renderNavSection = (items, title) => (
    <Box className={`${classes.navSectionWrapper} ${!open ? classes.navSectionWrapperCollapsed : ""}`}>
      {title && open && <Typography className={classes.sectionTitle}>{title}</Typography>}
      <List dense disablePadding>
        {items.map(renderNavItem)}
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
        width: open ? '280px !important' : '70px !important',
        height: '100vh !important',
        backgroundColor: 'rgba(26, 26, 26, 0.7) !important',
        borderRight: '1px solid rgba(42, 42, 42, 0.5) !important',
        padding: open ? '20px !important' : '20px 10px !important',
        display: 'flex !important',
        flexDirection: 'column !important',
        overflow: 'hidden !important',
        zIndex: 1200,
        transition: 'all 0.3s ease',
        [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
          width: '280px !important',
          padding: '20px !important',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
        },
      }}>
        {/* Logo skeleton */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: open ? '12px' : '0px',
          marginBottom: '20px',
          justifyContent: open ? 'flex-start' : 'center',
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
          {open && (
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
          )}
        </Box>
        
        {/* Button skeleton */}
        <Box sx={{
          width: open ? '100%' : '40px',
          height: '40px',
          borderRadius: '8px',
          background: 'rgba(99, 102, 241, 0.3)',
          marginBottom: open ? '30px' : '20px',
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

  const createButtonContent = (
    <Button
      variant="contained"
      startIcon={open ? <Add className={classes.iconSizing} /> : null}
      onClick={handleCreateClick}
      className={`${classes.createButton} ${!open ? classes.createButtonCollapsed : ""}`}
      sx={{
        opacity: 1,
        cursor: 'pointer',
        '&:hover': {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
          transform: 'translateY(-1px) !important',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4) !important',
        }
      }}
    >
      {!open ? <Add className={classes.iconSizing} /> : "Create"}
    </Button>
  );

  return (
    <>
      <Drawer 
        variant={isMobile ? "temporary" : "persistent"}
        open={isMobile ? open : true}
        onClose={handleDrawerClose}
        className={`${classes.drawer} ${!open ? classes.drawerCollapsed : ""}`}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box className={`${classes.contentWrapper} ${!open ? classes.contentWrapperCollapsed : ""}`}>
          {/* Top right button for collapse/expand (desktop only) */}
          {!isMobile && (
            <Box sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1500,
            }}>
              <Tooltip title={open ? "Collapse Sidebar" : "Expand Sidebar"} placement="left" arrow>
                <IconButton
                  onClick={open ? handleCollapseClick : handleExpandClick}
                  className={classes.expandButton}
                  sx={{
                    backgroundColor: '#333 !important',
                    color: '#ccc !important',
                    width: '32px !important',
                    height: '32px !important',
                    minWidth: '32px !important',
                    borderRadius: '6px !important',
                    boxShadow: 1,
                  }}
                >
                  {open ? <ChevronLeft sx={{ fontSize: '16px' }} /> : <ChevronRight sx={{ fontSize: '16px' }} />}
                </IconButton>
              </Tooltip>
            </Box>
          )}

          <Box className={`${classes.logoWrapper} ${!open ? classes.logoWrapperCollapsed : ""}`}>
            <Box className={classes.logoIcon}>
              <WorkspacePremium sx={{ fontSize: 14 }} />
            </Box>
            {open && (
              <Typography className={classes.logoText}>
                GigaSpace
              </Typography>
            )}
          </Box>

          {!open && !isMobile ? (
            <Tooltip title="Create" placement="right" arrow>
              {createButtonContent}
            </Tooltip>
          ) : (
            createButtonContent
          )}

          {/* Main and history sections */}
          {renderNavSection(mainNavItems, "EXPLORE")}
          {renderNavSection(historyItems, "ACTIVITY")}

          {/* Categories section */}
          {open && (
            <Typography className={classes.sectionTitle}>
              CATEGORIES
            </Typography>
          )}
          
          {/* Categories icon when collapsed */}
          {!open && !isMobile && (
            <Box className={classes.categoriesIconWrapper}>
              <Tooltip title="Categories" placement="right" arrow>
                <IconButton 
                  className={classes.categoriesIcon}
                  onClick={handleCategoryIconClick}
                >
                  <Category className={classes.iconSizing} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          
          {/* Dynamic categories section - scrollable when open */}
          <Box className={`${classes.scrollableContent} ${!open ? classes.scrollableContentCollapsed : ""}`}>
            <CategoriesList 
              onCategorySelect={handleCategorySelect}
              activeCategory={activeCategory}
            />
          </Box>

          <Box className={classes.footerWrapper}>
            {!open && !isMobile ? (
              <Tooltip title="Logout" placement="right" arrow>
                <ListItemButton 
                  onClick={logout} 
                  className={`${classes.listItem} ${classes.listItemCollapsed} ${classes.logoutButton}`}
                  sx={{
                    display: 'flex !important',
                    justifyContent: 'center',
                    padding: '8px 0 !important',
                    border: '1px solid rgba(244, 67, 54, 0.05) !important',
                    '&:hover': {
                      border: '1px solid rgba(244, 67, 54, 0.1) !important'
                    }
                  }}
                >  
                  <ListItemIcon className={`${classes.listItemIcon} ${classes.listItemIconCollapsed}`}>
                    <Logout className={classes.iconSizing} />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            ) : (
              <ListItemButton 
                onClick={logout} 
                className={`${classes.listItem} ${classes.logoutButton}`}
                sx={{
                  border: '1px solid rgba(244, 67, 54, 0.05) !important',
                  '&:hover': {
                    border: '1px solid rgba(244, 67, 54, 0.1) !important'
                  }
                }}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <Logout className={classes.iconSizing} />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{ 
                      className: classes.listItemText
                    }}
                  />
                )}
              </ListItemButton>
            )}
          </Box>
          
          {/* Beta version label */}
          <Box className={classes.versionChipContainer}>
            <Chip
              label="GigaSpace v1.0 (beta)"
              size="small"
              className={classes.versionChip}
            />
          </Box>
        </Box>
      </Drawer>

      <CreateFeaturePopup open={popupOpen} onClose={handlePopupClose} />
    </>
  );
};

export default Sidebar;