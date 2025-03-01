'use server';

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
import { getAllQuestions } from '@/server/actions/question.action';

async function fetchQuestions() {
  // Simulate a server-side fetch
  return await getAllQuestions({});
}

export default async function Home() {
  const { SEARCH } = getAssets();
  const result = await fetchQuestions();
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
        {result?.questions?.length ? (
          result?.questions.map((question) => (
            <QuestionCard key={question.id} question={question as unknown as Question} />
          ))
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
