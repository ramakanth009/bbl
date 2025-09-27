import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { FaRocket, FaBrain, FaPlayCircle } from 'react-icons/fa';

const HeroSection = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/dashboard');
  };
  
  const handleWatchDemo = () => {
    // You can either navigate to a demo page or open a video modal
    // For now, we'll navigate to the dashboard
    navigate('/dashboard');
  };
  return (
    <Box 
      component="section" 
      sx={{
        position: 'relative',
        display: 'flex',
        // minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '20px',
        paddingBottom: '20px',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(48px)',
          zIndex: 0,
        },
        '&::before': {
          top: '-50%',
          right: '-25%',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
        },
        '&::after': {
          bottom: '-50%',
          left: '-25%',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(129, 140, 248, 0.1)',
        },
      }}
    >
      <Box 
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          textAlign: 'center',
        }}
      >
        <Box 
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '9999px',
            padding: '4px 16px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#ffffff',
            backdropFilter: 'blur(4px)',
            '& span': {
              color: '#6366f1',
              marginRight: '8px',
            },
          }}
        >
          <span>✦</span> Gigaspace
        </Box>
        
        <Typography 
          variant="h1" 
          sx={{
            fontSize: {
              xs: '2.5rem',
              sm: '3.5rem',
              md: '4.5rem'
            },
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '24px',
            background: 'linear-gradient(90deg, #6366f1, #818cf8, #4f46e5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% auto',
            animation: 'gradient 8s ease infinite',
            '@keyframes gradient': {
              '0%, 100%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
            },
          }}
        >
          Chat with Legends
        </Typography>
        
        <Typography 
          sx={{
            fontSize: {
              xs: '1.1rem',
              md: '1.25rem'
            },
            fontWeight: 500,
            color: '#a0a0a0',
            maxWidth: '800px',
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          Experience Real Conversations with Your Favourite Personalities
        </Typography>
        
        <Box maxWidth="800px" margin="0 auto 24px">
          <Box 
            sx={{
              background: 'linear-gradient(145deg, rgba(31,31,35,0.7), rgba(31,31,35,0.4))',
              border: '1px solid rgba(99, 102, 241, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              textAlign: 'left',
              '& p': {
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: '#a0a0a0',
                margin: 0,
              },
            }}
          >
            <Box 
              sx={{
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                borderRadius: '12px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginRight: '16px',
                '& svg': {
                  color: '#ffffff',
                  fontSize: '1rem',
                },
              }}
            >
              <FaRocket />
            </Box>
            <Typography>
              Step into a world where intelligence meets personality. Gigaspace, a flagship product of Gigaversity, is more than just an AI chat platform — it's a gateway to conversations with legendary minds, visionary leaders, iconic entrepreneurs, inspiring celebrities, and even fictional heroes.
            </Typography>
          </Box>
          
          <Box 
            sx={{
              background: 'linear-gradient(145deg, rgba(31,31,35,0.7), rgba(31,31,35,0.4))',
              border: '1px solid rgba(99, 102, 241, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              textAlign: 'left',
              '& p': {
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: '#a0a0a0',
                margin: 0,
              },
            }}
          >
            <Typography sx={{ marginRight: '16px' }}>
              With an added layer of mindset, Gigaspace allows you to experience how personalities think, respond, and communicate—just as they would in real life.
            </Typography>
            <Box 
              sx={{
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                borderRadius: '12px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                '& svg': {
                  color: '#ffffff',
                  fontSize: '1rem',
                },
              }}
            >
              <FaBrain />
            </Box>
          </Box>
        </Box>
        
        <Box 
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '40px',
            '& button': {
              borderRadius: '9999px',
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<FaRocket />}
            onClick={handleGetStarted}
            sx={{
              padding: '12px 28px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              marginRight: '16px',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FaPlayCircle />}
            onClick={handleWatchDemo}
            sx={{
              padding: '12px 28px',
              fontSize: '1rem',
              fontWeight: 500,
              borderRadius: '8px',
              textTransform: 'none',
              color: '#ffffff',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Watch Demo
          </Button>
        </Box>
      </Box>
      
      {/* Global styles for keyframes */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </Box>
  );
};

export default HeroSection;