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
  Palette,
  Science,
  Movie,
  Logout,
} from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import CharacterCreationForm from "../character/creation/CharacterCreationForm";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 280,
    height: '100vh',
    backgroundColor: '#1a1a1a',
    borderRight: '1px solid #2a2a2a',
    padding: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'fixed',
    left: 0,
    top: 0,
  },
}));

const ContentWrapper = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
});

const LogoWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2.5),
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 28,
  height: 28,
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: '14px',
}));

const CreateButton = styled(Button)(({ theme }) => ({
  width: "100%",
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  color: 'white',
  padding: '10px 16px',
  borderRadius: 8,
  fontSize: '14px',
  fontWeight: 500,
  marginBottom: theme.spacing(3.75),
  textTransform: 'none',
  transition: 'all 0.2s ease',
  "&:hover": {
    background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
  },
}));

const NavSectionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '11px',
  fontWeight: 600,
  color: '#666',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: theme.spacing(1),
}));

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
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
}));

const ScrollableContent = styled(Box)({
  flex: 1,
  overflow: 'hidden',
  '&:hover': {
    overflowY: 'auto'
  }
});

const StyledChip = styled(Chip)(({ theme }) => ({
  height: 16,
  fontSize: '10px',
  backgroundColor: '#fff3cd',
  color: '#856404',
  fontWeight: 500,
  marginLeft: 'auto',
  '& .MuiChip-label': {
    padding: '0 6px',
  },
}));

const FooterWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  borderTop: '1px solid #333',
  marginTop: 'auto',
}));

const Sidebar = ({ onCharacterCreated }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showCharacterForm, setShowCharacterForm] = useState(false);

  // Get current active section from URL
  const currentPath = location.pathname.split('/').pop();
  const activeSection = currentPath === 'dashboard' ? 'discover' : currentPath;

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

  const categoryItems = [
    { text: "Art & Culture", path: "art-culture", icon: <Palette sx={{ fontSize: 16 }} />, comingSoon: true },
    { text: "Science", path: "science", icon: <Science sx={{ fontSize: 16 }} />, comingSoon: true },
    { text: "Entertainment", path: "entertainment", icon: <Movie sx={{ fontSize: 16 }} />, comingSoon: true },
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

  const renderNavSection = (items, title) => (
    <NavSectionWrapper>
      {title && <SectionTitle>{title}</SectionTitle>}
      <List dense disablePadding>
        {items.map((item) => (
          <StyledListItem
            key={item.text}
            className={activeSection === item.path ? "active" : ""}
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
              <StyledChip label="Coming Soon" size="small" />
            )}
          </StyledListItem>
        ))}
      </List>
    </NavSectionWrapper>
  );

  return (
    <>
      <StyledDrawer variant="permanent">
        <ContentWrapper>
          <LogoWrapper>
            <LogoIcon>
              <LocationOn sx={{ fontSize: 14 }} />
            </LogoIcon>
            <Typography 
              sx={{ 
                fontSize: '16px', 
                fontWeight: 600, 
                color: '#ffffff' 
              }}
            >
              Bring Back Legend
            </Typography>
          </LogoWrapper>

          <CreateButton
            variant="contained"
            startIcon={<Add sx={{ fontSize: 16 }} />}
            onClick={handleCreateClick}
          >
            Create
          </CreateButton>

          {/* Main and history sections (no scroll) */}
          {renderNavSection(mainNavItems, "EXPLORE")}
          {renderNavSection(historyItems, "ACTIVITY")}

          {/* Only categories section is scrollable */}
          <ScrollableContent>
            {renderNavSection(categoryItems, "CATEGORIES")}
          </ScrollableContent>

          <FooterWrapper>
            <StyledListItem onClick={logout}>
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
            </StyledListItem>
          </FooterWrapper>
        </ContentWrapper>
      </StyledDrawer>

      <CharacterCreationForm
        open={showCharacterForm}
        onClose={handleCharacterFormClose}
        onCharacterCreated={handleCharacterCreated}
      />
    </>
  );
};

export default Sidebar;