// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box,
//   Typography,
//   IconButton,
//   Avatar,
//   Alert,
//   Chip,
// } from '@mui/material';
// import { 
//   Close, 
//   Add,
//   Tune,
//   History as HistoryIcon,
//   ArrowBack,
// } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import apiService from '../../../services/api';
// import MessageList from '../message/MessageList';
// import ChatInput from './ChatInput';
// // import CreativitySettingsMenu from './CreativitySettingsMenu';
// import ChatHistoryPanel from './history/ChatHistoryPanel';

// const ChatContainer = styled(Box)(({ theme, open }) => ({
//   width: open ? 'calc(100vw - 280px)' : 0,
//   // Remove backgroundColor here!
//   borderLeft: `1px solid ${theme.palette.divider}`,
//   display: 'flex',
//   flexDirection: 'column',
//   transition: 'all 0.3s ease',
//   overflow: 'hidden',
//   position: 'absolute',
//   right: 0,
//   top: 0,
//   height: '100vh',
//   zIndex: 2, // ensure above overlay
//   [theme.breakpoints.down('md')]: {
//     width: open ? '100vw' : 0,
//     left: 0,
//   },
// }));

// const ChatHeader = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   padding: theme.spacing(2.5),
//   borderBottom: `1px solid ${theme.palette.divider}`,
//   gap: theme.spacing(1.5),
// }));

// const ChatHeaderTop = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
// }));

// const ChatHeaderLeft = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   gap: theme.spacing(1.5),
//   flex: 1,
//   minWidth: 0,
// }));

// const CharacterInfo = styled(Box)({
//   flex: 1,
//   minWidth: 0,
// });

// const CharacterDescription = styled(Typography)(({ theme }) => ({
//   fontSize: '0.875rem',
//   color: theme.palette.text.secondary,
//   lineHeight: 1.4,
// }));

// const ChatHeaderRight = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   gap: theme.spacing(1),
// }));

// const BackButton = styled(IconButton)(({ theme }) => ({
//   color: theme.palette.text.secondary,
// }));

// const MessagesWrapper = styled(Box)({
//   flex: 1,
//   overflow: 'hidden',
//   display: 'flex',
//   flexDirection: 'column',
// });

// const ChatPanel = ({ open, character, onClose, onBack }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [sessionId, setSessionId] = useState(null);
//   const [sessions, setSessions] = useState([]);
//   const [showHistory, setShowHistory] = useState(false);
  
