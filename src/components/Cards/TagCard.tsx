import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import ROUTES from '@/constants/routes';
import { getAssets } from '@/lib/assets';
import { cn, getDeviconClassName, getTechDescription } from '@/lib/utils';
import { Badge } from '@/ui/badge';

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({ _id, name, questions, showCount, compact, remove, isButton, handleRemove }: Props) => {
  const iconClass = getDeviconClassName(name);
  const iconDescription = getTechDescription(name);
  const { CLOSE } = getAssets();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const Content = (
    <>
      <Badge className='text-light400_light500 subtle-medium background-light800_dark300 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase'>
        <div className='flex-center space-x-2'>
          <i className={`${iconClass} text-sm`}></i>
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src={CLOSE}
            width={12}
            height={12}
            alt='close icon'
            className='cursor-pointer object-contain invert-0 dark:invert'
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && <p className='text-dark500_light700 small-medium'>{questions}</p>}
    </>
  );

  if (compact) {
    return isButton ? (
      <button onClick={handleClick} className='flex justify-between gap-2'>
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(_id)} className='flex justify-between gap-2'>
        {Content}
      </Link>
    );
  }

  return (
    <Link href={ROUTES.TAG(_id)} className='shadow-light100_darknone'>
      <article className='light-border background-light900_dark200 flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]'>
        <div className='flex items-center justify-between gap-3'>
          <div className='background-light800_dark400 w-fit rounded-sm px-5 py-1.5'>
            <p className='paragraph-semibold text-dark300_light900'>{name}</p>
          </div>
          <i className={cn(iconClass, 'text-2xl')} aria-hidden='true' />
        </div>

        <p className='text-dark500_light700 small-regular mt-5 line-clamp-3 w-full'>{iconDescription}</p>

        <p className='text-dark400_light500 small-medium mt-3.5'>
          <span className='primary-text-gradient body-semibold mr-2.5'>{questions}+</span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
