import * as z from 'zod';

const createQuestionSchema = z.object({
  title: z.string().min(20).max(200),
  content: z.string().min(200),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
  images: z.array(z.string()).optional()
});

export { createQuestionSchema };
