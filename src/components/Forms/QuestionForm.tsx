'use client';

import React, { useCallback, useRef, useTransition } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ROUTES from '@/constants/routes';
import { toast } from '@/hooks/use-toast';
// import { toast } from "@/hooks/use-toast";
import { createQuestion } from '@/server/actions/question.action';
import { createQuestionSchema } from '@/zod/questionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { ReloadIcon } from '@radix-ui/react-icons';

import TagCard from '../Cards/TagCard';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false
});

const QuestionForm = ({
  question,
  userId,
  isEdit = false
}: {
  question?: Question;
  userId: string;
  isEdit?: boolean;
}) => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof createQuestionSchema>>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: isEdit
      ? { title: question?.title, content: question?.content, tags: question?.tags.map((tag) => tag.name) }
      : { title: '', content: '', tags: [] }
  });

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, field: { name: string }) => {
      if (e.key !== 'Enter' || field.name !== 'tags') return;

      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      const tags = form.getValues('tags');

      if (!tagValue) return;

      if (tagValue.length > 20) {
        form.setError('tags', { type: 'maxLength', message: 'Tag length must not exceed 20 characters' });
        return;
      }

      if (tags.includes(tagValue)) {
        form.setError('tags', { type: 'duplicate', message: 'Tag already exists' });
        return;
      }

      if (tags.length >= 5) {
        form.setError('tags', { type: 'limit', message: 'Maximum 5 tags are allowed' });
        return;
      }

      form.setValue('tags', [...tags, tagValue]);
      tagInput.value = '';
      form.clearErrors('tags');
    },
    [form]
  );

  const onSubmit = (data: z.infer<typeof createQuestionSchema>) => {
    startTransition(async () => {
      const result = await createQuestion({ ...data, author: userId, path: ROUTES.HOME });

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Question created successfully'
        });

        // if (result.data) router.push(ROUTES.QUESTION((result.data as Question)._id));
        if (result.data) router.push(ROUTES.HOME);
      } else {
        toast({
          title: 'Something went wrong. Please try again.'
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col justify-start gap-10'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Question Title
                <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl className='mt-3.5'>
                <Input
                  {...field}
                  className='light-border-2 paragraph-regular text-dark300_light700 no-focus background-light900_dark300 min-h-[56px] border'
                />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                A clear and concise title that summarizes your question.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Detailed explanation of your problem <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Editor value={field.value} editorRef={editorRef} fieldChange={field.onChange} />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Introduce the problem and expand on what you&apos;ve put in the title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Related Tags
                <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl className='mt-3.5'>
                <div>
                  <Input
                    className='light-border-2 paragraph-regular text-dark300_light700 no-focus background-light900_dark300 min-h-[56px] border'
                    placeholder='Include the tags related to your question'
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  <div className='my-5 flex gap-4'>
                    {field.value.map((tag) => (
                      <TagCard
                        key={tag}
                        _id={tag}
                        name={tag}
                        compact
                        remove
                        tag={tag}
                        field={field}
                        setValue={form.setValue}
                        setError={form.setError}
                        clearErrors={() => form.clearErrors('tags')}
                      />
                    ))}
                  </div>
                </div>
              </FormControl>

              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
                <br />
                example: &quot;react, redux, javascript&quot;
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <div className='mt-16 flex justify-end'>
          <Button type='submit' disabled={isPending} className='primary-gradient w-fit !text-light-900'>
            {isPending ? (
              <>
                <ReloadIcon className='mr-2 size-4 animate-spin' />
                <span>Submitting</span>
              </>
            ) : (
              <>{isEdit ? 'Edit' : 'Ask a Question'}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
