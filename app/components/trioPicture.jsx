import React from "react";

import dynamic from "next/dynamic";
import styles from "../page.module.css";
import { motion } from "framer-motion";

const AddToCalendarButton = dynamic(
  () => import("../components/calendarButton"),
  {
    ssr: false,
  }
);

function TrioPicture() {
  const imgVariant = {
    hidden1: {
      opacity: 0,
      y: -100,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    hidden2: {
      opacity: 0,
      y: 100,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap');
      </style>
      <div className={styles.trioCont}>
        <motion.img
          variants={imgVariant}
          initial="hidden1"
          animate="visible"
          style={{ width: "30%" }}
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/V1.webp"
        />
        <motion.img
          variants={imgVariant}
          initial="hidden2"
          animate="visible"
          style={{ width: "30%" }}
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/V2.webp"
        />
        <motion.img
          variants={imgVariant}
          initial="hidden1"
          animate="visible"
          style={{ width: "30%" }}
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/V3.webp"
        />
      </div>
      <div className={styles.textCont}>
        <div className={styles.saveDateCont}>
          <h1 className={styles.savethedatetext}>SAVE</h1>
          <h1 className={styles.alexbrushregular}>The</h1>
          <h1 className={styles.savethedatetext}>DATE</h1>
        </div>
        <p>for the wedding of</p>
        <h2>Leslie & Brian</h2>
        <p>June 5, 2026 | Minneapolis, MN.</p>
      </div>
      <div className={styles.trioCont}>
        <AddToCalendarButton />
      </div>
    </>
  );
}

export default TrioPicture;
