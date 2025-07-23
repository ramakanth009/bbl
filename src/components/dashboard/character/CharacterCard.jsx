// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Box, Typography, Avatar, Chip } from '@mui/material';
// import { 
//   Message, 
//   Favorite,
//   Palette, 
//   Science, 
//   Movie, 
//   EmojiEvents, 
//   Psychology, 
//   Lightbulb,
//   Groups,
//   Category
// } from '@mui/icons-material';
// import { makeStyles } from '@mui/styles';
// import Button from '@mui/material/Button';
// import apiService from '../../../services/api'; // Adjust path as needed

// // Same icon mapping as sidebar
// const iconMap = {
//   "entertainment_arts": <Movie sx={{ fontSize: 14 }} />,
//   "fictional_anime": <Psychology sx={{ fontSize: 14 }} />,
//   "innovators_visionaries": <Lightbulb sx={{ fontSize: 14 }} />,
//   "leaders_historical": <Groups sx={{ fontSize: 14 }} />,
//   "spiritual_social": <Palette sx={{ fontSize: 14 }} />,
//   "sports_champions": <EmojiEvents sx={{ fontSize: 14 }} />,
//   "art_culture": <Palette sx={{ fontSize: 14 }} />,
//   "science": <Science sx={{ fontSize: 14 }} />,
//   "entertainment": <Movie sx={{ fontSize: 14 }} />,
// };

// const useStyles = makeStyles({
//   styledCard: {
//     background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.95) 0%, rgba(42, 42, 42, 0.8) 100%)',
//     border: '1px solid rgba(99, 102, 241, 0.2)',
//     borderRadius: '16px',
//     padding: '24px',
//     cursor: 'pointer',
//     transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
//     minHeight: 280,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     position: 'relative',
//     overflow: 'hidden',
//     backdropFilter: 'blur(10px)',
//     '&::before': {
//       content: '""',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
//       opacity: 0,
//       transition: 'opacity 0.3s ease',
//       borderRadius: '16px',
//       pointerEvents: 'none',
//     },
//     '&:hover': {
//       transform: 'translateY(-8px) scale(1.02)',
//       borderColor: 'rgba(99, 102, 241, 0.6)',
//       boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
//       '&::before': {
//         opacity: 1,
//       },
//       '& $characterAvatar': {
//         borderColor: 'rgba(99, 102, 241, 0.8)',
//         boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
//       },
//     },
//   },
//   characterHeader: {
//     display: 'flex',
//     gap: '16px',
//     marginBottom: '16px',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     minHeight: 80,
//     position: 'relative',
//     zIndex: 1,
//   },
//   characterAvatar: {
//     width: 72,
//     height: 72,
//     borderRadius: '50%',
//     border: '2px solid rgba(99, 102, 241, 0.3)',
//     transition: 'all 0.3s ease',
//   },
//   characterInfo: {
//     flex: 1,
//     minWidth: 0,
//   },
//   characterName: {
//     fontSize: '18px',
//     fontWeight: 700,
//     marginBottom: '4px',
//     background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text',
//     lineHeight: 1.2,
//     whiteSpace: 'normal',
//     overflowWrap: 'break-word',
//     wordBreak: 'break-word',
//   },
//   characterAuthor: {
//     fontSize: '12px',
//     color: '#9ca3af',
//     marginBottom: '2px',
//     whiteSpace: 'normal',
//     overflowWrap: 'break-word',
//     wordBreak: 'break-word',
//   },
//   characterType: {
//     fontSize: '11px',
//     color: '#6b7280',
//     whiteSpace: 'normal',
//     overflowWrap: 'break-word',
//     wordBreak: 'break-word',
//   },
//   categoryContainer: {
//     display: 'flex',
//     gap: '8px',
//     alignItems: 'center',
//     marginBottom: '12px',
//     flexWrap: 'wrap',
//   },
//   categoryChip: {
//     background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
//     border: '1px solid rgba(99, 102, 241, 0.3)',
//     color: '#c7d2fe',
//     fontSize: '10px',
//     height: '22px',
//     borderRadius: '11px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '4px',
//     '& .MuiChip-label': {
//       padding: '0 8px 0 4px',
//       fontWeight: 500,
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px',
//     },
//     '& .MuiChip-icon': {
//       color: '#c7d2fe',
//       marginLeft: '4px',
//       marginRight: '0px',
//     },
//   },
//   typeChip: {
//     background: 'rgba(75, 85, 99, 0.3)',
//     border: '1px solid rgba(75, 85, 99, 0.4)',
//     color: '#9ca3af',
//     fontSize: '10px',
//     height: '20px',
//     borderRadius: '10px',
//     '& .MuiChip-label': {
//       padding: '0 8px',
//       fontWeight: 500,
//     },
//   },
//   characterDescription: {
//     fontSize: '14px',
//     color: '#d1d5db',
//     lineHeight: 1.6,
//     marginBottom: '20px',
//     height: '72px',
//     overflow: 'hidden',
//     display: '-webkit-box',
//     WebkitLineClamp: 3,
//     WebkitBoxOrient: 'vertical',
//     flexGrow: 1,
//     position: 'relative',
//     zIndex: 1,
//   },
//   characterStats: {
//     display: 'flex',
//     gap: '8px',
//     alignItems: 'center',
//   },
//   actionBtn: {
//     width: '32px',
//     height: '32px',
//     border: 'none',
//     background: 'rgba(255, 255, 255, 0.05)',
//     color: '#9ca3af',
//     cursor: 'pointer',
//     borderRadius: '8px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     transition: 'all 0.3s ease',
//     backdropFilter: 'blur(10px)',
//     '&:hover': {
//       background: 'rgba(99, 102, 241, 0.2)',
//       color: '#6366f1',
//       transform: 'scale(1.1)',
//     },
//   },
//   startChatBtn: {
//     width: '100%',
//     background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
//     border: 'none',
//     color: 'white',
//     padding: '14px',
//     borderRadius: '12px',
//     fontSize: '14px',
//     fontWeight: 600,
//     cursor: 'pointer',
//     transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
//     position: 'relative',
//     overflow: 'hidden',
//     zIndex: 1,
//     textTransform: 'none',
//     '&::before': {
//       content: '""',
//       position: 'absolute',
//       top: 0,
//       left: '-100%',
//       width: '100%',
//       height: '100%',
//       background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
//       transition: 'left 0.5s ease',
//     },
//     '&:hover': {
//       transform: 'translateY(-2px)',
//       boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2)',
//       '&::before': {
//         left: '100%',
//       },
//     },
//   },
//   stat: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '4px',
//     fontSize: '12px',
//     color: '#9ca3af',
//   },
// });

