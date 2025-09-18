"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from '../page.module.css'
const AddToCalendarButton = dynamic(
  () => import("../components/calendarButton"),
  {
    ssr: false,
  }
);

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
    <main>
      <h1 >Go Pack! Packers Page</h1>
      <p>Vikings: {counts.vikings}</p>
      <p>Packers: {counts.packers}</p>
      <AddToCalendarButton />
      <div>
        <div style={{ height: "400px" }}></div>
      </div>
    </main>
  );
}
