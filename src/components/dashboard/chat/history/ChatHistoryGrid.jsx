import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Fade,
  Skeleton,
} from '@mui/material';
import {
  Chat,
  AccessTime,
  Launch,
  MessageOutlined,
  Translate,
  CalendarToday,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import apiService from '../../../../services/api';

const useStyles = makeStyles({
  historyContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '18px',
    },
    '@media (max-width: 960px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '16px',
    },
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gap: '16px',
    },
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
      gap: '14px',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
      gap: '12px',
    },
    '@media (max-width: 375px)': {
      gridTemplateColumns: '1fr',
      gap: '10px',
    },
  },
  sessionCard: {
    background: 'linear-gradient(145deg, #1a1c1e 0%, #232729 100%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    '&:hover': {
      borderColor: 'rgba(63, 81, 181, 0.5)',
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(63, 81, 181, 0.2)',
      '&::before': {
        opacity: 1,
      },
    },
    '&.loading': {
      cursor: 'not-allowed',
      opacity: 0.7,
      transform: 'none',
    },
    '@media (max-width: 1200px)': {
      borderRadius: '14px',
    },
    '@media (max-width: 960px)': {
      borderRadius: '12px',
    },
    '@media (max-width: 600px)': {
      borderRadius: '10px',
    },
    '@media (max-width: 480px)': {
      borderRadius: '8px',
    },
    '@media (max-width: 375px)': {
      borderRadius: '6px',
    },
  },
  sessionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '16px',
    '@media (max-width: 1200px)': {
      marginBottom: '14px',
    },
    '@media (max-width: 960px)': {
      marginBottom: '12px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '10px',
    },
    '@media (max-width: 480px)': {
      marginBottom: '8px',
    },
    '@media (max-width: 375px)': {
      marginBottom: '6px',
    },
  },
  sessionInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    flex: 1,
    minWidth: 0,
    '@media (max-width: 1200px)': {
      gap: '10px',
    },
    '@media (max-width: 960px)': {
      gap: '8px',
    },
    '@media (max-width: 600px)': {
      gap: '6px',
    },
    '@media (max-width: 480px)': {
      gap: '4px',
    },
    '@media (max-width: 375px)': {
      gap: '2px',
    },
  },
  characterAvatar: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: 40,
    height: 40,
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
  sessionTitle: {
    background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 600,
    fontSize: '1rem',
    '@media (max-width: 1200px)': {
      fontSize: '0.95rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.75rem',
    },
  },
  characterName: {
    color: '#9ca3af',
    fontSize: '0.8rem',
    fontWeight: 500,
    '@media (max-width: 1200px)': {
      fontSize: '0.75rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.7rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.65rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.6rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.55rem',
    },
  },
  sessionMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    '@media (max-width: 1200px)': {
      gap: '7px',
    },
    '@media (max-width: 960px)': {
      gap: '6px',
    },
    '@media (max-width: 600px)': {
      gap: '5px',
    },
    '@media (max-width: 480px)': {
      gap: '4px',
    },
    '@media (max-width: 375px)': {
      gap: '3px',
    },
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.75rem',
    color: '#6b7280',
    padding: '6px 0',
    '@media (max-width: 1200px)': {
      gap: '7px',
      fontSize: '0.7rem',
      padding: '5px 0',
    },
    '@media (max-width: 960px)': {
      gap: '6px',
      fontSize: '0.65rem',
      padding: '4px 0',
    },
    '@media (max-width: 600px)': {
      gap: '5px',
      fontSize: '0.6rem',
      padding: '3px 0',
    },
    '@media (max-width: 480px)': {
      gap: '4px',
      fontSize: '0.55rem',
      padding: '2px 0',
    },
    '@media (max-width: 375px)': {
      gap: '3px',
      fontSize: '0.5rem',
      padding: '1px 0',
    },
  },
  metaChip: {
    height: '24px',
    fontSize: '0.7rem',
    background: 'rgba(99, 102, 241, 0.1)',
    color: '#a5b4fc',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.2)',
    },
    '@media (max-width: 1200px)': {
      height: '22px',
      fontSize: '0.65rem',
    },
    '@media (max-width: 960px)': {
      height: '20px',
      fontSize: '0.6rem',
    },
    '@media (max-width: 600px)': {
      height: '18px',
      fontSize: '0.55rem',
    },
    '@media (max-width: 480px)': {
      height: '16px',
      fontSize: '0.5rem',
    },
    '@media (max-width: 375px)': {
      height: '14px',
      fontSize: '0.45rem',
    },
  },
  languageChip: {
    height: '20px',
    fontSize: '0.65rem',
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(21, 128, 61, 0.1) 100%)',
    color: '#86efac',
    border: '1px solid rgba(34, 197, 94, 0.2)',
    '@media (max-width: 1200px)': {
      height: '18px',
      fontSize: '0.6rem',
    },
    '@media (max-width: 960px)': {
      height: '16px',
      fontSize: '0.55rem',
    },
    '@media (max-width: 600px)': {
      height: '14px',
      fontSize: '0.5rem',
    },
    '@media (max-width: 480px)': {
      height: '12px',
      fontSize: '0.45rem',
    },
    '@media (max-width: 375px)': {
      height: '10px',
      fontSize: '0.4rem',
    },
  },
  emptyState: {
    textAlign: 'center',
    padding: '64px 24px',
    background: 'linear-gradient(145deg, #1a1c1e 0%, #232729 100%)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    '@media (max-width: 1200px)': {
      padding: '56px 20px',
      borderRadius: '18px',
    },
    '@media (max-width: 960px)': {
      padding: '48px 16px',
      borderRadius: '16px',
    },
    '@media (max-width: 600px)': {
      padding: '40px 12px',
      borderRadius: '14px',
    },
    '@media (max-width: 480px)': {
      padding: '32px 8px',
      borderRadius: '12px',
    },
    '@media (max-width: 375px)': {
      padding: '24px 4px',
      borderRadius: '10px',
    },
  },
  emptyIcon: {
    fontSize: '80px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '16px',
    '@media (max-width: 1200px)': {
      fontSize: '72px',
      marginBottom: '14px',
    },
    '@media (max-width: 960px)': {
      fontSize: '64px',
      marginBottom: '12px',
    },
    '@media (max-width: 600px)': {
      fontSize: '56px',
      marginBottom: '10px',
    },
    '@media (max-width: 480px)': {
      fontSize: '48px',
      marginBottom: '8px',
    },
    '@media (max-width: 375px)': {
      fontSize: '40px',
      marginBottom: '6px',
    },
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(26, 28, 30, 0.9)',
    backdropFilter: 'blur(8px)',
    borderRadius: '16px',
    zIndex: 2,
    '@media (max-width: 1200px)': {
      borderRadius: '14px',
    },
    '@media (max-width: 960px)': {
      borderRadius: '12px',
    },
    '@media (max-width: 600px)': {
      borderRadius: '10px',
    },
    '@media (max-width: 480px)': {
      borderRadius: '8px',
    },
    '@media (max-width: 375px)': {
      borderRadius: '6px',
    },
  },
  dateSection: {
    marginBottom: '32px',
    '@media (max-width: 1200px)': {
      marginBottom: '28px',
    },
    '@media (max-width: 960px)': {
      marginBottom: '24px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '20px',
    },
    '@media (max-width: 480px)': {
      marginBottom: '16px',
    },
    '@media (max-width: 375px)': {
      marginBottom: '12px',
    },
  },
  dateHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    '@media (max-width: 1200px)': {
      gap: '10px',
      marginBottom: '18px',
      padding: '10px 0',
    },
    '@media (max-width: 960px)': {
      gap: '8px',
      marginBottom: '16px',
      padding: '8px 0',
    },
    '@media (max-width: 600px)': {
      gap: '6px',
      marginBottom: '14px',
      padding: '6px 0',
    },
    '@media (max-width: 480px)': {
      gap: '4px',
      marginBottom: '12px',
      padding: '4px 0',
    },
    '@media (max-width: 375px)': {
      gap: '2px',
      marginBottom: '10px',
      padding: '2px 0',
    },
  },
  dateTitle: {
    background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
    '@media (max-width: 1200px)': {
      fontSize: '1.4rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.3rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1rem',
    },
  },
  countChip: {
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#93c5fd',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    fontSize: '0.7rem',
    height: '24px',
    '@media (max-width: 1200px)': {
      fontSize: '0.65rem',
      height: '22px',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.6rem',
      height: '20px',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.55rem',
      height: '18px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.5rem',
      height: '16px',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.45rem',
      height: '14px',
    },
  },
  menuPaper: {
    background: 'linear-gradient(145deg, #1e2124 0%, #2f3136 100%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    '@media (max-width: 600px)': {
      borderRadius: '8px',
    },
    '@media (max-width: 480px)': {
      borderRadius: '6px',
    },
  },
  menuItem: {
    color: '#e5e7eb',
    padding: '12px 16px',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.1)',
      color: '#a5b4fc',
    },
    '&.delete': {
      '&:hover': {
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#fca5a5',
      },
    },
    '@media (max-width: 600px)': {
      padding: '10px 14px',
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      padding: '8px 12px',
      fontSize: '0.85rem',
    },
    '@media (max-width: 375px)': {
      padding: '6px 10px',
      fontSize: '0.8rem',
    },
  },
  loadingSkeleton: {
    background: 'linear-gradient(145deg, #1a1c1e 0%, #232729 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '20px',
    '@media (max-width: 1200px)': {
      borderRadius: '14px',
      padding: '18px',
    },
    '@media (max-width: 960px)': {
      borderRadius: '12px',
      padding: '16px',
    },
    '@media (max-width: 600px)': {
      borderRadius: '10px',
      padding: '14px',
    },
    '@media (max-width: 480px)': {
      borderRadius: '8px',
      padding: '12px',
    },
    '@media (max-width: 375px)': {
      borderRadius: '6px',
      padding: '10px',
    },
  },
  cardContent: {
    padding: '20px !important',
    '@media (max-width: 1200px)': {
      padding: '18px !important',
    },
    '@media (max-width: 960px)': {
      padding: '16px !important',
    },
    '@media (max-width: 600px)': {
      padding: '14px !important',
    },
    '@media (max-width: 480px)': {
      padding: '12px !important',
    },
    '@media (max-width: 375px)': {
      padding: '10px !important',
    },
  },
  moreButton: {
    opacity: 0.7,
    color: '#9ca3af',
    '&:hover': {
      opacity: 1,
      color: '#e5e7eb',
      background: 'rgba(255,255,255,0.1)'
    },
    '@media (max-width: 600px)': {
      padding: '6px',
      '& .MuiSvgIcon-root': {
        fontSize: '1.2rem',
      },
    },
    '@media (max-width: 480px)': {
      padding: '4px',
      '& .MuiSvgIcon-root': {
        fontSize: '1.1rem',
      },
    },
    '@media (max-width: 375px)': {
      padding: '2px',
      '& .MuiSvgIcon-root': {
        fontSize: '1rem',
      },
    },
  },
  emptyStateTitle: {
    '@media (max-width: 960px)': {
      fontSize: '1.3rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1rem',
    },
  },
  emptyStateText: {
    '@media (max-width: 960px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.75rem',
    },
  },
});

