// import React, { useState } from 'react';
// import { Card, Typography, Button, Box } from '@mui/material';
// import { Add, Person } from '@mui/icons-material';
// import { makeStyles } from '@mui/styles';
// import CharacterCreationForm from './creation/CharacterCreationForm';

// const useStyles = makeStyles({
//   createCard: {
//     background: 'transparent !important',
//     border: '2px dashed rgba(99, 102, 241, 0.3)',
//     borderRadius: '16px',
//     padding: '32px 24px',
//     cursor: 'pointer',
//     transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
//     minHeight: 280,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlign: 'center',
//     position: 'relative',
//     overflow: 'hidden',
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
//       borderColor: 'rgba(99, 102, 241, 0.8)',
//       transform: 'translateY(-8px) scale(1.02)',
//       boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
//       '&::before': {
//         opacity: 1,
//       },
//       '& $createIcon': {
//         transform: 'scale(1.1) rotate(90deg)',
//         background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
//         WebkitBackgroundClip: 'text',
//         WebkitTextFillColor: 'transparent',
//         backgroundClip: 'text',
//       },
//     },
//     '@media (max-width: 1200px)': {
//       padding: '28px 20px',
//       minHeight: 260,
//       borderRadius: '14px',
//       '&::before': {
//         borderRadius: '14px',
//       },
//     },
//     '@media (max-width: 960px)': {
//       padding: '24px 16px',
//       minHeight: 240,
//       borderRadius: '12px',
//       '&::before': {
//         borderRadius: '12px',
//       },
//     },
//     '@media (max-width: 600px)': {
//       padding: '20px 12px',
//       minHeight: 220,
//       borderRadius: '10px',
//       '&::before': {
//         borderRadius: '10px',
//       },
//     },
//     '@media (max-width: 480px)': {
//       padding: '16px 8px',
//       minHeight: 200,
//       borderRadius: '8px',
//       '&::before': {
//         borderRadius: '8px',
//       },
//     },
//     '@media (max-width: 375px)': {
//       padding: '12px 4px',
//       minHeight: 180,
//       borderRadius: '6px',
//       '&::before': {
//         borderRadius: '6px',
//       },
//     },
//   },
//   createIcon: {
//     fontSize: '64px',
//     color: '#ffffff',
//     marginBottom: '16px',
//     transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
//     position: 'relative',
//     zIndex: 1,
//     '@media (max-width: 1200px)': {
//       fontSize: '60px',
//       marginBottom: '14px',
//     },
//     '@media (max-width: 960px)': {
//       fontSize: '56px',
//       marginBottom: '12px',
//     },
//     '@media (max-width: 600px)': {
//       fontSize: '52px',
//       marginBottom: '10px',
//     },
//     '@media (max-width: 480px)': {
//       fontSize: '48px',
//       marginBottom: '8px',
//     },
//     '@media (max-width: 375px)': {
//       fontSize: '44px',
//       marginBottom: '6px',
//     },
//   },
//   createTitle: {
//     fontSize: '20px',
//     fontWeight: 700,
//     marginBottom: '8px',
//     background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text',
//     position: 'relative',
//     zIndex: 1,
//     '@media (max-width: 1200px)': {
//       fontSize: '18px',
//       marginBottom: '7px',
//     },
//     '@media (max-width: 960px)': {
//       fontSize: '16px',
//       marginBottom: '6px',
//     },
//     '@media (max-width: 600px)': {
//       fontSize: '14px',
//       marginBottom: '5px',
//     },
//     '@media (max-width: 480px)': {
//       fontSize: '12px',
//       marginBottom: '4px',
//     },
//     '@media (max-width: 375px)': {
//       fontSize: '10px',
//       marginBottom: '3px',
//     },
//   },
//   createDescription: {
//     fontSize: '14px',
//     color: '#ffffff',
//     marginBottom: '20px',
//     lineHeight: 1.5,
//     maxWidth: '250px',
//     position: 'relative',
//     zIndex: 1,
//     '@media (max-width: 1200px)': {
//       fontSize: '13px',
//       marginBottom: '18px',
//       maxWidth: '230px',
//     },
//     '@media (max-width: 960px)': {
//       fontSize: '12px',
//       marginBottom: '16px',
//       maxWidth: '210px',
//     },
//     '@media (max-width: 600px)': {
//       fontSize: '11px',
//       marginBottom: '14px',
//       maxWidth: '190px',
//       lineHeight: 1.4,
//     },
//     '@media (max-width: 480px)': {
//       fontSize: '10px',
//       marginBottom: '12px',
//       maxWidth: '170px',
//       lineHeight: 1.3,
//     },
//     '@media (max-width: 375px)': {
//       fontSize: '9px',
//       marginBottom: '10px',
//       maxWidth: '150px',
//       lineHeight: 1.2,
//     },
//   },
//   startButton: {
//     background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
//     border: '1px solid rgba(99, 102, 241, 0.3)',
//     color: '#ffffff',
//     padding: '10px 20px',
//     borderRadius: '8px',
//     fontSize: '12px',
//     fontWeight: 500,
//     textTransform: 'none',
//     transition: 'all 0.3s ease',
//     backdropFilter: 'blur(10px)',
//     position: 'relative',
//     zIndex: 1,
//     '&:hover': {
//       background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%)',
//       borderColor: 'rgba(99, 102, 241, 0.6)',
//       color: '#ffffff',
//       transform: 'translateY(-2px)',
//       boxShadow: '0 8px 20px rgba(99, 102, 241, 0.2)',
//     },
//     '@media (max-width: 1200px)': {
//       padding: '9px 18px',
//       fontSize: '11px',
//       borderRadius: '7px',
//     },
//     '@media (max-width: 960px)': {
//       padding: '8px 16px',
//       fontSize: '10px',
//       borderRadius: '6px',
//     },
//     '@media (max-width: 600px)': {
//       padding: '7px 14px',
//       fontSize: '9px',
//       borderRadius: '5px',
//     },
//     '@media (max-width: 480px)': {
//       padding: '6px 12px',
//       fontSize: '8px',
//       borderRadius: '4px',
//     },
//     '@media (max-width: 375px)': {
//       padding: '5px 10px',
//       fontSize: '7px',
//       borderRadius: '3px',
//     },
//   },
//   iconWrapper: {
//     width: '80px',
//     height: '80px',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: '20px',
//     transition: 'all 0.4s ease',
//     position: 'relative',
//     zIndex: 1,
//     '$createCard:hover &': {
//       transform: 'scale(1.1)',
//     },
//     '@media (max-width: 1200px)': {
//       width: '75px',
//       height: '75px',
//       marginBottom: '18px',
//     },
//     '@media (max-width: 960px)': {
//       width: '70px',
//       height: '70px',
//       marginBottom: '16px',
//     },
//     '@media (max-width: 600px)': {
//       width: '65px',
//       height: '65px',
//       marginBottom: '14px',
//     },
//     '@media (max-width: 480px)': {
//       width: '60px',
//       height: '60px',
//       marginBottom: '12px',
//     },
//     '@media (max-width: 375px)': {
//       width: '55px',
//       height: '55px',
//       marginBottom: '10px',
//     },
//   },
//   buttonIcon: {
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
// });

