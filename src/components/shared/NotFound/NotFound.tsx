import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getAssets } from '@/lib/assets';

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
    <div className='mt-10 flex w-full flex-col items-center justify-center'>
      <Image
        src={LIGHT_ILLUSTRATION}
        alt='No question found'
        width={200}
        height={200}
        className='block object-contain dark:hidden'
      />
      <Image
        src={DARK_ILLUSTRATION}
        alt='No question found'
        width={200}
        height={200}
        className='hidden object-contain dark:block'
      />

      <h2 className='text-dark200_light900 h2-bold'>{title}</h2>
      <p className='text-dark500_light700 body-regular mt-2 max-w-md text-center'>{content}</p>
      <Link href={link}>
        <Button className='paragraph-medium mt-5 min-h-[46px] px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900'>
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
