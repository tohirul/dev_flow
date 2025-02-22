import { ReactNode } from 'react';

// import LeftSidebar from '@/components/navigation/LeftSidebar';
// import RightSidebar from '@/components/navigation/RightSidebar';
import Navbar from '@/components/Navbar/Navbar';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='background-light850_dark100 realtive'>
      <Navbar />

      <div className='flex'>
        {/* <LeftSidebar /> */}

        <section className='flex flex-col flex-1 px-6 sm:px-14 pt-36 pb-6 max-md:pb-14 min-h-screen'>
          <div className='mx-auto w-full max-w-5xl'>{children}</div>
        </section>

        {/* <RightSidebar /> */}
      </div>
    </main>
  );
};

export default RootLayout;
