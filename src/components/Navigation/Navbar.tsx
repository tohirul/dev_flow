import Image from 'next/image';
import Link from 'next/link';

import { getAssets } from '@/utilities/assets';
import { SignedIn, UserButton } from '@clerk/nextjs';

import Searchbar from '../Searching/GlobalSearch';
import ThemeWrapper from '../shared/Wrappers/ThemeWrapper';
import { Sidebar } from 'lucide-react';

// import DevFlow_LOGO from '/images/site-logo.svg';
export default async function Navbar() {
  const { DEVFLOW_LOGO } = getAssets();
  return (
    <nav className='z-50 fixed flex-between gap-5 shadow-light-300 dark:shadow-none p-6 sm:px-12 w-full background-light900_dark200'>
      <Link href='/' className='flex items-center gap-2'>
        <Image src={DEVFLOW_LOGO} alt='DevFlow Logo' width={23} height={23} />
        <p className='max-sm:hidden font-spaceGrotesk text-dark-100 dark:text-light-900 h2-bold'>
          <span className='text-primary-500'>Dev</span>Over<span className='text-primary-500'>Flow</span>
        </p>
      </Link>
      {/* Global Search */}
      <Searchbar />
      <div className='flex-between gap-5'>
        <ThemeWrapper />
        {/* Theme */}
        <SignedIn>
          <UserButton
            afterSwitchSessionUrl='/'
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10'
              },
              variables: {
                colorPrimary: '#ff7000'
              }
            }}
          />
        </SignedIn>
        <Sidebar />
      </div>
    </nav>
  );
}
