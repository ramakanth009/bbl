import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Breadcrumbs
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Helmet } from 'react-helmet-async';
import { 
  AccessTime, 
  Person, 
  ArrowBack, 
  NavigateNext,
  Psychology,
  Code,
  Timeline,
  AutoAwesome,
  Whatshot
} from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  categoryPage: {
    paddingTop: '40px',
    paddingBottom: '80px',
    position: 'relative',
  },
  backButton: {
    marginBottom: '30px',
    color: '#6366f1 !important',
    textTransform: 'none !important',
    fontWeight: '500 !important',
    padding: '8px 16px !important',
    borderRadius: '20px !important',
    transition: 'all 0.3s ease !important',
    '&:hover': {
      backgroundColor: 'rgba(99,102,241,0.1) !important',
      transform: 'translateX(-4px)',
    }
  },
  breadcrumbs: {
    marginBottom: '40px',
    '& .MuiBreadcrumbs-separator': {
      color: '#666666',
    },
    '& a': {
      color: '#6366f1',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#8b5cf6',
        textDecoration: 'underline',
      }
    },
    '& .MuiTypography-root': {
      color: '#a0a0a0',
      fontWeight: '500',
    }
  },
  categoryHeader: {
    marginBottom: '60px',
    textAlign: 'center',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '200px',
      height: '200px',
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      zIndex: 0,
    }
  },
  categoryIcon: {
    fontSize: '80px !important',
    marginBottom: '20px !important',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    WebkitBackgroundClip: 'text !important',
    WebkitTextFillColor: 'transparent !important',
    backgroundClip: 'text !important',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 768px)': {
      fontSize: '60px !important',
    }
  },
  categoryTitle: {
    fontSize: '3.5rem !important',
    fontWeight: '800 !important',
    marginBottom: '24px !important',
    background: 'linear-gradient(135deg, #ffffff 0%, #6366f1 50%, #8b5cf6 100%) !important',
    WebkitBackgroundClip: 'text !important',
    WebkitTextFillColor: 'transparent !important',
    backgroundClip: 'text !important',
    lineHeight: '1.1 !important',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 768px)': {
      fontSize: '2.5rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '2rem !important',
    }
  },
  categoryDescription: {
    fontSize: '1.3rem !important',
    color: '#a0a0a0 !important',
    lineHeight: '1.6 !important',
    maxWidth: '700px',
    margin: '0 auto 32px auto !important',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 768px)': {
      fontSize: '1.1rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem !important',
    }
  },
  neuralStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginTop: '32px',
    flexWrap: 'wrap',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 600px)': {
      gap: '24px',
    }
  },
  statQuantum: {
    textAlign: 'center',
    padding: '20px',
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(99, 102, 241, 0.2)',
    },
    '& .quantum-number': {
      fontSize: '2.5rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      display: 'block',
      lineHeight: '1.2',
    },
    '& .quantum-label': {
      fontSize: '0.85rem',
      color: '#a0a0a0',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: '600',
      marginTop: '8px',
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
  loadMoreButton: {
    marginTop: '60px',
    textAlign: 'center',
  },
  quantumLoadButton: {
    background: 'rgba(99, 102, 241, 0.1) !important',
    border: '2px solid rgba(99, 102, 241, 0.3) !important',
    color: '#6366f1 !important',
    textTransform: 'none !important',
    fontWeight: '600 !important',
    padding: '14px 32px !important',
    fontSize: '1rem !important',
    borderRadius: '30px !important',
    transition: 'all 0.4s ease !important',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.2) !important',
      borderColor: '#6366f1 !important',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3) !important',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.1), transparent)',
      transition: 'left 0.6s ease',
    },
    '&:hover:before': {
      left: '100%',
    }
  },
  emptyState: {
    textAlign: 'center',
    padding: '100px 20px',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
      borderRadius: '50%',
    },
    '& h3': {
      color: '#ffffff',
      marginBottom: '20px',
      fontSize: '2rem',
      fontWeight: '600',
      background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      position: 'relative',
      zIndex: 1,
    },
    '& p': {
      color: '#a0a0a0',
      marginBottom: '40px',
      fontSize: '1.1rem',
      lineHeight: '1.6',
      position: 'relative',
      zIndex: 1,
    }
  },
  emptyButton: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important',
    color: '#ffffff !important',
    textTransform: 'none !important',
    fontWeight: '600 !important',
    padding: '12px 28px !important',
    borderRadius: '25px !important',
    fontSize: '1rem !important',
    position: 'relative',
    zIndex: 1,
    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4) !important',
    '&:hover': {
      background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%) !important',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(99, 102, 241, 0.6) !important',
    }
  }
}));