// const CreateCharacterButton = ({ onCharacterCreated }) => {
//   const classes = useStyles();
//   const [showForm, setShowForm] = useState(false);

//   const handleCreateClick = () => {
//     setShowForm(true);
//   };

//   const handleFormClose = () => {
//     setShowForm(false);
//   };

//   const handleCharacterCreated = (newCharacter) => {
//     setShowForm(false);
//     if (onCharacterCreated) {
//       onCharacterCreated(newCharacter);
//     }
//   };

//   return (
//     <>
//       <Card className={classes.createCard} onClick={handleCreateClick} elevation={0}>
//         <Box className={classes.iconWrapper}>
//           <Add className={classes.createIcon} />
//         </Box>
//         <Typography className={classes.createTitle}>
//           Create Character
//         </Typography>
//         <Typography className={classes.createDescription}>
//           Design your own AI character with custom personality and traits
//         </Typography>
//         <Button
//           className={classes.startButton}
//           startIcon={<Person className={classes.buttonIcon} />}
//           size="small"
//           disableRipple
//         >
//           Start Creating
//         </Button>
//       </Card>

//       <CharacterCreationForm
//         open={showForm}
//         onClose={handleFormClose}
//         onCharacterCreated={handleCharacterCreated}
//       />
//     </>
//   );
// };

// export default CreateCharacterButton;
import React, { useState } from 'react';
import { Card, Typography, Button, Box } from '@mui/material';
import { Add, Person } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import CharacterCreationForm from './creation/CharacterCreationForm';

