import { NextResponse } from "next/server";
import getClientPromise from "../../../lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DB_NAME = "wedding";
const COLLECTION = "counters";
const COUNTER_ID = "teams";

export async function GET() {
  try {
    const client = await getClientPromise();
    const col = client.db(DB_NAME).collection(COLLECTION);

    const doc = await col.findOne(
      { _id: COUNTER_ID },
      { projection: { _id: 0, vikings: 1, packers: 1 } }
    );

    return NextResponse.json({
      vikings: doc?.vikings ?? 0,
      packers: doc?.packers ?? 0,
    });
  } catch (err) {
    console.error("GET /api/counter error:", err);
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const url = new URL(req.url);
    const team = url.searchParams.get("team");
    if (!team || !["vikings", "packers"].includes(team)) {
      return NextResponse.json(
        { error: "team must be 'vikings' or 'packers'" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const col = client.db(DB_NAME).collection(COLLECTION);

    const setOnInsert = team === "vikings" ? { packers: 0 } : { vikings: 0 };

    await col.updateOne(
      { _id: COUNTER_ID },
      { $inc: { [team]: 1 }, $setOnInsert: setOnInsert },
      { upsert: true }
    );

    const doc = await col.findOne(
      { _id: COUNTER_ID },
      { projection: { _id: 0, vikings: 1, packers: 1 } }
    );

    return NextResponse.json({
      vikings: doc?.vikings ?? 0,
      packers: doc?.packers ?? 0,
    });
  } catch (err) {
    console.error("POST /api/counter error:", err);
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