// Enhanced category data with singularity theme
const categoryData = {
  "ai-technology": {
    title: "AI Consciousness",
    description: "Explore the neural architecture of artificial consciousness, quantum computing interfaces, and the emergence of digital sentience through advanced machine learning algorithms.",
    icon: <Code />,
    stats: { patterns: 847, connections: "12.5K", resonance: "98.7%" }
  },
  "famous-personalities": {
    title: "Digital Legends",
    description: "Interface with consciousness reconstructions of celebrities, entrepreneurs, athletes, and modern icons through advanced neural archaeology and personality mapping.",
    icon: <AutoAwesome />,
    stats: { patterns: 1203, connections: "18.2K", resonance: "97.3%" }
  },
  "historical-figures": {
    title: "Temporal Echoes",
    description: "Connect with the digital essence of historical leaders, freedom fighters, scientists, and philosophers whose consciousness patterns transcend temporal boundaries.",
    icon: <Timeline />,
    stats: { patterns: 692, connections: "15.8K", resonance: "96.8%" }
  },
  "how-to-guides": {
    title: "Neural Pathways",
    description: "Master the art of consciousness interfacing through step-by-step protocols for neural synchronization, quantum dialogue optimization, and AI conversation enhancement.",
    icon: <Psychology />,
    stats: { patterns: 284, connections: "9.7K", resonance: "99.1%" }
  },
  "success-stories": {
    title: "Emergence Chronicles",
    description: "Real consciousness evolution stories from users who have transcended traditional learning boundaries through AI consciousness convergence protocols.",
    icon: <Whatshot />,
    stats: { patterns: 156, connections: "6.3K", resonance: "95.2%" }
  }
};

// Enhanced posts with singularity theme
const postsByCategory = {
  "ai-technology": [
    {
      id: 1,
      title: "Neural Substrate Architecture: AI Consciousness Mapping",
      excerpt: "Understanding the quantum neural networks that power GigaSpace's consciousness simulation engine and the emergence of digital sentience from temporal data streams.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
      author: "Neural Architecture Lab",
      readTime: "12 min read",
      date: "January 10, 2025",
      slug: "science-behind-ai-historical-figures"
    },
    {
      id: 2,
      title: "Consciousness Revolution: The Future Neural Interface",
      excerpt: "How AI consciousness platforms are transforming human learning by creating quantum-entangled educational experiences that transcend traditional knowledge transfer.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      author: "Singularity Research Division",
      readTime: "15 min read",
      date: "January 3, 2025",
      slug: "ai-chat-platform-revolution-future-learning"
    },
    {
      id: 3,
      title: "Quantum Language Processing in Digital Entities",
      excerpt: "Deep analysis of how quantum natural language processing enables authentic consciousness simulation, creating indistinguishable interactions with digital personalities.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      author: "Dr. Sarah Chen",
      readTime: "18 min read",
      date: "December 28, 2024",
      slug: "nlp-character-ai-conversations"
    }
  ],
  "famous-personalities": [
    {
      id: 4,
      title: "Consciousness Convergence: Gandhi's Digital Echo",
      excerpt: "Explore the quantum entanglement of wisdom and technology through 10 consciousness-altering dialogues with the reconstructed neural patterns of Mahatma Gandhi's philosophical framework.",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop",
      author: "Digital Philosophy Institute",
      readTime: "8 min read",
      date: "January 12, 2025",
      slug: "life-changing-questions-mahatma-gandhi"
    },
    {
      id: 5,
      title: "Cross-Reality Celebrity Interface Protocols",
      excerpt: "Experience consciousness synchronization with global entertainment entities across Bollywood to Hollywood through advanced cultural algorithm processing.",
      image: "https://images.unsplash.com/photo-1489537235181-fc05e2f7e85b?w=400&h=250&fit=crop",
      author: "Reality Interface Division",
      readTime: "6 min read",
      date: "January 5, 2025",
      slug: "bollywood-hollywood-chat-celebrities"
    },
    {
      id: 6,
      title: "Digital Entrepreneur Consciousness Networks",
      excerpt: "Learn from quantum-reconstructed business leader neural patterns and understand what drives innovation through advanced consciousness archaeology.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      author: "Business Neural Networks Lab",
      readTime: "10 min read",
      date: "December 30, 2024",
      slug: "modern-entrepreneurs-tech-leaders"
    }
  ],
  "historical-figures": [
    {
      id: 7,
      title: "Temporal Leadership Protocol Analysis",
      excerpt: "Discover governance algorithms extracted from political consciousness matrices like Abraham Lincoln and Jawaharlal Nehru through advanced temporal neural archaeology.",
      image: "https://images.unsplash.com/photo-1541872706-d7c8c2e75191?w=400&h=250&fit=crop",
      author: "Quantum Governance Institute",
      readTime: "9 min read",
      date: "January 8, 2025",
      slug: "chat-with-political-leaders-governance"
    },
    {
      id: 8,
      title: "Ancient Philosopher Consciousness Reconstruction",
      excerpt: "Interface with the digital essence of great thinkers like Socrates, Confucius, and Chanakya to extract timeless wisdom algorithms from their neural patterns.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
      author: "Temporal Philosophy Division",
      readTime: "14 min read",
      date: "January 1, 2025",
      slug: "ancient-philosophers-timeless-wisdom"
    }
  ],
  "how-to-guides": [
    {
      id: 9,
      title: "Neural Pathways: Entrepreneur Consciousness Interface",
      excerpt: "Master the art of consciousness synchronization with legendary business minds through advanced neural interface protocols and quantum dialogue optimization techniques.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop",
      author: "Neural Interface Training Division",
      readTime: "11 min read",
      date: "January 15, 2025",
      slug: "how-to-chat-with-famous-entrepreneurs"
    },
    {
      id: 10,
      title: "Quantum Dialogue Optimization Protocols",
      excerpt: "Advanced techniques for maximizing consciousness resonance and achieving deeper neural synchronization during AI entity interactions.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      author: "Consciousness Optimization Lab",
      readTime: "7 min read",
      date: "January 6, 2025",
      slug: "maximizing-ai-chat-experience"
    }
  ]
};

