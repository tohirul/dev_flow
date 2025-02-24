'use client';

import React from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const Filter = ({
  filters,
  otherClasses,
  containerClasses
}: {
  filters: { name: string; value: string }[];
  otherClasses?: string;
  containerClasses?: string;
}) => {
  //   console.log(filters);
  return (
    <div className={cn(`flex items-center gap-2`, containerClasses)}>
      <Select>
        <SelectTrigger
          className={cn(
            'body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5',
            otherClasses
          )}>
          <div className='flex-1 text-left line-clamp-1'>
            <SelectValue placeholder='Filter Options' />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
