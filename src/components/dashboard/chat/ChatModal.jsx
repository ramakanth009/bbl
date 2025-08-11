// import React, { useState, useEffect, useRef } from 'react';
// import { makeStyles } from '@mui/styles';
// import {
//   Dialog,
//   Box,
//   Typography,
//   IconButton,
//   Avatar,
//   Alert,
//   Chip,
// } from '@mui/material';
// import { 
//   Close, 
//   Refresh, 
//   Tune,
//   History as HistoryIcon 
// } from '@mui/icons-material';
// import apiService from '../../../services/api';
// import MessageList from '../MessageList';
// import ChatInput from './ChatInput';
// import CreativitySettingsMenu from '../CreativitySettingsMenu';
// import SessionHistory from '../sessions/SessionHistory';
// import StarField from '../../common/StarField';

// const useStyles = makeStyles(() => ({
//   dialog: {
//     '& .MuiDialog-paper': {
//       backgroundColor: '#1a1a1a',
//       border: '1px solid rgba(255,255,255,0.12)',
//       borderRadius: 12,
//       width: '100%',
//       maxWidth: 900,
//       height: '80vh',
//       margin: 24,
//       '@media (max-width: 1200px)': {
//         maxWidth: 800,
//         height: '75vh',
//         margin: 20,
//         borderRadius: 10,
//       },
//       '@media (max-width: 960px)': {
//         maxWidth: 700,
//         height: '70vh',
//         margin: 16,
//         borderRadius: 8,
//       },
//       '@media (max-width: 600px)': {
//         maxWidth: '95vw',
//         height: '85vh',
//         margin: 8,
//         borderRadius: 6,
//       },
//       '@media (max-width: 480px)': {
//         maxWidth: '98vw',
//         height: '90vh',
//         margin: 4,
//         borderRadius: 4,
//       },
//       '@media (max-width: 375px)': {
//         maxWidth: '100vw',
//         height: '95vh',
//         margin: 2,
//         borderRadius: 2,
//       },
//     },
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: '16px 20px',
//     borderBottom: '1px solid rgba(255,255,255,0.12)',
//     '@media (max-width: 1200px)': {
//       padding: '14px 18px',
//     },
//     '@media (max-width: 960px)': {
//       padding: '12px 16px',
//     },
//     '@media (max-width: 600px)': {
//       padding: '10px 14px',
//     },
//     '@media (max-width: 480px)': {
//       padding: '8px 12px',
//     },
//     '@media (max-width: 375px)': {
//       padding: '6px 10px',
//     },
//   },
//   headerLeft: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: 12,
//     '@media (max-width: 1200px)': {
//       gap: 10,
//     },
//     '@media (max-width: 960px)': {
//       gap: 8,
//     },
//     '@media (max-width: 600px)': {
//       gap: 6,
//     },
//     '@media (max-width: 480px)': {
//       gap: 4,
//     },
//     '@media (max-width: 375px)': {
//       gap: 2,
//     },
//   },
//   headerRight: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: 8,
//     '@media (max-width: 1200px)': {
//       gap: 7,
//     },
//     '@media (max-width: 960px)': {
//       gap: 6,
//     },
//     '@media (max-width: 600px)': {
//       gap: 5,
//     },
//     '@media (max-width: 480px)': {
//       gap: 4,
//     },
//     '@media (max-width: 375px)': {
//       gap: 3,
//     },
//   },
//   avatarSize: {
//     width: 40,
//     height: 40,
//     borderRadius: 1,
//     '@media (max-width: 1200px)': {
//       width: 38,
//       height: 38,
//     },
//     '@media (max-width: 960px)': {
//       width: 36,
//       height: 36,
//     },
//     '@media (max-width: 600px)': {
//       width: 34,
//       height: 34,
//     },
//     '@media (max-width: 480px)': {
//       width: 32,
//       height: 32,
//     },
//     '@media (max-width: 375px)': {
//       width: 30,
//       height: 30,
//     },
//   },
//   characterName: {
//     '@media (max-width: 1200px)': {
//       fontSize: '1.2rem',
//     },
//     '@media (max-width: 960px)': {
//       fontSize: '1.1rem',
//     },
//     '@media (max-width: 600px)': {
//       fontSize: '1rem',
//     },
//     '@media (max-width: 480px)': {
//       fontSize: '0.9rem',
//     },
//     '@media (max-width: 375px)': {
//       fontSize: '0.8rem',
//     },
//   },
//   sessionChip: {
//     fontSize: '0.7rem',
//     height: 20,
//     '@media (max-width: 1200px)': {
//       fontSize: '0.65rem',
//       height: 18,
//     },
//     '@media (max-width: 960px)': {
//       fontSize: '0.6rem',
//       height: 16,
//     },
//     '@media (max-width: 600px)': {
//       fontSize: '0.55rem',
//       height: 14,
//     },
//     '@media (max-width: 480px)': {
//       fontSize: '0.5rem',
//       height: 12,
//     },
//     '@media (max-width: 375px)': {
//       fontSize: '0.45rem',
//       height: 10,
//     },
//   },
//   iconButton: {
//     color: 'text.secondary',
//     '@media (max-width: 600px)': {
//       padding: '6px',
//       '& .MuiSvgIcon-root': {
//         fontSize: '1.2rem',
//       },
//     },
//     '@media (max-width: 480px)': {
//       padding: '4px',
//       '& .MuiSvgIcon-root': {
//         fontSize: '1.1rem',
//       },
//     },
//     '@media (max-width: 375px)': {
//       padding: '2px',
//       '& .MuiSvgIcon-root': {
//         fontSize: '1rem',
//       },
//     },
//   },
//   errorAlert: {
//     '@media (max-width: 600px)': {
//       '& .MuiAlert-message': {
//         fontSize: '0.875rem',
//       },
//     },
//     '@media (max-width: 480px)': {
//       '& .MuiAlert-message': {
//         fontSize: '0.825rem',
//       },
//     },
//     '@media (max-width: 375px)': {
//       '& .MuiAlert-message': {
//         fontSize: '0.8rem',
//       },
//     },
//   },
//   alertContainer: {
//     padding: '16px',
//     '@media (max-width: 1200px)': {
//       padding: '14px',
//     },
//     '@media (max-width: 960px)': {
//       padding: '12px',
//     },
//     '@media (max-width: 600px)': {
//       padding: '10px',
//     },
//     '@media (max-width: 480px)': {
//       padding: '8px',
//     },
//     '@media (max-width: 375px)': {
//       padding: '6px',
//     },
//   },
// }));

