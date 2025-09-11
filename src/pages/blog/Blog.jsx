import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, Button, TextField, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  blogContainer: {
    background: '#0c0c0c',
    minHeight: '100vh',
    color: '#ffffff',
  },
  styledContainer: {
    maxWidth: '1200px',
    padding: '4rem 2rem',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '3rem',
    textAlign: 'center',
    color: '#ffffff',
  },
  articlesGrid: {
    width: '100%',
    maxWidth: '100%',
    margin: 0,
    padding: '0 2rem',
  },
  featuredArticle: {
    background: '#1a1a1e',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
    },
  },
  featuredImage: {
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    backgroundImage: 'url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop)',
  },
  featuredTag: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  featuredContent: {
    padding: '2.5rem',
  },
  articleMeta: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    gap: '15px',
  },
  readTime: {
    color: '#a0a0a0',
    fontSize: '0.9rem',
  },
  articleTitle: {
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: '1rem',
    lineHeight: 1.3,
    color: '#ffffff',
  },
  articleExcerpt: {
    color: '#a0a0a0',
    marginBottom: '1.5rem',
    lineHeight: 1.7,
    fontSize: '1.1rem',
  },
  articleFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1.5rem',
    borderTop: '1px solid #2a2a2e',
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  authorDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  authorName: {
    fontWeight: 600,
    color: '#ffffff',
  },
  publishDate: {
    fontSize: '0.85rem',
    color: '#a0a0a0',
  },
  readMore: {
    color: '#6366f1',
    textDecoration: 'none',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#8b9aff',
      '& span': {
        transform: 'translateX(5px)',
      },
    },
    '& span': {
      transition: 'transform 0.3s ease',
    },
  },
  newsletter: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    padding: '4rem 2rem',
    margin: '5rem 0',
    borderRadius: '16px',
    textAlign: 'center',
  },
  newsletterTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#ffffff',
  },
  newsletterDescription: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: 0.9,
    color: '#ffffff',
  },
  newsletterForm: {
    display: 'flex',
    maxWidth: '400px',
    margin: '0 auto',
    gap: '1rem',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  newsletterInput: {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      '& fieldset': {
        border: 'none',
      },
    },
    '& .MuiInputBase-input': {
      padding: '1rem',
      fontSize: '1rem',
    },
  },
  newsletterButton: {
    background: '#1f1f23',
    color: '#ffffff',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      background: '#0c0c0c',
    },
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  footer: {
    background: '#0c0c0c',
    color: '#ffffff',
    padding: '2rem',
    marginTop: '5rem',
    textAlign: 'center',
    borderTop: '1px solid #2a2a2e',
  },
});

const Blog = () => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing! You\'ll receive our latest updates soon.');
      setEmail('');
    }
  };

  return (
    <Box className={classes.blogContainer}>
      <Container className={classes.styledContainer}>
        {/* Latest Articles */}
        <Box component="section">
          <Typography className={classes.sectionTitle}>Featured Article</Typography>
          <Box className={classes.articlesGrid}>
            <Card className={classes.featuredArticle}>
              <Box className={classes.featuredImage}>
                <Box className={classes.featuredTag}>Exclusive</Box>
              </Box>
              <CardContent className={classes.featuredContent}>
                <Box className={classes.articleMeta}>
                  <Typography className={classes.readTime}>8 min read</Typography>
                </Box>
                <Typography className={classes.articleTitle}>
                  GigaSpace: The AI Chat Platform to Connect with Legends from India to Across the World
                </Typography>
                <Typography className={classes.articleExcerpt}>
                  Have you ever dreamed of sitting down with Mahatma Gandhi, asking him how he ignited a 
                  freedom movement without modern tools? Or maybe wondered what advice Dr. APJ Abdul 
                  Kalam would give a young engineer today? For most of us, these dreams have always felt 
                  impossible. But now, thanks to Gigaspace, those once-impossible conversations are finally 
                  within reach.
                </Typography>
                <Box className={classes.articleFooter}>
                  <Box className={classes.author}>
                    <Box className={classes.authorDetails}>
                      <Typography className={classes.authorName}>GigaSpace Team</Typography>
                      <Typography className={classes.publishDate}>Sep 11, 2025</Typography>
                    </Box>
                  </Box>
                  <Link to="/blog/gigaspace-ai-chat-platform" className={classes.readMore}>
                    Read More <span>→</span>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      {/* Newsletter Section */}
      <Box className={classes.newsletter}>
        <Typography className={classes.newsletterTitle}>Stay Updated with GigaSpace</Typography>
        <Typography className={classes.newsletterDescription}>
          Get the latest articles, AI conversation tips, and insights from legendary personalities delivered to your inbox
        </Typography>
        <Box component="form" onSubmit={handleNewsletterSubmit} className={classes.newsletterForm}>
          <TextField
            className={classes.newsletterInput}
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className={classes.newsletterButton}>Subscribe</Button>
        </Box>
      </Box>

      {/* Footer */}
      <Box className={classes.footer}>
        <Typography color="#a0a0a0">
          &copy; 2025 GigaSpace. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Blog;