const useStyles = makeStyles({
  createCard: {
    background: 'transparent !important',
    border: '2px dashed rgba(99, 102, 241, 0.3)',
    borderRadius: '16px',
    padding: '32px 24px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    minHeight: 280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
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
      borderColor: 'rgba(99, 102, 241, 0.8)',
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      '&::before': {
        opacity: 1,
      },
      '& $createIcon': {
        transform: 'scale(1.1) rotate(90deg)',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      },
    },
    '@media (max-width: 1200px)': {
      padding: '28px 20px',
      minHeight: 260,
      borderRadius: '14px',
      '&::before': {
        borderRadius: '14px',
      },
    },
    '@media (max-width: 960px)': {
      padding: '24px 16px',
      minHeight: 240,
      borderRadius: '12px',
      '&::before': {
        borderRadius: '12px',
      },
    },
    // MOBILE LAYOUT - List Style
    '@media (max-width: 600px)': {
      padding: '16px !important',
      minHeight: 'auto !important',
      borderRadius: '12px !important',
      flexDirection: 'row !important',
      alignItems: 'center !important',
      gap: '12px !important',
      border: 'none !important',
      background: 'rgba(26, 26, 26, 0.6) !important',
      marginBottom: '8px !important',
      textAlign: 'left !important',
      '&:hover': {
        transform: 'none !important',
        background: 'rgba(42, 42, 42, 0.8) !important',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3) !important',
      },
      '&::before': {
        display: 'none !important',
      },
    },
  },

  // Mobile-specific list item layout
  mobileListItem: {
    '@media (max-width: 600px)': {
      display: 'flex !important',
      alignItems: 'center !important',
      gap: '12px !important',
      width: '100% !important',
      padding: '0 !important',
    },
  },

  // Mobile icon container
  mobileIconContainer: {
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'flex !important',
      width: '48px !important',
      height: '48px !important',
      borderRadius: '50% !important',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%) !important',
      alignItems: 'center !important',
      justifyContent: 'center !important',
      flexShrink: 0,
      border: '2px solid rgba(99, 102, 241, 0.4) !important',
    },
  },

  // Mobile content area
  mobileContent: {
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'flex !important',
      flexDirection: 'column !important',
      flex: 1,
      minWidth: 0,
      gap: '2px !important',
    },
  },

  // Mobile title
  mobileTitle: {
    '@media (max-width: 600px)': {
      fontSize: '16px !important',
      fontWeight: '600 !important',
      color: '#ffffff !important',
      lineHeight: '1.2 !important',
      margin: '0 !important',
    },
  },

  // Mobile description
  mobileDescription: {
    '@media (max-width: 600px)': {
      fontSize: '14px !important',
      color: '#9ca3af !important',
      lineHeight: '1.3 !important',
      margin: '0 !important',
    },
  },

  createIcon: {
    fontSize: '64px',
    color: '#ffffff',
    marginBottom: '16px',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      fontSize: '60px',
      marginBottom: '14px',
    },
    '@media (max-width: 960px)': {
      fontSize: '56px',
      marginBottom: '12px',
    },
    '@media (max-width: 600px)': {
      fontSize: '24px !important',
      margin: '0 !important',
      color: '#ffffff !important',
    },
  },
  createTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      fontSize: '18px',
      marginBottom: '7px',
    },
    '@media (max-width: 960px)': {
      fontSize: '16px',
      marginBottom: '6px',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  createDescription: {
    fontSize: '14px',
    color: '#ffffff',
    marginBottom: '20px',
    lineHeight: 1.5,
    maxWidth: '250px',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 1200px)': {
      fontSize: '13px',
      marginBottom: '18px',
      maxWidth: '230px',
    },
    '@media (max-width: 960px)': {
      fontSize: '12px',
      marginBottom: '16px',
      maxWidth: '210px',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  startButton: {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'none',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    zIndex: 1,
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%)',
      borderColor: 'rgba(99, 102, 241, 0.6)',
      color: '#ffffff',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(99, 102, 241, 0.2)',
    },
    '@media (max-width: 1200px)': {
      padding: '9px 18px',
      fontSize: '11px',
      borderRadius: '7px',
    },
    '@media (max-width: 960px)': {
      padding: '8px 16px',
      fontSize: '10px',
      borderRadius: '6px',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  iconWrapper: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    transition: 'all 0.4s ease',
    position: 'relative',
    zIndex: 1,
    '$createCard:hover &': {
      transform: 'scale(1.1)',
    },
    '@media (max-width: 1200px)': {
      width: '75px',
      height: '75px',
      marginBottom: '18px',
    },
    '@media (max-width: 960px)': {
      width: '70px',
      height: '70px',
      marginBottom: '16px',
    },
    '@media (max-width: 600px)': {
      display: 'none !important',
    },
  },
  buttonIcon: {
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.8rem',
    },
  },
});

const CreateCharacterButton = ({ onCharacterCreated }) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleCharacterCreated = (newCharacter) => {
    setShowForm(false);
    if (onCharacterCreated) {
      onCharacterCreated(newCharacter);
    }
  };

  return (
    <>
      <Card className={classes.createCard} onClick={handleCreateClick} elevation={0}>
        {/* Desktop/Tablet Layout */}
        <Box className={classes.iconWrapper}>
          <Add className={classes.createIcon} />
        </Box>
        <Typography className={classes.createTitle}>
          Create Character
        </Typography>
        <Typography className={classes.createDescription}>
          Design your own AI character with custom personality and traits
        </Typography>
        <Button
          className={classes.startButton}
          startIcon={<Person className={classes.buttonIcon} />}
          size="small"
          disableRipple
        >
          Start Creating
        </Button>

        {/* Mobile List Layout */}
        <Box className={classes.mobileListItem}>
          <Box className={classes.mobileIconContainer}>
            <Add className={classes.createIcon} />
          </Box>
          
          <Box className={classes.mobileContent}>
            <Typography className={classes.mobileTitle}>
              Create Character
            </Typography>
            <Typography className={classes.mobileDescription}>
              Design your own AI character
            </Typography>
          </Box>
        </Box>
      </Card>

      <CharacterCreationForm
        open={showForm}
        onClose={handleFormClose}
        onCharacterCreated={handleCharacterCreated}
      />
    </>
  );
};

export default CreateCharacterButton;