import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import CharacterGrid from '../components/dashboard/CharacterGrid';
import ChatModal from '../components/dashboard/ChatModal';

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  background: theme.palette.background.default,
}));

const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: 280,
  flex: 1,
  padding: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    padding: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const [selectedCharacter, setSelectedCharacter] = React.useState(null);
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <CharacterGrid onCharacterClick={handleCharacterClick} />
      </MainContent>
      <ChatModal
        open={isChatOpen}
        character={selectedCharacter}
        onClose={handleChatClose}
      />
    </DashboardContainer>
  );
};

export default Dashboard;