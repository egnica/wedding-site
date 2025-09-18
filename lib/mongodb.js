import { MongoClient } from "mongodb";
let cached = global._mongoClientPromise || null;

export default function getClientPromise() {
  if (cached) return cached;
  const uri = process.env.MONGODB_URI; // <— back to env
  if (!uri) throw new Error("MONGODB_URI is not set in the environment");
  const client = new MongoClient(uri);
  cached = client.connect();
  if (process.env.NODE_ENV === "development")
    global._mongoClientPromise = cached;
  return cached;
}
