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
  Close,
  Add,
  History as HistoryIcon,
  ArrowBack,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import apiService from "../../../services/api";
import MessageList from "../message/MessageList";
import ChatInput from "./ChatInput";
import LanguageSelector from "../../common/LanguageSelector";
import ChatHistoryPanel from "./history/ChatHistoryPanel";

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
    "@media (max-width: 900px)": {
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
    "@media (max-width: 1200px)": {
      padding: "18px",
      gap: "10px",
    },
    "@media (max-width: 960px)": {
      padding: "16px",
      gap: "8px",
    },
    "@media (max-width: 600px)": {
      padding: "14px",
      gap: "6px",
    },
    "@media (max-width: 480px)": {
      padding: "12px",
      gap: "4px",
    },
    "@media (max-width: 375px)": {
      padding: "10px",
      gap: "2px",
    },
  },
  chatHeaderTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "56px",
    "@media (max-width: 1200px)": {
      minHeight: "52px",
    },
    "@media (max-width: 960px)": {
      minHeight: "48px",
    },
    "@media (max-width: 600px)": {
      minHeight: "44px",
    },
    "@media (max-width: 480px)": {
      minHeight: "40px",
    },
    "@media (max-width: 375px)": {
      minHeight: "36px",
    },
  },
  chatHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
    minWidth: 0,
    "@media (max-width: 1200px)": {
      gap: "10px",
    },
    "@media (max-width: 960px)": {
      gap: "8px",
    },
    "@media (max-width: 600px)": {
      gap: "6px",
    },
    "@media (max-width: 480px)": {
      gap: "4px",
    },
    "@media (max-width: 375px)": {
      gap: "2px",
    },
  },
  characterInfo: {
    flex: 1,
    minWidth: 0,
    "& .MuiTypography-h6": {
      background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      fontSize: "1.25rem",
      marginBottom: "4px",
      "@media (max-width: 1200px)": {
        fontSize: "1.2rem",
      },
      "@media (max-width: 960px)": {
        fontSize: "1.15rem",
      },
      "@media (max-width: 600px)": {
        fontSize: "1.1rem",
      },
      "@media (max-width: 480px)": {
        fontSize: "1.05rem",
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
    "@media (max-width: 1200px)": {
      fontSize: "0.85rem",
      marginTop: "7px",
      padding: "7px 0",
    },
    "@media (max-width: 960px)": {
      fontSize: "0.8rem",
      lineHeight: 1.5,
      marginTop: "6px",
      padding: "6px 0",
    },
    "@media (max-width: 600px)": {
      fontSize: "0.75rem",
      lineHeight: 1.4,
      marginTop: "5px",
      padding: "5px 0",
    },
    "@media (max-width: 480px)": {
      fontSize: "0.7rem",
      lineHeight: 1.3,
      marginTop: "4px",
      padding: "4px 0",
    },
    "@media (max-width: 375px)": {
      fontSize: "0.65rem",
      lineHeight: 1.2,
      marginTop: "3px",
      padding: "3px 0",
    },
  },
  chatHeaderRight: {
    display: "flex",
    alignItems: "flex-start",
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
      "& .MuiSvgIcon-root": {
        fontSize: "20px",
        transition: "all 0.3s ease",
      },
      "&:active": {
        transform: "translateY(0)",
      },
    },
    "@media (max-width: 1200px)": {
      gap: "7px",
      "& .MuiIconButton-root": {
        width: "38px",
        height: "38px",
        borderRadius: "10px",
        "& .MuiSvgIcon-root": {
          fontSize: "19px",
        },
      },
    },
    "@media (max-width: 960px)": {
      gap: "6px",
      "& .MuiIconButton-root": {
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        "& .MuiSvgIcon-root": {
          fontSize: "18px",
        },
      },
    },
    "@media (max-width: 600px)": {
      gap: "5px",
      "& .MuiIconButton-root": {
        width: "34px",
        height: "34px",
        borderRadius: "6px",
        "& .MuiSvgIcon-root": {
          fontSize: "17px",
        },
      },
    },
    "@media (max-width: 480px)": {
      gap: "4px",
      "& .MuiIconButton-root": {
        width: "32px",
        height: "32px",
        borderRadius: "4px",
        "& .MuiSvgIcon-root": {
          fontSize: "16px",
        },
      },
    },
    "@media (max-width: 375px)": {
      gap: "3px",
      "& .MuiIconButton-root": {
        width: "30px",
        height: "30px",
        borderRadius: "2px",
        "& .MuiSvgIcon-root": {
          fontSize: "15px",
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
    "@media (max-width: 1200px)": {
      width: "38px !important",
      height: "38px !important",
      borderRadius: "10px !important",
    },
    "@media (max-width: 960px)": {
      width: "36px !important",
      height: "36px !important",
      borderRadius: "8px !important",
    },
    "@media (max-width: 600px)": {
      width: "34px !important",
      height: "34px !important",
      borderRadius: "6px !important",
      display: "flex !important",
    },
    "@media (max-width: 480px)": {
      width: "32px !important",
      height: "32px !important",
      borderRadius: "4px !important",
    },
    "@media (max-width: 375px)": {
      width: "30px !important",
      height: "30px !important",
      borderRadius: "2px !important",
    },
  },
  messagesWrapper: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    padding: "0 12px",
    "@media (max-width: 1200px)": {
      padding: "0 10px",
    },
    "@media (max-width: 960px)": {
      padding: "0 8px",
    },
    "@media (max-width: 600px)": {
      padding: "0 6px",
    },
    "@media (max-width: 480px)": {
      padding: "0 4px",
    },
    "@media (max-width: 375px)": {
      padding: "0 2px",
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
    "@media (max-width: 1200px)": {
      fontSize: "0.65rem",
      height: 18,
    },
    "@media (max-width: 960px)": {
      fontSize: "0.6rem",
      height: 16,
    },
    "@media (max-width: 600px)": {
      fontSize: "0.55rem",
      height: 14,
    },
    "@media (max-width: 480px)": {
      fontSize: "0.5rem",
      height: 12,
    },
    "@media (max-width: 375px)": {
      fontSize: "0.45rem",
      height: 10,
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
    "@media (max-width: 1200px)": {
      fontSize: "0.65rem",
      height: 18,
    },
    "@media (max-width: 960px)": {
      fontSize: "0.6rem",
      height: 16,
    },
    "@media (max-width: 600px)": {
      fontSize: "0.55rem",
      height: 14,
    },
    "@media (max-width: 480px)": {
      fontSize: "0.5rem",
      height: 12,
    },
    "@media (max-width: 375px)": {
      fontSize: "0.45rem",
      height: 10,
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
    "@media (max-width: 1200px)": {
      gap: "7px",
      marginTop: "7px",
    },
    "@media (max-width: 960px)": {
      gap: "6px",
      marginTop: "6px",
    },
    "@media (max-width: 600px)": {
      gap: "5px",
      marginTop: "5px",
    },
    "@media (max-width: 480px)": {
      gap: "4px",
      marginTop: "4px",
    },
    "@media (max-width: 375px)": {
      gap: "3px",
      marginTop: "3px",
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
    "@media (max-width: 1200px)": {
      borderRadius: "10px",
      marginBottom: "14px",
    },
    "@media (max-width: 960px)": {
      borderRadius: "8px",
      marginBottom: "12px",
    },
    "@media (max-width: 600px)": {
      borderRadius: "6px",
      marginBottom: "10px",
      "& .MuiAlert-message": {
        fontSize: "0.875rem",
      },
    },
    "@media (max-width: 480px)": {
      borderRadius: "4px",
      marginBottom: "8px",
      "& .MuiAlert-message": {
        fontSize: "0.825rem",
      },
    },
    "@media (max-width: 375px)": {
      borderRadius: "2px",
      marginBottom: "6px",
      "& .MuiAlert-message": {
        fontSize: "0.8rem",
      },
    },
  },
  avatarSize: {
    width: 40,
    height: 40,
    borderRadius: 1,
    "@media (max-width: 1200px)": {
      width: 38,
      height: 38,
    },
    "@media (max-width: 960px)": {
      width: 36,
      height: 36,
    },
    "@media (max-width: 600px)": {
      width: 34,
      height: 34,
    },
    "@media (max-width: 480px)": {
      width: 32,
      height: 32,
    },
    "@media (max-width: 375px)": {
      width: 30,
      height: 30,
    },
  },
}));

// Chat continuity system utilities
const generateTemporarySessionId = () => {
  return `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
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
      url.searchParams.set('temp', '1');
    } else {
      url.searchParams.delete('temp');
    }
    window.history.replaceState({}, '', url.toString());
  };

  // Enhanced mobile detection
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 600 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Calculate dynamic width based on sidebar state
  const calculateWidth = () => {
    if (sidebarState.isMobile || isMobile) {
      return "100vw";
    }
    
    const sidebarWidth = sidebarState.isCollapsed ? 70 : 280;
    return `calc(100vw - ${sidebarWidth}px)`;
  };

  const containerStyle = {
    width: open ? calculateWidth() : "0",
    transform: open ? 'translateX(0)' : 'translateX(100%)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    zIndex: 1300,
  };

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
  };

  const handleHistoryClose = () => {
    console.log("History panel closed");
    setShowHistory(false);
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
        style={containerStyle}
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
      style={containerStyle}
      sx={{
        borderLeft: "1px solid rgba(255,255,255,0.12)",
        "@media (max-width: 960px)": {
          left: 0,
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
              sx={{ color: "rgba(255,255,255,0.7)" }}
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
            <IconButton
              onClick={handleHistoryToggle}
              sx={{ color: "text.secondary" }}
              title="Chat History"
            >
              <HistoryIcon />
            </IconButton>

            <LanguageSelector
              currentLanguage={language}
              mode="single"
              compact={true}
              onLanguageChange={handleLanguageChange}
              title="Language Settings"
            />

            <IconButton
              onClick={startNewSession}
              sx={{ color: "text.secondary" }}
              title="New Conversation"
            >
              <Add />
            </IconButton>

            <IconButton onClick={onClose} sx={{ color: "text.secondary" }}>
              <Close />
            </IconButton>
          </Box>
        </Box>

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
            showLanguageLabels={language !== "english"}
          />
          <div ref={messagesEndRef} className={classes.messagesEnd} />
        </Box>
      </Box>

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        loading={loading}
        placeholder={`Type in ${language}...`}
      />

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