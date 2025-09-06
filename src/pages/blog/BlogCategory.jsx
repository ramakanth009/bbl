import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Breadcrumbs
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Helmet } from 'react-helmet-async';
import { AccessTime, Person, ArrowBack, NavigateNext } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  categoryPage: {
    paddingTop: '40px',
    paddingBottom: '80px',
  },
  backButton: {
    marginBottom: '20px',
    color: '#667eea !important',
    textTransform: 'none !important',
    '&:hover': {
      backgroundColor: 'rgba(102, 126, 234, 0.1) !important',
    }
  },
  breadcrumbs: {
    marginBottom: '30px',
    '& .MuiBreadcrumbs-separator': {
      color: '#9ca3af',
    },
    '& a': {
      color: '#667eea',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      }
    },
    '& .MuiTypography-root': {
      color: '#9ca3af',
    }
  },
  categoryHeader: {
    marginBottom: '50px',
    textAlign: 'center',
  },
  categoryTitle: {
    fontSize: '3rem !important',
    fontWeight: '700 !important',
    color: '#ffffff !important',
    marginBottom: '20px !important',
    '@media (max-width: 768px)': {
      fontSize: '2.2rem !important',
    }
  },
  categoryDescription: {
    fontSize: '1.3rem !important',
    color: '#9ca3af !important',
    lineHeight: '1.6 !important',
    maxWidth: '600px',
    margin: '0 auto',
  },
  categoryStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  statItem: {
    textAlign: 'center',
    '& .number': {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#667eea',
      display: 'block',
    },
    '& .label': {
      fontSize: '0.9rem',
      color: '#9ca3af',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    }
  },
  blogCard: {
    backgroundColor: '#1a1a2e !important',
    border: '1px solid rgba(255,255,255,0.1) !important',
    borderRadius: '16px !important',
    overflow: 'hidden',
    transition: 'all 0.3s ease !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3) !important',
      borderColor: 'rgba(102, 126, 234, 0.5) !important',
    }
  },
  blogCardMedia: {
    height: 200,
    backgroundSize: 'cover !important',
    backgroundPosition: 'center !important',
  },
  blogCardContent: {
    padding: '24px !important',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  blogTitle: {
    fontSize: '1.3rem !important',
    fontWeight: '600 !important',
    color: '#ffffff !important',
    marginBottom: '12px !important',
    lineHeight: '1.4 !important',
  },
  blogExcerpt: {
    color: '#9ca3af !important',
    lineHeight: '1.6 !important',
    marginBottom: '16px !important',
    flexGrow: 1,
  },
  blogMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginTop: 'auto',
    paddingTop: '16px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#9ca3af',
    fontSize: '0.875rem',
  },
  categoryChip: {
    backgroundColor: 'rgba(102, 126, 234, 0.2) !important',
    color: '#667eea !important',
    fontWeight: '500 !important',
    fontSize: '0.75rem !important',
    marginBottom: '12px !important',
  },
  loadMoreButton: {
    marginTop: '50px',
    textAlign: 'center',
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    '& h3': {
      color: '#ffffff',
      marginBottom: '16px',
    },
    '& p': {
      color: '#9ca3af',
      marginBottom: '30px',
    }
  }
}));

// Sample category data
const categoryData = {
  "ai-technology": {
    title: "AI Technology",
    description: "Explore the cutting-edge world of artificial intelligence, machine learning, and conversational AI technology that powers GigaSpace.",
    stats: { articles: 15, views: "12.5K", likes: "892" }
  },
  "famous-personalities": {
    title: "Famous Personalities",
    description: "Discover insights about conversations with celebrities, entrepreneurs, athletes, and modern icons who have shaped our world.",
    stats: { articles: 24, views: "18.2K", likes: "1.3K" }
  },
  "historical-figures": {
    title: "Historical Figures",
    description: "Learn from the wisdom of historical leaders, freedom fighters, scientists, and philosophers who have influenced humanity.",
    stats: { articles: 18, views: "15.8K", likes: "1.1K" }
  },
  "how-to-guides": {
    title: "How-to Guides",
    description: "Step-by-step guides to maximize your AI chat experiences, improve conversations, and get the most out of GigaSpace.",
    stats: { articles: 12, views: "9.7K", likes: "756" }
  },
  "success-stories": {
    title: "Success Stories",
    description: "Real stories from users who have transformed their learning and growth through AI conversations on GigaSpace.",
    stats: { articles: 8, views: "6.3K", likes: "445" }
  }
};

