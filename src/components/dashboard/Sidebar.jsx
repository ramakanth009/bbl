import React, { useState } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  IconButton,
} from '@mui/material';
import {
  WorkspacePremium,
  Add,
  Explore,
  Star,
  Whatshot,
  Favorite,
  Schedule,
  History,
  Palette,
  Science,
  Movie,
  Settings,
  Logout,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 280,
  '& .MuiDrawer-paper': {
    width: 280,
    backgroundColor: theme.palette.background.secondary,
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(3, 2),
  },
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(0, 1),
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const CreateButton = styled(Button)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const NavSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.active': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}));

const Sidebar = () => {
  const { logout } = useAuth();
  const [activeItem, setActiveItem] = useState('Discover');

  const mainNavItems = [
    { text: 'Discover', icon: <Explore /> },
    { text: 'Featured', icon: <Star /> },
    { text: 'Trending', icon: <Whatshot /> },
    { text: 'For You', icon: <Favorite /> },
    { text: 'Recent', icon: <Schedule /> },
  ];

  const categoryItems = [
    { text: 'History', icon: <History /> },
    { text: 'Art & Culture', icon: <Palette /> },
    { text: 'Science', icon: <Science /> },
    { text: 'Entertainment', icon: <Movie /> },
  ];

  const settingsItems = [
    { text: 'Settings', icon: <Settings /> },
  ];

  const handleNavClick = (text) => {
    setActiveItem(text);
  };

  const renderNavSection = (items, title) => (
    <NavSection>
      <List dense>
        {items.map((item) => (
          <StyledListItem
            key={item.text}
            button
            className={activeItem === item.text ? 'active' : ''}
            onClick={() => handleNavClick(item.text)}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
            />
          </StyledListItem>
        ))}
      </List>
    </NavSection>
  );

  return (
    <StyledDrawer variant="permanent">
      <Logo>
        <LogoIcon>
          <WorkspacePremium fontSize="small" />
        </LogoIcon>
        <Typography variant="h6" fontWeight="bold">
          Bring Back Legend
        </Typography>
      </Logo>

      <CreateButton variant="contained" startIcon={<Add />}>
        Create
      </CreateButton>

      {renderNavSection(mainNavItems)}
      {renderNavSection(categoryItems)}
      {renderNavSection(settingsItems)}

      <Box sx={{ mt: 'auto' }}>
        <StyledListItem button onClick={logout}>
          <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText 
            primary="Logout" 
            primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
          />
        </StyledListItem>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;