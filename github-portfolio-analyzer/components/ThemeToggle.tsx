
import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/Button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
      {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem]" />}
      {theme === 'system' && <Laptop className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
}
