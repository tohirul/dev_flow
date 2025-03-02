'use client';

import { useRouter } from 'next/navigation';

// Import useRouter hook
import TagBadge from '@/components/shared/TagBadge/TagBadge';
import ROUTES from '@/constants/routes';
import { cn, getDeviconClassName, getTechDescription } from '@/lib/utils';

import { ControllerRenderProps, UseFormSetError, UseFormSetValue } from 'react-hook-form';

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  tag?: string;
  field?: ControllerRenderProps<
    { tags: string[]; title: string; content: string; images?: string[] | undefined },
    'tags'
  >;
  setValue?: UseFormSetValue<{ tags: string[]; title: string; content: string; images?: string[] | undefined }>;
  setError?: UseFormSetError<{ tags: string[] }>;
  clearErrors?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions = 0,
  showCount = false,
  compact = false,
  remove = false,
  tag,
  field,
  setValue,
  setError,
  clearErrors
}: Props) => {
  const router = useRouter(); // Initialize the router
  const iconClass = getDeviconClassName(name);
  const iconDescription = getTechDescription(name);

  const handleCardClick = () => {
    // Programmatically navigate to the route without using Link
    router.push(ROUTES.TAG(_id)); // Redirect to the tag route
  };

  if (compact) {
    return (
      <TagBadge
        _id={_id}
        name={name}
        iconClass={iconClass}
        remove={remove}
        showCount={showCount}
        questions={questions}
        tag={tag || ''}
        field={field!}
        setValue={setValue!}
        setError={setError!}
        clearErrors={clearErrors!}
      />
    );
  }

  // Only pass necessary information here
  return (
    <div className='shadow-light100_darknone cursor-pointer' onClick={handleCardClick}>
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
    </div>
  );
};

export default TagCard;
