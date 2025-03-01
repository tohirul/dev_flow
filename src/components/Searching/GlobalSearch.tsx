import Image from 'next/image';

import { getAssets } from '@/lib/assets';
import { Input } from '@/ui/input';

const Searchbar = () => {
  const { SEARCH } = getAssets();
  return (
    <div className='background-light800_darkgradient relative w-full max-w-[600px] max-lg:hidden'>
      <div className='background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4'>
        <Image src={SEARCH} alt='Search' width={24} height={24} className='cursor-pointer' />
        <Input
          type='text'
          placeholder='Search globally'
          className='paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none'
        />
      </div>
    </div>
  );
};

export default Searchbar;
