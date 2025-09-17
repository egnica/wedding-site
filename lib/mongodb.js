import { MongoClient } from "mongodb";

// ⚠️ TEMPORARY: hard-coded URI (not safe for long-term)
const uri =
  "mongodb+srv://USERNAME:PASSWORD@wedding-cluster.r5lbcri.mongodb.net/?retryWrites=true&w=majority&appName=wedding-cluster";

let cached = global._mongoClientPromise || null;

export default function getClientPromise() {
  if (cached) return cached;

  const client = new MongoClient(uri);
  cached = client.connect();

  if (process.env.NODE_ENV === "development") {
    global._mongoClientPromise = cached;
  }

  return cached;
}
