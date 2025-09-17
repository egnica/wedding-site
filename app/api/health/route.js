import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // Don’t echo the whole URI, just confirm it exists
  const hasUri = !!process.env.MONGODB_URI;
  let canConnect = false;
  let message = "ok";

  try {
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    canConnect = true;
    await client.close();
  } catch (err) {
    message = String(err?.message || err);
  }

  return NextResponse.json({ hasUri, canConnect, message });
}
