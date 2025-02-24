import Links from '@/components/shared/Links/Links';

import SignedOutContent from './SignedOutContent';

const LeftSidebar = () => {
  return (
    <section className='max-lg:hidden top-0 right-0 sticky flex flex-col gap-6 shadow-md dark:shadow-none custom-scrollbar custom-scrollbar p-6 pt-36 light-border border-l w-[350px] h-screen overflow-y-auto background-light900_dark200'>
      <Links />

      <SignedOutContent />
    </section>
  );
};

export default LeftSidebar;
