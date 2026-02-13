
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Briefcase } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import BackgroundBlobs from '../components/BackgroundBlobs';

const RoleSelectPage = () => {
  const navigate = useNavigate();
  const setRole = useAppStore((state) => state.setRole);

  const handleSelectRole = (role: 'student' | 'recruiter') => {
    setRole(role);
    navigate(`/${role}/dashboard`);
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: { scale: 1.05, boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)" },
    tap: { scale: 0.95 }
  };

  return (
    <PageWrapper className="flex flex-col items-center justify-center p-4">
      <BackgroundBlobs />
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold">Choose Your Role</h1>
        <p className="text-muted-foreground mt-2">How will you be using Portfolio-AI today?</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.5, type: "spring" }}
          onClick={() => handleSelectRole('student')}
          className="cursor-pointer"
        >
          <Card className="h-full text-center glassmorphism">
            <CardHeader>
              <User className="mx-auto h-16 w-16 text-primary" />
              <CardTitle className="mt-4 text-2xl">I'm a Student</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analyze my GitHub profile, get feedback, and track my growth.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
          onClick={() => handleSelectRole('recruiter')}
          className="cursor-pointer"
        >
          <Card className="h-full text-center glassmorphism">
            <CardHeader>
              <Briefcase className="mx-auto h-16 w-16 text-primary" />
              <CardTitle className="mt-4 text-2xl">I'm a Recruiter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Evaluate candidates, match skills to job roles, and streamline hiring.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default RoleSelectPage;
