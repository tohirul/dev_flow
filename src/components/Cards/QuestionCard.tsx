'use server';

import Link from 'next/link';

import TagCard from '@/components/Cards/TagCard';
import Metric from '@/components/shared/Metric/Metric';
import { getAssets } from '@/lib/assets';
import { formatNumber, getTimeStamp } from '@/lib/utils';

const QuestionCard = ({ question }: { question: Question }) => {
  // Render question card component here
  // Display question title, content, author, upvotes, views, and answers
  const { _id, title, content, author, upvotes, views, answers, tags, createdAt } = question as Question;
  const { AVATAR, EYE, LIKE, MESSAGE } = getAssets();

  return (
    <div className='card-wrapper rounded-[10px] p-9 px-4 sm:px-11'>
      <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
        <div>
          <span className='text-dark400_light700 subtitle-regular my-2 line-clamp-1 flex sm:hidden'>
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/questions/${_id}`}>
            <h3 className='text-dark-200_light900 sm:h3-semibold base-semibold line-clamp-1 flex-1'>{title}</h3>
          </Link>
          <p className='mt-1.5 line-clamp-2 flex flex-1 sm:mt-3.5'>
            {content?.length > 200 ? content.slice(0, 200) + ' . . .' : content}
          </p>
          <div className='5 mt-3 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <TagCard key={tag._id} _id={tag._id} name={tag.name} compact={true} />
            ))}
          </div>
          <div className='flex-between mt-6 w-full flex-wrap gap-3'>
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
