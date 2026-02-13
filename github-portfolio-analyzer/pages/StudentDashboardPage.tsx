
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, History } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';

const StudentDashboardPage = () => {
    const navigate = useNavigate();

    const handleAnalyze = () => {
        // In a real app, you'd trigger the analysis here.
        // For now, just navigate to the results page.
        navigate('/student/result');
    };
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <PageWrapper>
            <DashboardLayout>
                <motion.div 
                  className="grid gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                    <motion.h1 variants={itemVariants} className="text-3xl font-bold">Student Dashboard</motion.h1>
                    
                    <motion.div variants={itemVariants}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Github />Analyze Your Profile</CardTitle>
                                <CardDescription>Enter your GitHub profile URL to get a detailed analysis.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex w-full items-center space-x-2">
                                    <Input type="url" placeholder="https://github.com/your-username" />
                                    <Button onClick={handleAnalyze}>Analyze</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div variants={itemVariants}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><History />Previous Analyses</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between items-center">
                                            <span>Analysis from 2 weeks ago</span>
                                            <span className="font-bold text-green-500">Score: 85</span>
                                        </li>
                                        <li className="flex justify-between items-center">
                                            <span>Analysis from 1 month ago</span>
                                            <span className="font-bold text-yellow-500">Score: 78</span>
                                        </li>
                                        <li className="flex justify-between items-center">
                                            <span>Analysis from 3 months ago</span>
                                            <span className="font-bold text-yellow-500">Score: 72</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Strength Meter</CardTitle>
                                    <CardDescription>Based on your latest analysis.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <Progress value={88} />
                                        <span className="font-bold text-xl">88%</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">Great job! Your profile is strong. Keep up the consistent work.</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                </motion.div>
            </DashboardLayout>
        </PageWrapper>
    );
};

export default StudentDashboardPage;
