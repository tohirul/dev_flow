'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface ThemeContextType {
  mode: string;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState(''); // Default value is empty until initialized

  // Set initial theme based on localStorage or default to light
  useEffect(() => {
    const storedMode = window.localStorage.getItem('theme') || 'light';
    setMode(storedMode);

    if (storedMode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Use `useMemo` to avoid recreating the context value object on every render
  const contextValue = useMemo(() => {
    // Toggle between light and dark mode
    const toggleMode = () => {
      const newMode = mode === 'dark' ? 'light' : 'dark';
      setMode(newMode);
      window.localStorage.setItem('theme', newMode);

      if (newMode === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    };

    return { mode, toggleMode };
  }, [mode]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
