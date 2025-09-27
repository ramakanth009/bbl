import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  FaRobot,
  FaProjectDiagram,
  FaChartLine,
  FaBrain,
  FaCommentDots,
  FaLayerGroup,
  FaBook,
  FaCode,
  FaCloud,
  FaLightbulb
} from 'react-icons/fa';

const useStyles = makeStyles(() => ({
  section: {
    paddingTop: '80px',
    paddingBottom: '80px',
    backgroundColor: '#0c0c0c',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 1200px)': {
      paddingTop: '70px',
      paddingBottom: '70px',
    },
    '@media (max-width: 960px)': {
      paddingTop: '60px',
      paddingBottom: '60px',
    },
    '@media (max-width: 600px)': {
      paddingTop: '50px',
      paddingBottom: '50px',
    },
    '@media (max-width: 480px)': {
      paddingTop: '40px',
      paddingBottom: '40px',
    },
    '@media (max-width: 375px)': {
      paddingTop: '30px',
      paddingBottom: '30px',
    },
  },
  container: {
    margin: '0 auto',
    paddingLeft: '16px',
    paddingRight: '16px',
    position: 'relative',
    zIndex: 10,
    '@media (min-width: 640px)': {
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    '@media (min-width: 1024px)': {
      paddingLeft: '32px',
      paddingRight: '32px',
    },
    '@media (max-width: 600px)': {
      paddingLeft: '12px',
      paddingRight: '12px',
    },
    '@media (max-width: 480px)': {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  titleWrapper: {
    margin: '0 auto',
    maxWidth: '896px',
    textAlign: 'center',
  },
  sectionTitle: {
    position: 'relative',
    display: 'inline-block',
    fontSize: '1.875rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '8px',
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
  contentWrapper: {
    marginTop: '48px',
    transform: 'translateZ(0)',
    transition: 'transform 0.5s ease',
    '&:hover': {
      transform: 'scale(1.02)',
    },
    '@media (max-width: 960px)': {
      marginTop: '36px',
    },
    '@media (max-width: 600px)': {
      marginTop: '24px',
    },
  },
  cardContainer: {
    borderRadius: '24px',
    backgroundColor: '#1f1f23',
    padding: '32px',
    position: 'relative',
    '@media (min-width: 768px)': {
      padding: '48px',
    },
    '@media (max-width: 960px)': {
      padding: '24px',
      borderRadius: '20px',
    },
    '@media (max-width: 600px)': {
      padding: '16px',
      borderRadius: '16px',
    },
    '@media (max-width: 480px)': {
      padding: '12px',
      borderRadius: '12px',
    },
  },
  cornerAccent: {
    position: 'absolute',
    width: '32px',
    height: '32px',
    border: '2px solid #818cf8',
    opacity: 0.7,
    transition: 'all 0.5s ease-in-out',
    '&:hover': {
      opacity: 1,
      transform: 'scale(1.2)',
      borderColor: '#6366f1',
    },
    '@media (max-width: 600px)': {
      width: '24px',
      height: '24px',
    },
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderRight: 'none',
    borderBottom: 'none',
    borderTopLeftRadius: '24px',
    '@media (max-width: 600px)': {
      borderTopLeftRadius: '16px',
    },
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderLeft: 'none',
    borderBottom: 'none',
    borderTopRightRadius: '24px',
    '@media (max-width: 600px)': {
      borderTopRightRadius: '16px',
    },
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderRight: 'none',
    borderTop: 'none',
    borderBottomLeftRadius: '24px',
    '@media (max-width: 600px)': {
      borderBottomLeftRadius: '16px',
    },
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderLeft: 'none',
    borderTop: 'none',
    borderBottomRightRadius: '24px',
    '@media (max-width: 600px)': {
      borderBottomRightRadius: '16px',
    },
  },
  marqueeContainer: {
    position: 'relative',
    paddingTop: '48px',
    paddingBottom: '48px',
    marginBottom: '48px',
    overflow: 'hidden',
    minHeight: '120px',
    '@media (max-width: 960px)': {
      paddingTop: '36px',
      paddingBottom: '36px',
      marginBottom: '36px',
      minHeight: '100px',
    },
    '@media (max-width: 600px)': {
      paddingTop: '24px',
      paddingBottom: '24px',
      marginBottom: '24px',
      minHeight: '80px',
    },
  },
  marqueeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, transparent, rgba(31, 31, 35, 0.5), transparent)',
    zIndex: 10,
  },
  marqueeTrack: {
    display: 'flex',
    gap: '8px',
    whiteSpace: 'nowrap',
    animation: '$marquee 40s linear infinite',
    '&:hover': {
      animationPlayState: 'paused',
    },
    '@media (min-width: 768px)': {
      gap: '16px',
    },
    '@media (max-width: 600px)': {
      gap: '6px',
    },
  },
  '@keyframes marquee': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-50%)',
    },
  },
  iconGroup: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    '@media (min-width: 768px)': {
      gap: '24px',
    },
    '@media (max-width: 600px)': {
      gap: '6px',
    },
  },
  iconBubble: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: 'linear-gradient(270deg, #6366f1, #818cf8, #4f46e5)',
    backgroundSize: '200% 200%',
    animation: '$gradient 8s ease infinite',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    '@media (max-width: 600px)': {
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
  },
  iconLarge: {
    width: '56px',
    height: '56px',
    fontSize: '20px',
    '&:hover': {
      transform: 'rotate(12deg) scale(1.1)',
    },
    '@media (min-width: 768px)': {
      width: '80px',
      height: '80px',
      fontSize: '24px',
    },
    '@media (max-width: 600px)': {
      width: '44px',
      height: '44px',
      fontSize: '16px',
    },
    '@media (max-width: 480px)': {
      width: '36px',
      height: '36px',
      fontSize: '14px',
    },
  },
  iconSmall: {
    width: '48px',
    height: '48px',
    fontSize: '20px',
    '&:hover': {
      transform: 'rotate(-12deg) scale(1.1)',
    },
    '@media (min-width: 768px)': {
      width: '56px',
      height: '56px',
      fontSize: '24px',
    },
    '@media (max-width: 600px)': {
      width: '36px',
      height: '36px',
      fontSize: '16px',
    },
    '@media (max-width: 480px)': {
      width: '30px',
      height: '30px',
      fontSize: '12px',
    },
  },
  '@keyframes gradient': {
    '0%, 100%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
  },
  textGroup: {
    '&:hover': {
      '& $textContent': {
        color: '#e5e5e5',
        paddingLeft: '12px',
        borderLeftColor: '#818cf8',
      },
    },
  },
  textContent: {
    fontSize: '1.125rem',
    color: '#a0a0a0',
    lineHeight: 1.75,
    transition: 'all 0.3s ease',
    paddingLeft: '8px',
    borderLeft: '4px solid rgba(129, 140, 248, 0.3)',
    '@media (min-width: 768px)': {
      fontSize: '1.25rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      paddingLeft: '6px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
      paddingLeft: '4px',
    },
  },
  divider: {
    marginTop: '24px',
    marginBottom: '24px',
    height: '1px',
    background: 'linear-gradient(to right, transparent, #4f46e5, transparent)',
    '@media (max-width: 600px)': {
      marginTop: '16px',
      marginBottom: '16px',
    },
  },
  textGroupRight: {
    textAlign: 'right',
    '&:hover': {
      '& $textContentRight': {
        color: '#e5e5e5',
        paddingRight: '12px',
        borderRightColor: '#818cf8',
      },
    },
  },
  textContentRight: {
    fontSize: '1.125rem',
    color: '#a0a0a0',
    lineHeight: 1.75,
    transition: 'all 0.3s ease',
    paddingRight: '8px',
    borderRight: '4px solid rgba(129, 140, 248, 0.3)',
    '@media (min-width: 768px)': {
      fontSize: '1.25rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      paddingRight: '6px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
      paddingRight: '4px',
    },
  },
  footer: {
    marginTop: '40px',
    paddingTop: '24px',
    '@media (max-width: 600px)': {
      marginTop: '24px',
      paddingTop: '16px',
    },
  },
  footerContent: {
    textAlign: 'center',
  },
  footerText: {
    color: '#818cf8',
    fontSize: '1.125rem',
    fontWeight: 500,
    letterSpacing: '0.025em',
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
}));

