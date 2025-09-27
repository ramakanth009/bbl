import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Container, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FaCrown, FaHistory, FaEdit, FaArrowRight } from 'react-icons/fa';

const useStyles = makeStyles(() => ({
  section: {
    paddingTop: '40px',
    paddingBottom: '40px',
    backgroundColor: '#0c0c0c',
    '@media (max-width: 1200px)': {
      paddingTop: '36px',
      paddingBottom: '36px',
    },
    '@media (max-width: 960px)': {
      paddingTop: '32px',
      paddingBottom: '32px',
    },
    '@media (max-width: 600px)': {
      paddingTop: '24px',
      paddingBottom: '24px',
    },
    '@media (max-width: 480px)': {
      paddingTop: '20px',
      paddingBottom: '20px',
    },
    '@media (max-width: 375px)': {
      paddingTop: '16px',
      paddingBottom: '16px',
    },
  },
  container: {
    maxWidth: '1280px !important',
    '@media (max-width: 1200px)': {
      maxWidth: '1080px !important',
    },
    '@media (max-width: 960px)': {
      maxWidth: '960px !important',
    },
    '@media (max-width: 600px)': {
      maxWidth: '100% !important',
      paddingLeft: '16px !important',
      paddingRight: '16px !important',
    },
  },
  titleWrapper: {
    textAlign: 'center',
    marginBottom: '48px',
    '@media (max-width: 960px)': {
      marginBottom: '36px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '24px',
    },
  },
  sectionTitle: {
    position: 'relative',
    display: 'inline-block',
    fontSize: '1.875rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '16px',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '60%',
      height: '4px',
      bottom: '-10px',
      left: '20%',
      background: 'linear-gradient(90deg, #6366f1, #818cf8)',
      borderRadius: '2px',
    },
    '@media (min-width: 640px)': {
      fontSize: '2.25rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.75rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.5rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.25rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1.1rem',
    },
  },
  subtitle: {
    color: '#a0a0a0',
    fontSize: '1.125rem',
    '@media (max-width: 960px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
    },
  },
  figuresContainer: {
    display: 'flex',
    gap: '24px',
    marginBottom: '64px',
    '@media (max-width: 1200px)': {
      gap: '20px',
      marginBottom: '56px',
    },
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '48px',
    },
    '@media (max-width: 600px)': {
      gap: '12px',
      marginBottom: '36px',
    },
  },
  figureCard: {
    flex: '1',
    padding: '24px',
    borderRadius: '16px',
    backgroundColor: '#1f1f23',
    border: '1px solid #2a2a2e',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.3)',
      backgroundColor: '#28282c',
      borderColor: 'rgba(99, 102, 241, 0.3)',
      '& $startChatButton': {
        backgroundColor: '#6366f1',
        color: '#ffffff',
      },
    },
    '@media (max-width: 960px)': {
      padding: '20px',
      borderRadius: '14px',
    },
    '@media (max-width: 600px)': {
      padding: '16px',
      borderRadius: '12px',
    },
  },
  figureHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
    '@media (max-width: 600px)': {
      gap: '8px',
      marginBottom: '6px',
    },
  },
  iconWrapper: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '16px',
    flexShrink: 0,
    '@media (max-width: 600px)': {
      width: '32px',
      height: '32px',
      fontSize: '14px',
    },
  },
  figureTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0',
    minHeight: 'auto',
    display: 'flex',
    alignItems: 'center',
    flex: '1',
    '@media (max-width: 1200px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
    },
  },
  figureSubtitle: {
    fontSize: '0.9rem',
    color: '#a0a0a0',
    marginBottom: '6px',
    minHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 600px)': {
      fontSize: '0.85rem',
      marginBottom: '4px',
      minHeight: '20px',
    },
  },
  figureDescription: {
    fontSize: '0.95rem',
    color: '#d1d5db',
    marginBottom: '8px',
    lineHeight: 1.3,
    flexGrow: 1,
    minHeight: '60px',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 1200px)': {
      minHeight: '70px',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      marginBottom: '8px',
      minHeight: '60px',
    },
  },
  figureFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2px',
    minHeight: '32px',
    '@media (max-width: 600px)': {
      minHeight: '28px',
    },
  },
  centuryTag: {
    fontSize: '0.75rem',
    color: '#6366f1',
    fontWeight: 500,
    '@media (max-width: 600px)': {
      fontSize: '0.7rem',
    },
  },
  startChatButton: {
    fontSize: '0.75rem',
    color: '#6366f1',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#6366f1',
      color: '#ffffff',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.7rem',
      padding: '3px 6px',
    },
  },
  bottomSection: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '64px',
    padding: '24px',
    borderRadius: '16px',
    background: 'linear-gradient(180deg, rgba(99,102,241,0.06), rgba(99,102,241,0.02))',
    border: '1px solid rgba(99,102,241,0.15)',
    boxShadow: '0 20px 40px -20px rgba(99,102,241,0.35), inset 0 0 0 1px rgba(255,255,255,0.02)',
    '@media (max-width: 1200px)': {
      gap: '48px',
    },
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      gap: '32px',
    },
    '@media (max-width: 600px)': {
      gap: '24px',
    },
  },
  contentSection: {
    flex: '1',
    '@media (max-width: 960px)': {
      order: 1,
    },
  },
  contentTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '24px',
    '@media (max-width: 960px)': {
      fontSize: '1.375rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.25rem',
      marginBottom: '16px',
    },
  },
  contentParagraph: {
    fontSize: '1rem',
    color: '#a0a0a0',
    lineHeight: 1.7,
    marginBottom: '20px',
    '@media (max-width: 960px)': {
      fontSize: '0.95rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      marginBottom: '16px',
    },
  },
  quoteText: {
    fontSize: '1rem',
    color: '#e5e5e5',
    lineHeight: 1.7,
    fontStyle: 'italic',
    padding: '16px',
    borderLeft: '4px solid #6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderRadius: '4px',
    marginBottom: '32px',
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      padding: '12px',
      marginBottom: '24px',
    },
  },
  illustrationSection: {
    width: '300px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 1200px)': {
      width: '250px',
    },
    '@media (max-width: 960px)': {
      width: '100%',
      order: 0,
      height: '200px',
    },
    '@media (max-width: 600px)': {
      height: '150px',
    },
  },
  illustration: {
    width: '100%',
    height: '300px',
    background: 'radial-gradient(circle at 30% 30%, #818cf8 0%, #6366f1 60%, #4f46e5 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    opacity: 0.95,
    boxShadow: '0 20px 40px -15px rgba(79,70,229,0.5), inset 0 -10px 30px rgba(0,0,0,0.2)',
    '@media (max-width: 1200px)': {
      height: '250px',
    },
    '@media (max-width: 960px)': {
      width: '200px',
      height: '200px',
      margin: '0 auto',
    },
    '@media (max-width: 600px)': {
      width: '150px',
      height: '150px',
    },
  },
  illustrationIcon: {
    fontSize: '80px',
    color: '#ffffff',
    '@media (max-width: 1200px)': {
      fontSize: '64px',
    },
    '@media (max-width: 960px)': {
      fontSize: '48px',
    },
    '@media (max-width: 600px)': {
      fontSize: '36px',
    },
  },
  bubble: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 20px -10px rgba(0,0,0,0.4)',
    backdropFilter: 'blur(2px)',
  },
  bubble1: {
    width: '48px',
    height: '48px',
    top: '-12px',
    right: '22px',
  },
  bubble2: {
    width: '72px',
    height: '72px',
    bottom: '18px',
    right: '-8px',
  },
  bubble3: {
    width: '36px',
    height: '36px',
    top: '26px',
    left: '-6px',
  },
  exploreButton: {
    backgroundColor: '#6366f1',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: 600,
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop:"20px",
    // margin: '0 auto',
    '&:hover': {
      backgroundColor: '#5145cd',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px -4px rgba(99, 102, 241, 0.4)',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      padding: '10px 20px',
    },
  },
}));

