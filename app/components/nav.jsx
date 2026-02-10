import React from "react";
import Link from "next/link";
import styles from "../page.module.css";

function nav() {
  return (
    <nav>
      <ul className={styles.navUl}>
        <Link href={"/"}>Home</Link>
        <Link href={"../pictures"}>
          Engagement <br /> Photos
        </Link>
      </ul>
    </nav>
  );
}

export default nav;
