// app/admin/page.js
import { headers } from "next/headers";

function normalizeMeal(meal) {
  if (!meal) return null;
  return String(meal);
}

const messageBoard = [];

function buildRows(invites) {
  const attending = [];
  const notAttending = [];
  const noResponse = [];

  const mealCounts = {
    braised_short_rib: 0,
    pan_seared_walleye: 0,
    squash_risotto: 0,
    choice: 0,
  };

  const flaggedHouseholds = [];

  for (const invite of invites) {
    const householdTitle = invite.title ?? "(No title)";
    const rsvp = invite.rsvp ?? null;
    const selections = rsvp?.selections ?? {};
    const householdStatus = rsvp?.status ?? null;
    const message = invite.rsvp.note;

    if (message != "") {
      messageBoard.push(`${householdTitle} - ${message}`);
    }

    // Flag: household declined but any individual isn't explicitly false
    if (householdStatus === "declined") {
      const hasMismatch = Object.values(selections).some(
        (s) => (s?.attending ?? null) !== false,
      );
      if (hasMismatch) {
        flaggedHouseholds.push({
          householdTitle,
          inviteId: invite._id,
        });
      }
    }

    // People are keys of selections
    for (const [nameKey, sel] of Object.entries(selections)) {
      const attendingValue = sel?.attending ?? null;
      const meal = normalizeMeal(sel?.meal ?? null);

      // If key is "Guest" and guestName exists, use guestName instead
      let displayName = nameKey;
      if (
        nameKey.toLowerCase() === "guest" &&
        sel?.guestName &&
        sel.guestName.trim() !== ""
      ) {
        displayName = `${sel.guestName.trim()} - **Is a Guest**`;
      }

      const base = {
        name: displayName,
        householdTitle,
        meal,
      };

      if (attendingValue === true) {
        attending.push(base);
        if (meal && Object.prototype.hasOwnProperty.call(mealCounts, meal)) {
          mealCounts[meal] += 1;
        }
      } else if (attendingValue === false) {
        notAttending.push(base);
      } else {
        noResponse.push(base);
      }
    }
  }

  const byName = (a, b) => a.name.localeCompare(b.name);
  attending.sort(byName);
  notAttending.sort(byName);
  noResponse.sort(byName);

  return { attending, notAttending, noResponse, mealCounts, flaggedHouseholds };
}

export default async function AdminPage() {
  // Build absolute URL so this works locally + on deploy
  const h = await headers();
  const protocol = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host");
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/invites/list`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main style={{ padding: 16 }}>
        <h1>RSVP Admin</h1>
        <p>Failed to load invites. Status: {res.status}</p>
      </main>
    );
  }

  const data = await res.json();
  const invites = data?.invites ?? [];

  const { attending, notAttending, noResponse, mealCounts, flaggedHouseholds } =
    buildRows(invites);

  return (
    <main style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: 12 }}>RSVP Admin</h1>

      <section style={{ marginBottom: 16 }}>
        <h2>Totals</h2>
        <ul>
          <li>
            <strong>Attending:</strong> {attending.length}
          </li>
          <li>
            <strong>Not attending:</strong> {notAttending.length}
          </li>
          <li>
            <strong>No response:</strong> {noResponse.length}
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 16 }}>
        <h2>Meal counts (attendees only)</h2>
        <ul>
          <li>braised_short_rib: {mealCounts.braised_short_rib}</li>
          <li>pan_seared_walleye: {mealCounts.pan_seared_walleye}</li>
          <li>squash_risotto: {mealCounts.squash_risotto}</li>
          <li>choice: {mealCounts.choice}</li>
        </ul>
      </section>

      <section style={{ marginBottom: 16 }}>
        <h2>Flags</h2>
        {flaggedHouseholds.length === 0 ? (
          <p>No declined-household mismatches found.</p>
        ) : (
          <>
            <p style={{ marginTop: 0 }}>
              Households where <code>rsvp.status</code> is{" "}
              <code>"declined"</code> but an individual selection is not{" "}
              <code>false</code>:
            </p>
            <ul>
              {flaggedHouseholds.map((h) => (
                <li key={h.inviteId}>
                  <strong>{h.householdTitle}</strong> — inviteId:{" "}
                  <code>{h.inviteId}</code>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
      <section style={{ marginBottom: 16 }}>
        <h2>Messages</h2>
        {messageBoard.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </section>

      <section style={{ marginBottom: 16 }}>
        <h2>Attending list</h2>
        {attending.length === 0 ? (
          <p>None</p>
        ) : (
          <ul>
            {attending.map((p) => (
              <li key={`${p.householdTitle}-${p.name}`}>
                {p.name} — {p.householdTitle} —{" "}
                <strong>{p.meal ?? "(no meal)"}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginBottom: 16 }}>
        <h2>Not attending list</h2>
        {notAttending.length === 0 ? (
          <p>None</p>
        ) : (
          <ul>
            {notAttending.map((p) => (
              <li key={`${p.householdTitle}-${p.name}`}>
                {p.name} — {p.householdTitle}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginBottom: 16 }}>
        <h2>No response list</h2>
        {noResponse.length === 0 ? (
          <p>None</p>
        ) : (
          <ul>
            {noResponse.map((p) => (
              <li key={`${p.householdTitle}-${p.name}`}>
                {p.name} — {p.householdTitle}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
