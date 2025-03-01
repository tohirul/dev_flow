'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getAssets } from '@/lib/assets';
import { SignedOut } from '@clerk/nextjs';

import { Button } from '../ui/button';

const SignedOutContent = () => {
  const { ACCOUNT, SIGNUP } = getAssets();
  return (
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
  );
};

export default SignedOutContent;
