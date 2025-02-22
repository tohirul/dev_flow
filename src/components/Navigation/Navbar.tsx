import Image from 'next/image';
import Link from 'next/link';

import Sidebar from '@/components/Navigation/Mobile/Sidebar';
import ThemeWrapper from '@/components/shared/Wrappers/ThemeWrapper';
import { getAssets } from '@/utilities/assets';
import { SignedIn, UserButton } from '@clerk/nextjs';

import Searching from './Searching/Searching';

// import DevFlow_LOGO from '/images/site-logo.svg';
export default async function Navbar() {
  const { DEVFLOW_LOGO } = getAssets();
  return (
    <nav className='flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12'>
      <Link href='/' className='flex items-center gap-2'>
        <Image src={DEVFLOW_LOGO} alt='DevFlow Logo' width={23} height={23} />
        <p className='font-spaceGrotesk h2-bold text-dark-100 dark:text-light-900 max-sm:hidden'>
          <span className='text-primary-500'>Dev</span>Over<span className='text-primary-500'>Flow</span>
        </p>
      </Link>
      {/* Global Search */}
      <Searching />
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
