import Image from 'next/image';

import { Input } from '@/ui/input';
import { getAssets } from '@/utilities/assets';

const Searchbar = () => {
  const { SEARCH } = getAssets();
  return (
    <div className='max-lg:hidden relative w-full max-w-[600px] background-light800_darkgradient'>
      <div className='relative flex items-center gap-1 px-4 rounded-xl min-h-[56px] background-light800_darkgradient grow'>
        <Image src={SEARCH} alt='Search' width={24} height={24} className='cursor-pointer' />
        <Input
          type='text'
          placeholder='Search globally'
          className='shadow-none border-none outline-none paragraph-regular no-focus placeholder background-light800_darkgradient'
        />
      </div>
    </div>
  );
};

export default Searchbar;
