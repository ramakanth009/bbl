import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import CharacterGrid from '../components/dashboard/CharacterGrid';
import ChatPanel from '../components/dashboard/ChatPanel';

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  background: theme.palette.background.default,
}));

const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: 280,
  flex: 1,
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const ContentArea = styled(Box)(({ theme, chatOpen }) => ({
  flex: chatOpen ? 0.6 : 1,
  padding: theme.spacing(3),
  overflow: 'auto',
  transition: 'flex 0.3s ease',
  [theme.breakpoints.down('lg')]: {
    flex: chatOpen ? 0.5 : 1,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Discover');

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setTimeout(() => setSelectedCharacter(null), 300); // Delay for animation
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <DashboardContainer>
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <MainContent>
        <ContentArea chatOpen={isChatOpen}>
          <Header />
          <CharacterGrid 
            onCharacterClick={handleCharacterClick}
            activeSection={activeSection}
          />
        </ContentArea>
        <ChatPanel
          open={isChatOpen}
          character={selectedCharacter}
          onClose={handleChatClose}
        />
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;