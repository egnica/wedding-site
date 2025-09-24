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
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className={styles.textCont}
      >
        <div className={styles.saveDateCont}>
          <h1 className={styles.savethedatetext}>SAVE</h1>
          <h1 className={styles.alexbrushregular}>The</h1>
          <h1 className={styles.savethedatetext}>DATE</h1>
        </div>
        <div className={styles.venue}>
          <p className={styles.weddingOf}>for the wedding of</p>
          <h2 className={styles.leslieBrian}>Leslie & Brian</h2>
        </div>
        <p>June 5, 2026 | Minneapolis, MN.</p>
      </motion.div>
      <div className={styles.trioCont}>
        <AddToCalendarButton />
      </div>
      <hr />
    </>
  );
}

export default TrioPicture;