// const ChatModal = ({ open, character, onClose }) => {
//   const classes = useStyles();
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [sessionId, setSessionId] = useState(null);
//   const [sessions, setSessions] = useState([]);
//   const [showSessions, setShowSessions] = useState(false);
  
//   // Creativity settings
//   const [settingsAnchor, setSettingsAnchor] = useState(null);
//   const [temperature, setTemperature] = useState(0.7);
//   const [topP, setTopP] = useState(0.95);
//   const [topK, setTopK] = useState(40);
  
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (open && character) {
//       initializeChat();
//       loadUserSessions();
//     }
//   }, [open, character]);

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
//       setShowSessions(false);
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
//     setShowSessions(false);
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
//       const creativitySettings = { temperature, top_p: topP, top_k: topK };
//       const response = await apiService.sendMessage(
//         character.name, 
//         userMessage, 
//         !sessionId,
//         creativitySettings
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

//   const handleClose = () => {
//     setMessages([]);
//     setSessionId(null);
//     setError(null);
//     onClose();
//   };

//   if (!character) return null;

//   return (
//     <>
//       <StarField />
//       <Dialog 
//         open={open} 
//         onClose={handleClose} 
//         maxWidth={false}
//         className={classes.dialog}
//       >
//         <Box className={classes.header}>
//           <Box className={classes.headerLeft}>
//             <Avatar
//               src={character.img}
//               alt={character.name}
//               className={classes.avatarSize}
//             />
//             <Box>
//               <Typography variant="h6" fontWeight="bold" className={classes.characterName}>
//                 {character.name}
//               </Typography>
//               {sessionId && (
//                 <Chip 
//                   label={`Session ${sessionId}`} 
//                   size="small" 
//                   className={classes.sessionChip}
//                 />
//               )}
//             </Box>
//           </Box>
          
//           <Box className={classes.headerRight}>
//             <IconButton 
//               onClick={() => setShowSessions(!showSessions)}
//               className={classes.iconButton}
//               title="Session History"
//             >
//               <HistoryIcon />
//             </IconButton>
            
//             <IconButton 
//               onClick={startNewSession}
//               className={classes.iconButton}
//               title="New Conversation"
//             >
//               <Refresh />
//             </IconButton>
            
//             <IconButton 
//               onClick={(e) => setSettingsAnchor(e.currentTarget)}
//               className={classes.iconButton}
//               title="Creativity Settings"
//             >
//               <Tune />
//             </IconButton>
            
//             <IconButton onClick={handleClose} className={classes.iconButton}>
//               <Close />
//             </IconButton>
//           </Box>
//         </Box>

//         <SessionHistory
//           showSessions={showSessions}
//           sessions={sessions}
//           sessionId={sessionId}
//           onNewSession={startNewSession}
//           onLoadSession={loadSession}
//         />

//         {error && (
//           <Box className={classes.alertContainer}>
//             <Alert severity="error" onClose={() => setError(null)} className={classes.errorAlert}>
//               {error}
//             </Alert>
//           </Box>
//         )}

//         <MessageList 
//           messages={messages} 
//           loading={loading} 
//           ref={messagesEndRef} 
//         />

//         <ChatInput
//           value={inputValue}
//           onChange={setInputValue}
//           onSend={handleSend}
//           loading={loading}
//         />

//         <CreativitySettingsMenu
//           anchorEl={settingsAnchor}
//           open={Boolean(settingsAnchor)}
//           onClose={() => setSettingsAnchor(null)}
//           temperature={temperature}
//           setTemperature={setTemperature}
//           topP={topP}
//           setTopP={setTopP}
//           topK={topK}
//           setTopK={setTopK}
//         />
//       </Dialog>
//     </>
//   );
// };

// export default ChatModal;
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Avatar,
  Alert,
  Chip,
  Slider,
  FormControlLabel,
  Checkbox,
  Button,
  Collapse,
  Divider,
} from '@mui/material';
import { 
  Close, 
  Refresh, 
  Tune,
  History as HistoryIcon,
  VolumeUp,
  VolumeOff,
  PlayArrow,
  Pause,
  Settings,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import apiService from '../../../services/api';
import MessageList from '../MessageList';
import ChatInput from './ChatInput';
import CreativitySettingsMenu from '../CreativitySettingsMenu';
import SessionHistory from '../sessions/SessionHistory';
import StarField from '../../common/StarField';

const useStyles = makeStyles(() => ({
  dialog: {
    '& .MuiDialog-paper': {
      backgroundColor: '#1a1a1a',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 12,
      width: '100%',
      maxWidth: 900,
      height: '80vh',
      margin: 24,
      '@media (max-width: 1200px)': {
        maxWidth: 800,
        height: '75vh',
        margin: 20,
        borderRadius: 10,
      },
      '@media (max-width: 960px)': {
        maxWidth: 700,
        height: '70vh',
        margin: 16,
        borderRadius: 8,
      },
      '@media (max-width: 600px)': {
        maxWidth: '95vw',
        height: '85vh',
        margin: 8,
        borderRadius: 6,
      },
      '@media (max-width: 480px)': {
        maxWidth: '98vw',
        height: '90vh',
        margin: 4,
        borderRadius: 4,
      },
      '@media (max-width: 375px)': {
        maxWidth: '100vw',
        height: '95vh',
        margin: 2,
        borderRadius: 2,
      },
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
    backdropFilter: 'blur(10px)',
    '@media (max-width: 1200px)': {
      padding: '14px 20px',
    },
    '@media (max-width: 960px)': {
      padding: '12px 16px',
    },
    '@media (max-width: 600px)': {
      padding: '10px 12px',
    },
    '@media (max-width: 480px)': {
      padding: '8px 10px',
    },
    '@media (max-width: 375px)': {
      padding: '6px 8px',
    },
  },
  characterInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    '@media (max-width: 600px)': {
      gap: 8,
    },
  },
  characterName: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '1.25rem',
    margin: 0,
    '@media (max-width: 1200px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.15rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.95rem',
    },
  },
  headerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    '@media (max-width: 600px)': {
      gap: 4,
    },
  },
  iconButton: {
    color: 'rgba(255,255,255,0.7)',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    '@media (max-width: 600px)': {
      padding: '6px',
    },
  },
  voiceStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    color: '#4fc3f7',
    fontSize: '0.75rem',
    '@media (max-width: 600px)': {
      fontSize: '0.7rem',
    },
  },
  voiceSettingsPanel: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    padding: '16px 24px',
    '@media (max-width: 1200px)': {
      padding: '14px 20px',
    },
    '@media (max-width: 960px)': {
      padding: '12px 16px',
    },
    '@media (max-width: 600px)': {
      padding: '10px 12px',
    },
  },
  voiceControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  settingRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#ffffff',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 8,
    },
  },
  sliderContainer: {
    minWidth: 200,
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  messageContainer: {
    position: 'relative',
  },
  playButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
    color: '#4fc3f7',
    '&:hover': {
      backgroundColor: 'rgba(79, 195, 247, 0.2)',
    },
    '&.playing': {
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
      color: '#f44336',
    },
  },
  voiceBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(79, 195, 247, 0.2)',
    color: '#4fc3f7',
    fontSize: '0.7rem',
    height: '20px',
    padding: '0 6px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 80px)',
    '@media (max-width: 1200px)': {
      height: 'calc(100% - 76px)',
    },
    '@media (max-width: 960px)': {
      height: 'calc(100% - 72px)',
    },
    '@media (max-width: 600px)': {
      height: 'calc(100% - 68px)',
    },
    '@media (max-width: 480px)': {
      height: 'calc(100% - 64px)',
    },
    '@media (max-width: 375px)': {
      height: 'calc(100% - 60px)',
    },
  },
  errorAlert: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    border: '1px solid rgba(244, 67, 54, 0.3)',
    color: '#ffcdd2',
    '& .MuiAlert-icon': {
      color: '#f44336',
    },
    '@media (max-width: 1200px)': {
      '& .MuiAlert-message': {
        fontSize: '0.9rem',
      },
    },
    '@media (max-width: 960px)': {
      '& .MuiAlert-message': {
        fontSize: '0.875rem',
      },
    },
    '@media (max-width: 600px)': {
      '& .MuiAlert-message': {
        fontSize: '0.85rem',
      },
    },
    '@media (max-width: 480px)': {
      '& .MuiAlert-message': {
        fontSize: '0.825rem',
      },
    },
    '@media (max-width: 375px)': {
      '& .MuiAlert-message': {
        fontSize: '0.8rem',
      },
    },
  },
  alertContainer: {
    padding: '16px',
    '@media (max-width: 1200px)': {
      padding: '14px',
    },
    '@media (max-width: 960px)': {
      padding: '12px',
    },
    '@media (max-width: 600px)': {
      padding: '10px',
    },
    '@media (max-width: 480px)': {
      padding: '8px',
    },
    '@media (max-width: 375px)': {
      padding: '6px',
    },
  },
  avatarSize: {
    width: 40,
    height: 40,
    borderRadius: 1,
    '@media (max-width: 1200px)': {
      width: 38,
      height: 38,
    },
    '@media (max-width: 960px)': {
      width: 36,
      height: 36,
    },
    '@media (max-width: 600px)': {
      width: 34,
      height: 34,
    },
    '@media (max-width: 480px)': {
      width: 32,
      height: 32,
    },
    '@media (max-width: 375px)': {
      width: 30,
      height: 30,
    },
  },
}));

