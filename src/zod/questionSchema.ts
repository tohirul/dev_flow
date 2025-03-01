import * as z from 'zod';

const createQuestionSchema = z.object({
  title: z.string().min(5).max(130),
  content: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
  images: z.array(z.string()).optional()
});

export { createQuestionSchema };
