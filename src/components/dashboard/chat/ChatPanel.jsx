import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Alert,
  Chip,
} from "@mui/material";
import {
  ArrowBack,
  MoreVert,
  History as HistoryIcon,
  Add,
  Close,
  Language,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import apiService from "../../../services/api";
import MessageList from "../message/MessageList";
import ChatInput from "./ChatInput";
import LanguageSelector from "../../common/LanguageSelector";
import ChatHistoryPanel from "./history/ChatHistoryPanel";
import { isMobileViewport, getContentWidth, BREAKPOINTS } from "../../../utils/sidebarUtils";

const useStyles = makeStyles(() => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
    overflow: "hidden",
    position: "absolute",
    right: 0,
    top: 0,
    height: "100vh",
    zIndex: 2,
  },
  chatContainerOpen: {
    width: "calc(100vw - 280px)",
    // FIXED: Unified tablet range (901-1200px)
    [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
      width: "calc(100vw - 260px)",
    },
    [`@media (max-width: ${BREAKPOINTS.MOBILE}px)`]: {
      width: "100vw",
      left: 0,
    },
  },
  chatContainerClosed: {
    width: "0",
  },
  chatHeader: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    gap: "12px",
    borderBottom: "1px solid rgba(99, 102, 241, 0.15)",
    background:
      "linear-gradient(to bottom, rgba(26, 26, 26, 0.7), rgba(18, 18, 18, 0.6))",
    backdropFilter: "blur(8px)",
    position: "relative",
    minHeight: "auto",
    maxHeight: "none",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background:
        "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "2px",
      background:
        "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.15), transparent)",
    },
    // WhatsApp-style mobile header
    "@media (max-width: 600px)": {
      padding: "16px",
      gap: "8px",
      minHeight: "64px",
      background: "rgba(26, 26, 26, 0.95)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      "&::before": {
        display: "none",
      },
      "&::after": {
        display: "none",
      },
    },
    "@media (max-width: 480px)": {
      padding: "12px 16px",
      minHeight: "60px",
    },
    "@media (max-width: 375px)": {
      padding: "10px 16px",
      minHeight: "56px",
    },
  },
  chatHeaderTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "56px",
    // WhatsApp-style mobile layout
    "@media (max-width: 600px)": {
      minHeight: "48px",
      gap: "12px",
    },
    "@media (max-width: 480px)": {
      minHeight: "44px",
      gap: "8px",
    },
    "@media (max-width: 375px)": {
      minHeight: "40px",
      gap: "6px",
    },
  },
  chatHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
    minWidth: 0,
    // WhatsApp-style mobile spacing
    "@media (max-width: 600px)": {
      gap: "12px",
    },
    "@media (max-width: 480px)": {
      gap: "10px",
    },
    "@media (max-width: 375px)": {
      gap: "8px",
    },
  },
  characterInfo: {
    flex: 1,
    minWidth: 0,
    "& .MuiTypography-h6": {
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "#ffffff",
      backgroundClip: "text",
      fontSize: "1.25rem",
      marginBottom: "4px",
      // WhatsApp-style mobile typography
      "@media (max-width: 600px)": {
        fontSize: "1.125rem",
        fontWeight: "600",
        marginBottom: "2px",
        background: "transparent",
        WebkitBackgroundClip: "unset",
        WebkitTextFillColor: "unset",
        backgroundClip: "unset",
        color: "#ffffff",
      },
      "@media (max-width: 480px)": {
        fontSize: "1.075rem",
      },
      "@media (max-width: 375px)": {
        fontSize: "1rem",
      },
    },
  },
  characterDescription: {
    fontSize: "0.875rem",
    lineHeight: 1.6,
    color: "#d1d5db",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    width: "100%",
    maxWidth: "100%",
    overflow: "visible",
    display: "block",
    marginTop: "8px",
    padding: "8px 0",
    // Hide description on mobile for cleaner WhatsApp look
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  chatHeaderRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
    "& .MuiIconButton-root": {
      width: "40px",
      height: "40px",
      borderRadius: "12px",
      background:
        "linear-gradient(145deg, rgba(26, 26, 26, 0.95), rgba(42, 42, 42, 0.8))",
      border: "1px solid rgba(99, 102, 241, 0.2)",
      transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      "&:hover": {
        background:
          "linear-gradient(145deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1))",
        borderColor: "rgba(99, 102, 241, 0.6)",
        transform: "translateY(-2px)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
      },
      "&:active": {
        transform: "translateY(0)",
      },
    },
    // WhatsApp-style mobile icons
    "@media (max-width: 600px)": {
      gap: "4px",
      "& .MuiIconButton-root": {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "transparent",
        border: "none",
        color: "#ffffff",
        "&:hover": {
          background: "rgba(255, 255, 255, 0.1)",
          transform: "none",
          borderColor: "transparent",
          boxShadow: "none",
        },
        "& .MuiSvgIcon-root": {
          fontSize: "22px",
        },
      },
    },
    "@media (max-width: 480px)": {
      gap: "2px",
      "& .MuiIconButton-root": {
        width: "36px",
        height: "36px",
        "& .MuiSvgIcon-root": {
          fontSize: "20px",
        },
      },
    },
    "@media (max-width: 375px)": {
      "& .MuiIconButton-root": {
        width: "32px",
        height: "32px",
        "& .MuiSvgIcon-root": {
          fontSize: "18px",
        },
      },
    },
  },
  backButton: {
    width: "40px !important",
    height: "40px !important",
    borderRadius: "12px !important",
    background:
      "linear-gradient(145deg, rgba(26, 26, 26, 0.95), rgba(42, 42, 42, 0.8)) !important",
    border: "1px solid rgba(99, 102, 241, 0.2) !important",
    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important",
    "&:hover": {
      background:
        "linear-gradient(145deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1)) !important",
      borderColor: "rgba(99, 102, 241, 0.6)",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
    // WhatsApp-style back button
    "@media (max-width: 600px)": {
      width: "40px !important",
      height: "40px !important",
      borderRadius: "50% !important",
      background: "transparent !important",
      border: "none !important",
      color: "#ffffff !important",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.1) !important",
        transform: "none !important",
        borderColor: "transparent !important",
        boxShadow: "none !important",
      },
    },
    "@media (max-width: 480px)": {
      width: "36px !important",
      height: "36px !important",
    },
    "@media (max-width: 375px)": {
      width: "32px !important",
      height: "32px !important",
    },
  },
  messagesWrapper: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    padding: "0 12px",
    "@media (max-width: 600px)": {
      padding: "0 8px",
    },
    "@media (max-width: 480px)": {
      padding: "0 6px",
    },
    "@media (max-width: 375px)": {
      padding: "0 4px",
    },
  },
  messagesContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  messagesEnd: {
    height: "1px",
    width: "100%",
  },
  enhancedChip: {
    fontSize: "0.7rem",
    height: 20,
    background:
      "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "rgba(99, 102, 241, 0.6)",
      transform: "translateY(-1px)",
    },
    // Hide chips on mobile for cleaner look
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  nativeChip: {
    fontSize: "0.7rem",
    height: 20,
    backgroundColor: "rgba(76,175,80,0.15)",
    border: "1px solid rgba(76,175,80,0.3)",
    "& .MuiChip-label": {
      color: "#81c784",
    },
    // Hide chips on mobile for cleaner look
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  languageStatus: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
    flexWrap: "wrap",
    "& .MuiChip-root": {
      transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      "&:hover": {
        transform: "translateY(-1px)",
      },
    },
    // Hide language status on mobile
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  errorAlert: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    borderRadius: "12px",
    marginBottom: "16px",
    "& .MuiAlert-message": {
      color: "#fecaca",
    },
    "& .MuiAlert-icon": {
      color: "#ef4444",
    },
    "@media (max-width: 600px)": {
      borderRadius: "8px",
      marginBottom: "12px",
      "& .MuiAlert-message": {
        fontSize: "0.875rem",
      },
    },
    "@media (max-width: 480px)": {
      borderRadius: "6px",
      marginBottom: "10px",
      "& .MuiAlert-message": {
        fontSize: "0.825rem",
      },
    },
    "@media (max-width: 375px)": {
      borderRadius: "4px",
      marginBottom: "8px",
      "& .MuiAlert-message": {
        fontSize: "0.8rem",
      },
    },
  },
  avatarSize: {
    width: 40,
    height: 40,
    borderRadius: 1,
    // WhatsApp-style avatar
    "@media (max-width: 600px)": {
      width: 40,
      height: 40,
      borderRadius: "50%",
    },
    "@media (max-width: 480px)": {
      width: 36,
      height: 36,
    },
    "@media (max-width: 375px)": {
      width: 32,
      height: 32,
    },
  },
  // Mobile status indicator (online/offline style)
  mobileStatusIndicator: {
    "@media (max-width: 600px)": {
      display: "block",
      fontSize: "0.75rem",
      color: "rgba(255, 255, 255, 0.7)",
      marginTop: "1px",
    },
    "@media (min-width: 601px)": {
      display: "none",
    },
  },
  // Mobile menu button (three dots)
  mobileMenuButton: {
    "@media (max-width: 600px)": {
      display: "flex !important",
    },
    "@media (min-width: 601px)": {
      display: "none !important",
    },
  },
  // Desktop-only buttons
  desktopOnlyButton: {
    "@media (max-width: 600px)": {
      display: "none !important",
    },
  },
}));