// Sample posts by category
const postsByCategory = {
  "ai-technology": [
    {
      id: 1,
      title: "The Science Behind AI Historical Figures Chat",
      excerpt: "Understanding the technology that powers GigaSpace's revolutionary approach to bringing historical personalities to life through advanced AI.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
      author: "Tech Team",
      readTime: "10 min read",
      date: "January 10, 2025",
      slug: "science-behind-ai-historical-figures"
    },
    {
      id: 2,
      title: "AI Chat Platform Revolution: The Future of Learning",
      excerpt: "How AI chat platforms like GigaSpace are transforming education by making historical knowledge interactive and personalized.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      author: "Education Research Team",
      readTime: "9 min read",
      date: "January 3, 2025",
      slug: "ai-chat-platform-revolution-future-learning"
    },
    {
      id: 3,
      title: "Natural Language Processing in Character AI",
      excerpt: "Deep dive into how NLP technology enables realistic conversations with AI personalities, making interactions feel authentic.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      author: "Dr. Sarah Chen",
      readTime: "12 min read",
      date: "December 28, 2024",
      slug: "nlp-character-ai-conversations"
    }
  ],
  "famous-personalities": [
    {
      id: 4,
      title: "10 Life-Changing Questions to Ask Mahatma Gandhi",
      excerpt: "Explore the wisdom of the Father of the Nation through meaningful AI conversations that can transform your perspective on leadership.",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop",
      author: "Dr. Priya Sharma",
      readTime: "6 min read",
      date: "January 12, 2025",
      slug: "life-changing-questions-mahatma-gandhi"
    },
    {
      id: 5,
      title: "From Bollywood to Hollywood: Chat with Celebrities Across Cultures",
      excerpt: "Experience conversations with global cinema icons and understand how entertainment shapes culture through AI-powered discussions.",
      image: "https://images.unsplash.com/photo-1489537235181-fc05e2f7e85b?w=400&h=250&fit=crop",
      author: "Entertainment Desk",
      readTime: "5 min read",
      date: "January 5, 2025",
      slug: "bollywood-hollywood-chat-celebrities"
    },
    {
      id: 6,
      title: "Conversations with Modern Entrepreneurs: Lessons from Tech Leaders",
      excerpt: "Learn from today's most influential business leaders and understand what drives innovation in the digital age.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      author: "Business Insights Team",
      readTime: "8 min read",
      date: "December 30, 2024",
      slug: "modern-entrepreneurs-tech-leaders"
    }
  ],
  "historical-figures": [
    {
      id: 7,
      title: "Chat with Political Leaders: Learning Governance from the Best",
      excerpt: "Discover how conversations with political leaders like Abraham Lincoln and Jawaharlal Nehru can teach modern leadership principles.",
      image: "https://images.unsplash.com/photo-1541872706-d7c8c2e75191?w=400&h=250&fit=crop",
      author: "Prof. Rajesh Kumar",
      readTime: "7 min read",
      date: "January 8, 2025",
      slug: "chat-with-political-leaders-governance"
    },
    {
      id: 8,
      title: "Wisdom from Ancient Philosophers: Timeless Life Lessons",
      excerpt: "Engage with great thinkers like Socrates, Confucius, and Chanakya to understand timeless principles of wisdom and ethics.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
      author: "Philosophy Department",
      readTime: "11 min read",
      date: "January 1, 2025",
      slug: "ancient-philosophers-timeless-wisdom"
    }
  ],
  "how-to-guides": [
    {
      id: 9,
      title: "How to Chat with Famous Entrepreneurs: Insights from AI Conversations",
      excerpt: "Discover the secrets of engaging with legendary business leaders through AI. Learn how to ask the right questions and get valuable insights.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop",
      author: "GigaSpace Team",
      readTime: "8 min read",
      date: "January 15, 2025",
      slug: "how-to-chat-with-famous-entrepreneurs"
    },
    {
      id: 10,
      title: "Maximizing Your AI Chat Experience: Pro Tips and Tricks",
      excerpt: "Learn advanced techniques to get the most meaningful and insightful conversations from your AI chat sessions.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      author: "User Experience Team",
      readTime: "6 min read",
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
    // In a real app, you'd fetch this from an API
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
        <Typography variant="h4" color="white" textAlign="center">
          Category not found
        </Typography>
      </Container>
    );
  }

  const displayedPosts = posts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < posts.length;

  return (
    <>
      <Helmet>
        <title>{category.title} Articles | GigaSpace Blog</title>
        <meta name="description" content={`${category.description} Read ${category.stats.articles} articles about ${category.title.toLowerCase()} on GigaSpace blog.`} />
        <meta name="keywords" content={`${category.title}, GigaSpace blog, AI chat, ${category.title.toLowerCase()} articles`} />
        <meta property="og:title" content={`${category.title} Articles | GigaSpace Blog`} />
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
          Back to Blog
        </Button>

        <Breadcrumbs 
          separator={<NavigateNext fontSize="small" />}
          className={classes.breadcrumbs}
        >
          <Link to="/blog">Blog</Link>
          <Typography>{category.title}</Typography>
        </Breadcrumbs>

        <Box className={classes.categoryHeader}>
          <Typography variant="h1" className={classes.categoryTitle}>
            {category.title}
          </Typography>
          <Typography className={classes.categoryDescription}>
            {category.description}
          </Typography>
          
          <Box className={classes.categoryStats}>
            <Box className={classes.statItem}>
              <span className="number">{category.stats.articles}</span>
              <span className="label">Articles</span>
            </Box>
            <Box className={classes.statItem}>
              <span className="number">{category.stats.views}</span>
              <span className="label">Views</span>
            </Box>
            <Box className={classes.statItem}>
              <span className="number">{category.stats.likes}</span>
              <span className="label">Likes</span>
            </Box>
          </Box>
        </Box>

        {posts.length === 0 ? (
          <Box className={classes.emptyState}>
            <Typography variant="h3">No articles yet</Typography>
            <Typography>
              We're working on creating amazing content for this category. 
              Check back soon for new articles!
            </Typography>
            <Button
              component={Link}
              to="/blog"
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Explore Other Categories
            </Button>
          </Box>
        ) : (
          <>
            <Grid container spacing={4}>
              {displayedPosts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card className={classes.blogCard}>
                    <CardMedia
                      className={classes.blogCardMedia}
                      image={post.image}
                      title={post.title}
                    />
                    <CardContent className={classes.blogCardContent}>
                      <Chip 
                        label={category.title} 
                        className={classes.categoryChip}
                        size="small"
                      />
                      <Typography variant="h4" className={classes.blogTitle}>
                        <Link 
                          to={`/blog/post/${post.slug}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {post.title}
                        </Link>
                      </Typography>
                      <Typography className={classes.blogExcerpt}>
                        {post.excerpt}
                      </Typography>
                      <Box className={classes.blogMeta}>
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
                </Grid>
              ))}
            </Grid>

            {hasMorePosts && (
              <Box className={classes.loadMoreButton}>
                <Button
                  onClick={loadMorePosts}
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: '#667eea',
                    color: '#667eea',
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '12px 30px',
                    '&:hover': {
                      borderColor: '#764ba2',
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    }
                  }}
                >
                  Load More Articles
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
}