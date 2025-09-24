import React from "react";
import { motion } from "framer-motion";

import styles from "../page.module.css";

function Hotels() {
  return (
    <div className={styles.hotelContain}>
      <motion.h1
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className={styles.saveTitle}
        style={{ textAlign: "center" }}
      >
        Venue Location
      </motion.h1>
      <div className={styles.venue}>
        <a href="https://lxmpls.com/">
          <h2>Lumber Exchange Event Center</h2>
        </a>
        <p>10 S 5th St, Minneapolis, MN 55402</p>

        <motion.img
          className={styles.venueImage}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        />
      </div>
      <hr />
      <motion.h1
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className={styles.saveTitle}
        style={{ textAlign: "center" }}
      >
        Hotel Blocked Rooms Available
      </motion.h1>

      <div className={styles.splitContain}>
        <motion.img
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          src="https://lh3.googleusercontent.com/p/AF1QipONPI0CYfDlxiNov2T5RNxXNW8qMnwKqw0IFVO-=s680-w680-h510-rw"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.address}
        >
          <a href="https://www.marriott.com/en-us/hotels/mspar-ac-hotel-minneapolis-downtown/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0">
            <h2>AC Hotel</h2>
          </a>
          <p>
            Downtown Minneapolis <br />
            41 Hennepin Ave, Minneapolis, MN 55401
          </p>

          <a
            style={{ margin: "auto", width: "auto", textDecoration: "none" }}
            href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1742845748015&key=GRP&guestreslink2=true&app=resvlink"
          >
            <div className={styles.atcbButton}>Book Here!</div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default Hotels;
