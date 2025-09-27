import React from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import BlogNavbar from '../../components/blog/BlogNavbar';
import Footer from '../landing_page/landing_components/Footer';

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
      title: 'Introduction',
      content:
        'Gigaspace, hereinafter ("Gigaspace," "us," "we," "our," or "the Company") is committed to the security and proper management of personal data, to function effectively and successfully for the benefit of our stakeholders, customers, and the community. In doing so, it is essential that individuals’ privacy is protected through lawful and appropriate means of handling personal data. Therefore, we have implemented this Privacy Policy (hereinafter referred to as "Policy").',
    },
    {
      title: 'Aim',
      content:
        'This Policy aims to protect the personal data of users and stakeholders connected with our platform. It is designed to provide notice of the basic principles by which Gigaspace processes personal data of individuals ("Personal Data") who visit, use, deal with, and/or transact through our platform, including guest users and browsers (hereinafter "you" or "user").',
    },
    {
      title: 'Scope & Purpose',
      content: [
        'The purpose of this Policy is to describe how Gigaspace collects, uses, stores, and shares information about you through our online interfaces, including but not limited to https://gigaspace.org and related mobile/web applications (hereinafter the "Platform").',
        'This Policy applies to all systems, people, and processes that constitute Gigaspace’s information environment, including directors, employees, contractors, and trusted third parties who have access to Personal Data.',
        'Where third parties process data on behalf of Gigaspace, the Company endeavors to ensure such parties comply with this Policy and safeguard your data consistently.',
      ],
    },
    {
      title: 'Nature of the Platform',
      content:
        'Gigaspace enables users to engage in <strong>AI-powered conversations with simulated personalities</strong> based on publicly known figures. All interactions are with AI-generated characters and <strong>do not represent real-time communication with actual persons.</strong>',
    },
    {
      title: 'Types of Data Collected',
      content: [
        'The Personal Data collected depends on your interaction with Gigaspace. This may include, but is not limited to:',
        '<strong>A. Personal Identification Data</strong>',
        '• Name, username, or display name',
        '• Profile image (if uploaded)',
        '<strong>B. Contact Data</strong>',
        '• Email address',
        '• Phone number (if voluntarily provided)',
        '• Social media handles (if connected)',
        '<strong>C. Electronic Identification Data</strong>',
        '• Login credentials (if registered)',
        '• IP address',
        '• Device type, operating system, and browser information',
        '• Date and time of platform visit',
        '• Pages visited and navigation behavior',
        '• Language preferences',
        '• Location (approximate, derived from IP)',
        '<strong>D. Interaction Data</strong>',
        '• Chat messages, responses, and conversation logs',
        '• Voice or video inputs (if enabled)',
        '• Feedback, ratings, or comments on the platform',
        '• User preferences and personality interactions',
        '<strong>E. Payment Data</strong>',
        'If you make purchases for premium services, we may collect:',
        '• Transaction details (amount, currency, date)',
        '• Payment method (processed via third-party gateways; we do not store full card/bank details)',
        '<strong>F. Marketing & Behavioral Data</strong>',
        '• Preferences for notifications and marketing communications',
        '• Data inferred from user behavior, such as topics of interest, frequently used personalities, and interaction style',
      ],
    },
    {
      title: 'Special Categories of Data',
      content:
        'We do not intentionally collect <strong>special or sensitive data</strong> (e.g., race, religion, political views, health, sexual orientation). If you voluntarily share such data in chats or posts, you consent to its processing in line with this Policy.',
    },
    {
      title: 'Sources of Data Collection',
      content:[
        'We collect Personal Data through:',
        '• Direct input from you (account creation, profile setup, chat usage)',
        '• Automatic collection via cookies and analytics tools',
        '• Third-party integrations (payment gateways, social media login, advertising platforms)',
      ],
    },

        {
      title: 'Cookies',
      content:[
        'Gigaspace uses cookies and similar technologies to:',
        '• Recognize returning users',
        '• Improve platform performance and security',
        '• Personalize your conversational experience',
        '• Track analytics for platform optimization',
        'We may allow trusted third-party providers (e.g., Google, Meta, analytics providers) to place cookies to deliver targeted content and ads',
        'You can control or disable cookies via your browser settings, though this may affect your experience on the platform.',
      ],
    },
    {
      title: 'How We Use Your Data',
      content:
      [
        'Your data is used to:',
        '• Deliver and personalize Gigaspace services',
        '• Improve conversational AI and user experience',
        '• Process transactions and provide support',
        '• Send updates, promotions, and offers (where opted-in)',
        '• Ensure compliance with laws and prevent fraud',
        '• Conduct research, analytics, and product improvements',
      ],
    },
    {
      title: 'Sharing of Data',
      content: [
        'We do not sell your Personal Data. We may share it only with:',
        '• Trusted service providers (hosting, analytics, payment processors)',
        '• Law enforcement or regulators, where legally required',
        '• Partners and affiliates (with consent, where applicable)',
      ],
    },
    {
      title: 'Data Retention',
      content:
        'We retain your Personal Data only as long as necessary for service delivery, compliance with laws, or legitimate business interests. Chat logs may be anonymized and stored for AI improvement and moderation purposes.',
    },
    {
      title: 'Security',
      content:
        'We implement appropriate technical and organizational measures (encryption, firewalls, secure servers) to protect your data. However, no transmission over the internet is fully secure, and users share data at their own risk.',
    },
    {
      title: 'User Rights',
      content:
      [
        'You have the right to:',
        '• Access the data we hold about you',
        '• Request corrections or updates',
        '• Request deletion of your data (“Right to be Forgotten”)',
        '• Withdraw consent to marketing communications',
        '• Restrict or object to certain processing',
        'For requests, contact us at <strong><a href="mailto:gigaspaceai@gmail.com">gigaspaceai@gmail.com</a></strong>',
      ],
    },
    {
      title: 'Children’s Privacy',
      content:
        'Gigaspace is not intended for children under 13 (or under 16 in certain jurisdictions). We do not knowingly collect data from children. If discovered, such data will be deleted promptly.',
    },
    {
      title: 'International Data Transfers',
      content:
        'If your data is transferred outside your home country, we ensure safeguards (such as contractual clauses and compliance with applicable laws) are in place to protect your privacy.',
    },
    {
      title: 'Updates to This Policy',
      content:
        'We may update this Policy periodically to reflect changes in technology, regulations, or our services. Updates will be posted on this page with the revised "Effective Date."',
    },
    {
      title: 'Contact Us',
      content: [
        'For questions, concerns, or data requests, please contact:',
        '<a href="mailto: gigaspaceai@gmail.com">gigaspaceai@gmail.com</a>',
        '<a href="https://gigaspace.org">gigaspace.org</a>',
      ]
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
                {Array.isArray(item.content) ? (
                  item.content.map((paragraph, i) => (
                    <Typography 
                      key={i} 
                      className={classes.itemText} 
                      paragraph
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))
                ) : (
                  <Typography 
                    className={classes.itemText}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default TermsPolicies;
