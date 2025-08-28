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
    '@media (max-width: 1200px)': {
      minWidth: 500,
      maxHeight: '75vh',
      borderRadius: 14,
    },
    '@media (max-width: 960px)': {
      minWidth: 450,
      maxHeight: '70vh',
      borderRadius: 12,
    },
    '@media (max-width: 600px)': {
      minWidth: '90vw',
      maxWidth: '90vw',
      maxHeight: '85vh',
      borderRadius: 10,
      margin: 8,
    },
    '@media (max-width: 480px)': {
      minWidth: '95vw',
      maxWidth: '95vw',
      maxHeight: '90vh',
      borderRadius: 8,
      margin: 4,
    },
    '@media (max-width: 375px)': {
      minWidth: '98vw',
      maxWidth: '98vw',
      maxHeight: '95vh',
      borderRadius: 6,
      margin: 2,
    },
  },
}));

const SessionItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  marginBottom: theme.spacing(1.5),
  transition: 'background 0.2s, box-shadow 0.2s',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    boxShadow: theme.shadows[2],
  },
  '@media (max-width: 1200px)': {
    borderRadius: 8,
    marginBottom: theme.spacing(1.2),
  },
  '@media (max-width: 960px)': {
    borderRadius: 6,
    marginBottom: theme.spacing(1),
  },
  '@media (max-width: 600px)': {
    borderRadius: 4,
    marginBottom: theme.spacing(0.8),
    padding: '8px 12px',
  },
  '@media (max-width: 480px)': {
    padding: '6px 10px',
    marginBottom: theme.spacing(0.6),
  },
  '@media (max-width: 375px)': {
    padding: '4px 8px',
    marginBottom: theme.spacing(0.4),
  },
}));

const SessionStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  '@media (max-width: 1200px)': {
    gap: theme.spacing(1.2),
  },
  '@media (max-width: 960px)': {
    gap: theme.spacing(1),
  },
  '@media (max-width: 600px)': {
    gap: theme.spacing(0.8),
    flexWrap: 'wrap',
  },
  '@media (max-width: 480px)': {
    gap: theme.spacing(0.6),
  },
  '@media (max-width: 375px)': {
    gap: theme.spacing(0.4),
  },
}));

const sectionSubtitle = 'Your complete conversation history with all characters';

