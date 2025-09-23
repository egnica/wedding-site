"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import styles from "../page.module.css";
import TrioPicture from "../components/trioPicture";
const AddToCalendarButton = dynamic(
  () => import("../components/calendarButton"),
  {
    ssr: false,
  }
);

export default function VikingsPage() {
  const [counts, setCounts] = useState({ vikings: "-", packers: "-" });

  useEffect(() => {
    async function hit() {
      // Increment vikings count
      await fetch("/api/counter?team=vikings", { method: "POST" });
      // Get updated totals
      const res = await fetch("/api/counter");
      const data = await res.json();
      setCounts(data);
    }
    hit();
  }, []);

  return (
    <main>
      <div style={{ paddingTop: "40px" }}></div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.scoreboardText}
      >
        SCOREBOARD
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.scoreCont}
      >
        <div>
          <h1>Vikings</h1>
          <h1>{counts.vikings}</h1>
        </div>
        <div
          style={{ backgroundColor: "black", width: "1px", height: "100px" }}
        ></div>
        <div>
          <h1>Packers</h1>
          <h1>{counts.packers}</h1>
        </div>
      </motion.div>

      <TrioPicture />

      <div style={{ paddingTop: "40px" }}></div>
    </main>
  );
}
