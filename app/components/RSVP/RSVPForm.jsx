//RSVPForm.jsx - RSVP Form
"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
export default function RSVPForm({ invite }) {
  const [status, setStatus] = useState(null); // null | "attending" | "declined"
  const [selections, setSelections] = useState({});
  const [note, setNote] = useState("");

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [savedAt, setSavedAt] = useState(null);

  const MEAL_OPTIONS = [
    {
      value: "choice",
      label: "Please select a meal",
    },
    {
      value: "braised_short_rib",
      label:
        "Braised Short Rib: parmesan polenta, roasted oyster mushroom, pistachio gremolata, onion au jus",
    },
    {
      value: "pan_seared_walleye",
      label:
        "Pan-Seared Walleye: crispy potato, bacon, spinach, mushroom, tomato, lemon garlic butter",
    },
    {
      value: "squash_risotto",
      label: "Squash Risotto: brie, sage, roasted mushrooms",
    },
  ];

  useEffect(() => {
    if (!invite) return;

    setStatus(null); // force choose each time (as you requested)
    setSelections(invite.rsvp?.selections || {});
    setNote(invite.rsvp?.note || "");
  }, [invite]);

  function handleDeclined() {
    setStatus("declined");

    // force all individuals to not attending + clear meal
    setSelections((prev) => {
      const next = { ...prev };
      for (const name of Object.keys(next)) {
        next[name] = { ...next[name], attending: false, meal: null };
      }
      return next;
    });
  }

  function handleAttending() {
    setStatus("attending");
  }

  function setPersonAttending(name, value) {
    setSelections((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        attending: value, // true | false
        meal: value ? (prev[name]?.meal ?? null) : null, // clear meal if not attending
      },
    }));
  }

  function setGuestName(value) {
    setSelections((prev) => ({
      ...prev,
      Guest: { ...prev.Guest, guestName: value },
    }));
  }

  function setPersonMeal(name, meal) {
    setSelections((prev) => ({
      ...prev,
      [name]: { ...prev[name], meal },
    }));
  }
  async function handleSave() {
    setSaveError("");
    setSavedAt(null);

    if (status === null) {
      setSaveError("Please choose Will attend or Cannot attend.");
      return;
    }

    // Normalize selections so "choice" becomes null (no meal selected)
    const normalizedSelections = {};
    for (const [name, s] of Object.entries(selections || {})) {
      normalizedSelections[name] = {
        ...s,
        meal: s?.meal === "choice" ? null : (s?.meal ?? null),
      };
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/invites/${invite._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          selections: normalizedSelections,
          note,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save RSVP");

      setSavedAt(data.updatedAt || new Date().toISOString());
    } catch (e) {
      setSaveError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2 style={{ marginBottom: 8 }}>{invite.title}</h2>

      {/* Step 1: Household decision */}
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button className={styles.btn} type="button" onClick={handleAttending}>
          Will attend
        </button>
        <button className={styles.btn} type="button" onClick={handleDeclined}>
          Cannot attend
        </button>
      </div>

      {status === null && (
        <p style={{ marginTop: 12 }}>Please choose one option above.</p>
      )}

      {/* Declined path: note only */}
      {status === "declined" && (
        <div style={{ marginTop: 16 }}>
          <label>
            Note (optional)
            <br />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              style={{ width: "100%", maxWidth: 520 }}
            />
          </label>
        </div>
      )}

      {/* Step 2: Attending path: per-person radios */}
      {status === "attending" && (
        <div style={{ marginTop: 16 }}>
          <h3 style={{ marginTop: 12 }}>Who will attend?</h3>

          <div style={{ display: "grid", gap: 12, marginTop: 10 }}>
            {invite.members?.map((name) => {
              const val = selections?.[name]?.attending; // null | true | false
              const meal = selections?.[name]?.meal ?? "";
              const group = `attending_${invite._id}_${name}`;

              return (
                <div
                  key={name}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 12,
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>{name}</div>

                  {/* Attending radios */}
                  <label style={{ marginRight: 14 }}>
                    <input
                      type="radio"
                      name={group}
                      checked={val === true}
                      onChange={() => setPersonAttending(name, true)}
                    />{" "}
                    Attending
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={group}
                      checked={val === false}
                      onChange={() => setPersonAttending(name, false)}
                    />{" "}
                    Not attending
                  </label>

                  {/* Meal dropdown – only if attending */}
                  {val === true && (
                    <div style={{ marginTop: 10 }}>
                      <label>
                        Meal selection
                        <br />
                        <select
                          className={styles.selectFood}
                          value={meal}
                          onChange={(e) =>
                            setPersonMeal(name, e.target.value || null)
                          }
                        >
                          {MEAL_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  )}
                  {name === "Guest" && val === true && (
                    <div style={{ marginTop: 10 }}>
                      <label>
                        Guest name
                        <br />
                        <input
                          type="text"
                          value={selections?.Guest?.guestName ?? ""}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Enter guest name"
                          style={{
                            marginTop: 4,
                            padding: 6,
                            width: "100%",
                            maxWidth: 320,
                          }}
                        />
                      </label>
                    </div>
                  )}
                  {meal == "braised_short_rib" ? (
                    <p>Braised Short Rib: *contains dairy and nuts*</p>
                  ) : meal == "pan_seared_walleye" ? (
                    <p>Pan-Seared Walleye: *contains dairy*</p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 16 }}>
            <label>
              Note (optional)
              <br />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                style={{ width: "100%", maxWidth: 520 }}
              />
            </label>
          </div>
        </div>
      )}
      <div style={{ marginTop: 12 }}>
        <button
          className={styles.btn}
          type="button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving…" : "Save RSVP"}
        </button>

        {saveError && (
          <p style={{ color: "crimson", marginTop: 8 }}>{saveError}</p>
        )}
        {savedAt && <p style={{ marginTop: 8 }}>Saved.</p>}
      </div>
    </div>
  );
}
