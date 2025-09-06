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
  Avatar
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AccessTime, Person, TrendingUp } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  hero: {
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: '#ffffff',
    padding: '80px 0',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '3rem !important',
    fontWeight: '700 !important',
    marginBottom: '20px !important',
    '@media (max-width: 768px)': {
      fontSize: '2.2rem !important',
    }
  },
  heroSubtitle: {
    fontSize: '1.3rem !important',
    marginBottom: '30px !important',
    opacity: 0.9,
    '@media (max-width: 768px)': {
      fontSize: '1.1rem !important',
    }
  },
  section: {
    padding: '60px 0',
  },
  sectionTitle: {
    fontSize: '2.5rem !important',
    fontWeight: '700 !important',
    color: '#ffffff !important',
    textAlign: 'center',
    marginBottom: '50px !important',
  },
  blogCard: {
    backgroundColor: '#1f1f23 !important',
    border: '1px solid #2a2a2e !important',
    borderRadius: '16px !important',
    overflow: 'hidden',
    transition: 'all 0.3s ease !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3) !important',
      borderColor: '#6366f1 !important',
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
    color: '#a0a0a0 !important',
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
    borderTop: '1px solid #2a2a2e',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#a0a0a0',
    fontSize: '0.875rem',
  },
  categoryChip: {
    backgroundColor: 'transparent !important',
    color: '#6366f1 !important',
    border: '1px solid #6366f1 !important',
    fontWeight: '500 !important',
    fontSize: '0.75rem !important',
  },
  featuredSection: {
    backgroundColor: '#171717',
    padding: '60px 0',
  },
  featuredCard: {
    backgroundColor: '#1f1f23 !important',
    border: '2px solid #6366f1 !important',
    borderRadius: '20px !important',
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)',
    }
  },
  featuredBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: '#6366f1 !important',
    color: '#ffffff !important',
    fontWeight: '600 !important',
    zIndex: 1,
  },
  ctaSection: {
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: '#ffffff',
    padding: '80px 0',
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#ffffff !important',
    color: '#6366f1 !important',
    fontWeight: '600 !important',
    padding: '12px 30px !important',
    fontSize: '1.1rem !important',
    borderRadius: '30px !important',
    textTransform: 'none !important',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.9) !important',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.2) !important',
    }
  }
}));

// Sample blog posts data
const featuredPost = {
  id: 1,
  title: "How to Chat with Famous Entrepreneurs: Insights from AI Conversations",
  excerpt: "Discover the secrets of engaging with legendary business leaders through AI. Learn how to ask the right questions and get valuable insights from entrepreneurs like Steve Jobs, Elon Musk, and more.",
  image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=300&fit=crop",
  category: "How-to Guides",
  author: "GigaSpace Team",
  readTime: "8 min read",
  date: "2025-01-15",
  slug: "how-to-chat-with-famous-entrepreneurs"
};

const recentPosts = [
  {
    id: 2,
    title: "10 Life-Changing Questions to Ask Mahatma Gandhi",
    excerpt: "Explore the wisdom of the Father of the Nation through meaningful AI conversations that can transform your perspective on leadership and non-violence.",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop",
    category: "Famous Personalities",
    author: "Dr. Priya Sharma",
    readTime: "6 min read",
    date: "2025-01-12",
    slug: "life-changing-questions-mahatma-gandhi"
  },
  {
    id: 3,
    title: "The Science Behind AI Historical Figures Chat",
    excerpt: "Understanding the technology that powers GigaSpace's revolutionary approach to bringing historical personalities to life through advanced AI.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    category: "AI Technology",
    author: "Tech Team",
    readTime: "10 min read",
    date: "2025-01-10",
    slug: "science-behind-ai-historical-figures"
  },
  {
    id: 4,
    title: "Chat with Political Leaders: Learning Governance from the Best",
    excerpt: "Discover how conversations with political leaders like Abraham Lincoln and Jawaharlal Nehru can teach modern leadership principles.",
    image: "https://images.unsplash.com/photo-1541872706-d7c8c2e75191?w=400&h=250&fit=crop",
    category: "Historical Figures",
    author: "Prof. Rajesh Kumar",
    readTime: "7 min read",
    date: "2025-01-08",
    slug: "chat-with-political-leaders-governance"
  },
  {
    id: 5,
    title: "From Bollywood to Hollywood: Chat with Celebrities Across Cultures",
    excerpt: "Experience conversations with global cinema icons and understand how entertainment shapes culture through AI-powered discussions.",
    image: "https://images.unsplash.com/photo-1489537235181-fc05e2f7e85b?w=400&h=250&fit=crop",
    category: "Famous Personalities",
    author: "Entertainment Desk",
    readTime: "5 min read",
    date: "2025-01-05",
    slug: "bollywood-hollywood-chat-celebrities"
  },
  {
    id: 6,
    title: "AI Chat Platform Revolution: The Future of Learning",
    excerpt: "How AI chat platforms like GigaSpace are transforming education by making historical knowledge interactive and personalized.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    category: "AI Technology",
    author: "Education Research Team",
    readTime: "9 min read",
    date: "2025-01-03",
    slug: "ai-chat-platform-revolution-future-learning"
  }
];

