
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Briefcase, Code, Star, X } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const RecruiterDashboardPage = () => {
    const navigate = useNavigate();
    const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js']);
    const [skillInput, setSkillInput] = useState('');

    const handleAnalyze = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/recruiter/result');
    };

    const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && skillInput.trim() !== '') {
            e.preventDefault();
            if (!skills.includes(skillInput.trim())) {
                setSkills([...skills, skillInput.trim()]);
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <PageWrapper>
            <DashboardLayout>
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                    <motion.h1 variants={itemVariants} className="text-3xl font-bold">Recruiter Dashboard</motion.h1>
                    
                    <motion.div variants={itemVariants}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Evaluate Candidate</CardTitle>
                                <CardDescription>Enter candidate's GitHub and job details to start the evaluation.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleAnalyze} className="space-y-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="github-url"><Github className="inline-block mr-2 h-4 w-4" />GitHub Profile URL</Label>
                                        <Input id="github-url" type="url" placeholder="https://github.com/candidate-username" required />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="job-role"><Briefcase className="inline-block mr-2 h-4 w-4" />Job Role</Label>
                                            <Input id="job-role" defaultValue="Senior Frontend Engineer" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="experience"><Star className="inline-block mr-2 h-4 w-4" />Experience Level</Label>
                                            <Input id="experience" defaultValue="5+ Years" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="skills"><Code className="inline-block mr-2 h-4 w-4" />Required Skills</Label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {skills.map(skill => (
                                                <Badge key={skill} variant="secondary">
                                                    {skill}
                                                    <button type="button" onClick={() => removeSkill(skill)} className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                        <Input 
                                            id="skills" 
                                            placeholder="Type a skill and press Enter" 
                                            value={skillInput}
                                            onChange={(e) => setSkillInput(e.target.value)}
                                            onKeyDown={handleSkillKeyDown}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full sm:w-auto">Evaluate Candidate</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </DashboardLayout>
        </PageWrapper>
    );
};

export default RecruiterDashboardPage;
