import Links from '@/components/shared/Links/Links';

import SignedOutContent from './SignedOutContent';

const LeftSidebar = () => {
  return (
    <section className='custom-scrollbar custom-scrollbar light-border background-light900_dark200 sticky right-0 top-0 flex h-screen flex-col gap-6 overflow-y-auto border-l p-6 shadow-md dark:shadow-none max-md:hidden md:w-[100px] md:pt-28 lg:w-[350px] lg:pt-36'>
      <Links />

      <SignedOutContent />
    </section>
  );
};

export default LeftSidebar;
