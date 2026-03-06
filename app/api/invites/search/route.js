import { NextResponse } from "next/server";
import getClientPromise from "@/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();

  if (!q) {
    return NextResponse.json([]);
  }

  const client = await getClientPromise();
  const db = client.db("wedding");
  const collection = db.collection("invites");

  const results = await collection
    .find({ title: { $regex: q, $options: "i" } })
    .project({ title: 1 })
    .limit(10)
    .toArray();

  return NextResponse.json(results);
}
