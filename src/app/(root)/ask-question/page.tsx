'use server';

import { redirect } from 'next/navigation';

import QuestionForm from '@/components/Forms/QuestionForm';
import { getUserByClerkId } from '@/server/actions/user.action';
import { auth } from '@clerk/nextjs/server';

export default async function Page() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const loggedInUser = await getUserByClerkId({ clerkId: userId });
  if (!loggedInUser) redirect('/sign-in');

  // Ensure that only serializable data is passed to the client component
  const userIdString = loggedInUser.id ? loggedInUser.id.toString() : '';

  return (
    <section>
      <h1 className='text-dark100_light900 h1-bold'>Ask a Question!</h1>
      <div className='mt-9'>
        <QuestionForm userId={userIdString} />
      </div>
    </section>
  );
}
