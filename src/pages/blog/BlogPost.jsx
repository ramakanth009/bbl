import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Chip,
  Avatar,
  Divider,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Helmet } from 'react-helmet-async';
import { AccessTime, Person, ArrowBack, Share } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  article: {
    paddingTop: '40px',
    paddingBottom: '80px',
  },
  backButton: {
    marginBottom: '30px',
    color: '#667eea !important',
    textTransform: 'none !important',
    '&:hover': {
      backgroundColor: 'rgba(102, 126, 234, 0.1) !important',
    }
  },
  articleHeader: {
    marginBottom: '40px',
    textAlign: 'center',
  },
  categoryChip: {
    backgroundColor: 'rgba(102, 126, 234, 0.2) !important',
    color: '#667eea !important',
    fontWeight: '500 !important',
    marginBottom: '20px !important',
  },
  articleTitle: {
    fontSize: '3rem !important',
    fontWeight: '700 !important',
    color: '#ffffff !important',
    marginBottom: '20px !important',
    lineHeight: '1.2 !important',
    '@media (max-width: 768px)': {
      fontSize: '2.2rem !important',
    }
  },
  articleSubtitle: {
    fontSize: '1.3rem !important',
    color: '#9ca3af !important',
    marginBottom: '30px !important',
    lineHeight: '1.6 !important',
  },
  articleMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#9ca3af',
  },
  featuredImage: {
    width: '100%',
    height: '400px',
    borderRadius: '16px',
    marginBottom: '40px',
    objectFit: 'cover',
  },
  articleContent: {
    color: '#ffffff',
    lineHeight: '1.8',
    fontSize: '1.1rem',
    '& h2': {
      fontSize: '2rem',
      fontWeight: '600',
      color: '#ffffff',
      marginTop: '40px',
      marginBottom: '20px',
    },
    '& h3': {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#ffffff',
      marginTop: '30px',
      marginBottom: '15px',
    },
    '& p': {
      marginBottom: '20px',
      color: '#e5e7eb',
    },
    '& ul, & ol': {
      marginBottom: '20px',
      paddingLeft: '20px',
      '& li': {
        marginBottom: '8px',
        color: '#e5e7eb',
      }
    },
    '& blockquote': {
      borderLeft: '4px solid #667eea',
      paddingLeft: '20px',
      margin: '30px 0',
      fontStyle: 'italic',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      padding: '20px',
      borderRadius: '8px',
    },
    '& code': {
      backgroundColor: 'rgba(102, 126, 234, 0.2)',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '0.9em',
    }
  },
  shareSection: {
    marginTop: '60px',
    padding: '30px',
    backgroundColor: 'rgba(26, 26, 46, 0.5)',
    borderRadius: '16px',
    textAlign: 'center',
  },
  relatedPosts: {
    marginTop: '80px',
  },
  sectionTitle: {
    fontSize: '2rem !important',
    fontWeight: '700 !important',
    color: '#ffffff !important',
    marginBottom: '30px !important',
  },
  relatedCard: {
    backgroundColor: '#1a1a2e !important',
    border: '1px solid rgba(255,255,255,0.1) !important',
    borderRadius: '12px !important',
    overflow: 'hidden',
    transition: 'all 0.3s ease !important',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 24px rgba(102, 126, 234, 0.2) !important',
    }
  },
  relatedCardContent: {
    padding: '20px !important',
  },
  relatedTitle: {
    fontSize: '1.1rem !important',
    fontWeight: '600 !important',
    color: '#ffffff !important',
    marginBottom: '8px !important',
  },
  relatedMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#9ca3af',
    fontSize: '0.875rem',
  }
}));

