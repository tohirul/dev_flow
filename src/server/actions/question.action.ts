'use server';

import Question, { IQuestion } from '@/server/models/question.model';
import Tag, { ITag } from '@/server/models/tag.model';
import User from '@/server/models/user.model';
import { performAction } from '@/server/performAction';

interface QuestionData {
  title: string;
  content: string;
  tags: string[];
  author?: string;
}

export async function createQuestion(
  data: QuestionData
): Promise<{ success: boolean; message: string; questionId?: string }> {
  return await performAction<QuestionData, { success: boolean; message: string; questionId?: string }>(
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

      const createdQuestion = questions[0]; // First created question
      const tagDocuments: ITag[] = [];

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

      await User.findByIdAndUpdate(
        createdQuestion.author,
        {
          $push: { userQuestions: createdQuestion._id }
        },
        { session }
      );

      return {
        success: true,
        message: 'Question created successfully.',
        questionId: createdQuestion._id.toString()
      };
    },
    { transaction: true, data }
  );
}

export async function getAllQuestions(): Promise<{ success: boolean; message: string; results?: IQuestion[] }> {
  return await performAction(
    async () => {
      const questions = await Question.find({})
        .populate({
          path: 'tags',
          model: Tag,
          select: '_id name'
        })
        .populate({
          path: 'author',
          model: User,
          select: '_id clerkId name picture'
        })
        .sort({ createdAt: -1 });
      return {
        success: true,
        message: 'Questions fetched successfully.',
        results: questions
      };
    },
    { transaction: false, data: {} }
  );
}
