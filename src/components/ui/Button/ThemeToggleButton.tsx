'use client';

import { useTheme } from '@/context/ThemeProvider';

export default function ThemeToggleButton() {
  const { mode, toggleMode } = useTheme();

  return (
    <button className='bg-white dark:bg-black m-4 px-4 py-2 text-black dark:text-white' onClick={toggleMode}>
      Switch to {mode === 'dark' ? 'light' : 'dark'} mode
    </button>
  );
}
