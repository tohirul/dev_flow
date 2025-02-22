'use strict';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Links from '@/components/shared/Links/Links';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/ui/sheet';
import { getAssets } from '@/utilities/assets';
import { SignedOut } from '@clerk/nextjs';

const Sidebar = () => {
  const { HAMBURGER, DEVFLOW_LOGO } = getAssets();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image src={HAMBURGER} width={36} height={36} alt='Menu' className='sm:hidden invert-colors' />
      </SheetTrigger>
      <SheetContent side='left' className='bg-light-900 dark:bg-dark-200 border-none overflow-y-auto'>
        <SheetTitle className='hidden'>Navigation</SheetTitle>
        <Link href='/' className='flex items-center gap-1'>
          <Image src={DEVFLOW_LOGO} width={23} height={23} alt='Logo' />

          <p className='font-space-grotesk text-dark-100 dark:text-light-900 h2-bold'>
            Dev<span className='text-primary-500'>Flow</span>
          </p>
        </Link>
        <div className='flex flex-col justify-between h-[calc(100vh-80px)] overflow-y-auto no-scrollbar'>
          <SheetClose asChild>
            <section className='flex flex-col gap-6 pt-16 h-full'>
              <Links isMobileNav />
            </section>
          </SheetClose>
        </div>
        <SignedOut>
          <div className='flex flex-col gap-3'>
            <SheetClose asChild>
              <Link href='/sign-in'>
                <Button className='shadow-none px-4 py-3 rounded-lg w-full min-h-10 small-medium btn-secondary'>
                  <span className='primary-text-gradient'>Sign in</span>
                </Button>
              </Link>
            </SheetClose>{' '}
            <SheetClose asChild>
              <Link href='/sign-up'>
                <Button className='shadow-none px-4 py-3 light-border-2 rounded-lg w-full min-h-10 text-dark400_light900 small-medium btn-tertiary'>
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
