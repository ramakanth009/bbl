import React from 'react';
import { Box, Typography, Chip, useTheme, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: 3,
    background: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
    '@media (max-width: 1200px)': {
      padding: theme.spacing(1.8),
      marginBottom: theme.spacing(1.8),
    },
    '@media (max-width: 960px)': {
      padding: theme.spacing(1.6),
      marginBottom: theme.spacing(1.6),
    },
    '@media (max-width: 600px)': {
      padding: theme.spacing(1.4),
      marginBottom: theme.spacing(1.4),
    },
    '@media (max-width: 480px)': {
      padding: theme.spacing(1.2),
      marginBottom: theme.spacing(1.2),
    },
    '@media (max-width: 375px)': {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  title: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontWeight: 600,
    '@media (max-width: 1200px)': {
      marginBottom: theme.spacing(0.9),
      fontSize: '0.85rem',
    },
    '@media (max-width: 960px)': {
      marginBottom: theme.spacing(0.8),
      fontSize: '0.825rem',
    },
    '@media (max-width: 600px)': {
      marginBottom: theme.spacing(0.7),
      fontSize: '0.8rem',
    },
    '@media (max-width: 480px)': {
      marginBottom: theme.spacing(0.6),
      fontSize: '0.775rem',
    },
    '@media (max-width: 375px)': {
      marginBottom: theme.spacing(0.5),
      fontSize: '0.75rem',
    },
  },
  sessionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    '@media (max-width: 1200px)': {
      gap: theme.spacing(0.9),
    },
    '@media (max-width: 960px)': {
      gap: theme.spacing(0.8),
    },
    '@media (max-width: 600px)': {
      gap: theme.spacing(0.7),
    },
    '@media (max-width: 480px)': {
      gap: theme.spacing(0.6),
    },
    '@media (max-width: 375px)': {
      gap: theme.spacing(0.5),
    },
  },
  newSessionChip: {
    justifyContent: 'flex-start',
    borderRadius: 2,
    fontWeight: 500,
    backgroundColor: theme.palette.action.hover,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
    '@media (max-width: 600px)': {
      '& .MuiChip-label': {
        fontSize: '0.8rem',
      },
    },
    '@media (max-width: 480px)': {
      '& .MuiChip-label': {
        fontSize: '0.75rem',
      },
    },
    '@media (max-width: 375px)': {
      '& .MuiChip-label': {
        fontSize: '0.7rem',
      },
    },
  },
  sessionChip: {
    justifyContent: 'flex-start',
    borderRadius: 2,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
    '@media (max-width: 600px)': {
      '& .MuiChip-label': {
        fontSize: '0.8rem',
      },
    },
    '@media (max-width: 480px)': {
      '& .MuiChip-label': {
        fontSize: '0.75rem',
      },
    },
    '@media (max-width: 375px)': {
      '& .MuiChip-label': {
        fontSize: '0.7rem',
      },
    },
  },
}));

const SessionHistory = ({ 
  showSessions, 
  sessions, 
  sessionId, 
  onNewSession, 
  onLoadSession 
}) => {
  const theme = useTheme();
  const classes = useStyles();

  if (!showSessions) return null;

  return (
    <Paper
      elevation={2}
      className={classes.container}
    >
      <Typography 
        variant="subtitle2" 
        className={classes.title}
      >
        Recent Conversations
      </Typography>
      <Box className={classes.sessionsContainer}>
        <Chip 
          label="+ Start New Conversation" 
          onClick={onNewSession}
          variant="outlined"
          className={classes.newSessionChip}
        />
        {sessions.map((session) => (
          <Chip
            key={session.session_id}
            label={`Session ${session.session_id} - ${new Date(session.created_at).toLocaleDateString()}`}
            onClick={() => onLoadSession(session.session_id)}
            variant={sessionId === session.session_id ? "filled" : "outlined"}
            className={classes.sessionChip}
            sx={{
              bgcolor: sessionId === session.session_id 
                ? theme.palette.primary.light 
                : theme.palette.action.hover,
              color: sessionId === session.session_id 
                ? theme.palette.primary.contrastText 
                : theme.palette.text.primary,
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default SessionHistory;