const historicalFigures = [
  {
    icon: FaCrown,
    title: 'Chanakya',
    subtitle: 'Strategist & Philosopher',
    description: 'Talk to the ancient Indian teacher and strategist about statecraft, economic policy, and military strategy.',
    century: '4th Century BCE',
  },
  {
    icon: FaHistory,
    title: 'Swami Vivekananda',
    subtitle: 'Spiritual Leader & Reformer',
    description: 'Ask the influential spiritual leader about Vedanta philosophy, meditation, and his vision for youth empowerment.',
    century: '19th Century',
  },
  {
    icon: FaEdit,
    title: 'Rabindranath Tagore',
    subtitle: 'Poet & Philosopher',
    description: 'Converse with the Nobel laureate about literature, education, and his humanistic philosophy.',
    century: '20th Century',
  },
];

const ChatWithHistoricalFigures = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/dashboard');
  };

  return (
    <Box component="section" className={classes.section}>
      <Container className={classes.container}>
        <Box className={classes.titleWrapper}>
          <Typography component="h2" className={classes.sectionTitle}>
            Chat with Historical Figures
          </Typography>
          <Typography className={classes.subtitle}>
            Engage in meaningful conversations with the greatest minds from history
          </Typography>
        </Box>

        <Box className={classes.figuresContainer}>
          {historicalFigures.map((figure, index) => {
            const IconComponent = figure.icon;
            return (
              <Paper key={index} elevation={0} className={classes.figureCard}>
                <Box className={classes.figureHeader}>
                  <Box className={classes.iconWrapper}>
                    <IconComponent />
                  </Box>
                  <Typography className={classes.figureTitle}>
                    {figure.title}
                  </Typography>
                </Box>
                <Typography className={classes.figureSubtitle}>
                  {figure.subtitle}
                </Typography>
                <Typography className={classes.figureDescription}>
                  {figure.description}
                </Typography>
                <Box className={classes.figureFooter}>
                  <Typography className={classes.centuryTag}>
                    {figure.century}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.ctaButton}
                    endIcon={<FaArrowRight />}
                    onClick={handleStartChat}
                  >
                    Start Chatting
                  </Button>
                </Box>
              </Paper>
            );
          })}
        </Box>

        <Box className={classes.bottomSection}>
          <Box className={classes.contentSection}>
            <Typography className={classes.contentTitle}>
              Experience History Through Conversation
            </Typography>
            <Typography className={classes.contentParagraph}>
              Books preserve history — but conversations bring it alive. With Gigaspace, the AI historical
              figures chat lets you interact with great thinkers and reformers.
            </Typography>
            <Typography className={classes.contentParagraph}>
              Talk to strategists like Chanakya, reformers like Swami Vivekananda, or poets like Rabindranath
              Tagore. Ask them timeless questions and experience their wisdom in a modern context.
            </Typography>
            <Box className={classes.quoteText}>
              "Swami Vivekananda, how can today's youth stay focused in a distracted world?" — with
              Gigaspace, answers like these aren't imagined, they're experienced.
            </Box>

          </Box>

          <Box className={classes.illustrationSection}>
            <Box className={classes.illustration}>
              <FaHistory className={classes.illustrationIcon} />
              <Box className={`${classes.bubble} ${classes.bubble1}`} />
              <Box className={`${classes.bubble} ${classes.bubble2}`} />
              <Box className={`${classes.bubble} ${classes.bubble3}`} />
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button className={classes.exploreButton} onClick={handleStartChat}>
            Explore All Historical Figures <FaArrowRight />
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ChatWithHistoricalFigures;