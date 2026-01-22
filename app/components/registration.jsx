import React from "react";
import styles from "../page.module.css";
import { motion } from "framer-motion";

function registration() {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className={styles.saveTitle}
        className={styles.saveTitle}
        style={{ textAlign: "center" }}
      >
        Registry Links
      </motion.h1>
      <div className={styles.registrationContain}>
        <div className={styles.registrationCard}>
          <h3>Crate and Barrel</h3>
          <a
            target="_blank"
            href="https://www.crateandbarrel.com/gift-registry/brian-martin-and-leslie-egner/r7361862"
          >
            <motion.div
              whileHover={{
                scale: 1.1,
                backgroundColor: "#b8b8b8ff",
              }}
              whileTap={{
                scale: 0.9,
                backgroundColor: "#ffffffff",
              }}
              className={styles.atcbButton}
            >
              Enter Here
            </motion.div>
          </a>
        </div>
        <div className={styles.registrationCard}>
          <h3>Amazon</h3>

          <a
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1ySW6M-LtW-nz_I8prJpbv3ArbK-RCBd4MRHwtj04MVA/edit?usp=sharing"
          >
            <motion.div
              whileHover={{
                scale: 1.1,
                backgroundColor: "#b8b8b8ff",
              }}
              whileTap={{
                scale: 0.9,
                backgroundColor: "#ffffffff",
              }}
              className={styles.atcbButton}
            >
              {" "}
              Enter Here
            </motion.div>
          </a>
        </div>
      </div>
      <hr />
    </>
  );
}

export default registration;
