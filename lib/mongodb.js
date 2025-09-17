import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Reuse client during hot reloads in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // New client in production
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;