'use client';

import React from 'react';

import Image from 'next/image';

import { useTheme } from 'next-themes';

import { themes } from '@/constants/themes';
import { getAssets } from '@/lib/assets';
import { Button } from '@/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';

const Theme = () => {
  const { theme: currentTheme, setTheme } = useTheme();
  const { SUN, MOON, SYSTEM } = getAssets();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {mounted && (
          <Button variant='default' size='icon'>
            {currentTheme === 'light' ? (
              <Image src={SUN} alt='Light mode' width={24} height={24} className='active-theme' />
            ) : currentTheme === 'dark' ? (
              <Image src={MOON} alt='Dark mode' width={24} height={24} className='active-theme' />
            ) : (
              <Image src={SYSTEM} alt='Light mode' width={24} height={24} className='active-theme' />
            )}
            <span className='sr-only'>Toggle theme</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='background-light900_dark200'>
        {mounted &&
          themes.map((theme) => (
            <DropdownMenuItem
              key={theme.value}
              onClick={() => setTheme(theme.value)}
              className='flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400'>
              <Image
                src={theme.icon}
                alt={theme.label}
                width={16}
                height={16}
                className={`${currentTheme === theme.value && 'active-theme'}`}
              />

              <p
                className={`body-semibold text-light-500 ${currentTheme === theme.value ? 'text-primary-500' : 'text-dark100_light900'}`}>
                {theme.label}
              </p>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Theme;
