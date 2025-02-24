import React from 'react';

import Link from 'next/link';

import TagCard from '@/components/Cards/TagCard';
import Metric from '@/components/shared/Metric/Metric';
import { formatNumber, getTimeStamp } from '@/lib/utils';
import { getAssets } from '@/utilities/assets';

const QuestionCard = ({ question }: { question: Question }) => {
  // Render question card component here
  // Display question title, content, author, upvotes, views, and answers
  const { title, content, author, upvotes, views, answers, tags, createdAt } = question;
  const { AVATAR, EYE, LIKE, MESSAGE } = getAssets();

  return (
    <div className='p-9 px-4 sm:px-11 rounded-[10px] card-wrapper'>
      <div className='flex sm:flex-row flex-col-reverse justify-between items-start gap-5'>
        <div>
          <span className='sm:hidden flex my-2 text-dark400_light700 line-clamp-1 subtitle-regular'>
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/questions/${question._id}`}>
            <h3 className='flex-1 text-dark-200_light900 line-clamp-1 sm:h3-semibold base-semibold'>{title}</h3>
          </Link>
          <p className='flex flex-1 mt-1.5 sm:mt-3.5 line-clamp-2'>{content}</p>
          <div className='flex flex-wrap gap-2 mt-3 5'>
            {tags.map((tag) => (
              <TagCard key={tag._id} _id={tag._id} name={tag.name} compact={true} />
            ))}
          </div>
          <div className='flex-wrap flex-between gap-3 mt-6 w-full'>
            <Metric
              ICON={AVATAR}
              ICON_ALT_TEXT='user'
              value={author?.name}
              title={` - asked ${getTimeStamp(createdAt)}`}
              isAuthor={true}
              link={`/profile/${author?._id}`}
              text_style='body-medium text-dark400_light800'
            />
            <Metric
              ICON={LIKE}
              ICON_ALT_TEXT='Upvote Count'
              value={formatNumber(upvotes)}
              title='Upvotes'
              text_style='small-medium text-dark400_light800'
            />
            <Metric
              ICON={MESSAGE}
              ICON_ALT_TEXT='Total Answers'
              value={formatNumber(answers?.length)}
              title='Answers'
              text_style='small-medium text-dark400_light800'
            />
            <Metric
              ICON={EYE}
              ICON_ALT_TEXT='View Count'
              value={formatNumber(views)}
              title='Views'
              text_style='small-medium text-dark400_light800'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