// Sample blog posts data
const blogPosts = {
  "how-to-chat-with-famous-entrepreneurs": {
    title: "How to Chat with Famous Entrepreneurs: Insights from AI Conversations",
    subtitle: "Discover the secrets of engaging with legendary business leaders through AI. Learn how to ask the right questions and get valuable insights.",
    content: `
      <h2>Introduction: The Power of AI-Powered Conversations</h2>
      <p>Imagine sitting across from Steve Jobs, discussing innovation strategies, or asking Elon Musk about his approach to solving impossible problems. With GigaSpace's revolutionary AI chat platform, these conversations are no longer just dreams—they're your new reality.</p>
      
      <p>Our platform brings together the wisdom of legendary entrepreneurs from around the world, allowing you to engage in meaningful conversations that can transform your business thinking and personal growth journey.</p>
      
      <h2>Why Chat with Famous Entrepreneurs?</h2>
      <p>Entrepreneurs have shaped our modern world through their vision, determination, and innovative thinking. By engaging with AI versions of these legendary figures, you can:</p>
      
      <ul>
        <li><strong>Learn decision-making frameworks</strong> used by successful business leaders</li>
        <li><strong>Understand risk assessment</strong> from those who've taken calculated risks and won</li>
        <li><strong>Discover innovation strategies</strong> that have created billion-dollar companies</li>
        <li><strong>Gain insights into leadership</strong> from those who've built and managed world-class teams</li>
        <li><strong>Explore failure and resilience</strong> from entrepreneurs who've overcome major setbacks</li>
      </ul>
      
      <h2>Top Questions to Ask Entrepreneurs on GigaSpace</h2>
      
      <h3>For Steve Jobs:</h3>
      <ul>
        <li>"What's your process for identifying market needs that customers don't even know they have?"</li>
        <li>"How do you balance perfectionism with the need to ship products?"</li>
        <li>"What role does intuition play in business decisions versus data?"</li>
      </ul>
      
      <h3>For Elon Musk:</h3>
      <ul>
        <li>"How do you approach problems that seem impossible to solve?"</li>
        <li>"What's your framework for prioritizing multiple ambitious projects?"</li>
        <li>"How do you maintain long-term vision while handling daily operational challenges?"</li>
      </ul>
      
      <h3>For Ratan Tata:</h3>
      <ul>
        <li>"How do you balance profit with social responsibility?"</li>
        <li>"What's your approach to building sustainable business practices?"</li>
        <li>"How do you maintain company values while scaling globally?"</li>
      </ul>
      
      <blockquote>
        "The best conversations happen when you come prepared with specific, thoughtful questions that dig deep into the entrepreneur's unique experiences and perspectives."
      </blockquote>
      
      <h2>Making the Most of Your AI Conversations</h2>
      
      <h3>1. Come Prepared with Context</h3>
      <p>Before starting your conversation, research the entrepreneur's background, major achievements, and the challenges they faced. This context will help you ask more meaningful questions and understand their responses better.</p>
      
      <h3>2. Ask Follow-up Questions</h3>
      <p>Don't settle for surface-level answers. Dig deeper with follow-up questions like:</p>
      <ul>
        <li>"Can you give me a specific example of when you applied this principle?"</li>
        <li>"What would you do differently if you were starting today?"</li>
        <li>"How did this experience change your approach to future decisions?"</li>
      </ul>
      
      <h3>3. Apply the Insights</h3>
      <p>The real value comes from applying what you learn. After each conversation, take notes on actionable insights and create a plan for implementing them in your own projects or business.</p>
      
      <h2>Featured Entrepreneurs on GigaSpace</h2>
      <p>Our platform features conversations with entrepreneurs across various industries and time periods:</p>
      
      <ul>
        <li><strong>Technology Leaders:</strong> Steve Jobs, Elon Musk, Bill Gates, Sundar Pichai</li>
        <li><strong>Business Innovators:</strong> Ratan Tata, Warren Buffett, Jeff Bezos</li>
        <li><strong>Social Entrepreneurs:</strong> Muhammad Yunus, Oprah Winfrey</li>
        <li><strong>Modern Disruptors:</strong> Mark Zuckerberg, Reed Hastings, Jack Ma</li>
      </ul>
      
      <h2>Getting Started: Your First Entrepreneur Conversation</h2>
      <p>Ready to begin your journey of learning from the world's greatest entrepreneurs? Here's how to get started:</p>
      
      <ol>
        <li><strong>Choose your entrepreneur:</strong> Start with someone whose industry or approach resonates with your current challenges</li>
        <li><strong>Prepare 3-5 specific questions:</strong> Focus on situations you're currently facing</li>
        <li><strong>Engage in the conversation:</strong> Be curious, ask follow-ups, and take notes</li>
        <li><strong>Reflect and apply:</strong> Spend time after the conversation processing the insights</li>
        <li><strong>Share your learnings:</strong> Discuss key takeaways with your team or mentors</li>
      </ol>
      
      <h2>Conclusion: Your Journey to Entrepreneurial Wisdom</h2>
      <p>The opportunity to learn from history's greatest entrepreneurs is unprecedented. Through GigaSpace's AI chat platform, you can access decades of business wisdom, innovative thinking, and hard-earned insights that can accelerate your own entrepreneurial journey.</p>
      
      <p>Whether you're a startup founder, business executive, or aspiring entrepreneur, these conversations offer a unique learning experience that combines the accessibility of modern technology with the timeless wisdom of business legends.</p>
      
      <p>Start your first conversation today and discover how the insights of great entrepreneurs can transform your approach to business and life.</p>
    `,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    category: "How-to Guides",
    author: "GigaSpace Team",
    readTime: "8 min read",
    date: "January 15, 2025",
    metaDescription: "Learn how to chat with famous entrepreneurs on GigaSpace AI platform. Discover the best questions to ask Steve Jobs, Elon Musk, and other business legends."
  },
  "life-changing-questions-mahatma-gandhi": {
    title: "10 Life-Changing Questions to Ask Mahatma Gandhi",
    subtitle: "Explore the wisdom of the Father of the Nation through meaningful AI conversations that can transform your perspective on leadership and non-violence.",
    content: `
      <h2>Introduction: Learning from the Mahatma</h2>
      <p>Mahatma Gandhi's philosophy of non-violence, truth, and peaceful resistance changed the course of history. Through GigaSpace's AI chat platform, you can now engage in meaningful conversations with the Father of the Nation and learn from his timeless wisdom.</p>
      
      <p>Gandhi's teachings extend far beyond politics and freedom movements—they offer profound insights into leadership, personal growth, conflict resolution, and living a meaningful life.</p>
      
      <h2>10 Essential Questions to Transform Your Thinking</h2>
      
      <h3>1. "How can I practice non-violence in my daily life and work?"</h3>
      <p>Gandhi's concept of Ahimsa (non-violence) wasn't just about avoiding physical harm. Learn how to apply non-violent principles in your relationships, business dealings, and personal conflicts.</p>
      
      <h3>2. "What does 'Be the change you wish to see in the world' really mean?"</h3>
      <p>This famous quote is often misunderstood. Discover Gandhi's deeper philosophy about personal transformation as the foundation for social change.</p>
      
      <h3>3. "How do you maintain hope and determination when facing seemingly impossible odds?"</h3>
      <p>Gandhi faced the British Empire with nothing but moral authority. Learn his strategies for maintaining hope and motivation during the darkest times.</p>
      
      <h3>4. "What role does simplicity play in achieving one's goals?"</h3>
      <p>Gandhi's philosophy of simple living and high thinking can offer valuable insights for our complex modern world.</p>
      
      <h3>5. "How can leaders serve without seeking power or recognition?"</h3>
      <p>Gandhi's approach to servant leadership offers timeless lessons for modern leaders in business, politics, and community organizations.</p>
      
      <blockquote>
        "You must be the change you wish to see in the world. Start with yourself, and the world will follow."
      </blockquote>
      
      <h3>6. "What is the relationship between truth (Satya) and non-violence (Ahimsa)?"</h3>
      <p>Understand how Gandhi's twin principles of truth and non-violence work together to create powerful social change.</p>
      
      <h3>7. "How do you turn enemies into allies?"</h3>
      <p>Gandhi's ability to win over opponents through moral authority offers valuable lessons for conflict resolution and negotiation.</p>
      
      <h3>8. "What role does self-discipline play in leadership?"</h3>
      <p>Learn about Gandhi's rigorous self-discipline and how it contributed to his moral authority and effectiveness as a leader.</p>
      
      <h3>9. "How can one find strength in simplicity and minimalism?"</h3>
      <p>Gandhi's lifestyle choices weren't just personal preferences—they were strategic decisions that enhanced his moral authority and effectiveness.</p>
      
      <h3>10. "What advice would you give to young people who want to create positive change?"</h3>
      <p>Discover Gandhi's timeless guidance for the next generation of changemakers and social activists.</p>
      
      <h2>Applying Gandhi's Wisdom in Modern Life</h2>
      
      <h3>In Personal Relationships</h3>
      <p>Gandhi's principles of truth, non-violence, and compassion can transform how we handle conflicts and build stronger, more authentic relationships.</p>
      
      <h3>In Professional Settings</h3>
      <p>Learn how Gandhi's approach to leadership, negotiation, and ethical decision-making can be applied in modern business and organizational contexts.</p>
      
      <h3>In Social Activism</h3>
      <p>Modern activists and social entrepreneurs can learn from Gandhi's strategies for creating sustainable social change through moral authority and non-violent resistance.</p>
      
      <h2>The Gandhi Conversation Experience on GigaSpace</h2>
      <p>When you chat with Gandhi on GigaSpace, you're not just getting quotes or historical facts. Our AI captures his unique way of thinking, his gentle but firm approach to difficult questions, and his ability to find simple solutions to complex problems.</p>
      
      <p>The conversation feels authentic because it's based on his extensive writings, speeches, and documented conversations throughout his life.</p>
      
      <h2>Conclusion: Timeless Wisdom for Modern Challenges</h2>
      <p>Gandhi's teachings remain remarkably relevant for our modern world. Whether you're facing personal challenges, professional dilemmas, or wanting to create positive change in your community, his wisdom offers practical guidance rooted in deep moral principles.</p>
      
      <p>Through GigaSpace's AI chat platform, you can access this wisdom anytime, ask follow-up questions, and explore how Gandhi's principles apply to your specific situation.</p>
    `,
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=400&fit=crop",
    category: "Famous Personalities",
    author: "Dr. Priya Sharma",
    readTime: "6 min read",
    date: "January 12, 2025",
    metaDescription: "Discover 10 life-changing questions to ask Mahatma Gandhi on GigaSpace AI platform. Learn about non-violence, leadership, and creating positive change."
  }
};

