import React, { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  Chip,
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
  Palette,
  Science,
  Movie,
  Logout,
} from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { useAuth } from "../../../context/AuthContext";
import CharacterCreationForm from "../character/creation/CharacterCreationForm";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 280,
    height: '100vh',
    backgroundColor: theme.palette.background.secondary,
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
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
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
}));

const CreateButton = styled(Button)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.primary.main,
  marginBottom: theme.spacing(1.5),
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const NavSectionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.text.disabled,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: theme.spacing(1),
  paddingLeft: theme.spacing(2),
}));

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(0.25),
  padding: theme.spacing(0.5, 2),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.active": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
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
  height: 20,
  fontSize: '0.65rem',
  backgroundColor: theme.palette.warning.white,
  color: theme.palette.warning.black,
  marginLeft: theme.spacing(1),
}));

const FooterWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
}));

const Sidebar = ({ activeSection, onSectionChange, onCharacterCreated }) => {
  const { logout } = useAuth();
  const [showCharacterForm, setShowCharacterForm] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  const mainNavItems = [
    { text: "Discover", icon: <Explore />, comingSoon: false },
    { text: "Featured", icon: <Star />, comingSoon: true },
    { text: "Trending", icon: <Whatshot />, comingSoon: true },
    { text: "For You", icon: <Favorite />, comingSoon: true },
    { text: "Recent", icon: <Schedule />, comingSoon: true },
  ];

  const historyItems = [
    { text: "History", icon: <History />, comingSoon: false },
  ];

  const categoryItems = [
    { text: "Art & Culture", icon: <Palette />, comingSoon: true },
    { text: "Science", icon: <Science />, comingSoon: true },
    { text: "Entertainment", icon: <Movie />, comingSoon: true },
  ];

  const handleNavClick = (text, comingSoon) => {
    if (comingSoon) {
      setComingSoonOpen(true);
    } else {
      onSectionChange(text);
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
    
    // Switch to Discover section to show the new character
    onSectionChange('Discover');
    
    // Notify parent component if callback provided
    if (onCharacterCreated) {
      onCharacterCreated(newCharacter);
    }
  };

  const renderNavSection = (items, title) => (
    <NavSectionWrapper>
      {title && <SectionTitle>{title}</SectionTitle>}
      <List dense>
        {items.map((item) => (
          <StyledListItem
            key={item.text}
            className={activeSection === item.text ? "active" : ""}
            onClick={() => handleNavClick(item.text, item.comingSoon)}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {item.text}
                  {item.comingSoon && (
                    <StyledChip label="Coming Soon" size="small" />
                  )}
                </Box>
              }
              primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 500 }}
            />
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
              <WorkspacePremium fontSize="small" />
            </LogoIcon>
            <Typography variant="h6" fontWeight="bold">
              Bring Back Legend
            </Typography>
          </LogoWrapper>

          <CreateButton
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateClick}
          >
            Create
          </CreateButton>

          <ScrollableContent>
            {renderNavSection(mainNavItems, "Explore")}
            {renderNavSection(historyItems, "Activity")}
            {renderNavSection(categoryItems, "Categories")}
          </ScrollableContent>

          <FooterWrapper>
            <StyledListItem onClick={logout}>
              <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 500 }}
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