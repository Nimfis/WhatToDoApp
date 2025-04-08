'use client'
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="mb-4 text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded"
    >
      Tryb: {theme === 'light' ? 'Jasny ☀️' : 'Ciemny 🌙'}
    </button>
  );
}
