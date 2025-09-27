import React from 'react';
import { Box } from '@mui/material';
import GigaspaceNavbar from './landing_components/navbar';
import HeroSection from './landing_components/HeroSection';
import AboutGigaspace from './landing_components/AboutGigaspace';
import StepInto from './landing_components/StepInto';
import KeyFeatures from './landing_components/KeyFeatures';
import ChatWithLegends from './landing_components/ChatWithLegends';
import ChatWithHistoricalFigures from './landing_components/ChatWithHistoricalFigures';
import LearnSmarter from './landing_components/LearnSmarter';
import EntertainmentFictionFun from './landing_components/EntertainmentFictionFun';
import ProblemSolvingPersonalGrowth from './landing_components/ProblemSolvingPersonalGrowth';
import ConversationsInLanguages from './landing_components/ConversationsInLanguages';
import HowGigaspaceWorks from './landing_components/HowGigaspaceWorks';
import GigaspaceAdvantage from './landing_components/GigaspaceAdvantage';
import StartYourJourney from './landing_components/StartYourJourney';
import Footer from './landing_components/Footer';

const Landing = () => {
  return (
    <Box>
      <GigaspaceNavbar />
      <Box component="main">
        <Box id="home">
          <HeroSection />
        </Box>
        <Box id="about">
          <AboutGigaspace />
        </Box>
        <Box id="features">
          <StepInto />
        </Box>
        <Box>
          <KeyFeatures />
        </Box>
        <Box id="legends">
          <ChatWithLegends />
        </Box>
        <Box id="historical">
          <ChatWithHistoricalFigures />
        </Box>
        <Box id="learn">
          <LearnSmarter />
        </Box>
        <Box id="entertainment">
          <EntertainmentFictionFun />
        </Box>
        <Box id="problem-solving">
          <ProblemSolvingPersonalGrowth />
        </Box>
        <Box id="languages">
          <ConversationsInLanguages />
        </Box>
        <Box id="how-it-works">
          <HowGigaspaceWorks />
        </Box>
        <Box id="advantages">
          <GigaspaceAdvantage />
        </Box>
        <Box id="get-started">
          <StartYourJourney />
        </Box>
          <Footer />
      </Box>
    </Box>
  );
};

export default Landing;