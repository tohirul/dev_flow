import User, { IUser } from '@/server/models/user.model';
import { performAction } from '@/server/performAction';

import { Types } from 'mongoose';

export async function getUserById({ userId }: { userId: string }): Promise<IUser | void> {
  try {
    if (!userId) {
      throw new Error('UserId is undefined');
    }
    console.log('UserId: ', userId);

    // Validate if the userId is a valid ObjectId (24 characters hex string)
    if (!Types.ObjectId.isValid(userId)) {
      return;
    }

    const id = new Types.ObjectId(userId); // This is now safe to use

    return await performAction<{ userId: Types.ObjectId }, IUser | void>(
      async (_, data) => {
        if (!data || !data.userId) {
          throw new Error('UserId is undefined');
        }

        const user = await User.findById(data.userId);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      },
      { transaction: false, data: { userId: id } }
    );
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}
export async function getUserByClerkId({ clerkId }: { clerkId: string }): Promise<IUser | null> {
  try {
    if (!clerkId) {
      console.warn('Clerk ID is missing.');
      return null;
    }

    // console.log('Fetching user with Clerk ID:', clerkId);

    return await performAction<{ clerkId: string }, IUser | null>(
      async (_, data) => {
        if (!data || !data.clerkId) {
          console.warn('Clerk ID is missing in data.');
          return null;
        }
        const user = await User.findOne({ clerkId: data.clerkId }).select('-password'); // Exclude password for security

        if (!user) {
          console.warn(`User not found for Clerk ID: ${data.clerkId}`);
          return null;
        }

        return user;
      },
      { transaction: false, data: { clerkId } }
    );
  } catch (error) {
    console.error('Error fetching user by Clerk ID:', error);
    return null; // Return null instead of throwing an error
  }
}

export async function getUsers(): Promise<IUser[] | null> {
  try {
    return await performAction<void, IUser[]>(
      async () => {
        return await User.find({}).select('-password');
      },
      { transaction: false }
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}