const relatedPosts = [
  {
    title: "Chat with Political Leaders: Learning Governance from the Best",
    slug: "chat-with-political-leaders-governance",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1541872706-d7c8c2e75191?w=300&h=200&fit=crop"
  },
  {
    title: "The Science Behind AI Historical Figures Chat",
    slug: "science-behind-ai-historical-figures",
    readTime: "10 min read", 
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop"
  },
  {
    title: "From Bollywood to Hollywood: Chat with Celebrities",
    slug: "bollywood-hollywood-chat-celebrities",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1489537235181-fc05e2f7e85b?w=300&h=200&fit=crop"
  }
];

export default function BlogPost() {
  const classes = useStyles();
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    const currentPost = blogPosts[slug];
    setPost(currentPost);
  }, [slug]);

  if (!post) {
    return (
      <Container maxWidth="md" className={classes.article}>
        <Typography variant="h4" color="white" textAlign="center">
          Post not found
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | GigaSpace Blog</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={`${post.title}, GigaSpace, AI chat, ${post.category}`} />
        <meta property="og:title" content={`${post.title} | GigaSpace Blog`} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | GigaSpace Blog`} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={post.image} />
        <link rel="canonical" href={`https://gigaspace.org/blog/post/${slug}`} />
      </Helmet>

      <Container maxWidth="md" className={classes.article}>
        <Button 
          startIcon={<ArrowBack />}
          component={Link}
          to="/blog"
          className={classes.backButton}
        >
          Back to Blog
        </Button>

        <Box className={classes.articleHeader}>
          <Chip label={post.category} className={classes.categoryChip} />
          <Typography variant="h1" className={classes.articleTitle}>
            {post.title}
          </Typography>
          <Typography className={classes.articleSubtitle}>
            {post.subtitle}
          </Typography>
          <Box className={classes.articleMeta}>
            <Box className={classes.metaItem}>
              <Person />
              <Typography>{post.author}</Typography>
            </Box>
            <Box className={classes.metaItem}>
              <AccessTime />
              <Typography>{post.readTime}</Typography>
            </Box>
            <Typography color="#9ca3af">{post.date}</Typography>
          </Box>
        </Box>

        <img 
          src={post.image} 
          alt={post.title}
          className={classes.featuredImage}
        />

        <Box 
          className={classes.articleContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Box className={classes.shareSection}>
          <Typography variant="h6" color="white" gutterBottom>
            Found this helpful? Share it with others!
          </Typography>
          <Button
            startIcon={<Share />}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textTransform: 'none',
              fontWeight: 600,
              marginTop: '16px'
            }}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  text: post.subtitle,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
          >
            Share Article
          </Button>
        </Box>

        <Box className={classes.relatedPosts}>
          <Typography variant="h2" className={classes.sectionTitle}>
            Related Articles
          </Typography>
          <Grid container spacing={3}>
            {relatedPosts.map((relatedPost, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className={classes.relatedCard}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={relatedPost.image}
                    alt={relatedPost.title}
                  />
                  <CardContent className={classes.relatedCardContent}>
                    <Typography className={classes.relatedTitle}>
                      <Link 
                        to={`/blog/post/${relatedPost.slug}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {relatedPost.title}
                      </Link>
                    </Typography>
                    <Box className={classes.relatedMeta}>
                      <AccessTime fontSize="small" />
                      <Typography variant="caption">
                        {relatedPost.readTime}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}