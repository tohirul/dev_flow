'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState('');

  useEffect(() => {
    const handleChange = () => {
      if (mode === 'dark') {
        setMode('light');
        window.localStorage.setItem('theme', 'light');
        document.documentElement.classList.add('light');
      } else {
        setMode('dark');
        window.localStorage.setItem('theme', 'dark');
        document.documentElement.classList.remove('dark');
      }
    };

    handleChange();
  }, [mode]);

  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