const IconsSet = ({ classes }) => {
  const icons = [
    { Icon: FaRobot, size: 'large', title: 'Artificial Intelligence' },
    { Icon: FaProjectDiagram, size: 'small', title: 'Neural Network' },
    { Icon: FaChartLine, size: 'large', title: 'Data Analysis' },
    { Icon: FaBrain, size: 'small', title: 'Machine Learning' },
    { Icon: FaCommentDots, size: 'large', title: 'Natural Language Processing' },
    { Icon: FaLayerGroup, size: 'small', title: 'Deep Learning' },
    { Icon: FaBook, size: 'large', title: 'Knowledge Base' },
    { Icon: FaCode, size: 'small', title: 'Algorithm' },
    { Icon: FaCloud, size: 'large', title: 'Cloud Computing' },
    { Icon: FaLightbulb, size: 'small', title: 'Innovation' },
  ];

  return (
    <Box className={classes.iconGroup}>
      {icons.map(({ Icon, size, title }, index) => (
        <Box
          key={index}
          className={`${classes.iconBubble} ${size === 'large' ? classes.iconLarge : classes.iconSmall}`}
          title={title}
        >
          <Icon />
        </Box>
      ))}
    </Box>
  );
};

const StepInto = () => {
  const classes = useStyles();

  return (
    <Box component="section" className={classes.section}>
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.titleWrapper}>
          <Typography component="h2" className={classes.sectionTitle}>
            Step Into the Thought Process of Legends
          </Typography>
        </Box>

        <Box className={classes.contentWrapper}>
          <Box className={classes.cardContainer}>
            {/* Decorative corner accents */}
            <Box className={`${classes.cornerAccent} ${classes.cornerTopLeft}`} />
            <Box className={`${classes.cornerAccent} ${classes.cornerTopRight}`} />
            <Box className={`${classes.cornerAccent} ${classes.cornerBottomLeft}`} />
            <Box className={`${classes.cornerAccent} ${classes.cornerBottomRight}`} />

            <Box position="relative">
              <Box className={classes.marqueeContainer}>
                <Box className={classes.marqueeOverlay}>
                  <Box className={classes.gradientOverlay} />
                  <Box className={classes.marqueeTrack}>
                    {/* First set of icons */}
                    <IconsSet classes={classes} />
                    {/* Duplicated icons for seamless loop */}
                    <IconsSet classes={classes} />
                  </Box>
                </Box>
              </Box>

              <Box className={classes.textGroup}>
                <Typography className={classes.textContent}>
                  What makes Gigaspace unique is its fusion of intelligence and mindset. Each personality is trained not just on knowledge, but on how they actually thought, spoke, and made decisions.
                </Typography>
              </Box>

              <Box className={classes.divider} />

              <Box className={classes.textGroupRight}>
                <Typography className={classes.textContentRight}>
                  This approach creates conversations that feel alive. It's not just text — it's a chance to step into the thought process of legends, leaders, and creative icons. With Gigaspace, you don't just chat with AI. You chat with legends.
                </Typography>
              </Box>

              <Box className={classes.footer}>
                <Box className={classes.footerContent}>
                  <Typography className={classes.footerText}>
                    The Future of Conversation
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StepInto;