//   // Creativity settings
//   // const [settingsAnchor, setSettingsAnchor] = useState(null);
//   // const [temperature, setTemperature] = useState(0.7);
//   // const [topP, setTopP] = useState(0.95);
//   // const [topK, setTopK] = useState(40);
  
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (open && character) {
//       initializeChat();
//       loadUserSessions();
//     }
//   }, [open, character]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const initializeChat = () => {
//     setMessages([
//       {
//         role: character.name,
//         content: `Hello! I'm ${character.name}. What would you like to talk about?`,
//       },
//     ]);
//     setError(null);
//     setSessionId(null);
//   };

//   const loadUserSessions = async () => {
//     try {
//       const userSessions = await apiService.getSessions();
//       const characterSessions = userSessions.filter(s => s.character === character.name);
//       setSessions(characterSessions);
//     } catch (error) {
//       console.error('Failed to load sessions:', error);
//     }
//   };

//   const loadSession = async (sessionIdToLoad) => {
//     try {
//       setLoading(true);
//       const sessionData = await apiService.getSessionMessages(sessionIdToLoad);
      
//       const formattedMessages = sessionData.chat_history.map(msg => ({
//         role: msg.role,
//         content: msg.content,
//         timestamp: msg.timestamp
//       }));
      
//       setMessages(formattedMessages);
//       setSessionId(sessionIdToLoad);
//       setShowHistory(false);
//       setError(null);
//     } catch (error) {
//       console.error('Failed to load session:', error);
//       setError('Failed to load conversation history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startNewSession = () => {
//     initializeChat();
//     setShowHistory(false);
//   };

//   const handleSend = async () => {
//     if (!inputValue.trim() || loading || !character) return;

//     const userMessage = inputValue.trim();
//     setInputValue('');
//     setLoading(true);
//     setError(null);

//     const newUserMessage = { role: 'user', content: userMessage };
//     setMessages(prev => [...prev, newUserMessage]);

//     try {
//       // const creativitySettings = { temperature, top_p: topP, top_k: topK };
//       const response = await apiService.sendMessage(
//         character.name, 
//         userMessage, 
//         !sessionId
//         // ,creativitySettings
//       );
      
//       if (response.chat_history) {
//         const formattedMessages = response.chat_history.map(msg => ({
//           role: msg.role,
//           content: msg.content
//         }));
//         setMessages(formattedMessages);
//       } else {
//         setMessages(prev => [...prev, { 
//           role: character.name, 
//           content: response.reply 
//         }]);
//       }
      
//       if (response.session_id) {
//         setSessionId(response.session_id);
//       }

//       await loadUserSessions();
      
//     } catch (error) {
//       console.error('Chat error:', error);
//       setError(error.response?.data?.error || 'Failed to send message. Please try again.');
//       setMessages(prev => prev.slice(0, -1));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackClick = () => {
//     // Always call onClose to ensure routing is updated
//     onClose();
//   };

//   const handleHistoryClose = () => {
//     setShowHistory(false);
//   };

//   if (!open || !character) {
//     return <ChatContainer open={false} />;
//   }

//   return (
//     <ChatContainer open={open}>
//       <ChatHeader>
//         <ChatHeaderTop>
//           <ChatHeaderLeft>
//             <BackButton 
//               onClick={handleBackClick}
//               title="Back to Characters"
//             >
//               <ArrowBack />
//             </BackButton>
//             <Avatar
//               src={character.img}
//               alt={character.name}
//               sx={{ width: 40, height: 40, borderRadius: 1 }}
//             />
//             <CharacterInfo>
//               <Typography variant="h6" fontWeight="bold" noWrap>
//                 {character.name}
//               </Typography>
//               {sessionId && (
//                 <Chip 
//                   label={`Session ${sessionId}`} 
//                   size="small" 
//                   sx={{ fontSize: '0.7rem', height: 20 }} 
//                 />
//               )}
//             </CharacterInfo>
//           </ChatHeaderLeft>
          
//           <ChatHeaderRight>
//             <IconButton 
//               onClick={() => setShowHistory(true)}
//               sx={{ color: 'text.secondary' }}
//               title="Chat History"
//             >
//               <HistoryIcon />
//             </IconButton>
            
//             <IconButton 
//               onClick={startNewSession}
//               sx={{ color: 'text.secondary' }}
//               title="New Conversation"
//             >
//               <Add />
//             </IconButton>
            
//             {/* <IconButton 
//               onClick={(e) => setSettingsAnchor(e.currentTarget)}
//               sx={{ color: 'text.secondary' }}
//               title="Creativity Settings"
//             >
//               <Tune />
//             </IconButton> */}
            
//             <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
//               <Close />
//             </IconButton>
//           </ChatHeaderRight>
//         </ChatHeaderTop>
        
//         {character.description && (
//           <CharacterDescription>
//             {character.description}
//           </CharacterDescription>
//         )}
//       </ChatHeader>

//       {error && (
//         <Box sx={{ p: 2 }}>
//           <Alert severity="error" onClose={() => setError(null)}>
//             {error}
//           </Alert>
//         </Box>
//       )}

//       <MessagesWrapper>
//         <MessageList 
//           messages={messages} 
//           loading={loading} 
//           ref={messagesEndRef} 
//         />
//       </MessagesWrapper>

//       <ChatInput
//         value={inputValue}
//         onChange={setInputValue}
//         onSend={handleSend}
//         loading={loading}
//       />

//       {/* <CreativitySettingsMenu
//         anchorEl={settingsAnchor}
//         open={Boolean(settingsAnchor)}
//         onClose={() => setSettingsAnchor(null)}
//         temperature={temperature}
//         setTemperature={setTemperature}
//         topP={topP}
//         setTopP={setTopP}
//         topK={topK}
//         setTopK={setTopK}
//       /> */}
//       <ChatHistoryPanel
//         open={showHistory}
//         onClose={handleHistoryClose}
//         sessions={sessions}
//         currentSessionId={sessionId}
//         onSessionSelect={loadSession}
//         onNewSession={startNewSession}
//         characterName={character.name}
//       />
//     </ChatContainer>
//   );
// };

// export default ChatPanel;
// src/components/dashboard/chat/ChatPanel.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  Send,
  Language,
  Settings,
  NewReleases,
  Close
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import LanguageSelector from '../../language/LanguageSelector';
import apiService from '../../../services/api';

const useStyles = makeStyles({
  chatContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  chatHeader: {
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  messageBox: {
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '18px',
    wordWrap: 'break-word',
  },
  userMessage: {
    alignSelf: 'flex-end',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#333',
  },
  characterMessage: {
    alignSelf: 'flex-start',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  inputContainer: {
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  },
  inputField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '25px',
      '& fieldset': {
        borderColor: 'transparent',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.8)',
      },
    },
  },
  languageInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  settingsButton: {
    color: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
    },
  },
});

