import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, Button, TextField, Grid, CardMedia, Chip } from '@mui/material';
import Footer from '../landing_page/landing_components/Footer';
import { makeStyles } from '@mui/styles';
import BlogNavbar from '../../components/blog/BlogNavbar';

const useStyles = makeStyles({
  blogContainer: {
    background: '#0c0c0c',
    minHeight: '100vh',
    color: '#ffffff',
  },
  articleCard: {
    margin: '2rem auto 0',
    width: '100%',
    '@media (max-width: 600px)': {
      marginTop: '1.5rem',
    },
    '@media (max-width: 480px)': {
      marginTop: '1rem',
    },
  },
  card: {
    background: '#1a1a1e',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
    },
    '@media (max-width: 900px)': {
      borderRadius: '12px',
    },
    '@media (max-width: 600px)': {
      borderRadius: '10px',
      boxShadow: '0 6px 22px rgba(0, 0, 0, 0.22)',
    },
  },
  cardMedia: {
    height: 240,
    objectFit: 'cover',
    '@media (max-width: 900px)': {
      height: 220,
    },
    '@media (max-width: 600px)': {
      height: 200,
    },
    '@media (max-width: 480px)': {
      height: 180,
    },
  },
  cardContent: {
    padding: '1.5rem',
    '@media (max-width: 900px)': {
      padding: '1.25rem',
    },
    '@media (max-width: 600px)': {
      padding: '1rem',
    },
  },
  articleHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
    gap: '12px',
    '@media (max-width: 600px)': {
      marginBottom: '0.5rem',
      gap: '8px',
    },
  },
  categoryChip: {
    background: 'rgba(99, 102, 241, 0.12)',
    color: '#aab0ff',
    border: '1px solid rgba(99, 102, 241, 0.35)',
    fontWeight: 600,
  },
  styledContainer: {
    maxWidth: '1200px',
    padding: '4rem 2rem',
    margin: '0 auto',
    '@media (max-width: 1200px)': {
      padding: '3rem 1.5rem',
      maxWidth: '100%',
    },
    '@media (max-width: 900px)': {
      padding: '2.5rem 1rem',
    },
    '@media (max-width: 600px)': {
      padding: '2rem 0.75rem',
    },
    '@media (max-width: 480px)': {
      padding: '1.5rem 0.5rem',
    },
    '@media (max-width: 375px)': {
      padding: '1rem 0.25rem',
    },
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '3rem',
    textAlign: 'center',
    color: '#ffffff',
    '@media (max-width: 1200px)': {
      fontSize: '2.25rem',
      marginBottom: '2.5rem',
    },
    '@media (max-width: 900px)': {
      fontSize: '2rem',
      marginBottom: '2rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.75rem',
      marginBottom: '1.5rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.5rem',
      marginBottom: '1.25rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1.25rem',
      marginBottom: '1rem',
    },
  },
  articlesGrid: {
    width: '100%',
    maxWidth: '100%',
    margin: 0,
    padding: '0 2rem',
    '@media (max-width: 1200px)': {
      padding: '0 1.5rem',
    },
    '@media (max-width: 900px)': {
      padding: '0 1rem',
    },
    '@media (max-width: 600px)': {
      padding: '0 0.5rem',
    },
    '@media (max-width: 480px)': {
      padding: '0 0.25rem',
    },
    '@media (max-width: 375px)': {
      padding: '0',
    },
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
    '@media (max-width: 900px)': {
      borderRadius: '12px',
      '&:hover': {
        transform: 'translateY(-3px)',
      },
    },
    '@media (max-width: 600px)': {
      borderRadius: '8px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25)',
      },
    },
    '@media (max-width: 480px)': {
      borderRadius: '6px',
    },
  },
  featuredImage: {
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    backgroundImage: 'url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop)',
    '@media (max-width: 1200px)': {
      height: '280px',
    },
    '@media (max-width: 900px)': {
      height: '250px',
    },
    '@media (max-width: 600px)': {
      height: '200px',
    },
    '@media (max-width: 480px)': {
      height: '180px',
    },
    '@media (max-width: 375px)': {
      height: '160px',
    },
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
    '@media (max-width: 900px)': {
      top: '15px',
      right: '15px',
      padding: '4px 12px',
      fontSize: '0.8rem',
      borderRadius: '16px',
    },
    '@media (max-width: 600px)': {
      top: '12px',
      right: '12px',
      padding: '3px 10px',
      fontSize: '0.75rem',
      borderRadius: '14px',
    },
    '@media (max-width: 480px)': {
      top: '10px',
      right: '10px',
      padding: '2px 8px',
      fontSize: '0.7rem',
      borderRadius: '12px',
    },
    '@media (max-width: 375px)': {
      top: '8px',
      right: '8px',
      padding: '2px 6px',
      fontSize: '0.65rem',
      borderRadius: '10px',
    },
  },
  featuredContent: {
    padding: '2.5rem',
    '@media (max-width: 1200px)': {
      padding: '2rem',
    },
    '@media (max-width: 900px)': {
      padding: '1.75rem',
    },
    '@media (max-width: 600px)': {
      padding: '1.5rem',
    },
    '@media (max-width: 480px)': {
      padding: '1.25rem',
    },
    '@media (max-width: 375px)': {
      padding: '1rem',
    },
  },
  articleMeta: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    gap: '15px',
    '@media (max-width: 600px)': {
      gap: '10px',
      marginBottom: '0.75rem',
    },
    '@media (max-width: 480px)': {
      gap: '8px',
      marginBottom: '0.5rem',
    },
    '@media (max-width: 375px)': {
      gap: '6px',
    },
  },
  readTime: {
    color: '#a0a0a0',
    fontSize: '0.9rem',
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.75rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.7rem',
    },
  },
  articleTitle: {
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: '1rem',
    lineHeight: 1.3,
    color: '#ffffff',
    '@media (max-width: 1200px)': {
      fontSize: '1.6rem',
    },
    '@media (max-width: 900px)': {
      fontSize: '1.4rem',
      marginBottom: '0.875rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.25rem',
      marginBottom: '0.75rem',
      lineHeight: 1.2,
    },
    '@media (max-width: 480px)': {
      fontSize: '1.125rem',
      marginBottom: '0.625rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1rem',
      marginBottom: '0.5rem',
    },
  },
  articleExcerpt: {
    color: '#a0a0a0',
    marginBottom: '1.5rem',
    lineHeight: 1.7,
    fontSize: '1.1rem',
    '@media (max-width: 1200px)': {
      fontSize: '1rem',
      marginBottom: '1.25rem',
    },
    '@media (max-width: 900px)': {
      fontSize: '0.95rem',
      marginBottom: '1rem',
      lineHeight: 1.6,
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      marginBottom: '0.875rem',
      lineHeight: 1.5,
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
      marginBottom: '0.75rem',
      lineHeight: 1.4,
    },
    '@media (max-width: 375px)': {
      fontSize: '0.8rem',
      marginBottom: '0.625rem',
      lineHeight: 1.3,
    },
  },
  articleFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1.5rem',
    borderTop: '1px solid #2a2a2e',
    '@media (max-width: 600px)': {
      paddingTop: '1rem',
      flexDirection: 'column',
      gap: '0.75rem',
      alignItems: 'flex-start',
    },
    '@media (max-width: 480px)': {
      paddingTop: '0.75rem',
      gap: '0.5rem',
    },
    '@media (max-width: 375px)': {
      paddingTop: '0.5rem',
      gap: '0.375rem',
    },
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    '@media (max-width: 600px)': {
      gap: '8px',
    },
    '@media (max-width: 480px)': {
      gap: '6px',
    },
    '@media (max-width: 375px)': {
      gap: '4px',
    },
  },
  authorDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  authorName: {
    fontWeight: 600,
    color: '#ffffff',
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.8rem',
    },
  },
  publishDate: {
    fontSize: '0.85rem',
    color: '#a0a0a0',
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.75rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.7rem',
    },
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
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      gap: '3px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
      gap: '2px',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.8rem',
      gap: '1px',
    },
  },
  newsletter: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    padding: '4rem 2rem',
    margin: '5rem 0',
    borderRadius: '16px',
    textAlign: 'center',
    '@media (max-width: 1200px)': {
      padding: '3.5rem 1.75rem',
      margin: '4rem 0',
    },
    '@media (max-width: 900px)': {
      padding: '3rem 1.5rem',
      margin: '3.5rem 0',
      borderRadius: '12px',
    },
    '@media (max-width: 600px)': {
      padding: '2.5rem 1rem',
      margin: '3rem 0',
      borderRadius: '10px',
    },
    '@media (max-width: 480px)': {
      padding: '2rem 0.75rem',
      margin: '2.5rem 0',
      borderRadius: '8px',
    },
    '@media (max-width: 375px)': {
      padding: '1.5rem 0.5rem',
      margin: '2rem 0',
      borderRadius: '6px',
    },
  },
  newsletterTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#ffffff',
    '@media (max-width: 1200px)': {
      fontSize: '2.25rem',
    },
    '@media (max-width: 900px)': {
      fontSize: '2rem',
      marginBottom: '0.875rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.75rem',
      marginBottom: '0.75rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.5rem',
      marginBottom: '0.625rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1.25rem',
      marginBottom: '0.5rem',
    },
  },
  newsletterDescription: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: 0.9,
    color: '#ffffff',
    '@media (max-width: 1200px)': {
      fontSize: '1.125rem',
      marginBottom: '1.75rem',
    },
    '@media (max-width: 900px)': {
      fontSize: '1rem',
      marginBottom: '1.5rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.95rem',
      marginBottom: '1.25rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
      marginBottom: '1rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.85rem',
      marginBottom: '0.75rem',
    },
  },
  newsletterForm: {
    display: 'flex',
    maxWidth: '400px',
    margin: '0 auto',
    gap: '1rem',
    '@media (max-width: 900px)': {
      maxWidth: '350px',
      gap: '0.75rem',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      maxWidth: '280px',
      gap: '0.5rem',
    },
    '@media (max-width: 480px)': {
      maxWidth: '240px',
    },
    '@media (max-width: 375px)': {
      maxWidth: '200px',
    },
  },
  newsletterInput: {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#6366f1',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#6366f1',
        borderWidth: '1px',
      },
      '& fieldset': {
        border: '1px solid #e2e8f0',
      },
    },
    '& .MuiInputBase-input': {
      padding: '1rem',
      fontSize: '1rem',
      color: '#1a202c',
      '&::placeholder': {
        color: '#718096',
        opacity: 1,
      },
      '@media (max-width: 600px)': {
        padding: '0.875rem',
        fontSize: '0.9rem',
      },
      '@media (max-width: 480px)': {
        padding: '0.75rem',
        fontSize: '0.85rem',
      },
      '@media (max-width: 375px)': {
        padding: '0.625rem',
        fontSize: '0.8rem',
      },
    },
    '@media (max-width: 600px)': {
      '& .MuiOutlinedInput-root': {
        borderRadius: '6px',
      },
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
    '@media (max-width: 900px)': {
      padding: '0.875rem 1.75rem',
    },
    '@media (max-width: 600px)': {
      width: '100%',
      padding: '0.875rem',
      borderRadius: '6px',
    },
    '@media (max-width: 480px)': {
      padding: '0.75rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.625rem',
      fontSize: '0.85rem',
    },
  },
  footer: {
    marginTop: '5rem',
    textAlign: 'center',
    borderTop: '1px solid #2a2a2e',
    '@media (max-width: 900px)': {
      padding: '1.75rem',
      marginTop: '4rem',
    },
    '@media (max-width: 600px)': {
      padding: '1.5rem',
      marginTop: '3rem',
    },
    '@media (max-width: 480px)': {
      padding: '1.25rem',
      marginTop: '2.5rem',
    },
    '@media (max-width: 375px)': {
      padding: '1rem',
      marginTop: '2rem',
    },
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
      <BlogNavbar />
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
            {/* Second Blog Card */}
            <Box className={classes.articleCard}>
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  height="240"
                  image="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=600&fit=crop"
                  alt="AI Technology"
                  className={classes.cardMedia}
                />
                <CardContent className={classes.cardContent}>
                  <Box className={classes.articleHeader}>
                    <Chip
                      label="Technology"
                      className={classes.categoryChip}
                      size="small"
                    />
                    <Typography className={classes.readTime}>7 min read</Typography>
                  </Box>
                  <Typography className={classes.articleTitle}>
                    How GigaSpace Brings AI Conversations to Life
                  </Typography>
                  <Typography className={classes.articleExcerpt}>
                    Artificial Intelligence has come a long way from being just a buzzword. Today, it powers tools we use daily—whether that's asking a voice assistant for directions, generating art, or analyzing data. But among these innovations, GigaSpace stands out as a unique platform that allows people to interact directly with legendary personalities...
                  </Typography>
                  <Box className={classes.articleFooter}>
                    <Box className={classes.author}>
                      <Box className={classes.authorDetails}>
                        <Typography className={classes.authorName}>GigaSpace Team</Typography>
                        <Typography className={classes.publishDate}>Sep 12, 2025</Typography>
                      </Box>
                    </Box>
                    <Link to="/blog/gigaspace-ai-conversations" className={classes.readMore}>
                      Read More <span>→</span>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Box>
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
      <Footer />
    </Box>
  );
};

export default Blog;