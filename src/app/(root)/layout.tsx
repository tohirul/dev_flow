import { ReactNode } from 'react';

import Navbar from '@/components/Navigation/Navbar';
import RightSidebar from '@/components/Navigation/RightSidebar';
import SidebarWrapper from '@/components/shared/Wrappers/SidebarWrapper';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='background-light850_dark100 realtive'>
      <Navbar />

      <div className='flex'>
        <SidebarWrapper />

        <section className='flex flex-col flex-1 px-6 sm:px-14 pt-36 pb-6 max-md:pb-14 min-h-screen'>
          <div className='mx-auto w-full max-w-5xl'>{children}</div>
        </section>

        <RightSidebar />
      </div>
    </main>
  );
};

export default RootLayout;
