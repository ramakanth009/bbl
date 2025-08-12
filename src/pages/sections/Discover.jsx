// import React, { useState, useEffect, useRef } from 'react';
// import { Box, useTheme, useMediaQuery } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import Header from '../../components/dashboard/main/Header';
// import CharacterGrid from '../../components/dashboard/character/CharacterGrid';
// import ChatPanel from '../../components/dashboard/chat/ChatPanel';
// import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
// import apiService from '../../services/api';

// const useStyles = makeStyles({
//   discoverContainer: {
//     display: 'flex',
//     flex: 1,
//   },
//   contentArea: {
//     flex: 1,
//     padding: '14px',
//     overflow: 'auto',
//     transition: 'all 0.3s ease',
//     display: 'block',
//     '@media (max-width: 1200px)': {
//       padding: '12px',
//     },
//     '@media (max-width: 960px)': {
//       padding: '10px',
//     },
//     '@media (max-width: 900px)': {
//       padding: '16px',
//     },
//     '@media (max-width: 600px)': {
//       padding: '8px',
//     },
//     '@media (max-width: 480px)': {
//       padding: '6px',
//     },
//     '@media (max-width: 375px)': {
//       padding: '4px',
//     },
//   },
//   contentAreaHidden: {
//     display: 'none',
//   },
//   desktopHeader: {
//     display: 'block',
//     '@media (max-width: 900px)': {
//       display: 'none !important',
//     },
//   },
// });

// const Discover = () => {
//   const classes = useStyles();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const [selectedCharacter, setSelectedCharacter] = useState(null);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [characters, setCharacters] = useState([]);
//   const navigate = useNavigate();
//   const { characterId: chatCharacterId } = useParams();
//   const refreshIntervalRef = useRef(null);
  
//   // Get sidebar state from Dashboard context
//   const context = useOutletContext();
//   const sidebarState = context?.sidebarState || { 
//     isOpen: true, 
//     isMobile: false, 
//     sidebarWidth: 280, 
//     isCollapsed: false 
//   };

//   // Load all characters once for lookup
//   useEffect(() => {
//     let isMounted = true;

//     const fetchCharacters = async () => {
//       try {
//         const chars = await apiService.getCharacters();
//         const charArray = Array.isArray(chars)
//           ? chars
//           : Array.isArray(chars.characters)
//             ? chars.characters
//             : [];
        
//         if (isMounted && JSON.stringify(charArray) !== JSON.stringify(characters)) {
//           setCharacters(charArray);
//         }
//       } catch (e) {
//         console.error('Failed to fetch characters:', e);
//       }
//     };

//     fetchCharacters();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // Open chat panel if chatCharacterId is present in the route
//   useEffect(() => {
//     if (characters.length === 0) return;

//     if (chatCharacterId) {
//       const found = characters.find(c => String(c.id) === String(chatCharacterId));
//       if (found) {
//         setSelectedCharacter(found);
//         setIsChatOpen(true);
//       } else {
//         setSelectedCharacter(null);
//         setIsChatOpen(false);
//       }
//     } else {
//       setIsChatOpen(false);
//     }
//   }, [chatCharacterId, characters]);

//   // When chat is started, update the route
//   const handleCharacterClick = (character) => {
//     setSelectedCharacter(character);
//     setIsChatOpen(true);
//     navigate(`/dashboard/discover/chat/${character.id}`);
//   };

//   // When chat is closed, return to /dashboard/discover
//   const handleChatClose = () => {
//     setIsChatOpen(false);
//     setTimeout(() => setSelectedCharacter(null), 300);
//     navigate('/dashboard/discover');
//   };

//   return (
//     <Box className={classes.discoverContainer}>
//       <Box
//         className={
//           isChatOpen
//             ? `${classes.contentArea} ${classes.contentAreaHidden}`
//             : classes.contentArea
//         }
//       >
//         {/* Desktop Header - Hidden on mobile */}
//         <Box className={classes.desktopHeader}>
//           <Header />
//         </Box>
        
//         <CharacterGrid 
//           onCharacterClick={handleCharacterClick}
//           activeSection="Discover"
//           characters={characters}
//         />
//       </Box>
      
