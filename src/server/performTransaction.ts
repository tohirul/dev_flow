'use server';

import { endTransaction, startTransaction } from '@/server/database';

import { ClientSession } from 'mongoose';

export async function performTransaction<T, R>(
  callback: (session: ClientSession, data: T) => Promise<R>,
  data: T
): Promise<R> {
  // The function now returns a Promise of type R
  const session = await startTransaction();

  try {
    // Perform the database operations within the transaction using the callback
    const result = await callback(session, data);

    // If everything goes fine, commit the transaction
    await endTransaction(session, true);
    // console.log('Transaction committed successfully.', result);
    return result; // Return the result of the callback
  } catch (error: unknown) {
    if (session) {
      // If an error occurs, abort the transaction
      await endTransaction(session, false);
    }

    // Log or throw the error with more context if needed
    console.error('Error during transaction:', error);
    throw new Error(`Transaction failed: ${(error as Error).message}`);
  }
}
