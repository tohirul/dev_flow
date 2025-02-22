'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Links from '@/components/shared/Links/Links';
import { getAssets } from '@/utilities/assets';
import { SignedOut } from '@clerk/nextjs';

import { Button } from '../ui/button';

const LeftSidebar = () => {
  const { ACCOUNT, SIGNUP } = getAssets();
  return (
    <section className='light-border background-light900_dark200 sticky left-0 flex h-screen flex-col justify-between overflow-y-auto overflow-x-visible border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]'>
      <Links />

      <SignedOut>
        <div className='flex flex-col gap-3'>
          <Link href='/sign-in'>
            <Button className='small-medium btn-secondary min-h-10 w-full rounded-lg px-4 py-3 shadow-none'>
              <Image src={ACCOUNT} alt='Login' width={20} height={20} className='invert-colors lg:hidden' />
              <span className='primary-text-gradient max-lg:hidden'>Sign in</span>
            </Button>
          </Link>

          <Link href='/sign-up'>
            <Button className='light-border-2 text-dark400_light900 small-medium btn-tertiary min-h-10 w-full rounded-lg px-4 py-3 shadow-none'>
              <Image src={SIGNUP} alt='Sign up' width={20} height={20} className='invert-colors lg:hidden' />
              <span className='max-lg:hidden'>Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
