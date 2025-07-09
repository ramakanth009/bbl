import React from 'react';
import { Box, Typography, Chip, useTheme, Paper } from '@mui/material';

const SessionHistory = ({ 
  showSessions, 
  sessions, 
  sessionId, 
  onNewSession, 
  onLoadSession 
}) => {
  const theme = useTheme();

  if (!showSessions) return null;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderRadius: 3,
        background: theme.palette.background.paper,
        mb: 2,
      }}
    >
      <Typography 
        variant="subtitle2" 
        sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}
      >
        Recent Conversations
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Chip 
          label="+ Start New Conversation" 
          onClick={onNewSession}
          variant="outlined"
          sx={{
            justifyContent: 'flex-start',
            borderRadius: 2,
            fontWeight: 500,
            bgcolor: theme.palette.action.hover,
            '&:hover': {
              bgcolor: theme.palette.action.selected,
            }
          }}
        />
        {sessions.map((session) => (
          <Chip
            key={session.session_id}
            label={`Session ${session.session_id} - ${new Date(session.created_at).toLocaleDateString()}`}
            onClick={() => onLoadSession(session.session_id)}
            variant={sessionId === session.session_id ? "filled" : "outlined"}
            sx={{
              justifyContent: 'flex-start',
              borderRadius: 2,
              fontWeight: 500,
              bgcolor: sessionId === session.session_id 
                ? theme.palette.primary.light 
                : theme.palette.action.hover,
              color: sessionId === session.session_id 
                ? theme.palette.primary.contrastText 
                : theme.palette.text.primary,
              '&:hover': {
                bgcolor: theme.palette.action.selected,
              }
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default SessionHistory;