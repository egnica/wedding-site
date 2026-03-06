"use client";

import { useEffect, useState } from "react";

export default function InviteSearch({ onSelect }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = q.trim();
    if (!query) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    async function run() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/invites/search?q=${encodeURIComponent(query)}`,
          {
            signal: controller.signal,
          },
        );
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }

    const t = setTimeout(run, 200); // small debounce
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [q]);

  return (
    <div style={{ maxWidth: 520 }}>
      <label style={{ display: "block", marginBottom: 8 }}>
        Find your name
      </label>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Type your name..."
        style={{ width: "100%", padding: 10, fontSize: 16 }}
      />

      {loading && <div style={{ marginTop: 8 }}>Searching…</div>}

      {results.length > 0 && (
        <div
          style={{
            marginTop: 8,
            border: "1px solid #ddd",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {results.map((item) => (
            <button
              key={item._id}
              type="button"
              onClick={() => onSelect?.(item)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: 12,
                border: "none",
                background: "white",
                cursor: "pointer",
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
