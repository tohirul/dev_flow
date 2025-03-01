import { redirect } from 'next/navigation';

import QuestionForm from '@/components/Forms/QuestionForm';
import { getUserByClerkId } from '@/server/actions/user.action';
// import { getUserById } from '@/server/actions/user.action';
import { auth } from '@clerk/nextjs/server';

export default async function page() {
  const { userId } = await auth();
  // console.log('userId', userId);
  if (!userId) redirect('/sign-in');

  const loggedInUser = await getUserByClerkId({ clerkId: userId });
  // console.log('User', loggedInUser);

  return (
    <section>
      <h1 className='text-dark100_light900 h1-bold'>Ask a Question!</h1>
      {/* Form for asking a question */}
      <div className='mt-9'>
        <QuestionForm userId={loggedInUser?.id as string} />
      </div>
    </section>
  );
}
