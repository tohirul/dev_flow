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
import { getAssets } from '@/lib/assets';

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
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='text-dark100_light900 h1-bold text-center'>All Questions</h1>

        <Button className='primary-gradient mx-auto min-h-[46px] max-w-56 px-4 py-3 !text-light-900 sm:mx-0' asChild>
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </div>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
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
      <div className='mt-10 flex w-full flex-col gap-6'>
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
