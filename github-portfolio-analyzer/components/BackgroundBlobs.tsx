
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundBlobs = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <motion.div
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '30%', '-10%'],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 40,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/50 dark:bg-purple-800/50 rounded-full filter blur-3xl opacity-50"
      />
      <motion.div
        animate={{
          x: ['20%', '-20%', '20%'],
          y: ['30%', '-10%', '30%'],
          rotate: [0, -180, -360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 50,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/50 dark:bg-indigo-800/50 rounded-full filter blur-3xl opacity-50"
      />
      <motion.div
        animate={{
          x: ['0%', '10%', '0%'],
          y: ['10%', '-10%', '10%'],
          rotate: [0, 90, 180],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 60,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-300/50 dark:bg-pink-800/50 rounded-full filter blur-3xl opacity-50"
      />
    </div>
  );
};

export default BackgroundBlobs;
