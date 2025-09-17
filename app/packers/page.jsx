"use client";
import { useEffect, useState } from "react";

export default function PackersPage() {
  const [counts, setCounts] = useState({ vikings: 0, packers: 0 });

  useEffect(() => {
    async function hit() {
      // Increment packers count
      await fetch("/api/counter?team=packers", { method: "POST" });
      // Get updated totals
      const res = await fetch("/api/counter");
      const data = await res.json();
      setCounts(data);
    }
    hit();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Go Pack! Packers Page</h1>
      <p>Vikings: {counts.vikings}</p>
      <p>Packers: {counts.packers}</p>
    </main>
  );
}