// Chat continuity system utilities
const generateTemporarySessionId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const LOCAL_STORAGE_KEY = 'chat_session_state';

const ChatPanel = ({
  open,
  character,
  onClose,
  onBack,
  initialMessages = null,
  initialSessionId = null,
  sidebarState,
}) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [temporarySessionId, setTemporarySessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [language, setLanguage] = useState("english");
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesWrapperRef = useRef(null);

  // Initialize new temporary session
  const initializeNewTemporarySession = () => {
    const newTempId = generateTemporarySessionId();
    setTemporarySessionId(newTempId);
    setMessages([]);
    setError(null);
    setSessionId(null);
    updateUrlWithSessionId(newTempId, true);
  };

  // Update URL with session ID
  const updateUrlWithSessionId = (id, isTemporary = false) => {
    const url = new URL(window.location.href);
    url.searchParams.set('session', id);
    if (isTemporary) {
      url.searchParams.set('ssn', '1');
    } else {
      url.searchParams.delete('ssn');
    }
    window.history.replaceState({}, '', url.toString());
  };

  // Enhanced mobile detection using centralized utility
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = isMobileViewport(window.innerWidth);
      setIsMobile(mobile);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // FIXED: Calculate dynamic width using centralized utility
  const calculateWidth = () => {
    // Use centralized width calculation from sidebarUtils
    if (sidebarState?.getCalculatedChatWidth) {
      return sidebarState.getCalculatedChatWidth();
    }
    
    // Fallback to centralized utility if sidebarState helper not available
    const viewportWidth = sidebarState?.viewportWidth || window.innerWidth;
    const isMobileView = sidebarState?.isMobile || isMobile;
    const isOpen = sidebarState?.isOpen || false;
    
    return getContentWidth(viewportWidth, isOpen, isMobileView);
  };

  // Enhanced container style calculation
  const getContainerStyle = () => {
    const baseStyle = {
      transform: open ? 'translateX(0)' : 'translateX(100%)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100%',
      zIndex: 1300,
    };

    if (!open) {
      return {
        ...baseStyle,
        width: "0",
      };
    }

    return {
      ...baseStyle,
      width: calculateWidth(),
    };
  };

  // Debug helper - remove in production
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[ChatPanel] Sidebar State Debug:', {
        isMobile: sidebarState?.isMobile,
        isOpen: sidebarState?.isOpen,
        isCollapsed: sidebarState?.isCollapsed,
        viewportWidth: sidebarState?.viewportWidth,
        sidebarWidth: sidebarState?.sidebarWidth,
        actualWidth: sidebarState?.actualWidth,
        calculatedWidth: calculateWidth()
      });
    }
  }, [sidebarState]);

  // Chat initialization and continuity effect
  useEffect(() => {
    if (open && character) {
      if (initialMessages && initialSessionId) {
        setMessages(initialMessages);
        setSessionId(initialSessionId);
        setError(null);
        setShowHistory(false);
      } else {
        const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          if (parsedState.character === character.name) {
            setMessages(parsedState.messages || []);
            setTemporarySessionId(parsedState.temporarySessionId);
            updateUrlWithSessionId(parsedState.temporarySessionId, true);
          } else {
            initializeNewTemporarySession();
          }
        } else {
          initializeNewTemporarySession();
        }
      }
      
      const loadCharacter = async () => {
        try {
          const response = await apiService.getCharacterById(character.id);
          if (response && response.native_language) {
            setLanguage(response.native_language);
          }
        } catch (error) {
          console.error('Failed to load character:', error);
          setError('Failed to load character details');
        }
      };
      
      loadCharacter();
      loadUserSessions();
      loadLanguagePreferences();

      if (character.native_language) {
        setLanguage(character.native_language);
      }
    }
  }, [open, character, initialMessages, initialSessionId]);

  // Save state to localStorage whenever messages change
  useEffect(() => {
    if (character && (temporarySessionId || sessionId)) {
      const stateToStore = {
        character: character.name,
        messages,
        temporarySessionId: temporarySessionId || sessionId,
        timestamp: Date.now()
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToStore));
    }
  }, [messages, character, temporarySessionId, sessionId]);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else if (messagesWrapperRef.current) {
        messagesWrapperRef.current.scrollTop =
          messagesWrapperRef.current.scrollHeight;
      }
    });
  };

  const loadLanguagePreferences = async () => {
    try {
      const preferences = await apiService.getUserLanguagePreferences();
      if (preferences.language && !character.native_language) {
        setLanguage(preferences.language);
      }
      console.log("Loaded language preferences:", preferences);
    } catch (error) {
      console.warn("Could not load language preferences:", error.message);
    }
  };

  const saveLanguagePreferences = async (newLanguage) => {
    try {
      await apiService.setUserLanguagePreferences({
        language: newLanguage,
        autoDetect: false,
      });
      console.log("Language preferences saved");
    } catch (error) {
      console.warn("Could not save language preferences:", error.message);
    }
  };

  const initializeChat = () => {
    initializeNewTemporarySession();
  };

  const loadUserSessions = async () => {
    try {
      const userSessions = await apiService.getSessions();
      const characterSessions = userSessions.filter(
        (s) => s.character === character.name
      );
      setSessions(characterSessions);
    } catch (error) {
      console.error("Failed to load sessions:", error);
    }
  };

  const loadSession = async (sessionIdToLoad) => {
    try {
      setLoading(true);
      const sessionData = await apiService.getSessionMessages(sessionIdToLoad);

      const formattedMessages = sessionData.chat_history.map((msg) => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
        language: msg.language,
      }));

      setMessages(formattedMessages);
      setSessionId(sessionIdToLoad);
      setTemporarySessionId(null);
      setShowHistory(false);
      setError(null);
      
      updateUrlWithSessionId(sessionIdToLoad, false);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to load session:", error);
      setError("Failed to load conversation history");
    } finally {
      setLoading(false);
    }
  };

  const startNewSession = () => {
    initializeChat();
    setShowHistory(false);
  };

  const handleLanguageChange = async (languageCode) => {
    console.log("Language change requested:", languageCode);
    setLanguage(languageCode);
    await saveLanguagePreferences(languageCode);
    console.log("Language updated:", languageCode);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || loading || !character) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setLoading(true);
    setError(null);

    const newUserMessage = {
      role: "user",
      content: userMessage,
      language: language,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await apiService.sendMessage(
        character.name,
        userMessage,
        !sessionId,
        { language }
      );

      if (response.session_id) {
        setSessionId(response.session_id);
        setTemporarySessionId(null);
        updateUrlWithSessionId(response.session_id, false);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }

      console.log("Message sent successfully:", {
        sessionId: response.session_id,
        responseLanguage: response.response_language,
        inputLanguage: response.input_language,
        hasVoice: response.has_voice,
        audioDataLength: response.audio_base64
          ? response.audio_base64.length
          : 0,
      });

      if (response.chat_history && response.chat_history.length > 0) {
        const formattedMessages = response.chat_history.map((msg, index) => {
          const isLastMessage = index === response.chat_history.length - 1;
          const isAssistantMessage = msg.role !== "user";

          return {
            role: msg.role,
            content: msg.content,
            language:
              msg.language || (msg.role === "user" ? language : language),
            timestamp: msg.timestamp,
            ...(isLastMessage &&
            isAssistantMessage &&
            response.has_voice &&
            response.audio_base64
              ? {
                  audio_base64: response.audio_base64,
                  has_voice: true,
                }
              : {}),
            ...(isLastMessage &&
            isAssistantMessage &&
            response.grounding_info
              ? {
                  grounding_info: response.grounding_info,
                }
              : {}),
          };
        });
        setMessages(formattedMessages);
      } else {
        const assistantMessage = {
          role: character.name,
          content: response.reply,
          language: response.response_language || language,
          ...(response.has_voice && response.audio_base64
            ? {
                audio_base64: response.audio_base64,
                has_voice: true,
              }
            : {}),
          ...(response.grounding_info
            ? {
                grounding_info: response.grounding_info,
              }
            : {}),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }

      await loadUserSessions();
    } catch (error) {
      console.error("Chat error:", error);

      let errorMessage = "Failed to send message. Please try again.";
      if (error.message.includes("language")) {
        errorMessage = `Language error: ${error.message}. Try changing the language settings.`;
      } else if (error.message.includes("Character not found")) {
        errorMessage =
          "Character not found. Please select a different character.";
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      setError(errorMessage);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    onClose();
  };

  const handleHistoryToggle = () => {
    console.log("History toggle triggered by user action");
    setShowHistory(prev => !prev);
    setShowMobileMenu(false);
  };

  const handleHistoryClose = () => {
    console.log("History panel closed");
    setShowHistory(false);
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(prev => !prev);
  };

  if (!open) {
    return (
      <Box
        className={`${classes.chatContainer} ${classes.chatContainerClosed}`}
      />
    );
  }

  if (open && !character) {
    return (
      <Box
        className={`${classes.chatContainer} ${classes.chatContainerOpen}`}
        sx={{ alignItems: "center", justifyContent: "center", display: "flex" }}
        style={getContainerStyle()}
      >
        <Typography variant="h6" color="textSecondary">
          No character selected. Please choose a character to start chatting.
        </Typography>
        <IconButton onClick={onClose} sx={{ ml: 2 }}>
          <Close />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      className={`${classes.chatContainer} ${classes.chatContainerOpen}`}
      style={getContainerStyle()}
      sx={{
        borderLeft: "1px solid rgba(255,255,255,0.12)",
        [`@media (max-width: ${BREAKPOINTS.TABLET}px)`]: {
          borderLeft: "none",
        },
      }}
    >
      <Box className={classes.chatHeader}>
        <Box className={classes.chatHeaderTop}>
          <Box className={classes.chatHeaderLeft}>
            <IconButton
              className={classes.backButton}
              onClick={handleBackClick}
              title="Back to Characters"
              sx={{ 
                color: "rgba(255,255,255,0.7)",
                display: { xs: 'flex', sm: 'flex', md: 'none' } // Hide on desktop
              }}
            >
              <ArrowBack />
            </IconButton>
            <Avatar
              src={character.img}
              alt={character.name}
              className={classes.avatarSize}
            />
            <Box className={classes.characterInfo}>
              <Typography variant="h6" fontWeight="bold" noWrap>
                {character.name}
              </Typography>
              
              {/* Mobile status indicator - WhatsApp style */}
              <Typography className={classes.mobileStatusIndicator}>
                by gigalabs
              </Typography>
              
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {(sessionId || temporarySessionId) && (
                  <Chip
                    label={sessionId ? `Session ${sessionId}` : "New Chat"}
                    size="small"
                    className={classes.enhancedChip}
                  />
                )}
                {character.native_language &&
                  character.native_language !== "english" && (
                    <Chip
                      label={`Native: ${character.native_language}`}
                      size="small"
                      className={classes.nativeChip}
                    />
                  )}
              </Box>
            </Box>
          </Box>

          <Box className={classes.chatHeaderRight}>
            {/* Desktop buttons - hidden on mobile */}
            <IconButton
              onClick={handleHistoryToggle}
              sx={{ color: "text.secondary" }}
              title="Chat History"
              className={classes.desktopOnlyButton}
            >
              <HistoryIcon />
            </IconButton>

            <LanguageSelector
              currentLanguage={language}
              mode="single"
              compact={true}
              onLanguageChange={handleLanguageChange}
              title="Language Settings"
              className={classes.desktopOnlyButton}
            />

            
            <IconButton 
              onClick={onClose} 
              sx={{ 
                color: "text.secondary",
                display: { xs: 'none', sm: 'none', md: 'flex' } // Show only on desktop
              }}
              className={classes.desktopOnlyButton}
            >
              <Close />
            </IconButton>

            {/* Mobile menu button - WhatsApp style three dots */}
            <IconButton
              onClick={handleMobileMenuToggle}
              sx={{ color: "text.secondary" }}
              title="More options"
              className={classes.mobileMenuButton}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Box>

        {/* Desktop-only sections - completely hidden on mobile */}
        <Box sx={{ "@media (max-width: 600px)": { display: "none !important" } }}>
          {character.description && (
            <Box sx={{ width: "100%", mt: 1 }}>
              <Typography className={classes.characterDescription}>
                {character.description}
              </Typography>
            </Box>
          )}

          {language !== "english" && (
            <Box className={classes.languageStatus}>
              <Chip
                label={`Language: ${language}`}
                size="small"
                className={classes.enhancedChip}
              />
              {character.native_language &&
                language === character.native_language && (
                  <Chip
                    label="Native Mode"
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,193,7,0.15)",
                      borderColor: "rgba(255,193,7,0.3)",
                      "& .MuiChip-label": {
                        color: "#ffd54f",
                      },
                    }}
                  />
                )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Mobile dropdown menu - WhatsApp style */}
      {showMobileMenu && isMobile && (
        <Box
          sx={{
            position: "absolute",
            top: "64px",
            right: "16px",
            background: "rgba(42, 42, 42, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            minWidth: "200px",
            zIndex: 1000,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Box sx={{ p: 1 }}>
            <IconButton
              onClick={handleHistoryToggle}
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                gap: 2,
                p: 1.5,
                borderRadius: "6px",
                color: "#ffffff",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <Language fontSize="small" />
              <Typography variant="body2">Language ({language})</Typography>
            </IconButton>
            
            <IconButton
              onClick={() => {
                startNewSession();
                setShowMobileMenu(false);
              }}
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                gap: 2,
                p: 1.5,
                borderRadius: "6px",
                color: "#ffffff",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <Add fontSize="small" />
              <Typography variant="body2">New Chat</Typography>
            </IconButton>
            
            <Box sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", mt: 1, pt: 1 }}>
              <IconButton
                onClick={() => {
                  onClose();
                  setShowMobileMenu(false);
                }}
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                  gap: 2,
                  p: 1.5,
                  borderRadius: "6px",
                  color: "#ef4444",
                  "&:hover": {
                    background: "rgba(239, 68, 68, 0.1)",
                  },
                }}
              >
                <Close fontSize="small" />
                <Typography variant="body2">Close Chat</Typography>
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}

      {/* Overlay to close mobile menu when clicking outside */}
      {showMobileMenu && isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {error && (
        <Box sx={{ p: 2 }}>
          <Alert
            severity={error.includes("Language") ? "warning" : "error"}
            onClose={() => setError(null)}
            className={classes.errorAlert}
          >
            {error}
            {error.includes("Language") && (
              <Box sx={{ mt: 1, fontSize: "0.875rem" }}>
                Current setting: Language={language}
              </Box>
            )}
          </Alert>
        </Box>
      )}

      <Box className={classes.messagesWrapper} ref={messagesWrapperRef}>
        <Box className={classes.messagesContent}>
          <MessageList
            messages={messages}
            loading={loading}
            character={character}
            showLanguageLabels={language !== "english" && !isMobile}
          />
          <div ref={messagesEndRef} className={classes.messagesEnd} />
        </Box>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        p: 2, 
                backdropFilter: 'blur(8px)'
      }}>
        <Box sx={{ flexGrow: 1 }}>
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            loading={loading}
            placeholder={isMobile ? `Message ${character.name}...` : `Type in ${language}...`}
          />
        </Box>
        <Box
          onClick={startNewSession}
          title="New Conversation"
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 'fit-content',
            mx: 'auto',
            mb: 2,
            cursor: 'pointer',
            '&:hover .plus-icon': {
              transform: 'scale(1.1)'
            }
          }}
        >
          <Box
            className="speech-bubble"
            sx={{
              position: 'relative',
              background: theme => theme.palette.primary.main,
              color: 'white',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              marginBottom: '8px',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: `6px solid ${theme => theme.palette.primary.main}`,
              },
              animation: 'bounce 2s infinite',
              transform: 'translateY(0)'
            }}
          >
            New Chat
          </Box>
          <IconButton
            className="plus-icon"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              width: 40,
              height: 40,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'scale(1.1)'
              }
            }}
          >
            <Add />
          </IconButton>
          <style jsx global>{`
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
              }
              40% {
                transform: translateY(-5px);
              }
              60% {
                transform: translateY(-3px);
              }
            }
          `}</style>
        </Box>
      </Box>
      {showHistory && (
        <ChatHistoryPanel
          open={showHistory}
          onClose={handleHistoryClose}
          sessions={sessions}
          currentSessionId={sessionId}
          onSessionSelect={loadSession}
          onNewSession={startNewSession}
          characterName={character.name}
          sidebarState={{ ...sidebarState, isMobile }}
        />
      )}
    </Box>
  );
};

export default ChatPanel;