// const CharacterCard = ({ character, onStartChat }) => {
//   const classes = useStyles();
//   const [categories, setCategories] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Generate random 2-digit numbers for messages and likes
//   const randomMessages = React.useMemo(() => Math.floor(Math.random() * 90) + 10, []);
//   const randomLikes = React.useMemo(() => Math.floor(Math.random() * 90) + 10, []);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const data = await apiService.getCategories();
//         if (data.categories) {
//           setCategories(data.categories);
//         }
//       } catch (err) {
//         console.error('Failed to load categories:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, []);

//   const handleStartChat = (e) => {
//     e.stopPropagation();
//     if (onStartChat) {
//       onStartChat(character);
//     }
//   };

//   const handleActionClick = (e) => {
//     e.stopPropagation();
//   };

//   // Get category display name and icon from API data
//   const getCategoryInfo = (categoryKey) => {
//     if (!categoryKey || loading) return null;
    
//     const displayName = categories[categoryKey] || categoryKey;
//     const icon = iconMap[categoryKey] || <Category sx={{ fontSize: 14 }} />;
    
//     return { displayName, icon };
//   };

//   const categoryInfo = getCategoryInfo(character.category);

//   return (
//     <Card className={classes.styledCard} elevation={0}>
//       <Box className={classes.characterHeader}>
//         <Box display="flex" gap={1.5}>
//           <Avatar 
//             src={character.img} 
//             alt={character.name} 
//             className={classes.characterAvatar} 
//           />
//           <Box className={classes.characterInfo}>
//             <Typography className={classes.characterName}>
//               {character.name}
//             </Typography>
//             <Typography className={classes.characterAuthor}>
//               by @{character.creator || 'LegendsAI'}
//             </Typography>
            