//       <ChatPanel
//         open={isChatOpen}
//         character={selectedCharacter}
//         onClose={handleChatClose}
//         onBack={handleChatClose}
//         sidebarState={sidebarState}
//       />
//     </Box>
//   );
// };

// export default Discover;
import React, { useState, useEffect, useRef } from 'react';
import { Box, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header from '../../components/dashboard/main/Header';
import CharacterGrid from '../../components/dashboard/character/CharacterGrid';
import ChatPanel from '../../components/dashboard/chat/ChatPanel';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import apiService from '../../services/api';

const useStyles = makeStyles({
  discoverContainer: {
    display: 'flex',
    flex: 1,
  },
  contentArea: {
    flex: 1,
    padding: '14px',
    overflow: 'auto',
    transition: 'all 0.3s ease',
    display: 'block',
    '@media (max-width: 1200px)': {
      padding: '12px',
    },
    '@media (max-width: 960px)': {
      padding: '10px',
    },
    '@media (max-width: 900px)': {
      padding: '16px',
    },
    '@media (max-width: 600px)': {
      padding: '8px',
    },
    '@media (max-width: 480px)': {
      padding: '6px',
    },
    '@media (max-width: 375px)': {
      padding: '4px',
    },
  },
  contentAreaHidden: {
    display: 'none',
  },
  desktopHeader: {
    display: 'block',
    '@media (max-width: 900px)': {
      display: 'none !important',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    width: '100%',
  },
});

const Discover = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { characterId: chatCharacterId } = useParams();
  const refreshIntervalRef = useRef(null);
  
  // Get sidebar state from Dashboard context
  const context = useOutletContext();
  const sidebarState = context?.sidebarState || { 
    isOpen: true, 
    isMobile: false, 
    sidebarWidth: 280, 
    isCollapsed: false 
  };

  // Load all characters once for lookup
  useEffect(() => {
    let isMounted = true;

    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const chars = await apiService.getCharacters();
        const charArray = Array.isArray(chars)
          ? chars
          : Array.isArray(chars.characters)
            ? chars.characters
            : [];
        
        if (isMounted) {
          setCharacters(charArray);
          setLoading(false);
        }
      } catch (e) {
        console.error('Failed to fetch characters:', e);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCharacters();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle chat opening logic after characters are loaded
  useEffect(() => {
    // Don't process chat logic until characters are loaded
    if (loading) return;

    if (chatCharacterId) {
      const found = characters.find(c => String(c.id) === String(chatCharacterId));
      if (found) {
        setSelectedCharacter(found);
        setIsChatOpen(true);
      } else {
        // Character not found after loading is complete
        console.warn(`Character ${chatCharacterId} not found, redirecting to discover`);
        setSelectedCharacter(null);
        setIsChatOpen(false);
        navigate('/dashboard/discover', { replace: true });
      }
    } else {
      setIsChatOpen(false);
      setSelectedCharacter(null);
    }
  }, [chatCharacterId, characters, loading, navigate]);

  // When chat is started, update the route
  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsChatOpen(true);
    navigate(`/dashboard/discover/chat/${character.id}`);
  };

  // When chat is closed, return to /dashboard/discover
  const handleChatClose = () => {
    setIsChatOpen(false);
    setTimeout(() => setSelectedCharacter(null), 300);
    navigate('/dashboard/discover');
  };

  // Show loading spinner while characters are being fetched
  if (loading) {
    return (
      <Box className={classes.discoverContainer}>
        <Box className={classes.contentArea}>
          <Box className={classes.desktopHeader}>
            <Header />
          </Box>
          <Box className={classes.loadingContainer}>
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.discoverContainer}>
      <Box
        className={
          isChatOpen
            ? `${classes.contentArea} ${classes.contentAreaHidden}`
            : classes.contentArea
        }
      >
        {/* Desktop Header - Hidden on mobile */}
        <Box className={classes.desktopHeader}>
          <Header />
        </Box>
        
        <CharacterGrid 
          onCharacterClick={handleCharacterClick}
          activeSection="Discover"
          characters={characters}
        />
      </Box>
      
      <ChatPanel
        open={isChatOpen}
        character={selectedCharacter}
        onClose={handleChatClose}
        onBack={handleChatClose}
        sidebarState={sidebarState}
      />
    </Box>
  );
};

export default Discover;