export default function BlogHome() {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>GigaSpace Blog - Chat with Legends, AI Technology & Famous Personalities</title>
        <meta name="description" content="Explore AI chat technology, learn how to chat with famous entrepreneurs, political leaders, and celebrities. Discover insights about historical figures and AI conversations on GigaSpace blog." />
        <meta name="keywords" content="chat with legends, AI chat platform, famous entrepreneurs, political leaders, celebrities, historical figures, AI technology blog" />
        <meta property="og:title" content="GigaSpace Blog - Chat with Legends & AI Technology" />
        <meta property="og:description" content="Explore AI chat technology, learn how to chat with famous personalities and historical figures." />
        <link rel="canonical" href="https://gigaspace.org/blog" />
      </Helmet>

      {/* Hero Section */}
      <Box className={classes.hero}>
        <Container maxWidth="lg">
          <Typography variant="h1" className={classes.heroTitle}>
            Chat with Legends Blog
          </Typography>
          <Typography variant="h2" className={classes.heroSubtitle}>
            Discover insights about AI conversations with famous personalities, 
            historical figures, and legendary entrepreneurs
          </Typography>
          <Button 
            component={Link} 
            to="/dashboard" 
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: '#ffffff', 
              color: '#6366f1', 
              fontWeight: 600,
              padding: '12px 30px',
              borderRadius: '30px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            Start Chatting with Legends
          </Button>
        </Container>
      </Box>

      {/* Featured Post Section */}
      <Box className={classes.featuredSection}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={classes.sectionTitle}>
            Featured Article
          </Typography>
          <Card className={classes.featuredCard}>
            <Chip 
              label="Featured" 
              className={classes.featuredBadge}
              icon={<TrendingUp />}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardMedia
                  className={classes.blogCardMedia}
                  image={featuredPost.image}
                  title={featuredPost.title}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContent className={classes.blogCardContent}>
                  <Chip 
                    label={featuredPost.category} 
                    className={classes.categoryChip}
                    size="small"
                  />
                  <Typography variant="h3" className={classes.blogTitle}>
                    {featuredPost.title}
                  </Typography>
                  <Typography className={classes.blogExcerpt}>
                    {featuredPost.excerpt}
                  </Typography>
                  <Box className={classes.blogMeta}>
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
                    variant="contained"
                    sx={{
                      marginTop: '20px',
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Read Full Article
                  </Button>
                </CardContent>
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>

      {/* Recent Posts Section */}
      <Box className={classes.section}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={classes.sectionTitle}>
            Latest Articles
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
            {recentPosts.map((post) => (
              <Box key={post.id} sx={{ flex: '1 1 300px', minWidth: '280px', maxWidth: '380px' }}>
                <Card className={classes.blogCard}>
                  <CardMedia
                    className={classes.blogCardMedia}
                    image={post.image}
                    title={post.title}
                  />
                  <CardContent className={classes.blogCardContent}>
                    <Chip 
                      label={post.category} 
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
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Categories Section */}
      <Box className={classes.section} sx={{ backgroundColor: '#171717' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={classes.sectionTitle}>
            Explore by Category
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            {[
              {
                title: "AI Technology",
                description: "Deep dives into AI chat technology, machine learning, and the future of conversational AI",
                slug: "ai-technology",
                count: "15 articles"
              },
              {
                title: "Famous Personalities",
                description: "Learn about conversations with celebrities, entrepreneurs, and modern icons",
                slug: "famous-personalities", 
                count: "24 articles"
              },
              {
                title: "Historical Figures",
                description: "Discover wisdom from historical leaders, freedom fighters, and legendary personalities",
                slug: "historical-figures",
                count: "18 articles"
              },
              {
                title: "How-to Guides",
                description: "Step-by-step guides on maximizing your AI chat experiences and learning",
                slug: "how-to-guides",
                count: "12 articles"
              }
            ].map((category) => (
              <Box key={category.slug} sx={{ flex: '1 1 220px', minWidth: '220px', maxWidth: '320px' }}>
                <Card className={classes.blogCard}>
                  <CardContent className={classes.blogCardContent}>
                    <Typography variant="h5" className={classes.blogTitle}>
                      {category.title}
                    </Typography>
                    <Typography className={classes.blogExcerpt}>
                      {category.description}
                    </Typography>
                    <Box sx={{ marginTop: 'auto', paddingTop: '16px' }}>
                      <Typography variant="caption" sx={{ color: '#a0a0a0', marginBottom: '12px', display: 'block' }}>
                        {category.count}
                      </Typography>
                      <Button
                        component={Link}
                        to={`/blog/category/${category.slug}`}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: '#6366f1',
                          color: '#6366f1',
                          textTransform: 'none',
                          '&:hover': {
                            borderColor: '#4f46e5',
                            backgroundColor: 'rgba(99,102,241,0.1)',
                          }
                        }}
                      >
                        Explore Category
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box className={classes.ctaSection}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '20px' }}>
            Ready to Chat with Legends?
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '30px', opacity: 0.9 }}>
            Join thousands of users discovering wisdom from history's greatest personalities
          </Typography>
          <Button 
            component={Link} 
            to="/dashboard" 
            className={classes.ctaButton}
          >
            Start Your Journey Today
          </Button>
        </Container>
      </Box>
    </>
  );
}