//             {/* Category Chip with Icon */}
//             <Box className={classes.categoryContainer}>
//               {categoryInfo && !loading && (
//                 <Chip 
//                   icon={categoryInfo.icon}
//                   label={categoryInfo.displayName}
//                   size="small"
//                   className={classes.categoryChip}
//                 />
//               )}
//               {loading && character.category && (
//                 <Chip 
//                   label="Loading..."
//                   size="small"
//                   className={classes.categoryChip}
//                 />
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Box>
      
//       <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//         <Typography className={classes.characterDescription}>
//           {character.description}
//         </Typography>
//       </Box>
      
//       <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
//         <Box className={classes.stat}>
//           <Message fontSize="small" />
//           <span>{randomMessages}</span>
//         </Box>
//         <Box className={classes.stat}>
//           <Favorite fontSize="small" />
//           <span>{randomLikes}</span>
//         </Box>
//       </Box>
      
//       <Button
//         className={classes.startChatBtn}
//         onClick={handleStartChat}
//         disableRipple
//       >
//         Start Chat
//       </Button>
//     </Card>
//   );
// };

// export default CharacterCard;
import React, { useMemo } from 'react';
import { Card, CardContent, Box, Typography, Avatar, Chip } from '@mui/material';
import { 
  Message, 
  Favorite,
  Palette, 
  Science, 
  Movie, 
  EmojiEvents, 
  Psychology, 
  Lightbulb,
  Groups,
  Category
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useCategories } from '../../../context/CategoriesContext'; // Import the hook

// Same icon mapping as sidebar
const iconMap = {
  "entertainment_arts": <Movie sx={{ fontSize: 14 }} />,
  "fictional_anime": <Psychology sx={{ fontSize: 14 }} />,
  "innovators_visionaries": <Lightbulb sx={{ fontSize: 14 }} />,
  "leaders_historical": <Groups sx={{ fontSize: 14 }} />,
  "spiritual_social": <Palette sx={{ fontSize: 14 }} />,
  "sports_champions": <EmojiEvents sx={{ fontSize: 14 }} />,
  "art_culture": <Palette sx={{ fontSize: 14 }} />,
  "science": <Science sx={{ fontSize: 14 }} />,
  "entertainment": <Movie sx={{ fontSize: 14 }} />,
};

