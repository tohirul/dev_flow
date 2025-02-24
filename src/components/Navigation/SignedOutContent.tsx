'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getAssets } from '@/utilities/assets';
import { SignedOut } from '@clerk/nextjs';

import { Button } from '../ui/button';

const SignedOutContent = () => {
  const { ACCOUNT, SIGNUP } = getAssets();
  return (
    <SignedOut>
      <div className='flex flex-col gap-3'>
        <Link href='/sign-in'>
          <Button className='shadow-none px-4 py-3 rounded-lg w-full min-h-10 small-medium btn-secondary'>
            <Image src={ACCOUNT} alt='Login' width={20} height={20} className='lg:hidden invert-colors' />
            <span className='max-lg:hidden primary-text-gradient'>Sign in</span>
          </Button>
        </Link>

        <Link href='/sign-up'>
          <Button className='shadow-none px-4 py-3 light-border-2 rounded-lg w-full min-h-10 text-dark400_light900 small-medium btn-tertiary'>
            <Image src={SIGNUP} alt='Sign up' width={20} height={20} className='lg:hidden invert-colors' />
            <span className='max-lg:hidden'>Sign up</span>
          </Button>
        </Link>
      </div>
    </SignedOut>
  );
};

export default SignedOutContent;
