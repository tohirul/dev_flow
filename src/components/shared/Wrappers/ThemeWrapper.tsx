'use client';

import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(() => import('@/components/shared/Theme/Theme'), { ssr: false });

export default function ThemeWrapper() {
  return <ThemeToggle />;
}