const useStyles = makeStyles({
  styledCard: {
    // background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.95) 0%, rgba(42, 42, 42, 0.8) 100%)',
    background: 'transparent !important',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '16px',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    minHeight: 280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    // backdropFilter: 'blur(10px)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      borderRadius: '16px',
      pointerEvents: 'none',
    },
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      borderColor: 'rgba(99, 102, 241, 0.6)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      '&::before': {
        opacity: 1,
      },
      '& $characterAvatar': {
        borderColor: 'rgba(99, 102, 241, 0.8)',
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
      },
    },
    '@media (max-width: 1200px)': {
      padding: '20px',
      minHeight: 260,
      borderRadius: '14px',
    },
    '@media (max-width: 960px)': {
      padding: '18px',
      minHeight: 240,
      borderRadius: '12px',
      '&:hover': {
        transform: 'translateY(-6px) scale(1.015)',
      },
    },
    '@media (max-width: 600px)': {
      padding: '16px',
      minHeight: 220,
      borderRadius: '10px',
      '&:hover': {
        transform: 'translateY(-4px) scale(1.01)',
      },
    },
    '@media (max-width: 480px)': {
      padding: '14px',
      minHeight: 200,
      borderRadius: '8px',
      '&:hover': {
        transform: 'translateY(-3px) scale(1.005)',
      },
    },
    '@media (max-width: 375px)': {
      padding: '12px',
      minHeight: 180,
      borderRadius: '6px',
      '&:hover': {
        transform: 'translateY(-2px) scale(1.002)',
      },
    },
  },
  characterHeader: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 80,
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      gap: '14px',
      marginBottom: '14px',
      minHeight: 75,
    },
    '@media (max-width: 960px)': {
      gap: '12px',
      marginBottom: '12px',
      minHeight: 70,
    },
    '@media (max-width: 600px)': {
      gap: '10px',
      marginBottom: '10px',
      minHeight: 65,
    },
    '@media (max-width: 480px)': {
      gap: '8px',
      marginBottom: '8px',
      minHeight: 60,
    },
    '@media (max-width: 375px)': {
      gap: '6px',
      marginBottom: '6px',
      minHeight: 55,
    },
  },
  characterAvatar: {
    width: 72,
    height: 72,
    borderRadius: '50%',
    border: '2px solid rgba(99, 102, 241, 0.3)',
    transition: 'all 0.3s ease',
    '& img': {
      objectFit: 'cover',
      objectPosition: 'center 20%',
      
    },
    '@media (max-width: 1200px)': {
      width: 66,
      height: 66,
    },
    '@media (max-width: 960px)': {
      width: 60,
      height: 60,
    },
    '@media (max-width: 600px)': {
      width: 54,
      height: 54,
    },
    '@media (max-width: 480px)': {
      width: 48,
      height: 48,
    },
    '@media (max-width: 375px)': {
      width: 42,
      height: 42,
    },
  },
  characterInfo: {
    flex: 1,
    minWidth: 0,
  },
  characterName: {
    fontSize: '18px',
    fontWeight: "bold",
    marginBottom: '4px',
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1.2,
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    '@media (max-width: 1200px)': {
      fontSize: '17px',
    },
    '@media (max-width: 960px)': {
      fontSize: '16px',
    },
    '@media (max-width: 600px)': {
      fontSize: '15px',
    },
    '@media (max-width: 480px)': {
      fontSize: '14px',
      marginBottom: '3px',
    },
    '@media (max-width: 375px)': {
      fontSize: '13px',
      marginBottom: '2px',
    },
  },
  characterAuthor: {
    fontSize: '12px',
    color: '#ffffff',
    marginBottom: '2px',
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    '@media (max-width: 1200px)': {
      fontSize: '11px',
    },
    '@media (max-width: 960px)': {
      fontSize: '10px',
    },
    '@media (max-width: 600px)': {
      fontSize: '9px',
    },
    '@media (max-width: 480px)': {
      fontSize: '8px',
      marginBottom: '1px',
    },
    '@media (max-width: 375px)': {
      fontSize: '7px',
      marginBottom: '1px',
    },
  },
  characterType: {
    fontSize: '11px',
    color: '#ffffff',
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    '@media (max-width: 1200px)': {
      fontSize: '10px',
    },
    '@media (max-width: 960px)': {
      fontSize: '9px',
    },
    '@media (max-width: 600px)': {
      fontSize: '8px',
    },
    '@media (max-width: 480px)': {
      fontSize: '7px',
    },
    '@media (max-width: 375px)': {
      fontSize: '6px',
    },
  },
  categoryContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap',
    '@media (max-width: 1200px)': {
      gap: '7px',
      marginBottom: '11px',
    },
    '@media (max-width: 960px)': {
      gap: '6px',
      marginBottom: '10px',
    },
    '@media (max-width: 600px)': {
      gap: '5px',
      marginBottom: '9px',
    },
    '@media (max-width: 480px)': {
      gap: '4px',
      marginBottom: '8px',
    },
    '@media (max-width: 375px)': {
      gap: '3px',
      marginBottom: '7px',
    },
  },
  categoryChip: {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    color: '#ffffff',
    fontSize: '10px',
    height: '22px',
    borderRadius: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    '& .MuiChip-label': {
      padding: '0 8px 0 4px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    '& .MuiChip-icon': {
      color: '#ffffff',
      marginLeft: '4px',
      marginRight: '0px',
    },
    '@media (max-width: 1200px)': {
      fontSize: '9px',
      height: '20px',
      borderRadius: '10px',
      '& .MuiChip-label': {
        padding: '0 7px 0 3px',
        gap: '3px',
      },
      '& .MuiChip-icon': {
        marginLeft: '3px',
      },
    },
    '@media (max-width: 960px)': {
      fontSize: '8px',
      height: '18px',
      borderRadius: '9px',
      '& .MuiChip-label': {
        padding: '0 6px 0 3px',
        gap: '2px',
      },
    },
    '@media (max-width: 600px)': {
      fontSize: '7px',
      height: '16px',
      borderRadius: '8px',
      '& .MuiChip-label': {
        padding: '0 5px 0 2px',
        gap: '2px',
      },
    },
    '@media (max-width: 480px)': {
      fontSize: '6px',
      height: '14px',
      borderRadius: '7px',
      '& .MuiChip-label': {
        padding: '0 4px 0 2px',
        gap: '1px',
      },
    },
    '@media (max-width: 375px)': {
      fontSize: '5px',
      height: '12px',
      borderRadius: '6px',
      '& .MuiChip-label': {
        padding: '0 3px 0 1px',
        gap: '1px',
      },
    },
  },
  typeChip: {
    background: 'rgba(75, 85, 99, 0.3)',
    border: '1px solid rgba(75, 85, 99, 0.4)',
    color: '#9ca3af',
    fontSize: '10px',
    height: '20px',
    borderRadius: '10px',
    '& .MuiChip-label': {
      padding: '0 8px',
      fontWeight: 500,
    },
    '@media (max-width: 1200px)': {
      fontSize: '9px',
      height: '18px',
      borderRadius: '9px',
      '& .MuiChip-label': {
        padding: '0 7px',
      },
    },
    '@media (max-width: 960px)': {
      fontSize: '8px',
      height: '16px',
      borderRadius: '8px',
      '& .MuiChip-label': {
        padding: '0 6px',
      },
    },
    '@media (max-width: 600px)': {
      fontSize: '7px',
      height: '14px',
      borderRadius: '7px',
      '& .MuiChip-label': {
        padding: '0 5px',
      },
    },
    '@media (max-width: 480px)': {
      fontSize: '6px',
      height: '12px',
      borderRadius: '6px',
      '& .MuiChip-label': {
        padding: '0 4px',
      },
    },
    '@media (max-width: 375px)': {
      fontSize: '5px',
      height: '10px',
      borderRadius: '5px',
      '& .MuiChip-label': {
        padding: '0 3px',
      },
    },
  },
  characterDescription: {
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: "400 !important",
    lineHeight: 1.6,
    marginBottom: '20px',
    height: '72px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    flexGrow: 1,
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      fontSize: '13px',
      marginBottom: '18px',
      height: '66px',
    },
    '@media (max-width: 960px)': {
      fontSize: '12px',
      marginBottom: '16px',
      height: '60px',
      lineHeight: 1.5,
    },
    '@media (max-width: 600px)': {
      fontSize: '11px',
      marginBottom: '14px',
      height: '54px',
      lineHeight: 1.4,
    },
    '@media (max-width: 480px)': {
      fontSize: '10px',
      marginBottom: '12px',
      height: '48px',
      lineHeight: 1.3,
    },
    '@media (max-width: 375px)': {
      fontSize: '9px',
      marginBottom: '10px',
      height: '42px',
      lineHeight: 1.2,
    },
  },
  characterStats: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
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
  actionBtn: {
    width: '32px',
    height: '32px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#ffffff',
    cursor: 'pointer',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.2)',
      color: '#6366f1',
      transform: 'scale(1.1)',
    },
    '@media (max-width: 1200px)': {
      width: '30px',
      height: '30px',
      borderRadius: '7px',
    },
    '@media (max-width: 960px)': {
      width: '28px',
      height: '28px',
      borderRadius: '6px',
    },
    '@media (max-width: 600px)': {
      width: '26px',
      height: '26px',
      borderRadius: '5px',
    },
    '@media (max-width: 480px)': {
      width: '24px',
      height: '24px',
      borderRadius: '4px',
    },
    '@media (max-width: 375px)': {
      width: '22px',
      height: '22px',
      borderRadius: '3px',
    },
  },
  startChatBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    color: '#ffffff !important',
    padding: '14px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    textTransform: 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.5s ease',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2)',
      '&::before': {
        left: '100%',
      },
    },
    '@media (max-width: 1200px)': {
      padding: '13px',
      borderRadius: '11px',
      fontSize: '13px',
    },
    '@media (max-width: 960px)': {
      padding: '12px',
      borderRadius: '10px',
      fontSize: '12px',
      '&:hover': {
        transform: 'translateY(-1.5px)',
      },
    },
    '@media (max-width: 600px)': {
      padding: '11px',
      borderRadius: '9px',
      fontSize: '11px',
      '&:hover': {
        transform: 'translateY(-1px)',
      },
    },
    '@media (max-width: 480px)': {
      padding: '10px',
      borderRadius: '8px',
      fontSize: '10px',
      '&:hover': {
        transform: 'translateY(-0.5px)',
      },
    },
    '@media (max-width: 375px)': {
      padding: '9px',
      borderRadius: '7px',
      fontSize: '9px',
      '&:hover': {
        transform: 'translateY(-0.25px)',
      },
    },
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#ffffff',
    '@media (max-width: 1200px)': {
      fontSize: '11px',
      gap: '3px',
    },
    '@media (max-width: 960px)': {
      fontSize: '10px',
      gap: '3px',
    },
    '@media (max-width: 600px)': {
      fontSize: '9px',
      gap: '2px',
    },
    '@media (max-width: 480px)': {
      fontSize: '8px',
      gap: '2px',
    },
    '@media (max-width: 375px)': {
      fontSize: '7px',
      gap: '1px',
    },
  },
});

