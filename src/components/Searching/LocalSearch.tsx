import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Input } from '@/ui/input';

const LocalSearch = ({
  iconPosition,
  icon,
  placeholder,
  otherClasses
}: {
  route: string;
  iconPosition: string;
  icon: string;
  placeholder: string;
  otherClasses: string;
}) => {
  // console.log(route);
  return (
    <div className='relative w-full'>
      <div
        className={cn(
          `background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 shadow-md dark:shadow-none`,
          otherClasses
        )}>
        {iconPosition === 'left' && <Image src={icon} alt='Search' width={24} height={24} className='cursor-pointer' />}
        <Input
          type='text'
          placeholder={placeholder}
          className='paragraph-regular no-focus placeholder border-none shadow-none outline-none'
        />
        {iconPosition === 'right' && (
          <Image src={icon} alt='Search' width={24} height={24} className='cursor-pointer' />
        )}
      </div>
    </div>
  );
};

export default LocalSearch;
