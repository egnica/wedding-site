import { NextResponse } from "next/server";
import getClientPromise from "@/lib/mongodb"; // path should match where mongodb.js lives

export async function GET() {
  try {
    const client = await getClientPromise();
    const db = client.db("wedding");
    const collection = db.collection("invites");

    const invites = await collection
      .find(
        {},
        {
          projection: {
            title: 1,
            members: 1,
            rsvp: 1,
            createdAt: 1, // only needed because we sort by it
          },
        },
      )
      .sort({ createdAt: 1 })
      .toArray();

    const formatted = invites.map((doc) => ({
      _id: doc._id.toString(),
      title: doc.title,
      members: doc.members ?? [],
      rsvp: doc.rsvp ?? null,
    }));

    return NextResponse.json({ invites: formatted });
  } catch (error) {
    console.error("GET /api/invites/list error:", error);
    return NextResponse.json(
      { error: "Failed to load invites" },
      { status: 500 },
    );
  }
}
