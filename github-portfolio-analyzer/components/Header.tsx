
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/Button';

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-2 sm:px-8 sm:py-3 glassmorphism"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <Github className="h-6 w-6 text-primary" />
          <span>Portfolio-AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">About</Link>
        </nav>
        <div className="flex items-center gap-2">
            <Link to="/login">
                <Button variant="ghost">Log In</Button>
            </Link>
            <Link to="/signup">
                <Button>Sign Up</Button>
            </Link>
            <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