const CharacterCard = ({ character, onStartChat }) => {
  const classes = useStyles();
  const { categories, loading } = useCategories(); // Use the context

  // Generate random 2-digit numbers for messages and likes
  const randomMessages = useMemo(() => Math.floor(Math.random() * 90) + 10, []);
  const randomLikes = useMemo(() => Math.floor(Math.random() * 90) + 10, []);

  const handleStartChat = (e) => {
    e.stopPropagation();
    if (onStartChat) {
      onStartChat(character);
    }
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
  };

  // Get category display name and icon from context data
  const getCategoryInfo = (categoryKey) => {
    if (!categoryKey || loading) return null;
    
    const displayName = categories[categoryKey] || categoryKey;
    const icon = iconMap[categoryKey] || <Category sx={{ fontSize: 14 }} />;
    
    return { displayName, icon };
  };

  const categoryInfo = getCategoryInfo(character.category);

  return (
    <Card className={classes.styledCard} elevation={0}>
      <Box className={classes.characterHeader}>
        <Box display="flex" gap={1.5}>
          <Avatar 
            src={character.img} 
            alt={character.name} 
            className={classes.characterAvatar} 
          />
          <Box className={classes.characterInfo}>
            <Typography className={classes.characterName}>
              {character.name}
            </Typography>
            <Typography className={classes.characterAuthor}>
              by @{character.creator || 'LegendsAI'}
            </Typography>
            
            {/* Category Chip with Icon */}
            <Box className={classes.categoryContainer}>
              {categoryInfo && !loading && (
                <Chip 
                  icon={categoryInfo.icon}
                  label={categoryInfo.displayName}
                  size="small"
                  className={classes.categoryChip}
                />
              )}
              {loading && character.category && (
                <Chip 
                  label="Loading..."
                  size="small"
                  className={classes.categoryChip}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography className={classes.characterDescription}>
          {character.description}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
        <Box className={classes.stat}>
          <Message fontSize="small" />
          <span>{randomMessages}</span>
        </Box>
        <Box className={classes.stat}>
          <Favorite fontSize="small" />
          <span>{randomLikes}</span>
        </Box>
      </Box>
      
      <Button
        className={classes.startChatBtn}
        onClick={handleStartChat}
        disableRipple
      >
        Start Chat
      </Button>
    </Card>
  );
};

export default CharacterCard;