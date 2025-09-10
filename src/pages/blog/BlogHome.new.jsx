import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardMedia,
  Button,
  Chip,
  styled
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  AccessTime, 
  Person, 
  TrendingUp, 
  Psychology,
  Whatshot,
  AutoAwesome,
  Timeline,
  Code
} from '@mui/icons-material';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  background: `
    radial-gradient(ellipse at center top, rgba(99, 102, 241, 0.15) 0%, transparent 70%),
    radial-gradient(ellipse at center bottom, rgba(139, 92, 246, 0.1) 0%, transparent 70%),
    linear-gradient(180deg, #0c0c0c 0%, #050505 100%)
  `,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 50%)
    `,
    animation: 'pulse 4s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: 0.6 },
    '50%': { opacity: 1 },
  }
}));

const HeroContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: '800px',
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(0, 2.5),
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 800,
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #ffffff 0%, #6366f1 50%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  [theme.breakpoints.down('xl')]: {
    fontSize: '3.5rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '2rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: theme.spacing(4),
  color: '#a0a0a0',
  lineHeight: 1.4,
  fontWeight: 400,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));

const HeroDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: '#666666',
  marginBottom: theme.spacing(6),
  lineHeight: 1.6,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

const HeroCTA = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  color: '#ffffff',
  fontSize: '1.2rem',
  fontWeight: 600,
  padding: theme.spacing(2, 5),
  borderRadius: '50px',
  textTransform: 'none',
  transition: 'all 0.4s ease',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
  '&:hover': {
    background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(99, 102, 241, 0.6)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.6s ease',
  },
  '&:hover::before': {
    left: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    padding: theme.spacing(1.5, 4),
  },
}));

// Continue with other styled components...

function BlogHome() {
  // Your component logic here
  return (
    <>
      <Helmet>
        <title>Blog - Singularity Insights</title>
        <meta name="description" content="Explore the latest insights on AI, technology, and the future of humanity" />
      </Helmet>
      
      <HeroSection>
        <HeroContent>
          <HeroTitle variant="h1">
            Exploring the Future of Technology
          </HeroTitle>
          <HeroSubtitle variant="h2">
            Insights on AI, Singularity, and Beyond
          </HeroSubtitle>
          <HeroDescription>
            Discover the latest trends, research, and thought leadership on emerging technologies
            that are shaping our future.
          </HeroDescription>
          <HeroCTA variant="contained" component={Link} to="/blog/posts">
            Read Latest Articles
          </HeroCTA>
        </HeroContent>
      </HeroSection>

      {/* Rest of your component */}
    </>
  );
}

export default BlogHome;