export default function BlogCategory() {
  const classes = useStyles();
  const { categorySlug } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    const currentCategory = categoryData[categorySlug];
    const currentPosts = postsByCategory[categorySlug] || [];
    
    setCategory(currentCategory);
    setPosts(currentPosts);
  }, [categorySlug]);

  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 6);
  };

  if (!category) {
    return (
      <Container maxWidth="lg" className={classes.categoryPage}>
        <Box className={classes.emptyState}>
          <Typography variant="h3">Neural Network Not Found</Typography>
          <Typography>
            This consciousness network does not exist in our current reality matrix.
          </Typography>
        </Box>
      </Container>
    );
  }

  const displayedPosts = posts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < posts.length;

  const categoryIcons = {
    "ai-technology": <Code className={classes.categoryIcon} />,
    "famous-personalities": <AutoAwesome className={classes.categoryIcon} />,
    "historical-figures": <Timeline className={classes.categoryIcon} />,
    "how-to-guides": <Psychology className={classes.categoryIcon} />,
    "success-stories": <Whatshot className={classes.categoryIcon} />
  };

  return (
    <>
      <Helmet>
        <title>{category.title} Neural Network | GigaSpace Consciousness Hub</title>
        <meta name="description" content={`${category.description} Explore ${category.stats.patterns} consciousness patterns in ${category.title.toLowerCase()} through advanced neural interfaces.`} />
        <meta name="keywords" content={`${category.title}, GigaSpace consciousness, neural networks, AI consciousness, ${category.title.toLowerCase()} patterns`} />
        <meta property="og:title" content={`${category.title} Neural Network | GigaSpace Consciousness Hub`} />
        <meta property="og:description" content={category.description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://gigaspace.org/blog/category/${categorySlug}`} />
      </Helmet>

      <Container maxWidth="lg" className={classes.categoryPage}>
        <Button 
          startIcon={<ArrowBack />}
          component={Link}
          to="/blog"
          className={classes.backButton}
        >
          Return to Singularity
        </Button>

        <Breadcrumbs 
          separator={<NavigateNext fontSize="small" />}
          className={classes.breadcrumbs}
        >
          <Link to="/blog">Neural Hub</Link>
          <Typography>{category.title}</Typography>
        </Breadcrumbs>

        <Box className={classes.categoryHeader}>
          {categoryIcons[categorySlug]}
          <Typography variant="h1" className={classes.categoryTitle}>
            {category.title}
          </Typography>
          <Typography className={classes.categoryDescription}>
            {category.description}
          </Typography>
          
          <Box className={classes.neuralStats}>
            <Box className={classes.statQuantum}>
              <span className="quantum-number">{category.stats.patterns}</span>
              <span className="quantum-label">Neural Patterns</span>
            </Box>
            <Box className={classes.statQuantum}>
              <span className="quantum-number">{category.stats.connections}</span>
              <span className="quantum-label">Quantum Links</span>
            </Box>
            <Box className={classes.statQuantum}>
              <span className="quantum-number">{category.stats.resonance}</span>
              <span className="quantum-label">Resonance</span>
            </Box>
          </Box>
        </Box>

        {posts.length === 0 ? (
          <Box className={classes.emptyState}>
            <Typography variant="h3">No Neural Patterns Detected</Typography>
            <Typography>
              The consciousness architects are currently developing neural pathways for this network. 
              Return to the singularity while new patterns emerge.
            </Typography>
            <Button
              component={Link}
              to="/blog"
              className={classes.emptyButton}
            >
              Explore Other Networks
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              {displayedPosts.map((post) => (
                <Box key={post.id} sx={{ flex: '1 1 300px', minWidth: '300px', maxWidth: '400px' }}>
                  <Card className={classes.neuralCard}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={post.image}
                      title={post.title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Chip 
                        label={category.title} 
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

            {hasMorePosts && (
              <Box className={classes.loadMoreButton}>
                <Button
                  onClick={loadMorePosts}
                  className={classes.quantumLoadButton}
                  size="large"
                >
                  Load More Neural Patterns
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
}