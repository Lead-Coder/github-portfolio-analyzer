
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import BackgroundBlobs from '../components/BackgroundBlobs';

const AboutPage = () => {
  return (
    <PageWrapper>
      <MainLayout>
        <div className="relative isolate overflow-hidden">
          <BackgroundBlobs />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">About Portfolio-AI</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We are dedicated to bridging the gap between emerging tech talent and the industry's leading recruiters.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto mt-16 text-left space-y-6 text-foreground/80"
            >
              <p>
                Portfolio-AI was born from a simple idea: a developer's GitHub profile is their modern-day resume, a living portfolio of their skills, passion, and dedication. However, interpreting this portfolio can be challenging and time-consuming for both the developer trying to improve and the recruiter trying to evaluate.
              </p>
              <p>
                Our platform uses advanced AI to analyze public GitHub data, transforming it into clear, quantifiable metrics and actionable insights. For students and developers, we provide a mirror to reflect their strengths and illuminate areas for growth. For recruiters, we offer a powerful lens to quickly and accurately assess a candidate's technical prowess, saving countless hours in the screening process.
              </p>
              <p>
                Our mission is to empower developers to build better careers and to help companies build better teams. We believe in the power of code and the stories it tells. Let us help you tell yours.
              </p>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    </PageWrapper>
  );
};

export default AboutPage;
