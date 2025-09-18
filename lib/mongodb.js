import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://USER:P%40SS@yourcluster.mongodb.net/?retryWrites=true&w=majority&appName=WeddingSite";
let cached = global._mongoClientPromise || null;
export default function getClientPromise() {
  if (cached) return cached;
  const client = new MongoClient(uri);
  cached = client.connect();
  if (process.env.NODE_ENV === "development")
    global._mongoClientPromise = cached;
  return cached;
}
