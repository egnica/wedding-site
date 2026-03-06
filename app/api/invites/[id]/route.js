import { ObjectId } from "mongodb";
import getClientPromise from "@/lib/mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid id" }, { status: 400 });
    }

    const client = await getClientPromise();
    const db = client.db("wedding");
    const collection = db.collection("invites");

    const invite = await collection.findOne({
      _id: new ObjectId(String(id)),
    });

    if (!invite) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    invite._id = invite._id.toString();

    return Response.json(invite);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await req.json();
    const { status, selections, note } = body || {};

    if (status !== "attending" && status !== "declined") {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    const client = await getClientPromise();
    const db = client.db("wedding");
    const collection = db.collection("invites");

    // Load invite to know member keys (and prevent bogus names)
    const invite = await collection.findOne(
      { _id: new ObjectId(String(id)) },
      { projection: { members: 1 } },
    );

    if (!invite) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const safeSelections = {};
    for (const name of invite.members || []) {
      const s = selections?.[name] || {};
      const attending = status === "declined" ? false : s.attending;

      safeSelections[name] = {
        attending:
          attending === true ? true : attending === false ? false : null,
        meal: attending === true ? (s.meal ?? null) : null,
        ...(name === "Guest" ? { guestName: s.guestName ?? "" } : {}),
      };
    }

    // Minimal guardrail: if attending, require at least one attending === true
    if (status === "attending") {
      const anyAttending = Object.values(safeSelections).some(
        (s) => s.attending === true,
      );
      if (!anyAttending) {
        return Response.json(
          { error: "At least one person must be attending." },
          { status: 400 },
        );
      }
    }

    const updatedAt = new Date();

    await collection.updateOne(
      { _id: new ObjectId(String(id)) },
      {
        $set: {
          "rsvp.status": status,
          "rsvp.selections": safeSelections,
          "rsvp.note": typeof note === "string" ? note : "",
          "rsvp.updatedAt": updatedAt,
        },
      },
    );

    return Response.json({ ok: true, updatedAt }, { status: 200 });
  } catch (err) {
    console.error("PATCH /api/invites/[id] error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
