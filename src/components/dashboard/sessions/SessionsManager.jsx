import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { 
  Delete, 
  Chat, 
  History,
  Person,
  AccessTime,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import apiService from '../../../services/api';
import StarField from '../../common/StarField';
import { useTheme } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 16,
    minWidth: 600,
    maxHeight: '80vh',
    boxShadow: theme.shadows[8],
  },
}));

const SessionItem = styled(ListItem)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.04) 100%)',
  border: `1px solid rgba(99,102,241,0.15)`,
  borderRadius: 12,
  marginBottom: theme.spacing(1.5),
  transition: 'background 0.2s, box-shadow 0.2s, border 0.2s',
  boxShadow: 'none',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(99,102,241,0.13) 0%, rgba(139,92,246,0.09) 100%)',
    border: `1.5px solid #6366f1`,
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px) scale(1.01)',
  },
}));

const SessionStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
}));

const sectionSubtitle = 'Your complete conversation history with all characters';

const dividerSx = {
  mt: 2,
  mb: 2,
  background: 'linear-gradient(90deg, transparent, #6366f1 40%, transparent 60%)',
  height: 2,
  border: 0,
};

const SessionsManager = ({ open, onClose, onSessionSelect }) => {
  const theme = useTheme();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupedSessions, setGroupedSessions] = useState({});

  useEffect(() => {
    if (open) {
      loadSessions();
    }
  }, [open]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const userSessions = await apiService.getSessions();
      setSessions(userSessions);
      
      // Group sessions by character
      const grouped = userSessions.reduce((acc, session) => {
        if (!acc[session.character]) {
          acc[session.character] = [];
        }
        acc[session.character].push(session);
        return acc;
      }, {});
      
      setGroupedSessions(grouped);
      setError(null);
    } catch (error) {
      console.error('Failed to load sessions:', error);
      setError('Failed to load chat history');
    } finally {
      setLoading(false);
    }
  };

  const handleSessionClick = async (session) => {
    try {
      const sessionData = await apiService.getSessionMessages(session.session_id);
      onSessionSelect({
        ...session,
        messages: sessionData.chat_history
      });
      onClose();
    } catch (error) {
      console.error('Failed to load session messages:', error);
      setError('Failed to load conversation');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };

  const getSessionPreview = (session) => {
    // You could extend this to show the first message or last activity
    return `Session ${session.session_id}`;
  };

  const getTotalSessions = () => {
    return Object.values(groupedSessions).reduce((total, sessions) => total + sessions.length, 0);
  };

  const getCharacterCount = () => {
    return Object.keys(groupedSessions).length;
  };

  return (
    <>
      {/* StarField as background */}
      <StarField />
      <StyledDialog open={open} onClose={onClose} maxWidth="md">
        <DialogTitle
          sx={{
            background: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            pb: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <History />
            <Typography variant="h6" fontWeight="bold" sx={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '1.5rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              Chat History
            </Typography>
          </Box>
          <Typography sx={{
            color: '#9ca3af',
            fontSize: '0.875rem',
            mt: 1,
            ml: 5,
          }}>
            {sectionSubtitle}
          </Typography>
          {!loading && !error && (
            <Box mt={1}>
              <SessionStats>
                <Chip 
                  icon={<Chat />} 
                  label={`${getTotalSessions()} conversations`} 
                  size="small" 
                  variant="outlined"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    '& .MuiChip-label': { color: '#fff' },
                  }}
                />
                <Chip 
                  icon={<Person />} 
                  label={`${getCharacterCount()} characters`} 
                  size="small" 
                  variant="outlined"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    '& .MuiChip-label': { color: '#fff' },
                  }}
                />
              </SessionStats>
            </Box>
          )}
        </DialogTitle>

        <DialogContent
          sx={{
            background: theme.palette.background.paper,
            px: 3,
            py: 2,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          {loading && (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress sx={{ color: '#6366f1' }} />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
              <Button 
                size="small" 
                onClick={loadSessions} 
                sx={{ ml: 2 }}
              >
                Retry
              </Button>
            </Alert>
          )}

          {!loading && !error && Object.keys(groupedSessions).length === 0 && (
            <Box textAlign="center" py={4}>
              <History sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No conversations yet
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Start chatting with characters to see your history here
              </Typography>
            </Box>
          )}

          {!loading && !error && (
            <Box>
              {Object.entries(groupedSessions).map(([character, characterSessions], idx, arr) => (
                <Box key={character} mb={3}>
                  <Typography 
                    variant="subtitle1" 
                    fontWeight="bold" 
                    sx={{ 
                      mb: 1, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <Person fontSize="small" sx={{ color: '#6366f1' }} />
                    {character}
                    <Chip 
                      label={`${characterSessions.length} session${characterSessions.length !== 1 ? 's' : ''}`}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        fontWeight: 500,
                        bgcolor: theme.palette.action.hover,
                        color: theme.palette.text.secondary,
                        fontSize: '0.7rem',
                        height: 20,
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                      }}
                    />
                  </Typography>
                  
                  <List dense>
                    {characterSessions.map((session) => (
                      <SessionItem
                        key={session.session_id}
                        button
                        onClick={() => handleSessionClick(session)}
                        sx={{
                          borderLeft: session.messages ? `4px solid #6366f1` : undefined,
                          boxShadow: session.messages ? theme.shadows[2] : undefined,
                          position: 'relative',
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: '#6366f1' }}>
                            <Chat fontSize="small" sx={{ color: '#fff' }} />
                          </Avatar>
                        </ListItemAvatar>
                        
                        <ListItemText
                          primary={
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="body2" fontWeight="medium" sx={{ color: '#fff' }}>
                                {getSessionPreview(session)}
                              </Typography>
                              <Chip 
                                label={formatDate(session.created_at)}
                                size="small"
                                variant="outlined"
                                sx={{
                                  fontSize: '0.7rem',
                                  height: 20,
                                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                                  border: '1px solid rgba(99, 102, 241, 0.3)',
                                  color: '#fff',
                                }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                              <AccessTime fontSize="small" sx={{ color: '#6366f1' }} />
                              <Typography variant="caption" color="text.disabled">
                                Started {new Date(session.created_at).toLocaleString()}
                              </Typography>
                            </Box>
                          }
                        />
                        
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete session (if you implement this endpoint)
                            console.log('Delete session:', session.session_id);
                          }}
                          sx={{ opacity: 0.7, color: '#ef4444' }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </SessionItem>
                    ))}
                  </List>
                  
                  {arr.length > 1 && idx < arr.length - 1 && (
                    <Divider sx={dividerSx} />
                  )}
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            background: theme.palette.background.default,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            p: 2,
          }}
        >
          <Button onClick={onClose}>Close</Button>
          <Button 
            onClick={loadSessions} 
            variant="outlined"
            disabled={loading}
          >
            Refresh
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default SessionsManager;