import React from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import BlogNavbar from '../../components/blog/BlogNavbar';

const useStyles = makeStyles({
  faqContainer: {
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
  faqAccordion: {
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
  questionText: {
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
  answerText: {
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

const FAQ = () => {
  const classes = useStyles();

  const faqData = [
    {
      question: "What is Gigaspace?",
      answer: "Gigaspace is an AI-powered chat platform developed by Gigaversity at Gigalabs, where you can chat with 1500+ legendary personalities from India and around the world — including actors, politicians, entrepreneurs, athletes, spiritual leaders, business icons, and fictional characters."
    },
    {
      question: "How many characters are available on Gigaspace?",
      answer: "Currently, Gigaspace hosts 1500+ personalities, and by the end of 2025 we are aiming to expand this number to over 10,000 characters across diverse fields."
    },
    {
      question: "Can I chat with Elon Musk on Gigaspace?",
      answer: "Yes! Gigaspace lets you chat with Elon Musk's AI-powered personality, designed to replicate his humor, mindset, and entrepreneurial vision."
    },
    {
      question: "Can I chat with Indian actors and actresses on Gigaspace?",
      answer: "Absolutely. You can interact with Bollywood legends like Amitabh Bachchan, Shah Rukh Khan, Salman Khan, Priyanka Chopra, and more, each trained to respond in their signature style and humor."
    },
    {
      question: "Does Gigaspace include historical personalities?",
      answer: "Yes. Gigaspace allows you to chat with Mahatma Gandhi, B. R. Ambedkar, Subhas Chandra Bose, Albert Einstein, and more, gaining insights into their philosophies, leadership, and wisdom."
    },
    {
      question: "Can I chat with entrepreneurs and business leaders?",
      answer: "Of course. You can interact with Steve Jobs, Ratan Tata, Mukesh Ambani, Jeff Bezos, and more — learning from their entrepreneurial mindset and life experiences."
    },
    {
      question: "Can I chat with sports legends on Gigaspace?",
      answer: "Yes! Gigaspace features Sachin Tendulkar, Virat Kohli, M. S. Dhoni, Cristiano Ronaldo, and more, letting you experience their sporting spirit and motivational approach."
    },
    {
      question: "Can I chat with spiritual leaders on Gigaspace?",
      answer: "Definitely. You can interact with Swami Vivekananda, Sri Sri Ravi Shankar, Sadhguru, the Dalai Lama, and more, who share guidance and wisdom in their authentic voice."
    },
    {
      question: "Can I chat with fictional or anime characters on Gigaspace?",
      answer: "Yes. Gigaspace includes Chhota Bheem, Shaktimaan, Naruto, Iron Man (Tony Stark), and more, letting you experience fun and adventurous conversations."
    },
    {
      question: "How realistic are the character responses in Gigaspace?",
      answer: "Every personality is trained with deep research, interviews, writings, and communication styles to replicate their humor, mindset, and communication traits, making chats feel authentic."
    },
    {
      question: "Are the answers given by Gigaspace 100% real?",
      answer: "No. The replies are AI-generated simulations for entertainment and educational purposes. They mimic personalities but should not be taken as real advice."
    },
    {
      question: "Can I create my own character in Gigaspace?",
      answer: "Yes! You can design your own AI character, customize its personality, and even share it with friends and family."
    },
    {
      question: "Is Gigaspace focused on learning or entertainment?",
      answer: "Both. Gigaspace is designed for fun conversations while also helping users learn wisdom, life lessons, leadership, and creativity from legendary personalities."
    },
    {
      question: "Is Gigaspace available worldwide?",
      answer: "Yes. Gigaspace is a global platform, offering conversations with Indian and international icons across fields."
    },
    {
      question: "How are the Gigaspace characters trained?",
      answer: "Each character is built using advanced AI models trained on speeches, writings, interviews, and personality data, ensuring they replicate real-life communication as closely as possible."
    },
    {
      question: "Can I learn business lessons from entrepreneurs on Gigaspace?",
      answer: "Absolutely. You can chat with Elon Musk, Steve Jobs, Ratan Tata, Warren Buffett, and more, and get insights into innovation, leadership, and financial wisdom."
    },
    {
      question: "Is Gigaspace safe to use?",
      answer: "Yes. Built by Gigalabs with continuous innovation, Gigaspace is a safe and secure AI chat platform for all users."
    },
    {
      question: "Can students use Gigaspace for learning?",
      answer: "Definitely. Students can learn from Dr. A. P. J. Abdul Kalam, Albert Einstein, Swami Vivekananda, Nelson Mandela, and more, gaining valuable wisdom and inspiration."
    },
    {
      question: "Can I chat with political leaders on Gigaspace?",
      answer: "Yes. You can interact with Narendra Modi, Jawaharlal Nehru, Abraham Lincoln, Barack Obama, and more, each reflecting their leadership style and communication tone."
    },
    {
      question: "Can I ask fun or casual questions to characters?",
      answer: "Of course! Whether you ask Shah Rukh Khan for his favorite movie scene or Iron Man for his witty one-liners, the personalities will respond in their signature way."
    },
    {
      question: "Does Gigaspace have Indian mythological or cultural figures?",
      answer: "Yes. You can interact with Lord Krishna (as a cultural personality), Swami Vivekananda, Chanakya, and more, recreated with respect and authenticity."
    },
    {
      question: "Can I use Gigaspace to practice communication skills?",
      answer: "Yes. Chatting with diverse personalities like Barack Obama, Amitabh Bachchan, Ratan Tata, and more helps improve your conversation, confidence, and communication skills."
    },
    {
      question: "What makes Gigaspace different from other AI chat platforms?",
      answer: "Unlike other platforms, Gigaspace offers 1500+ deeply researched personalities including Bollywood legends, business tycoons, sports heroes, spiritual icons, and fictional characters, all in one place."
    },
    {
      question: "Does Gigaspace keep improving?",
      answer: "Yes. Gigaspace is a product of Gigaversity, created at Gigalabs, where continuous innovation ensures new characters and features are regularly added."
    },
    {
      question: "Can I share my Gigaspace experience with friends?",
      answer: "Yes. You can share your custom-created characters and invite friends to enjoy interactive conversations on Gigaspace."
    },
    {
      question: "Is Gigaspace only for adults?",
      answer: "No. Gigaspace is for all age groups. From kids chatting with Chhota Bheem to students learning from Abdul Kalam, there's something for everyone."
    },
    {
      question: "Can I use Gigaspace for creative inspiration?",
      answer: "Yes. Writers and creators can chat with William Shakespeare, Rabindranath Tagore, J. K. Rowling, and more for inspiration and creative sparks."
    },
    {
      question: "Will new characters be added to Gigaspace?",
      answer: "Yes. Gigaspace continuously expands by adding new personalities from acting, politics, business, sports, and fiction."
    },
    {
      question: "Can I really feel like I'm chatting with the real person?",
      answer: "Yes! Conversations with Sachin Tendulkar, Shah Rukh Khan, Elon Musk, and more feel natural and authentic, thanks to advanced AI replication."
    },
    {
      question: "Is Gigaspace free or paid?",
      answer: "Gigaspace offers both free and premium access, depending on the depth of features and characters you want to explore."
    }
  ];

  return (
    <Box className={classes.faqContainer}>
      <BlogNavbar />
      <Container className={classes.styledContainer}>
        <Typography className={classes.sectionTitle}>
          Gigaspace – Frequently Asked Questions (FAQ)
        </Typography>
        
        <Box>
          {faqData.map((faq, index) => (
            <Accordion key={index} className={classes.faqAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.accordionSummary}
              >
                <Typography className={classes.questionText}>
                  {index + 1}. {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <Typography className={classes.answerText}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* Footer */}
      <Box className={classes.footer}>
        <Typography color="#a0a0a0">
          &copy; 2025 GigaSpace. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default FAQ;