const ChatPanel = ({ character, onClose, sessionId }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [newSessionEnabled, setNewSessionEnabled] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (character) {
      loadChatHistory();
      setSelectedLanguage(character.native_language || 'english');
    }
  }, [character, sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    if (!sessionId) return;
    
    try {
      const response = await apiService.getSessionMessages(sessionId);
      setMessages(response.chat_history || []);
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || loading) return;

    const userMessage = currentMessage.trim();
    setCurrentMessage('');
    setError('');

    // Add user message to UI immediately
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      language: 'english',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      setLoading(true);
      
      const response = await apiService.sendMessage(character.name, userMessage, {
        language: selectedLanguage,
        newSession: newSessionEnabled,
      });

      // Add character response
      const characterMessage = {
        role: character.name,
        content: response.reply,
        language: response.response_language || selectedLanguage,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, characterMessage]);
      
      // Reset new session flag after first message
      if (newSessionEnabled) {
        setNewSessionEnabled(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to send message');
      // Remove the user message on error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const startNewSession = () => {
    setMessages([]);
    setNewSessionEnabled(true);
    setSettingsAnchor(null);
  };

  if (!character) {
    return (
      <Box className={classes.chatContainer}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Typography variant="h6" color="white">
            Select a character to start chatting
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.chatContainer}>
      {/* Header */}
      <Box className={classes.chatHeader}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={character.img}
            alt={character.name}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant="h6" color="white" fontWeight={600}>
              {character.name}
            </Typography>
            <Box className={classes.languageInfo}>
              <Language sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.7)' }} />
              <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                {character.native_language || 'English'}
              </Typography>
              {character.is_multilingual && (
                <Chip 
                  label="Multilingual" 
                  size="small" 
                  sx={{ 
                    height: 20, 
                    fontSize: '0.7rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }} 
                />
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Chat Settings">
            <IconButton
              className={classes.settingsButton}
              onClick={(e) => setSettingsAnchor(e.currentTarget)}
            >
              <Settings />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close Chat">
            <IconButton className={classes.settingsButton} onClick={onClose}>
              <Close />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Settings Menu */}
      <Menu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={() => setSettingsAnchor(null)}
      >
        <MenuItem onClick={startNewSession}>
          <NewReleases sx={{ mr: 1 }} />
          Start New Conversation
        </MenuItem>
      </Menu>

      {/* Messages */}
      <Box className={classes.messagesContainer}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {messages.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="rgba(255, 255, 255, 0.8)" gutterBottom>
              Start a conversation with {character.name}
            </Typography>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
              {character.description}
            </Typography>
          </Box>
        )}

        {messages.map((message, index) => (
          <Box key={index}>
            <Paper
              className={`${classes.messageBox} ${
                message.role === 'user' ? classes.userMessage : classes.characterMessage
              }`}
              elevation={2}
            >
              <Typography variant="body1">
                {message.content}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 1,
                  opacity: 0.7,
                  fontSize: '0.7rem',
                }}
              >
                {message.language && message.language !== 'english' && (
                  <Chip
                    label={message.language}
                    size="small"
                    sx={{
                      height: 16,
                      fontSize: '0.6rem',
                      mr: 1,
                      background: 'rgba(255, 255, 255, 0.2)',
                    }}
                  />
                )}
                {new Date(message.timestamp).toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Paper className={`${classes.messageBox} ${classes.characterMessage}`}>
              <CircularProgress size={16} sx={{ color: 'white' }} />
              <Typography variant="body2" sx={{ ml: 1, display: 'inline' }}>
                {character.name} is typing...
              </Typography>
            </Paper>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box className={classes.inputContainer}>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <LanguageSelector
            value={selectedLanguage}
            onChange={handleLanguageChange}
            label="Response Language"
            size="small"
            variant="outlined"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder={`Message ${character.name}...`}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className={classes.inputField}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={!currentMessage.trim() || loading}
            sx={{
              minWidth: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <Send />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPanel;