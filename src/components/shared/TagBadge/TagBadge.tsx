'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import ROUTES from '@/constants/routes';
import { getAssets } from '@/lib/assets';

import { ControllerRenderProps, UseFormSetError, UseFormSetValue } from 'react-hook-form';

interface Props {
  _id: string;
  name: string;
  iconClass: string;
  remove: boolean;
  showCount: boolean;
  questions: number;
  tag: string;
  field: ControllerRenderProps<
    { tags: string[]; title: string; content: string; images?: string[] | undefined },
    'tags'
  >;
  setValue: UseFormSetValue<{ tags: string[]; title: string; content: string; images?: string[] | undefined }>;
  setError: UseFormSetError<{ tags: string[] }>;
  clearErrors: () => void;
}

const TagBadge = ({
  _id,
  name,
  iconClass,
  remove,
  showCount,
  questions,
  tag,
  field,
  setValue,
  setError,
  clearErrors
}: Props) => {
  const handleTagRemove = (tag: string) => {
    // Only handle the state updates here (outside of render)
    const newTags = field.value.filter((t) => t !== tag);
    clearErrors();
    setValue('tags', newTags); // This can be handled client-side

    if (newTags.length === 0) {
      setError('tags', { type: 'custom', message: 'Please add at least one tag.' });
    }
  };
  const { CLOSE } = getAssets();

  return (
    <Badge className='text-light400_light500 subtle-medium background-light800_dark300 flex flex-row gap-2 rounded-md border-none px-4 py-3 uppercase'>
      <Link href={ROUTES.TAG(_id)} className='flex justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <i className={`${iconClass} text-sm`} aria-hidden='true'></i>
          <span>{name}</span>
        </div>
      </Link>

      {remove && (
        <Image
          src={CLOSE}
          width={12}
          height={12}
          alt='close icon'
          className='cursor-pointer object-contain invert-0 dark:invert'
          onClick={() => handleTagRemove(tag)}
        />
      )}

      {showCount && <span className='text-xs font-medium'>{questions}</span>}
    </Badge>
  );
};

export default TagBadge;