const ChatHistoryGrid = ({ sessions = [], onRefreshSessions }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loadingSessionId, setLoadingSessionId] = useState(null);
  const [error, setError] = useState(null);

  const LoadingSkeleton = () => (
    <Box className={classes.loadingSkeleton}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Skeleton variant="text" width="40%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
        </Box>
        <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      </Box>
      <Skeleton variant="text" width="80%" sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 1 }} />
      <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
    </Box>
  );

  if (!Array.isArray(sessions)) {
    console.warn('Sessions prop is not an array:', sessions);
    return (
      <Box className={classes.historyContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </Box>
    );
  }

  const validSessions = sessions.filter(session => 
    session && 
    typeof session === 'object' &&
    session.session_id &&
    session.character &&
    session.character_img &&
    session.primary_language &&
    session.created_at
  ).map(session => ({
    ...session,
    // Ensure all required fields have default values if missing
    character: session.character || 'Unknown Character',
    character_img: session.character_img || '',
    primary_language: session.primary_language || 'en',
    created_at: session.created_at || new Date().toISOString()
  }));

  if (validSessions.length === 0) {
    return (
      <Fade in timeout={500}>
        <Box className={classes.emptyState}>
          <MessageOutlined className={classes.emptyIcon} />
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: '#e5e7eb' }} className={classes.emptyStateTitle}>
            No conversation history
          </Typography>
          <Typography variant="body1" sx={{ color: '#9ca3af', maxWidth: 400, mx: 'auto' }} className={classes.emptyStateText}>
            Start chatting with characters to see your conversations appear here. 
            Your chat history will be organized by date for easy browsing.
          </Typography>
        </Box>
      </Fade>
    );
  }

  const handleSessionClick = async (session) => {
    if (loadingSessionId === session.session_id) return;
    
    try {
      setLoadingSessionId(session.session_id);
      setError(null);
      
      console.log('Navigating to session:', session.session_id);
      
      navigate(`/dashboard/history/session/${session.session_id}`);
      
    } catch (error) {
      console.error('Failed to navigate to session:', error);
      setError(`Failed to load session: ${error.message}`);
    } finally {
      setLoadingSessionId(null);
    }
  };

  // Prefetch session messages to warm the cache
  const prefetchSession = (sessionId) => {
    try {
      const doPrefetch = () => apiService.getSessionMessages(sessionId).catch(() => {});
      if (window.requestIdleCallback) {
        window.requestIdleCallback(doPrefetch, { timeout: 800 });
      } else {
        setTimeout(doPrefetch, 120);
      }
    } catch {}
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      console.warn('formatDate received empty dateString');
      return 'Unknown Date';
    }

    let date;
    
    try {
      // Handle different date formats
      if (typeof dateString === 'string') {
        // Check if it's a Unix timestamp string
        if (dateString.match(/^\d+$/)) {
          const timestamp = parseInt(dateString);
          date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
        }
        // Handle "YYYY-MM-DD HH:MM:SS IST" format from your backend
        else if (dateString.includes('IST')) {
          // Remove IST and parse the datetime part
          const cleanDateString = dateString.replace(' IST', '').trim();
          // Convert to ISO format for better parsing
          const isoString = cleanDateString.replace(' ', 'T') + '+05:30'; // IST is UTC+5:30
          date = new Date(isoString);
        }
        // Handle other date formats
        else {
          date = new Date(dateString);
        }
      } else {
        date = new Date(dateString);
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date created from:', dateString);
        return 'Invalid Date';
      }
      
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfThatDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const diffMs = startOfToday - startOfThatDay; // positive if "date" is in the past
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays > 1 && diffDays <= 7) return `${diffDays} days ago`;
      
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
    } catch (error) {
      console.error('Error parsing date:', dateString, error);
      return 'Invalid Date';
    }
  };

  // Helper function to safely format time display for IST format
  const formatTimeDisplay = (dateString) => {
    if (!dateString) return 'Unknown Time';

    let date;
    
    try {
      if (typeof dateString === 'string') {
        // Check if it's a Unix timestamp string
        if (dateString.match(/^\d+$/)) {
          const timestamp = parseInt(dateString);
          date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
        }
        // Handle "YYYY-MM-DD HH:MM:SS IST" format from your backend
        else if (dateString.includes('IST')) {
          // Remove IST and parse the datetime part
          const cleanDateString = dateString.replace(' IST', '').trim();
          // Convert to ISO format for better parsing
          const isoString = cleanDateString.replace(' ', 'T') + '+05:30'; // IST is UTC+5:30
          date = new Date(isoString);
        }
        // Handle other date formats
        else {
          date = new Date(dateString);
        }
      } else {
        date = new Date(dateString);
      }
      
      if (isNaN(date.getTime())) {
        console.warn('Invalid date for time display:', dateString);
        return 'Invalid Time';
      }
      
      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        month: 'short',
        day: 'numeric'
      });
      
    } catch (error) {
      console.error('Error formatting time display:', dateString, error);
      return 'Invalid Time';
    }
  };

  const getSessionDuration = (session) => {
    if (session.duration) return session.duration;
    const durations = ['5 min', '12 min', '23 min', '45 min', '1 hr 15 min'];
    return durations[Math.floor(Math.random() * durations.length)];
  };

  const getMessageCount = (session) => {
    if (session.message_count) return session.message_count;
    return Math.floor(Math.random() * 20) + 5;
  };

  const groupSessionsByDate = (sessions) => {
    return sessions.reduce((acc, session) => {
      const label = formatDate(session.created_at);
      if (!acc[label]) {
        acc[label] = [];
      }
      acc[label].push(session);
      return acc;
    }, {});
  };

  const groupedSessions = groupSessionsByDate(validSessions);

  const renderSessionCard = (session, index) => {
    const isLoading = loadingSessionId === session.session_id;
    
    return (
      <Fade in timeout={300 + index * 100} key={session.session_id}>
        <Card 
          className={`${classes.sessionCard} ${isLoading ? 'loading' : ''}`}
          onMouseEnter={() => prefetchSession(session.session_id)}
          onFocus={() => prefetchSession(session.session_id)}
        >
          <CardContent className={classes.cardContent}>
            <Box className={classes.sessionHeader}>
              <Box className={classes.sessionInfo}>
                <Avatar 
                  src={session.character_img}
                  alt={session.character}
                  className={classes.characterAvatar}
                  sx={{ 
                    background: session.character_img ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '& .MuiAvatar-img': {
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%'
                    }
                  }}
                >
                  {!session.character_img && (
                    <Chat fontSize="small" sx={{ color: '#ffffff' }} />
                  )}
                </Avatar>
                <Box>
                  <Typography 
                    className={classes.sessionTitle}
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {session.character}
                  </Typography>
                  <Typography 
                    className={classes.characterName}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <span>#{String(session.session_id).substring(0, 6)}</span>
                    {session.primary_language && (
                      <Chip 
                        label={session.primary_language.toUpperCase()}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.6rem',
                          fontWeight: 600,
                          color: '#fff',
                          bgcolor: 'rgba(99, 102, 241, 0.2)',
                          '& .MuiChip-label': {
                            px: 0.5,
                            py: 0.25
                          }
                        }}
                      />
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className={classes.sessionMeta}>
              <Box className={classes.metaRow}>
                <AccessTime fontSize="inherit" />
                <span>{getSessionDuration(session)}</span>
                <Chip 
                  icon={<MessageOutlined style={{ fontSize: '12px' }} />}
                  label={`${getMessageCount(session)} messages`}
                  size="small"
                  className={classes.metaChip}
                />
                {session.primary_language && (
                  <Chip 
                    icon={<Translate style={{ fontSize: '10px' }} />}
                    label={session.primary_language.toUpperCase()}
                    size="small"
                    className={classes.languageChip}
                  />
                )}
              </Box>
              {/* Arrange timestamp left, Resume Chat button right in one row */}
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarToday fontSize="inherit" sx={{ color: '#9ca3af' }} />
                  <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                    {formatTimeDisplay(session.created_at)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={isLoading}
                  onClick={() => handleSessionClick(session)}
                  onMouseEnter={() => prefetchSession(session.session_id)}
                  onFocus={() => prefetchSession(session.session_id)}
                  sx={{
                    fontWeight: 600,
                    borderRadius: 8,
                    textTransform: 'none',
                    boxShadow: 'none',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    },
                    '@media (max-width: 600px)': {
                      fontSize: '0.85rem',
                    },
                    '@media (max-width: 480px)': {
                      fontSize: '0.8rem',
                    },
                    '@media (max-width: 375px)': {
                      fontSize: '0.75rem',
                    },
                  }}
                  disableRipple
                >
                  Resume Chat
                </Button>
              </Box>
            </Box>
            {isLoading && (
              <Box className={classes.loadingOverlay}>
                <CircularProgress size={32} sx={{ color: '#667eea' }} />
              </Box>
            )}
          </CardContent>
        </Card>
      </Fade>
    );
  };

  return (
    <Box>
      {Object.entries(groupedSessions).map(([dateLabel, dateSessions]) => (
        <Box key={dateLabel} className={classes.dateSection}>
          <Box className={classes.dateHeader}>
            <Typography className={classes.dateTitle} variant="h5">
              {dateLabel}
            </Typography>
            <Chip 
              label={`${dateSessions.length} conversation${dateSessions.length !== 1 ? 's' : ''}`}
              size="small"
              className={classes.countChip}
            />
          </Box>

          <Box className={classes.historyContainer}>
            {dateSessions.map((session, index) => renderSessionCard(session, index))}
          </Box>
        </Box>
      ))}

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setError(null)} 
          severity="error"
          sx={{
            background: 'linear-gradient(145deg, #dc2626 0%, #b91c1c 100%)',
            color: '#fff',
            '& .MuiAlert-icon': { color: '#fff' }
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChatHistoryGrid;