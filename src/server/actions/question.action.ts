'use server';

import { revalidatePath } from 'next/cache';

import { sendResponse } from '@/lib/sendResponse';
import Question, { IQuestion } from '@/server/models/question.model';
import Tag, { ITag } from '@/server/models/tag.model';
import User from '@/server/models/user.model';
import { performAction } from '@/server/performAction';

export async function createQuestion(data: CreateQuestionParams, path?: string): Promise<Response<null>> {
  return await performAction<CreateQuestionParams, Response<null>>(
    async (session, data) => {
      if (!data) {
        throw new Error('No data provided for question creation.');
      }

      const { title, content, tags, author } = data;

      // Create the question document within the transaction session
      const questions = await Question.create([{ title, content, tags: [], author }], { session });

      if (!questions || questions.length === 0) {
        throw new Error('Failed to create question.');
      }

      const createdQuestion = questions[0];
      const tagDocuments: ITag[] = [];

      // Handle tags if provided
      if (tags && tags.length > 0) {
        for (const tag of tags) {
          const existingTag = await Tag.findOneAndUpdate(
            { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
            { $setOnInsert: { name: tag }, $push: { questions: createdQuestion._id } },
            { upsert: true, new: true, session }
          );
          if (existingTag) tagDocuments.push(existingTag);
          else {
            const newTag = await Tag.create([{ name: tag, questions: [createdQuestion._id] }], { session });
            tagDocuments.push(newTag[0]);
          }
        }
      }

      // Update the question with tag references within the transaction
      await Question.findByIdAndUpdate(
        createdQuestion._id,
        { $push: { tags: { $each: tagDocuments.map((tag) => tag._id) } } },
        { session }
      );

      // Update user with the new question
      await User.findByIdAndUpdate(
        createdQuestion.author,
        { $push: { userQuestions: createdQuestion._id } },
        { session }
      );

      // Only revalidate the path if the entire transaction was successful
      if (path) {
        revalidatePath(path);
      }

      return sendResponse('Question created successfully', null, 201);
    },
    { transaction: true, data }
  );
}

export async function getAllQuestions(params: GetAllQuestionsParams = {}): Promise<Response<IQuestion[]>> {
  return await performAction(
    async (data): Promise<Response<IQuestion[]>> => {
      const questions: IQuestion[] = await Question.find({ ...data })
        .populate({
          path: 'tags',
          model: Tag,
          select: '_id name'
        })
        .populate({
          path: 'author',
          model: User,
          select: '_id clerkId name username reputation picture'
        })
        .sort({ createdAt: -1 });
      return sendResponse<IQuestion[]>('All questions fetched successfully', questions, 200);
    },
    { transaction: false, data: { ...params } }
  );
}
