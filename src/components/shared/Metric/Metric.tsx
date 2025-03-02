'use server';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const Metric = ({ ICON, ICON_ALT_TEXT, value, title, text_style, isAuthor, link }: MetricProps) => {
  const MetricContent = () => {
    return (
      <>
        <div className='flex items-center gap-1'>
          {ICON && ICON_ALT_TEXT && (
            <Image
              src={ICON}
              alt={ICON_ALT_TEXT}
              width={16}
              height={16}
              className={cn('object-contain', link ? 'rounded-full' : '')}
            />
          )}
          {value && (
            <p className={cn('flex items-center gap-1', text_style)}>
              {value}
              <span className={cn('small-regular line-clamp-1', isAuthor ? 'max-sm:hidden' : '')}>{title}</span>
            </p>
          )}
        </div>
      </>
    );
  };
  return link ? <Link href={link}>{<MetricContent />}</Link> : <MetricContent />;
};

export default Metric;
