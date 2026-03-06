import React, { useEffect, useState } from "react";
import RSVPForm from "./RSVPForm";
import InviteSearch from "./InviteSearch";
import styles from "./page.module.css";

function RSVPMain() {
  const [selected, setSelected] = useState(null); // { _id, title }
  const [invite, setInvite] = useState(null); // full invite doc
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selected?._id) return;

    let cancelled = false;

    async function loadInvite() {
      setLoading(true);
      setError("");
      setInvite(null);

      try {
        const res = await fetch(`/api/invites/${selected._id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Failed to load invite");

        if (!cancelled) setInvite(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadInvite();
    return () => {
      cancelled = true;
    };
  }, [selected?._id]);

  function reset() {
    setSelected(null);
    setInvite(null);
    setError("");
    setLoading(false);
  }

  return (
    <div className={styles.rsvpContain} style={{ padding: 24 }}>
      <h1 className={styles.rspvTitle} style={{ margin: 0 }}>
        RSVP
      </h1>

      {!selected ? (
        <InviteSearch onSelect={setSelected} />
      ) : (
        <div>
          <p>
            <strong>Selected:</strong> {selected.title}
          </p>

          <button className={styles.btn} type="button" onClick={reset}>
            Choose a different name
          </button>

          {loading && <p style={{ marginTop: 12 }}>Loading invite…</p>}
          {error && <p style={{ marginTop: 12, color: "crimson" }}>{error}</p>}

          {invite && <RSVPForm invite={invite} />}
        </div>
      )}
    </div>
  );
}

export default RSVPMain;
