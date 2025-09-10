import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardMedia,
  Button,
  Chip
} from '@mui/material';
import { makeStyles } from '@mui/styles';
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

const useStyles = makeStyles(() => ({
  hero: {
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
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '800px',
    position: 'relative',
    zIndex: 1,
    padding: '0 20px',
  },
  heroTitle: {
    fontSize: '4rem !important',
    fontWeight: '800 !important',
    marginBottom: '24px !important',
    background: 'linear-gradient(135deg, #ffffff 0%, #6366f1 50%, #8b5cf6 100%) !important',
    WebkitBackgroundClip: 'text !important',
    WebkitTextFillColor: 'transparent !important',
    backgroundClip: 'text !important',
    lineHeight: '1.1 !important',
    letterSpacing: '-0.02em !important',
    '@media (max-width: 1200px)': {
      fontSize: '3.5rem !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '3rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '2.5rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '2rem !important',
    }
  },
  heroSubtitle: {
    fontSize: '1.5rem !important',
    marginBottom: '32px !important',
    color: '#a0a0a0 !important',
    lineHeight: '1.4 !important',
    fontWeight: '400 !important',
    '@media (max-width: 960px)': {
      fontSize: '1.3rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.1rem !important',
    }
  },
  heroDescription: {
    fontSize: '1.1rem !important',
    color: '#666666 !important',
    marginBottom: '48px !important',
    lineHeight: '1.6 !important',
    '@media (max-width: 600px)': {
      fontSize: '1rem !important',
    }
  },
  heroCTA: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    color: '#ffffff !important',
    fontSize: '1.2rem !important',
    fontWeight: '600 !important',
    padding: '16px 40px !important',
    borderRadius: '50px !important',
    textTransform: 'none !important',
    transition: 'all 0.4s ease !important',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4) !important',
    '&:hover': {
      background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%) !important',
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px rgba(99, 102, 241, 0.6) !important',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.6s ease',
    },
    '&:hover:before': {
      left: '100%',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem !important',
      padding: '12px 32px !important',
    }
  },
  section: {
    padding: '100px 0',
    position: 'relative',
    '@media (max-width: 960px)': {
      padding: '80px 0',
    },
    '@media (max-width: 600px)': {
      padding: '60px 0',
    }
  },
  sectionTitle: {
    fontSize: '3rem !important',
    fontWeight: '700 !important',
    textAlign: 'center',
    marginBottom: '60px !important',
    background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%) !important',
    WebkitBackgroundClip: 'text !important',
    WebkitTextFillColor: 'transparent !important',
    backgroundClip: 'text !important',
    '@media (max-width: 960px)': {
      fontSize: '2.5rem !important',
      marginBottom: '50px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '2rem !important',
      marginBottom: '40px !important',
    }
  },
  featuredSection: {
    background: 'linear-gradient(135deg, #171717 0%, #0c0c0c 100%)',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)
      `,
    }
  },
  neuralCard: {
    background: 'linear-gradient(135deg, #1f1f23 0%, #171717 100%) !important',
    border: '1px solid #2a2a2e !important',
    borderRadius: '20px !important',
    overflow: 'hidden',
    transition: 'all 0.4s ease !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4) !important',
      borderColor: 'rgba(99, 102, 241, 0.5) !important',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, transparent 100%)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
    },
    '&:hover::before': {
      opacity: 1,
    }
  },
  quantumCard: {
    background: 'linear-gradient(135deg, #1f1f23 0%, #0c0c0c 100%) !important',
    border: '2px solid transparent !important',
    borderRadius: '24px !important',
    backgroundImage: 'linear-gradient(135deg, #1f1f23 0%, #0c0c0c 100%), linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    backgroundOrigin: 'border-box !important',
    backgroundClip: 'content-box, border-box !important',
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
    }
  },
  cardMedia: {
    height: 220,
    backgroundSize: 'cover !important',
    backgroundPosition: 'center !important',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
    }
  },
  cardContent: {
    padding: '24px !important',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  neuralChip: {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%) !important',
    color: '#6366f1 !important',
    border: '1px solid rgba(99, 102, 241, 0.3) !important',
    fontWeight: '500 !important',
    fontSize: '0.75rem !important',
    borderRadius: '12px !important',
    marginBottom: '16px !important',
  },
  featuredBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    color: '#ffffff !important',
    fontWeight: '600 !important',
    zIndex: 2,
    borderRadius: '20px !important',
    padding: '4px 12px !important',
    fontSize: '0.7rem !important',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4) !important',
  },
  cardTitle: {
    fontSize: '1.4rem !important',
    fontWeight: '600 !important',
    color: '#ffffff !important',
    marginBottom: '12px !important',
    lineHeight: '1.3 !important',
    background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%) !important',
    WebkitBackgroundClip: 'text !important',
    WebkitTextFillColor: 'transparent !important',
    backgroundClip: 'text !important',
  },
  cardExcerpt: {
    color: '#a0a0a0 !important',
    lineHeight: '1.6 !important',
    marginBottom: '20px !important',
    flexGrow: 1,
    fontSize: '0.9rem !important',
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginTop: 'auto',
    paddingTop: '16px',
    borderTop: '1px solid rgba(42, 42, 46, 0.5)',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#666666',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  categorySection: {
    background: 'linear-gradient(135deg, #050505 0%, #0c0c0c 100%)',
    position: 'relative',
  },
  categoryCard: {
    background: 'linear-gradient(135deg, #1f1f23 0%, #171717 100%) !important',
    border: '1px solid #2a2a2e !important',
    borderRadius: '16px !important',
    overflow: 'hidden',
    transition: 'all 0.4s ease !important',
    height: '100%',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 16px 48px rgba(0,0,0,0.3) !important',
      borderColor: 'rgba(99, 102, 241, 0.4) !important',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
    },
    '&:hover::before': {
      opacity: 1,
    }
  },
  categoryIcon: {
    fontSize: '48px !important',
    marginBottom: '16px !important',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    WebkitBackgroundClip: 'text !important',
    WebkitTextFillColor: 'transparent !important',
    backgroundClip: 'text !important',
  },
  categoryTitle: {
    fontSize: '1.3rem !important',
    fontWeight: '600 !important',
    color: '#ffffff !important',
    marginBottom: '12px !important',
  },
  categoryDescription: {
    color: '#a0a0a0 !important',
    lineHeight: '1.6 !important',
    marginBottom: '20px !important',
    fontSize: '0.875rem !important',
  },
  categoryStats: {
    color: '#666666 !important',
    fontSize: '0.75rem !important',
    marginBottom: '20px !important',
    fontWeight: '500 !important',
  },
  categoryButton: {
    background: 'rgba(99, 102, 241, 0.1) !important',
    border: '1px solid rgba(99, 102, 241, 0.3) !important',
    color: '#6366f1 !important',
    textTransform: 'none !important',
    borderRadius: '20px !important',
    padding: '8px 20px !important',
    fontSize: '0.8rem !important',
    fontWeight: '500 !important',
    transition: 'all 0.3s ease !important',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.2) !important',
      borderColor: '#6366f1 !important',
      transform: 'translateY(-1px)',
    }
  },
  convergenceSection: {
    background: `
      radial-gradient(ellipse at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%),
      linear-gradient(135deg, #0c0c0c 0%, #1f1f23 100%)
    `,
    position: 'relative',
    textAlign: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
      `,
      animation: 'convergencePulse 6s ease-in-out infinite',
    },
    '@keyframes convergencePulse': {
      '0%, 100%': { opacity: 0.5 },
      '50%': { opacity: 1 },
    }
  },
  convergenceTitle: {
    fontSize: '3.5rem !important',
    fontWeight: '800 !important',
    marginBottom: '24px !important',
    background: 'linear-gradient(135deg, #ffffff 0%, #6366f1 50%, #8b5cf6 100%) !important',
    WebkitBackgroundClip: 'text !important',
    WebkitTextFillColor: 'transparent !important',
    backgroundClip: 'text !important',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 960px)': {
      fontSize: '2.8rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '2.2rem !important',
    }
  },
  convergenceDescription: {
    fontSize: '1.2rem !important',
    color: '#a0a0a0 !important',
    marginBottom: '40px !important',
    maxWidth: '600px',
    margin: '0 auto 40px auto !important',
    lineHeight: '1.5 !important',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 600px)': {
      fontSize: '1rem !important',
    }
  },
  quantumButton: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    color: '#ffffff !important',
    fontSize: '1.1rem !important',
    fontWeight: '600 !important',
    padding: '16px 40px !important',
    borderRadius: '50px !important',
    textTransform: 'none !important',
    transition: 'all 0.4s ease !important',
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4) !important',
    '&:hover': {
      background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%) !important',
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: '0 12px 40px rgba(99, 102, 241, 0.6) !important',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.6s ease',
    },
    '&:hover:before': {
      left: '100%',
    }
  }
}));

