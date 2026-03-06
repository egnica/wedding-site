import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import getClientPromise from "@/lib/mongodb";

function parseMembers(title) {
  const normalized = title
    .replace(/\s*&\s*/g, " and ")
    .replace(/\s+/g, " ")
    .trim();

  // split on commas first, then split remaining parts on " and "
  const commaParts = normalized
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/^and\s+/i, "")); // <-- NEW: remove leading "and "

  const members = [];
  for (const part of commaParts) {
    const andParts = part
      .split(/\s+and\s+/i)
      .map((s) => s.trim())
      .filter(Boolean);
    members.push(...andParts);
  }

  return members;
}

function buildRsvp(members) {
  const selections = {};

  for (const name of members) {
    if (name === "Guest") {
      selections[name] = {
        attending: null,
        meal: null,
        guestName: "",
      };
    } else {
      selections[name] = {
        attending: null,
        meal: null,
      };
    }
  }

  return {
    status: null,
    selections,
    note: "",
    updatedAt: null,
  };
}

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "invites.csv");

  try {
    const text = fs.readFileSync(filePath, "utf8");

    // Normalize line endings
    const lines = text.replace(/\r/g, "").split("\n");

    // Remove header and empty lines
    const titles = lines
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => l.replace(/^"|"$/g, "")); // remove wrapping quotes

    const docs = titles.map((title) => {
      const members = parseMembers(title);

      return {
        title,
        members,
        rsvp: buildRsvp(members),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const client = await getClientPromise();
    const db = client.db("wedding"); // uses DB from your connection string
    const collection = db.collection("invites");

    const result = await collection.insertMany(docs);

    return NextResponse.json({
      ok: true,
      insertedCount: result.insertedCount,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 },
    );
  }
}
