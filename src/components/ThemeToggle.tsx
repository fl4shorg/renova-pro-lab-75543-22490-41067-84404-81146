import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Set dark theme as default on initial load
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-10 w-20 rounded-full glass-effect-strong border border-primary/30 shadow-elegant hover:shadow-glow transition-smooth hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute w-8 h-8 rounded-full gradient-primary shadow-glow transition-smooth flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-10' : 'translate-x-1'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Sun className="h-4 w-4 text-primary-foreground" />
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <Sun className={`h-4 w-4 transition-smooth ${theme === 'light' ? 'opacity-0' : 'opacity-30'}`} />
        <Moon className={`h-4 w-4 transition-smooth ${theme === 'dark' ? 'opacity-0' : 'opacity-30'}`} />
      </div>
    </button>
  );
};