const dividerSx = {
  mt: 2,
  mb: 2,
  background: 'linear-gradient(90deg, transparent, #6366f1 40%, transparent 60%)',
  height: 2,
  border: 0,
  '@media (max-width: 960px)': {
    mt: 1.5,
    mb: 1.5,
  },
  '@media (max-width: 600px)': {
    mt: 1,
    mb: 1,
  },
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
            '@media (max-width: 1200px)': {
              pb: 1.8,
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14,
            },
            '@media (max-width: 960px)': {
              pb: 1.6,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            },
            '@media (max-width: 600px)': {
              pb: 1.4,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              px: 2,
            },
            '@media (max-width: 480px)': {
              pb: 1.2,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              px: 1.5,
            },
            '@media (max-width: 375px)': {
              pb: 1,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              px: 1,
            },
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <History sx={{
              '@media (max-width: 600px)': {
                fontSize: '1.2rem',
              },
              '@media (max-width: 480px)': {
                fontSize: '1.1rem',
              },
              '@media (max-width: 375px)': {
                fontSize: '1rem',
              },
            }} />
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
              '@media (max-width: 1200px)': {
                fontSize: '1.4rem',
                gap: '10px',
              },
              '@media (max-width: 960px)': {
                fontSize: '1.3rem',
                gap: '8px',
              },
              '@media (max-width: 600px)': {
                fontSize: '1.2rem',
                gap: '6px',
              },
              '@media (max-width: 480px)': {
                fontSize: '1.1rem',
                gap: '4px',
              },
              '@media (max-width: 375px)': {
                fontSize: '1rem',
                gap: '2px',
              },
            }}>
              Chat History
            </Typography>
          </Box>
          <Typography sx={{
            color: '#9ca3af',
            fontSize: '0.875rem',
            mt: 1,
            ml: 5,
            '@media (max-width: 1200px)': {
              fontSize: '0.85rem',
              ml: 4.5,
            },
            '@media (max-width: 960px)': {
              fontSize: '0.825rem',
              ml: 4,
            },
            '@media (max-width: 600px)': {
              fontSize: '0.8rem',
              ml: 3.5,
              mt: 0.8,
            },
            '@media (max-width: 480px)': {
              fontSize: '0.775rem',
              ml: 3,
              mt: 0.6,
            },
            '@media (max-width: 375px)': {
              fontSize: '0.75rem',
              ml: 2.5,
              mt: 0.4,
            },
          }}>
            {sectionSubtitle}
          </Typography>
          {!loading && !error && (
            <Box mt={1}>
              <SessionStats>
                <Chip 
                  icon={<Chat sx={{
                    '@media (max-width: 600px)': {
                      fontSize: '0.9rem',
                    },
                    '@media (max-width: 480px)': {
                      fontSize: '0.8rem',
                    },
                  }} />} 
                  label={`${getTotalSessions()} conversations`} 
                  size="small" 
                  variant="outlined"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    '& .MuiChip-label': { 
                      color: '#fff',
                      '@media (max-width: 600px)': {
                        fontSize: '0.75rem',
                      },
                      '@media (max-width: 480px)': {
                        fontSize: '0.7rem',
                      },
                      '@media (max-width: 375px)': {
                        fontSize: '0.65rem',
                      },
                    },
                  }}
                />
                <Chip 
                  icon={<Person sx={{
                    '@media (max-width: 600px)': {
                      fontSize: '0.9rem',
                    },
                    '@media (max-width: 480px)': {
                      fontSize: '0.8rem',
                    },
                  }} />} 
                  label={`${getCharacterCount()} characters`} 
                  size="small" 
                  variant="outlined"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    '& .MuiChip-label': { 
                      color: '#fff',
                      '@media (max-width: 600px)': {
                        fontSize: '0.75rem',
                      },
                      '@media (max-width: 480px)': {
                        fontSize: '0.7rem',
                      },
                      '@media (max-width: 375px)': {
                        fontSize: '0.65rem',
                      },
                    },
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
            '@media (max-width: 1200px)': {
              px: 2.5,
              py: 1.8,
              borderBottomLeftRadius: 14,
              borderBottomRightRadius: 14,
            },
            '@media (max-width: 960px)': {
              px: 2,
              py: 1.6,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            },
            '@media (max-width: 600px)': {
              px: 1.5,
              py: 1.4,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            },
            '@media (max-width: 480px)': {
              px: 1.2,
              py: 1.2,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            },
            '@media (max-width: 375px)': {
              px: 1,
              py: 1,
              borderBottomLeftRadius: 6,
              borderBottomRightRadius: 6,
            },
          }}
        >
          {loading && (
            <Box display="flex" justifyContent="center" py={4} sx={{
              '@media (max-width: 600px)': {
                py: 3,
              },
              '@media (max-width: 480px)': {
                py: 2.5,
              },
              '@media (max-width: 375px)': {
                py: 2,
              },
            }}>
              <CircularProgress sx={{ color: '#6366f1' }} />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ 
              mb: 2,
              '@media (max-width: 600px)': {
                mb: 1.5,
                fontSize: '0.875rem',
              },
              '@media (max-width: 480px)': {
                mb: 1.2,
                fontSize: '0.825rem',
              },
              '@media (max-width: 375px)': {
                mb: 1,
                fontSize: '0.8rem',
              },
            }}>
              {error}
              <Button 
                size="small" 
                onClick={loadSessions} 
                sx={{ 
                  ml: 2,
                  '@media (max-width: 600px)': {
                    ml: 1.5,
                    fontSize: '0.8rem',
                  },
                  '@media (max-width: 480px)': {
                    ml: 1,
                    fontSize: '0.75rem',
                  },
                }}
              >
                Retry
              </Button>
            </Alert>
          )}

          {!loading && !error && Object.keys(groupedSessions).length === 0 && (
            <Box textAlign="center" py={4} sx={{
              '@media (max-width: 600px)': {
                py: 3,
              },
              '@media (max-width: 480px)': {
                py: 2.5,
              },
              '@media (max-width: 375px)': {
                py: 2,
              },
            }}>
              <History sx={{ 
                fontSize: 48, 
                color: 'text.disabled', 
                mb: 2,
                '@media (max-width: 600px)': {
                  fontSize: 40,
                  mb: 1.5,
                },
                '@media (max-width: 480px)': {
                  fontSize: 36,
                  mb: 1.2,
                },
                '@media (max-width: 375px)': {
                  fontSize: 32,
                  mb: 1,
                },
              }} />
              <Typography variant="h6" color="text.secondary" sx={{
                '@media (max-width: 600px)': {
                  fontSize: '1.1rem',
                },
                '@media (max-width: 480px)': {
                  fontSize: '1rem',
                },
                '@media (max-width: 375px)': {
                  fontSize: '0.9rem',
                },
              }}>
                No conversations yet
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{
                '@media (max-width: 600px)': {
                  fontSize: '0.85rem',
                },
                '@media (max-width: 480px)': {
                  fontSize: '0.8rem',
                },
                '@media (max-width: 375px)': {
                  fontSize: '0.75rem',
                },
              }}>
                Start chatting with characters to see your history here
              </Typography>
            </Box>
          )}

          {!loading && !error && (
            <Box>
              {Object.entries(groupedSessions).map(([character, characterSessions], idx, arr) => (
                <Box key={character} mb={3} sx={{
                  '@media (max-width: 600px)': {
                    mb: 2.5,
                  },
                  '@media (max-width: 480px)': {
                    mb: 2,
                  },
                  '@media (max-width: 375px)': {
                    mb: 1.5,
                  },
                }}>
                  <Typography 
                    variant="subtitle1" 
                    fontWeight="bold" 
                    sx={{ 
                      mb: 1, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      color: theme.palette.primary.main,
                      '@media (max-width: 1200px)': {
                        fontSize: '1rem',
                        mb: 0.9,
                      },
                      '@media (max-width: 960px)': {
                        fontSize: '0.95rem',
                        mb: 0.8,
                      },
                      '@media (max-width: 600px)': {
                        fontSize: '0.9rem',
                        mb: 0.7,
                        gap: 0.8,
                      },
                      '@media (max-width: 480px)': {
                        fontSize: '0.85rem',
                        mb: 0.6,
                        gap: 0.6,
                      },
                      '@media (max-width: 375px)': {
                        fontSize: '0.8rem',
                        mb: 0.5,
                        gap: 0.4,
                      },
                    }}
                  >
                    <Person fontSize="small" sx={{
                      '@media (max-width: 600px)': {
                        fontSize: '1rem',
                      },
                      '@media (max-width: 480px)': {
                        fontSize: '0.9rem',
                      },
                      '@media (max-width: 375px)': {
                        fontSize: '0.8rem',
                      },
                    }} />
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
                        '@media (max-width: 600px)': {
                          fontSize: '0.65rem',
                          height: 18,
                        },
                        '@media (max-width: 480px)': {
                          fontSize: '0.6rem',
                          height: 16,
                        },
                        '@media (max-width: 375px)': {
                          fontSize: '0.55rem',
                          height: 14,
                        },
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
                          borderLeft: session.messages ? `4px solid ${theme.palette.primary.main}` : undefined,
                          boxShadow: session.messages ? theme.shadows[2] : undefined,
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: theme.palette.primary.light,
                            '@media (max-width: 600px)': {
                              width: 28,
                              height: 28,
                            },
                            '@media (max-width: 480px)': {
                              width: 24,
                              height: 24,
                            },
                            '@media (max-width: 375px)': {
                              width: 20,
                              height: 20,
                            },
                          }}>
                            <Chat fontSize="small" sx={{
                              '@media (max-width: 600px)': {
                                fontSize: '0.9rem',
                              },
                              '@media (max-width: 480px)': {
                                fontSize: '0.8rem',
                              },
                              '@media (max-width: 375px)': {
                                fontSize: '0.7rem',
                              },
                            }} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box display="flex" alignItems="center" gap={1} sx={{
                              '@media (max-width: 600px)': {
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: 0.5,
                              },
                            }}>
                              <Typography variant="body2" fontWeight="medium" sx={{
                                '@media (max-width: 600px)': {
                                  fontSize: '0.85rem',
                                },
                                '@media (max-width: 480px)': {
                                  fontSize: '0.8rem',
                                },
                                '@media (max-width: 375px)': {
                                  fontSize: '0.75rem',
                                },
                              }}>
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
                                  '@media (max-width: 600px)': {
                                    fontSize: '0.65rem',
                                    height: 18,
                                  },
                                  '@media (max-width: 480px)': {
                                    fontSize: '0.6rem',
                                    height: 16,
                                  },
                                  '@media (max-width: 375px)': {
                                    fontSize: '0.55rem',
                                    height: 14,
                                  },
                                }}
                              />
                            </Box>
                          }
                          secondary={
                            // Arrange timestamp left, Resume Chat button right in one row
                            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} mt={0.5}>
                              <Box display="flex" alignItems="center" gap={1}>
                                <AccessTime fontSize="small" sx={{ 
                                  color: 'text.disabled',
                                  '@media (max-width: 600px)': {
                                    fontSize: '0.9rem',
                                  },
                                  '@media (max-width: 480px)': {
                                    fontSize: '0.8rem',
                                  },
                                  '@media (max-width: 375px)': {
                                    fontSize: '0.7rem',
                                  },
                                }} />
                                <Typography variant="caption" color="text.disabled" sx={{
                                  '@media (max-width: 600px)': {
                                    fontSize: '0.7rem',
                                  },
                                  '@media (max-width: 480px)': {
                                    fontSize: '0.65rem',
                                  },
                                  '@media (max-width: 375px)': {
                                    fontSize: '0.6rem',
                                  },
                                }}>
                                  Started {new Date(session.created_at).toLocaleString()}
                                </Typography>
                              </Box>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSessionClick(session);
                                }}
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
                              >
                                Resume Chat
                              </Button>
                            </Box>
                          }
                        />
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
            '@media (max-width: 1200px)': {
              borderBottomLeftRadius: 14,
              borderBottomRightRadius: 14,
              p: 1.8,
            },
            '@media (max-width: 960px)': {
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              p: 1.6,
            },
            '@media (max-width: 600px)': {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              p: 1.4,
            },
            '@media (max-width: 480px)': {
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              p: 1.2,
            },
            '@media (max-width: 375px)': {
              borderBottomLeftRadius: 6,
              borderBottomRightRadius: 6,
              p: 1,
            },
          }}
        >
          <Button onClick={onClose} sx={{
            '@media (max-width: 600px)': {
              fontSize: '0.85rem',
            },
            '@media (max-width: 480px)': {
              fontSize: '0.8rem',
            },
            '@media (max-width: 375px)': {
              fontSize: '0.75rem',
            },
          }}>Close</Button>
          <Button 
            onClick={loadSessions} 
            variant="outlined"
            disabled={loading}
            sx={{
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
          >
            Refresh
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default SessionsManager;