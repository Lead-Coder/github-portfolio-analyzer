
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RoleSelectPage from './pages/RoleSelectPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import StudentResultPage from './pages/StudentResultPage';
import RecruiterDashboardPage from './pages/RecruiterDashboardPage';
import RecruiterResultPage from './pages/RecruiterResultPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider } from './components/ThemeProvider';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/role-select" element={<RoleSelectPage />} />
        <Route path="/student/dashboard" element={<StudentDashboardPage />} />
        <Route path="/student/result" element={<StudentResultPage />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboardPage />} />
        <Route path="/recruiter/result" element={<RecruiterResultPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
