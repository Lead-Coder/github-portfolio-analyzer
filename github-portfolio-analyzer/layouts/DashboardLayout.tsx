
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, History, Settings, LogOut, BarChart, UserCheck } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { ThemeToggle } from '../components/ThemeToggle';

const studentNavItems = [
  { id: 'nav-1', href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'nav-2', href: '/student/result', label: 'Analyze Profile', icon: BarChart },
  { id: 'nav-3', href: '#', label: 'History', icon: History },
  { id: 'nav-4', href: '#', label: 'Settings', icon: Settings },
];

const recruiterNavItems = [
  { id: 'nav-5', href: '/recruiter/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'nav-6', href: '#', label: 'Candidates', icon: UserCheck },
  { id: 'nav-7', href: '#', label: 'History', icon: History },
  { id: 'nav-8', href: '#', label: 'Settings', icon: Settings },
];

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { role } = useAppStore();
    const location = useLocation();
    const navItems = role === 'student' ? studentNavItems : recruiterNavItems;

    return (
        <div className="flex min-h-screen bg-secondary/50 dark:bg-background">
            <aside className="hidden md:flex w-64 flex-col border-r p-4 bg-background dark:bg-secondary/20">
                <div className="flex items-center gap-2 text-lg font-bold p-4">
                    <User className="h-6 w-6 text-primary" />
                    <span>{role === 'student' ? "Student" : "Recruiter"}</span>
                </div>
                <nav className="flex flex-col gap-2 flex-grow mt-8">
                    {navItems.map(item => (
                        <Link
                            key={item.id}
                            to={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${location.pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto">
                    <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Link>
                </div>
            </aside>
            <div className="flex flex-col flex-1">
                <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 justify-end">
                    <ThemeToggle />
                </header>
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
