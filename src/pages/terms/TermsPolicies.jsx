import React from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import BlogNavbar from '../../components/blog/BlogNavbar';

const useStyles = makeStyles({
  pageContainer: {
    background: '#0c0c0c',
    minHeight: '100vh',
    color: '#ffffff',
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
  accordion: {
    background: '#1a1a1e',
    borderRadius: '12px',
    marginBottom: '1rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: '0 0 1rem 0',
    },
    '@media (max-width: 600px)': {
      borderRadius: '8px',
      marginBottom: '0.75rem',
    },
  },
  accordionSummary: {
    padding: '1.5rem',
    '& .MuiAccordionSummary-content': {
      margin: '0',
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      color: '#6366f1',
    },
    '@media (max-width: 600px)': {
      padding: '1rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.75rem',
    },
  },
  itemTitle: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#ffffff',
    '@media (max-width: 900px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.95rem',
    },
  },
  accordionDetails: {
    padding: '0 1.5rem 1.5rem 1.5rem',
    '@media (max-width: 600px)': {
      padding: '0 1rem 1rem 1rem',
    },
    '@media (max-width: 480px)': {
      padding: '0 0.75rem 0.75rem 0.75rem',
    },
  },
  itemText: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '#a0a0a0',
    '@media (max-width: 900px)': {
      fontSize: '0.95rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      lineHeight: 1.5,
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
      lineHeight: 1.4,
    },
  },
  footer: {
    background: '#0c0c0c',
    color: '#ffffff',
    padding: '2rem',
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

const TermsPolicies = () => {
  const classes = useStyles();

  const sections = [
    {
      title: 'Terms of Service',
      content:
        'These are placeholder Terms of Service. By using GigaSpace, you agree to abide by community guidelines, respect intellectual property, and avoid misuse of the platform. This content is for demonstration purposes and should be replaced with your legal copy.',
    },
    {
      title: 'Privacy Policy',
      content:
        'This is a sample Privacy Policy. We explain what data we collect, how we use it to improve the product, and how you can control your information. Replace this with your actual privacy practices and contact details.',
    },
    {
      title: 'Cookie Policy',
      content:
        'We use cookies to keep you signed in, remember preferences, and measure usage. You can manage cookies through your browser settings. This is dummy text for layout parity with the FAQ page.',
    },
    {
      title: 'User Content & Conduct',
      content:
        'Users are responsible for the content they create and share. Prohibited activities include harassment, hate speech, impersonation, and any illegal activity. Violations may result in account suspension.',
    },
    {
      title: 'Account & Security',
      content:
        'Keep your account credentials secure and report suspicious activity promptly. We employ industry-standard security practices but cannot guarantee absolute security of information transmitted online.',
    },
    {
      title: 'Contact & Support',
      content:
        'For questions about these terms or policies, please contact our support team. This section is a placeholder and should be updated with your official contact channels.',
    },
  ];

  return (
    <Box className={classes.pageContainer}>
      <BlogNavbar />
      <Container className={classes.styledContainer}>
        <Typography className={classes.sectionTitle}>GigaSpace — Terms & Policies</Typography>

        <Box>
          {sections.map((item, index) => (
            <Accordion key={index} className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordionSummary}>
                <Typography className={classes.itemTitle}>{index + 1}. {item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <Typography className={classes.itemText}>{item.content}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      <Box className={classes.footer}>
        <Typography color="#a0a0a0">&copy; 2025 GigaSpace. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default TermsPolicies;
