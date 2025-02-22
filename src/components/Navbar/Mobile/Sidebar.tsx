'use strict';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/ui/sheet';
import { getAssets } from '@/utilities/assets';
import { SignedOut } from '@clerk/nextjs';

import NavContent from './NavContent';

const Sidebar = () => {
  const { HAMBURGER, DEVFLOW_LOGO } = getAssets();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image src={HAMBURGER} width={36} height={36} alt='Menu' className='invert-colors sm:hidden' />
      </SheetTrigger>
      <SheetContent side='left' className='overflow-y-auto border-none bg-light-900 dark:bg-dark-200'>
        <SheetTitle className='hidden'>Navigation</SheetTitle>
        <Link href='/' className='flex items-center gap-1'>
          <Image src={DEVFLOW_LOGO} width={23} height={23} alt='Logo' />

          <p className='h2-bold font-space-grotesk text-dark-100 dark:text-light-900'>
            Dev<span className='text-primary-500'>Flow</span>
          </p>
        </Link>
        <div className='no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto'>
          <SheetClose asChild>
            <section className='flex h-full flex-col gap-6 pt-16'>
              <NavContent />
            </section>
          </SheetClose>
        </div>
        <SignedOut>
          <div className='flex flex-col gap-3'>
            <SheetClose asChild>
              <Link href='/sign-in'>
                <Button className='small-medium btn-secondary min-h-10 w-full rounded-lg px-4 py-3 shadow-none'>
                  <span className='primary-text-gradient'>Sign in</span>
                </Button>
              </Link>
            </SheetClose>{' '}
            <SheetClose asChild>
              <Link href='/sign-up'>
                <Button className='light-border-2 text-dark400_light900 small-medium btn-tertiary min-h-10 w-full rounded-lg px-4 py-3 shadow-none'>
                  <span>Sign up</span>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SignedOut>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