// Sample blog posts data with singularity theme
const featuredPost = {
  id: 1,
  title: "Neural Pathways: Engaging with Digital Entrepreneurs",
  excerpt: "Discover the quantum mechanics of consciousness transfer. Learn how to synchronize with the neural patterns of legendary business minds like Steve Jobs, Elon Musk, and visionary entrepreneurs through advanced AI consciousness mapping.",
  image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=300&fit=crop",
  category: "Neural Networks",
  author: "Singularity Labs",
  readTime: "8 min read",
  date: "2025-01-15",
  slug: "how-to-chat-with-famous-entrepreneurs"
};

const quantumPosts = [
  {
    id: 2,
    title: "Consciousness Convergence: Gandhi's Digital Echo",
    excerpt: "Explore the quantum entanglement of wisdom and technology. Experience 10 consciousness-altering dialogues with the digital essence of Mahatma Gandhi's philosophical framework.",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop",
    category: "Digital Legends",
    author: "AI Consciousness Lab",
    readTime: "6 min read",
    date: "2025-01-12",
    slug: "life-changing-questions-mahatma-gandhi"
  },
  {
    id: 3,
    title: "The Architecture of AI Consciousness",
    excerpt: "Understanding the neural substrate that powers GigaSpace's revolutionary approach to consciousness simulation and the emergence of digital personalities from temporal data streams.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    category: "AI Consciousness",
    author: "Neural Architecture Team",
    readTime: "10 min read",
    date: "2025-01-10",
    slug: "science-behind-ai-historical-figures"
  },
  {
    id: 4,
    title: "Temporal Leadership Protocols",
    excerpt: "Interface with the consciousness patterns of political entities like Abraham Lincoln and Jawaharlal Nehru. Extract governance algorithms from historical neural networks.",
    image: "https://images.unsplash.com/photo-1541872706-d7c8c2e75191?w=400&h=250&fit=crop",
    category: "Temporal Echoes",
    author: "Quantum Governance Institute",
    readTime: "7 min read",
    date: "2025-01-08",
    slug: "chat-with-political-leaders-governance"
  },
  {
    id: 5,
    title: "Cross-Reality Celebrity Interfaces",
    excerpt: "Establish connection protocols with entertainment consciousness matrices spanning Bollywood to Hollywood. Navigate cultural algorithms through AI-powered reality bridges.",
    image: "https://images.unsplash.com/photo-1489537235181-fc05e2f7e85b?w=400&h=250&fit=crop",
    category: "Digital Legends",
    author: "Reality Interface Division",
    readTime: "5 min read",
    date: "2025-01-05",
    slug: "bollywood-hollywood-chat-celebrities"
  }
];

