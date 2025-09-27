import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 10px !important',
  },
  section: {
    paddingTop: '40px',
    paddingBottom: '40px',
  },
  sectionTitle: {
    position: 'relative',
    display: 'inline-block',
    fontSize: '2.25rem',
    fontWeight: 'bold',
    marginBottom: '2.5rem',
    color: '#ffffff',
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
  },
  personalityCard: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '16px',
    transition: 'all 0.4s ease',
    height: '100%',
    minHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.85)',
      zIndex: 1,
      transition: 'background 0.3s ease',
    },
    '&:hover::before': {
      background: 'rgba(0, 0, 0, 0.7)',
    },
  },
  personalityCardContent: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  personalityCardText: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
    background: 'linear-gradient(to right, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.1))',
    backdropFilter: 'blur(10px)',
    padding: '24px',
    paddingBottom: '32px',
    borderRadius: '12px',
    borderBottom: '4px solid #818cf8',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    margin: 0,
  },
  contentWrapper: {
    width: '100%',
    textAlign: 'center',
  },
  cardsContainer: {
    width: '100%',
  },
  cardsRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  cardsInner: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    gap: '24px',
  },
  cardWrapper: {
    flex: '1',
    minWidth: '250px',
    maxWidth: '280px',
  },
}));

const useLegendStyles = makeStyles((theme) => ({
  legend1: {
    backgroundImage: 'url(https://media.licdn.com/dms/image/v2/C5112AQElI93ULJqyeg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520206705043?e=2147483647&v=beta&t=QK8W9salEE0y4C3G7fnyLeV0ITWhPKVgv1ptFC6MXms)',
  },
  legend2: {
    backgroundImage: 'url(https://sc0.blr1.cdn.digitaloceanspaces.com/article/133954-wpkmdadwge-1578033091.jpg)',
  },
  legend3: {
    backgroundImage: 'url(https://static.toiimg.com/thumb/msid-112903454,width-1280,height-720,resizemode-4/112903454.jpg)',
  },
  legend4: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)',
  },
}));

const legends = [
  {
    text: "Imagine asking Mahatma Gandhi how non-violence could solve today's conflicts. Or talking to Dr. A. P. J. Abdul Kalam about his dream for India's youth.",
    backgroundClass: 'legend1',
  },
  {
    text: 'With Gigaspace, you can chat with political leaders, learn their philosophies, and see how their leadership mindset applies today.',
    backgroundClass: 'legend2',
  },
  {
    text: 'If business inspires you, you can chat with famous entrepreneurs like Ratan Tata or Elon Musk about vision, innovation, and what it takes to build impactful companies.',
    backgroundClass: 'legend3',
  },
  {
    text: 'And if culture excites you, you can chat with celebrities who shaped generations, gaining fresh perspectives on art and creativity.',
    backgroundClass: 'legend4',
  },
];

const ChatWithLegends = () => {
  const classes = useStyles();
  const legendClasses = useLegendStyles();

  return (
    <Box 
      component="div" 
      className={classes.body}
    >
      <Box 
        component="section" 
        id="personalities"
        className={classes.section}
      >
        <Container maxWidth={false} className={classes.container}>
          <Box className={classes.contentWrapper}>
            <Typography 
              component="h2" 
              className={classes.sectionTitle}
            >
              Chat with Legends & Leaders
            </Typography>
            <Box className={classes.cardsContainer}>
              <Box className={classes.cardsRow}>
                <Box className={classes.cardsInner}>
                  {legends.map((legend, index) => (
                    <Box key={index} className={classes.cardWrapper}>
                      <Box
                        className={`${classes.personalityCard} ${legendClasses[legend.backgroundClass]}`}
                      >
                        <Box className={classes.personalityCardContent}>
                          <Typography 
                            component="p"
                            className={classes.personalityCardText}
                          >
                            {legend.text}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ChatWithLegends;