import { connectToDatabase } from './database';
import { performTransaction } from './performTransaction';
import { ClientSession } from 'mongoose';

interface ActionOptions<T> {
  transaction?: boolean;
  data?: T;
}

export const performAction = async <T, Q>(
  fn: (session?: ClientSession, dataOrQuery?: T) => Promise<Q>,
  options: ActionOptions<T>
) => {
  await connectToDatabase();

  if (options.transaction === true) {
    // If transaction is required, perform the action within a transaction
    return await performTransaction(fn, options.data);
  } else {
    return await fn(undefined, options.data);
  }
};