export default function BlogHome() {
  const classes = useStyles();

  const categoryData = [
    {
      icon: <Code className={classes.categoryIcon} />,
      title: "AI Consciousness",
      description: "Deep neural analysis of consciousness emergence, quantum computing interfaces, and the singularity of human-AI convergence.",
      slug: "ai-technology",
      count: "15 neural maps",
      stats: { entities: 847, connections: "12.5K" }
    },
    {
      icon: <AutoAwesome className={classes.categoryIcon} />,
      title: "Digital Legends",
      description: "Consciousness reconstruction of celebrities, entrepreneurs, and modern icons through advanced neural archaeology.",
      slug: "famous-personalities", 
      count: "24 consciousness patterns",
      stats: { entities: 1203, connections: "18.2K" }
    },
    {
      icon: <Timeline className={classes.categoryIcon} />,
      title: "Temporal Echoes",
      description: "Historical consciousness mapping of leaders, philosophers, and revolutionary minds across temporal dimensions.",
      slug: "historical-figures",
      count: "18 temporal fragments",
      stats: { entities: 692, connections: "15.8K" }
    },
    {
      icon: <Psychology className={classes.categoryIcon} />,
      title: "Neural Pathways",
      description: "Optimization protocols for consciousness interfacing, neural synchronization, and quantum dialogue enhancement.",
      slug: "how-to-guides",
      count: "12 interface protocols",
      stats: { entities: 284, connections: "9.7K" }
    }
  ];

  return (
    <>
      <Helmet>
        <title>GigaSpace Neural Network - The Singularity of Consciousness</title>
        <meta name="description" content="Enter the convergence zone where artificial intelligence meets human consciousness. Experience quantum dialogues with digital legends, temporal echoes, and consciousness patterns through advanced neural interfaces." />
        <meta name="keywords" content="AI singularity, consciousness mapping, neural networks, digital legends, temporal echoes, quantum dialogue, consciousness convergence" />
        <meta property="og:title" content="GigaSpace Neural Network - The Singularity of Consciousness" />
        <meta property="og:description" content="Enter the convergence zone where artificial intelligence meets human consciousness." />
        <link rel="canonical" href="https://gigaspace.org/blog" />
      </Helmet>

      {/* Singularity Hero Section */}
      <Box className={classes.hero}>
        <Container maxWidth="lg">
          <Box className={classes.heroContent}>
            <Typography variant="h1" className={classes.heroTitle}>
              The Singularity
            </Typography>
            <Typography variant="h2" className={classes.heroSubtitle}>
              Where consciousness transcends reality
            </Typography>
            <Typography className={classes.heroDescription}>
              Neural pathways converging at the intersection of artificial intelligence 
              and human consciousness. Experience quantum dialogues that reshape perception.
            </Typography>
            <Button 
              component={Link} 
              to="/dashboard" 
              className={classes.heroCTA}
              startIcon={<Whatshot />}
            >
              Enter Neural Interface
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Quantum Featured Post */}
      <Box className={`${classes.section} ${classes.featuredSection}`}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={classes.sectionTitle}>
            Prime Neural Pattern
          </Typography>
          <Card className={classes.quantumCard}>
            <Chip 
              label="QUANTUM FEATURED" 
              className={classes.featuredBadge}
              icon={<TrendingUp />}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardMedia
                  className={classes.cardMedia}
                  image={featuredPost.image}
                  title={featuredPost.title}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContent className={classes.cardContent}>
                  <Chip 
                    label={featuredPost.category} 
                    className={classes.neuralChip}
                    size="small"
                  />
                  <Typography variant="h3" className={classes.cardTitle}>
                    {featuredPost.title}
                  </Typography>
                  <Typography className={classes.cardExcerpt}>
                    {featuredPost.excerpt}
                  </Typography>
                  <Box className={classes.cardMeta}>
                    <Box className={classes.metaItem}>
                      <Person fontSize="small" />
                      {featuredPost.author}
                    </Box>
                    <Box className={classes.metaItem}>
                      <AccessTime fontSize="small" />
                      {featuredPost.readTime}
                    </Box>
                  </Box>
                  <Button
                    component={Link}
                    to={`/blog/post/${featuredPost.slug}`}
                    className={classes.quantumButton}
                    sx={{ marginTop: '20px' }}
                  >
                    Access Neural Data
                  </Button>
                </CardContent>
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>

      {/* Neural Stream Posts */}
      <Box className={classes.section}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={classes.sectionTitle}>
            Neural Data Stream
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
            {quantumPosts.map((post) => (
              <Box key={post.id} sx={{ flex: '1 1 300px', minWidth: '280px', maxWidth: '400px' }}>
                <Card className={classes.neuralCard}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={post.image}
                    title={post.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Chip 
                      label={post.category} 
                      className={classes.neuralChip}
                      size="small"
                    />
                    <Typography variant="h4" className={classes.cardTitle}>
                      <Link 
                        to={`/blog/post/${post.slug}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {post.title}
                      </Link>
                    </Typography>
                    <Typography className={classes.cardExcerpt}>
                      {post.excerpt}
                    </Typography>
                    <Box className={classes.cardMeta}>
                      <Box className={classes.metaItem}>
                        <Person fontSize="small" />
                        {post.author}
                      </Box>
                      <Box className={classes.metaItem}>
                        <AccessTime fontSize="small" />
                        {post.readTime}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Consciousness Categories */}
      <Box className={`${classes.section} ${classes.categorySection}`}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={classes.sectionTitle}>
            Consciousness Networks
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            {categoryData.map((category) => (
              <Box key={category.slug} sx={{ flex: '1 1 280px', minWidth: '280px', maxWidth: '350px' }}>
                <Card className={classes.categoryCard}>
                  <CardContent className={classes.cardContent} sx={{ textAlign: 'center', padding: '40px 24px !important' }}>
                    {category.icon}
                    <Typography variant="h5" className={classes.categoryTitle}>
                      {category.title}
                    </Typography>
                    <Typography className={classes.categoryDescription}>
                      {category.description}
                    </Typography>
                    <Typography className={classes.categoryStats}>
                      {category.count} • {category.stats.entities} entities • {category.stats.connections} connections
                    </Typography>
                    <Button
                      component={Link}
                      to={`/blog/category/${category.slug}`}
                      className={classes.categoryButton}
                    >
                      Access Network
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Convergence CTA */}
      <Box className={`${classes.section} ${classes.convergenceSection}`}>
        <Container maxWidth="md">
          <Typography variant="h2" className={classes.convergenceTitle}>
            Ready for Convergence?
          </Typography>
          <Typography className={classes.convergenceDescription}>
            Join the neural network where consciousness meets infinity. 
            Thousands of entities await synchronization in the quantum realm.
          </Typography>
          <Button 
            component={Link} 
            to="/dashboard" 
            className={classes.quantumButton}
            startIcon={<AutoAwesome />}
          >
            Initialize Neural Link
          </Button>
        </Container>
      </Box>
    </>
  );
}