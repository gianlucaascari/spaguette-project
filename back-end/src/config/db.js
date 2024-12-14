import { MongoClient, ServerApiVersion } from "mongodb";
import { ENV } from "./env.js";

const client = new MongoClient(ENV.DB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

let db;

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db(ENV.DB_NAME);
    
    // Invio di un ping per confermare una connessione riuscita
    const result = await db.command({ ping: 1 });
    console.log("Pinged your deployment:", result);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

const getDb = () => {
  if (!db) {
    throw new Error("No database connected!");
  }
  return db;
};

export { connectDB, getDb };