const ChatModal = ({ open, character, onClose }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showSessions, setShowSessions] = useState(false);
  
  // Creativity settings
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.95);
  const [topK, setTopK] = useState(40);

  // Voice settings
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoPlayResponses, setAutoPlayResponses] = useState(false);
  const [voiceEmotion, setVoiceEmotion] = useState(0.5);
  const [maxVoiceLength, setMaxVoiceLength] = useState(2000);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingMessageIndex, setPlayingMessageIndex] = useState(null);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && character) {
      initializeChat();
      loadUserSessions();
    }
    return () => {
      stopCurrentAudio();
    };
  }, [open, character]);

  const initializeChat = () => {
    setMessages([
      {
        role: character.name,
        content: `Hello! I'm ${character.name}. What would you like to talk about?`,
        hasVoice: false
      },
    ]);
    setError(null);
    setSessionId(null);
  };

  const loadUserSessions = async () => {
    try {
      const userSessions = await apiService.getSessions();
      const characterSessions = userSessions.filter(s => s.character === character.name);
      setSessions(characterSessions);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  };

  const loadSession = async (sessionIdToLoad) => {
    try {
      setLoading(true);
      const sessionData = await apiService.getSessionMessages(sessionIdToLoad);
      
      const formattedMessages = sessionData.chat_history.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
        hasVoice: false
      }));
      
      setMessages(formattedMessages);
      setSessionId(sessionIdToLoad);
      setShowSessions(false);
      setError(null);
    } catch (error) {
      console.error('Failed to load session:', error);
      setError('Failed to load conversation history');
    } finally {
      setLoading(false);
    }
  };

  const startNewSession = () => {
    initializeChat();
    setShowSessions(false);
  };

  const stopCurrentAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setIsPlayingVoice(false);
    setPlayingMessageIndex(null);
  };

  const playVoiceResponse = async (audioBase64, messageIndex) => {
    try {
      stopCurrentAudio();
      
      if (!audioBase64) {
        console.error('No audio data provided');
        return;
      }

      // Create audio blob from base64
      const audioBlob = new Blob(
        [Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0))],
        { type: 'audio/wav' }
      );
      
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      setCurrentAudio(audio);
      setIsPlayingVoice(true);
      setPlayingMessageIndex(messageIndex);

      audio.onended = () => {
        setIsPlayingVoice(false);
        setPlayingMessageIndex(null);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = (e) => {
        console.error('Audio playback error:', e);
        setIsPlayingVoice(false);
        setPlayingMessageIndex(null);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {
      console.error('Voice playback failed:', error);
      setIsPlayingVoice(false);
      setPlayingMessageIndex(null);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || loading || !character) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setLoading(true);
    setError(null);

    const newUserMessage = { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date().toISOString(),
      hasVoice: false
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const creativitySettings = { 
        temperature, 
        top_p: topP, 
        top_k: topK 
      };

      const voiceOptions = {
        voiceEnabled,
        voiceEmotion,
        maxVoiceLength,
        language: 'english'
      };

      const response = await apiService.sendMessage(
        character.name, 
        userMessage, 
        !sessionId,
        creativitySettings,
        voiceOptions
      );
      
      const assistantMessage = {
        role: character.name,
        content: response.reply,
        timestamp: new Date().toISOString(),
        hasVoice: response.has_voice,
        audioBase64: response.audio_base64
      };

      if (response.chat_history) {
        const formattedMessages = response.chat_history.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp || new Date().toISOString(),
          hasVoice: msg.role === character.name ? response.has_voice : false,
          audioBase64: msg.role === character.name ? response.audio_base64 : null
        }));
        setMessages(formattedMessages);
      } else {
        setMessages(prev => [...prev, assistantMessage]);
      }
      
      if (response.session_id) {
        setSessionId(response.session_id);
      }

      // Auto-play voice if enabled
      if (voiceEnabled && autoPlayResponses && response.audio_base64) {
        setTimeout(() => {
          playVoiceResponse(response.audio_base64, messages.length);
        }, 500);
      }

      await loadUserSessions();
      
    } catch (error) {
      console.error('Chat error:', error);
      setError(error.response?.data?.error || 'Failed to send message. Please try again.');
      
      // Remove the user message if there was an error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const VoiceSettings = () => (
    <Collapse in={showVoiceSettings}>
      <Box className={classes.voiceSettingsPanel}>
        <Box className={classes.voiceControls}>
          <Box className={classes.settingRow}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={voiceEnabled}
                  onChange={(e) => setVoiceEnabled(e.target.checked)}
                  sx={{ color: '#4fc3f7' }}
                />
              }
              label="Enable Voice Responses"
              sx={{ color: '#ffffff' }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={autoPlayResponses}
                  onChange={(e) => setAutoPlayResponses(e.target.checked)}
                  disabled={!voiceEnabled}
                  sx={{ color: '#4fc3f7' }}
                />
              }
              label="Auto-play Responses"
              sx={{ color: '#ffffff' }}
            />
          </Box>
          
          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
          
          <Box className={classes.settingRow}>
            <Typography color="#ffffff">
              Voice Emotion: {voiceEmotion.toFixed(1)}
            </Typography>
            <Box className={classes.sliderContainer}>
              <Slider
                value={voiceEmotion}
                onChange={(_, value) => setVoiceEmotion(value)}
                min={0}
                max={1}
                step={0.1}
                disabled={!voiceEnabled}
                sx={{
                  color: '#4fc3f7',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#4fc3f7',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#4fc3f7',
                  },
                }}
              />
            </Box>
          </Box>
          
          <Box className={classes.settingRow}>
            <Typography color="#ffffff">
              Max Voice Length: {maxVoiceLength} chars
            </Typography>
            <Box className={classes.sliderContainer}>
              <Slider
                value={maxVoiceLength}
                onChange={(_, value) => setMaxVoiceLength(value)}
                min={500}
                max={5000}
                step={250}
                disabled={!voiceEnabled}
                sx={{
                  color: '#4fc3f7',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#4fc3f7',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#4fc3f7',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Collapse>
  );

  const EnhancedMessageList = React.forwardRef((props, ref) => {
    const { messages, loading } = props;

    return (
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            className={classes.messageContainer}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: '70%',
                p: 2,
                borderRadius: 2,
                backgroundColor: message.role === 'user' 
                  ? 'rgba(79, 195, 247, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                position: 'relative',
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {message.content}
              </Typography>
              
              {message.hasVoice && message.audioBase64 && (
                <>
                  <IconButton
                    className={`${classes.playButton} ${playingMessageIndex === index ? 'playing' : ''}`}
                    onClick={() => playVoiceResponse(message.audioBase64, index)}
                    disabled={isPlayingVoice && playingMessageIndex !== index}
                    size="small"
                  >
                    {playingMessageIndex === index && isPlayingVoice ? <Pause /> : <PlayArrow />}
                  </IconButton>
                  <Chip 
                    label="🔊 Voice" 
                    className={classes.voiceBadge}
                    size="small"
                  />
                </>
              )}
              
              {message.timestamp && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block', 
                    mt: 1, 
                    opacity: 0.7,
                    fontSize: '0.7rem'
                  }}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
        
        {loading && (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography color="rgba(255,255,255,0.7)">
              Generating response...
            </Typography>
          </Box>
        )}
        
        <div ref={ref} />
      </Box>
    );
  });

  return (
    <>
      <StarField />
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth={false}
        className={classes.dialog}
        PaperProps={{
          style: {
            background: 'linear-gradient(145deg, rgba(26,26,26,0.95) 0%, rgba(30,30,30,0.95) 100%)',
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        {/* Header */}
        <Box className={classes.header}>
          <Box className={classes.characterInfo}>
            <Avatar
              src={character?.img}
              alt={character?.name}
              className={classes.avatarSize}
            />
            <Box>
              <Typography className={classes.characterName}>
                {character?.name}
              </Typography>
              {voiceEnabled && (
                <Box className={classes.voiceStatus}>
                  <VolumeUp sx={{ fontSize: '1rem' }} />
                  <Typography variant="caption">Voice enabled</Typography>
                </Box>
              )}
            </Box>
          </Box>
          
          <Box className={classes.headerControls}>
            <IconButton
              className={classes.iconButton}
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
            >
              {voiceEnabled ? <VolumeUp /> : <VolumeOff />}
            </IconButton>
            
            <IconButton
              className={classes.iconButton}
              onClick={() => setShowVoiceSettings(!showVoiceSettings)}
              title="Voice settings"
            >
              {showVoiceSettings ? <ExpandLess /> : <Settings />}
            </IconButton>
            
            <IconButton
              className={classes.iconButton}
              onClick={() => setShowSessions(!showSessions)}
              title="Session history"
            >
              <HistoryIcon />
            </IconButton>
            
            <IconButton
              className={classes.iconButton}
              onClick={(e) => setSettingsAnchor(e.currentTarget)}
              title="Creativity settings"
            >
              <Tune />
            </IconButton>
            
            <IconButton
              className={classes.iconButton}
              onClick={initializeChat}
              title="New conversation"
            >
              <Refresh />
            </IconButton>
            
            <IconButton
              className={classes.iconButton}
              onClick={onClose}
              title="Close chat"
            >
              <Close />
            </IconButton>
          </Box>
        </Box>

        {/* Voice Settings Panel */}
        <VoiceSettings />

        {/* Content */}
        <Box className={classes.content}>
          <SessionHistory
            open={showSessions}
            sessions={sessions}
            sessionId={sessionId}
            onNewSession={startNewSession}
            onLoadSession={loadSession}
          />

          {error && (
            <Box className={classes.alertContainer}>
              <Alert severity="error" onClose={() => setError(null)} className={classes.errorAlert}>
                {error}
              </Alert>
            </Box>
          )}

          <EnhancedMessageList 
            messages={messages} 
            loading={loading} 
            ref={messagesEndRef} 
          />

          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            loading={loading}
          />
        </Box>

        <CreativitySettingsMenu
          anchorEl={settingsAnchor}
          open={Boolean(settingsAnchor)}
          onClose={() => setSettingsAnchor(null)}
          temperature={temperature}
          setTemperature={setTemperature}
          topP={topP}
          setTopP={setTopP}
          topK={topK}
          setTopK={setTopK}
        />
      </Dialog>
    </>
  );
};

export default ChatModal;