import mongoose, { ClientSession, Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Extend globalThis safely
const globalCache = (globalThis as unknown as { __mongoose__?: MongooseCache }).__mongoose__ ?? {
  conn: null,
  promise: null
};

// Connect to Database
export async function connectToDatabase() {
  console.log('Checking for existing Connection to the database...');
  try {
    mongoose.set('strictQuery', true);
    // mongoose.set('debug', function (collection, method, query, doc) {
    //   console.log(`[Mongoose Debug] ${collection}.${method}`, JSON.stringify(query), doc);
    // });

    // Use existing connection if available
    if (globalCache.conn) {
      console.log('Using existing database connection...');
      return globalCache.conn;
    }

    console.log('Creating a new database connection...');
    if (!globalCache.promise) {
      globalCache.promise = mongoose
        .connect(MONGODB_URI, {
          dbName: process.env.MONGODB_DB as string,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000
        })
        .then((mongoose) => mongoose.connection);

      // 🔥 Ensure we update globalThis.__mongoose__ before awaiting!
      (globalThis as unknown as { __mongoose__: MongooseCache }).__mongoose__ = globalCache;
    }

    globalCache.conn = await globalCache.promise;
    console.log('Successfully connected to the database');
    return globalCache.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

// Transaction functions

export async function startTransaction(): Promise<ClientSession> {
  const session = await mongoose.startSession();
  session.startTransaction();
  return session;
}

export async function endTransaction(session: ClientSession, success = true) {
  try {
    if (success) {
      await session.commitTransaction();
    } else {
      await session.abortTransaction();
    }
  } catch (error) {
    console.error('Transaction error:', error);
  } finally {
    session.endSession();
  }
}

// Disconnect from Database
export async function disconnectFromDatabase() {
  if (globalCache.conn) {
    await globalCache.conn.close();
    globalCache.conn = null;
    globalCache.promise = null;
  }
}
