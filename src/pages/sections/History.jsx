import React, { useState } from 'react';
import CharacterGrid from '../../components/dashboard/character/CharacterGrid';
import ChatPanel from '../../components/dashboard/chat/ChatPanel';

const History = (props) => {
  const [openChat, setOpenChat] = useState(false);
  const [chatCharacter, setChatCharacter] = useState(null);
  const [chatSession, setChatSession] = useState(null);

  // Handler for when a session is opened from history
  const handleSessionOpen = (sessionWithMessages) => {
    // Compose a character object for ChatPanel
    const character = {
      name: sessionWithMessages.character,
      img: sessionWithMessages.img || undefined, // fallback if needed
      description: sessionWithMessages.description || '',
      native_language: sessionWithMessages.native_language || 'english',
    };
    setChatCharacter(character);
    setChatSession(sessionWithMessages);
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
    setChatCharacter(null);
    setChatSession(null);
  };

  return (
    <>
      <CharacterGrid 
        {...props}
        activeSection="History"
        onSessionOpen={handleSessionOpen}
      />
      {openChat && chatCharacter && chatSession && (
        <ChatPanel 
          open={openChat}
          character={chatCharacter}
          onClose={handleCloseChat}
          initialMessages={chatSession.messages}
          initialSessionId={chatSession.sessionId || chatSession.session_id}
        />
      )}
    </>
  );
};

export default History;
