import { MongoClient, ServerApiVersion, Db, Document } from "mongodb";
import { ENV } from "./env.js";

interface MongoConfig {
  serverApi: {
    version: ServerApiVersion;
    strict: boolean;
    deprecationErrors: boolean;
  }
}

if (!ENV.DB_URI) {
  throw new Error("DB_URI environment variable is not defined");
}

const client: MongoClient = new MongoClient(ENV.DB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  } as MongoConfig);

let db: Db | undefined;

const connectDB = async (): Promise<void> => {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db(ENV.DB_NAME);
    
    const result: Document = await db.command({ ping: 1 });
    console.log("Pinged your deployment:", result);
  } catch (err: unknown) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

const getDb = (): Db => {
  if (!db) {
    throw new Error("No database connected!");
  }
  return db;
};

export { connectDB, getDb };
