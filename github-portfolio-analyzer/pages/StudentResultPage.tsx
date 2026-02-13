
import React from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';

import PageWrapper from '../components/PageWrapper';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Separator } from '../components/ui/Separator';
import { mockStudentResult } from '../data/mockData';

const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                <circle className="text-secondary" strokeWidth="15" stroke="currentColor" fill="transparent" r={radius} cx="100" cy="100" />
                <motion.circle
                    className="text-primary"
                    strokeWidth="15"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="100"
                    cy="100"
                    style={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-5xl font-bold">{score}</div>
        </div>
    );
};

const StudentResultPage = () => {
    const data = mockStudentResult;
    const radarData = Object.entries(data.scoreBreakdown).map(([key, value]) => ({
        subject: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        A: value,
        fullMark: 100,
    }));
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <PageWrapper>
            <DashboardLayout>
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">Analysis Result</h1>
                            <p className="text-muted-foreground">Here's the breakdown of your GitHub profile.</p>
                        </div>
                        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export PDF</Button>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="glassmorphism">
                            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-8">
                                <img src={data.avatarUrl} alt={data.username} className="w-24 h-24 rounded-full border-4 border-primary" />
                                <div className="text-center md:text-left">
                                    <h2 className="text-2xl font-bold">{data.username}</h2>
                                    <a href={`https://github.com/${data.username}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                        github.com/{data.username}
                                    </a>
                                </div>
                                <div className="ml-auto flex flex-col items-center">
                                    <ScoreGauge score={data.overallScore} />
                                    <p className="mt-2 font-semibold text-muted-foreground">Overall Score</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Score Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="subject" />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                            <Radar name={data.username} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                            <Tooltip />
                                            <Legend />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div variants={itemVariants}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><CheckCircle className="text-green-500" />Strengths</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {data.strengths.map((item, i) => <li key={i} className="text-sm">{item}</li>)}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-yellow-500" />Red Flags</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {data.redFlags.map((item, i) => <li key={i} className="text-sm">{item}</li>)}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                    
                    <motion.div variants={itemVariants}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Lightbulb className="text-blue-500" />Improvement Suggestions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.improvementSuggestions.map((item, i) => (
                                    <div key={i}>
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                        {i < data.improvementSuggestions.length - 1 && <Separator className="my-4"/>}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </DashboardLayout>
        </PageWrapper>
    );
};

export default StudentResultPage;
