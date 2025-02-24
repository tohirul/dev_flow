'use client';

import Link from 'next/link';

import QuestionCard from '@/components/Cards/QuestionCard';
import LocalSearch from '@/components/Searching/LocalSearch';
import Filter from '@/components/shared/Filter/Filter';
import FilterTags from '@/components/shared/Filter/FilterTags';
import NotFound from '@/components/shared/NotFound/NotFound';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import ROUTES from '@/constants/routes';
import { getAssets } from '@/utilities/assets';

export default function Home() {
  const { SEARCH } = getAssets();
  const questions: Question[] = [
    {
      _id: '1',
      title: 'How to use Next.js?',
      content: 'I want to learn how to use Next.js for my next project.',
      tags: [
        { _id: '1', name: 'nextjs' },
        { _id: '2', name: 'react' }
      ],
      author: {
        _id: '1',
        name: 'John Doe',
        image: 'https://example.com/avatar.png'
      },
      upvotes: 10,
      views: 1003267,
      answers: [
        {
          _id: '1',
          content: 'This is the first answer.',
          author: {
            _id: '2',
            name: 'Jane Smith',
            image: 'https://example.com/avatar.png'
          },
          upvotes: 5,
          createdAt: new Date('2022-01-01T12:00:00')
        },
        {
          _id: '2',
          content: 'This is the second answer.',
          author: {
            _id: '3',
            name: 'Bob Johnson',
            image: 'https://example.com/avatar.png'
          },
          upvotes: 3,
          createdAt: new Date('2022-01-01T12:00:00')
        }
      ],
      createdAt: new Date('2022-01-01T12:00:00')
    },
    {
      _id: '2',
      title: 'How to use React?',
      content: 'I want to learn how to use React for my next project.',
      tags: [
        { _id: '3', name: 'react' },
        { _id: '4', name: 'javascript' }
      ],
      author: {
        _id: '4',
        name: 'Alice Johnson',
        image: 'https://example.com/avatar.png'
      },
      upvotes: 5,
      views: 50,
      answers: [
        {
          _id: '3',
          content: 'This is the third answer.',
          author: {
            _id: '5',
            name: 'Emily Davis',
            image: 'https://example.com/avatar.png'
          },
          upvotes: 2,
          createdAt: new Date('2022-01-02T12:00:00')
        }
      ],
      createdAt: new Date('2022-01-02T12:00:00')
    },
    {
      _id: '3',
      title: 'How to use JavaScript?',
      content: 'I want to learn how to use JavaScript for my next project.',
      tags: [
        { _id: '5', name: 'javascript' },
        { _id: '6', name: 'web' }
      ],
      author: {
        _id: '6',
        name: 'Michael Brown',
        image: 'https://example.com/avatar.png'
      },
      upvotes: 3,
      views: 30,
      answers: [],
      createdAt: new Date('2022-01-03T12:00:00')
    }
  ];
  return (
    <section>
      <div className='flex sm:flex-row flex-col-reverse justify-between sm:items-center gap-4 w-full'>
        <h1 className='text-dark100_light900 text-center h1-bold'>All Questions</h1>

        <Button className='mx-auto sm:mx-0 px-4 py-3 max-w-56 min-h-[46px] !text-light-900 primary-gradient' asChild>
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </div>
      <div className='flex max-sm:flex-col justify-between sm:items-center gap-5 mt-11'>
        {/* Local Search */}
        <LocalSearch
          route={ROUTES.HOME}
          iconPosition='left'
          placeholder='Search for questions'
          icon={SEARCH}
          otherClasses='flex-1'
        />
        {/* Filters */}
        <Filter
          filters={HomePageFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
          containerClasses='hidden max-md:flex'
        />
      </div>
      {/* Filter tags */}
      <FilterTags />

      {/* Questions */}
      <div className='flex flex-col gap-6 mt-10 w-full'>
        {questions?.length ? (
          questions.map((question) => <QuestionCard key={question._id} question={question} />)
        ) : (
          <NotFound
            title="There's no question to show"
            content='Be the first to ask a question. 🚀 Kickstart a discussion'
            buttonText='Ask a Question'
            link='/ask-question'
          />
        )}
      </div>
    </section>
  );
}
