import React from 'react';

import { HomePageFilters } from '@/constants/filters';
import { cn } from '@/lib/utils';

const FilterTags = () => {
  const active = '';
  return (
    <div className='mt-10 hidden flex-wrap gap-3 md:flex'>
      {HomePageFilters.map((filter) => {
        return (
          <button
            key={filter.value}
            className={cn(
              'dark:bg-dark100_light900 text-light400_light500 body-medium rounded-lg px-4 py-2 font-bold capitalize shadow-md transition-all ease-in-out hover:bg-primary-500 hover:text-light-900 dark:bg-dark-300 dark:shadow-none dark:hover:bg-primary-500',
              active === filter.value ? 'bg-primary-100' : 'bg-light-800 text-light-500'
            )}>
            {filter.name}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTags;
