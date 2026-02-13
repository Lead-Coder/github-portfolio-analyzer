
import React from 'react';
import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Portfolio-AI</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a>
          </div>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">&copy; {new Date().getFullYear()} Portfolio-AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
