import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Code, Users, TrendingUp, Target, Zap, Github, Award, BarChart3, Eye, Sparkles } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import MainLayout from '../layouts/MainLayout';
import { Button } from '../components/ui/Button';
import BackgroundBlobs from '../components/BackgroundBlobs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const stats = [
    { label: "GitHub Profiles Analyzed", value: "10K+", icon: Github },
    { label: "Average Score Improvement", value: "+34%", icon: TrendingUp },
    { label: "Recruiters Trust Us", value: "500+", icon: Users },
    { label: "Success Rate", value: "94%", icon: Award }
  ];

  const problems = [
    {
      icon: Eye,
      title: "Invisible Impact",
      description: "Your best work gets buried in a sea of repositories with no clear narrative."
    },
    {
      icon: Target,
      title: "Generic Profiles",
      description: "Recruiters can't tell if you're a weekend hobbyist or production-ready developer."
    },
    {
      icon: BarChart3,
      title: "No Metrics",
      description: "Activity graphs don't show skill depth, code quality, or real contribution value."
    }
  ];

  const solutions = [
    {
      icon: Sparkles,
      title: "AI-Powered Analysis",
      description: "Deep learning algorithms evaluate code quality, consistency, and technical depth across all repositories."
    },
    {
      icon: TrendingUp,
      title: "Actionable Insights",
      description: "Get specific, prioritized recommendations that actually improve recruiter perception."
    },
    {
      icon: Award,
      title: "Competitive Scoring",
      description: "Benchmark yourself against peers and industry standards with our comprehensive rating system."
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description: "Track improvements as you implement changes and watch your score climb."
    }
  ];

  return (
    <PageWrapper>
      <MainLayout>
        <div className="relative isolate overflow-hidden">
          <BackgroundBlobs />
          
          {/* Hero Section */}
          <motion.section 
            className="relative py-24 sm:py-32 lg:py-40"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-5xl mx-auto">
                <motion.div 
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AI-Powered GitHub Analysis</span>
                </motion.div>

                <motion.h1 
                  variants={itemVariants} 
                  className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
                >
                  Turn Your GitHub Into
                  <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                    Recruiter-Ready Proof
                  </span>
                </motion.h1>

                <motion.p 
                  variants={itemVariants} 
                  className="mt-8 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto"
                >
                  Transform repositories into professional portfolios. Get AI-powered insights that showcase real skill, impact, and consistency to recruiters.
                </motion.p>

                <motion.div 
                  variants={itemVariants} 
                  className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Link to="/signup">
                    <Button size="lg" variant="premium" className="group">
                      Start Free Analysis 
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/student/result">
                    <Button size="lg" variant="outline">
                      View Demo Results
                    </Button>
                  </Link>
                </motion.div>

                {/* Floating Score Preview */}
                <motion.div
                  variants={itemVariants}
                  className="mt-20 flex justify-center"
                  animate={floatAnimation}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl rounded-full" />
                    <Card className="relative glassmorphism border-2 border-primary/20 w-64">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-center">
                          <div className="relative w-40 h-40">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                              <circle 
                                className="text-secondary" 
                                strokeWidth="8" 
                                stroke="currentColor" 
                                fill="transparent" 
                                r="42" 
                                cx="50" 
                                cy="50" 
                              />
                              <motion.circle 
                                className="text-primary" 
                                strokeWidth="8" 
                                strokeLinecap="round" 
                                stroke="currentColor" 
                                fill="transparent" 
                                r="42" 
                                cx="50" 
                                cy="50" 
                                strokeDasharray={2 * Math.PI * 42}
                                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - 0.88) }}
                                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <motion.div 
                                className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1 }}
                              >
                                88
                              </motion.div>
                              <span className="text-xs text-muted-foreground mt-1">Portfolio Score</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-4">
                          Top 12% of developers
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section 
            className="py-16 border-y border-border/50 bg-background/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <motion.div 
                      className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
                      animate={pulseAnimation}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Problem Section */}
          <section className="py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                  The Challenge
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  For students and early-career developers, GitHub is the primary portfolio. Yet most profiles fail to communicate real value to recruiters.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {problems.map((problem, index) => (
                  <motion.div
                    key={problem.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                  >
                    <Card className="glassmorphism h-full border-destructive/20 hover:border-destructive/40 transition-colors">
                      <CardContent className="pt-6">
                        <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                          <problem.icon className="w-6 h-6 text-destructive" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Solution Section */}
          <section className="py-24 sm:py-32 bg-gradient-to-b from-background to-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                  The Solution
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Portfolio-AI transforms your GitHub into a compelling narrative that recruiters understand and value.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={solution.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="glassmorphism h-full border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
                      <CardContent className="pt-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <solution.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                  Built for Everyone
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Whether you're showcasing your skills or finding the perfect candidate, we've got you covered.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="glassmorphism h-full border-2 border-primary/20 hover:border-primary/40 transition-all">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Code className="w-5 h-5 text-primary" />
                        </div>
                        For Students & Developers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        "Get a comprehensive score and breakdown of your profile's strengths",
                        "Identify red flags and receive prioritized improvement recommendations",
                        "Track progress over time and showcase your best work strategically",
                        "Benchmark against peers and industry standards"
                      ].map((feature, i) => (
                        <motion.p 
                          key={`student-feature-${i}`}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                          <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{feature}</span>
                        </motion.p>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="glassmorphism h-full border-2 border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-500" />
                        </div>
                        For Recruiters & Teams
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        "Objectively evaluate candidates with AI-powered skill assessment",
                        "Quickly identify top talent with detailed technical breakdowns",
                        "Streamline technical screening and reduce time-to-hire",
                        "Access comprehensive analytics and candidate comparisons"
                      ].map((feature, i) => (
                        <motion.p 
                          key={`recruiter-feature-${i}`}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                          <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{feature}</span>
                        </motion.p>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-3xl" />
                <Card className="relative glassmorphism border-2 border-primary/20 max-w-4xl mx-auto">
                  <CardContent className="pt-12 pb-12 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                      Ready to Transform Your GitHub?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                      Join thousands of developers who've elevated their profiles and landed their dream roles.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link to="/signup">
                        <Button size="lg" variant="premium" className="group">
                          Get Your Free Analysis
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Link to="/student/result">
                        <Button size="lg" variant="outline">
                          See Example Results
                        </Button>
                      </Link>
                    </div>
                    <p className="text-sm text-muted-foreground mt-6">
                      No credit card required • Free forever for students
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </div>
      </MainLayout>
    </PageWrapper>
  );
};

export default LandingPage;