import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getAssets } from '@/utilities/assets';

const NotFound = ({
  title,
  content,
  buttonText,
  link
}: {
  title: string;
  content: string;
  buttonText: string;
  link: string;
}) => {
  const { LIGHT_ILLUSTRATION, DARK_ILLUSTRATION } = getAssets();
  return (
    <div className='flex flex-col justify-center items-center mt-10 w-full'>
      <Image
        src={LIGHT_ILLUSTRATION}
        alt='No question found'
        width={200}
        height={200}
        className='dark:hidden block object-contain'
      />
      <Image
        src={DARK_ILLUSTRATION}
        alt='No question found'
        width={200}
        height={200}
        className='hidden dark:block object-contain'
      />

      <h2 className='text-dark200_light900 h2-bold'>{title}</h2>
      <p className='mt-2 max-w-md text-dark500_light700 text-center body-regular'>{content}</p>
      <Link href={link}>
        <Button className='hover:bg-primary-500 dark:bg-primary-500 mt-5 px-4 py-3 paragraph-medium min-h-[46px] text-light-900 dark:text-light-900'>
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
