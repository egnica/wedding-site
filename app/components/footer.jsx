import React from "react";
import NElogo from "./neLogo";
import styles from "../page.module.css";
function footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.insideFooter}>
        <p>This website was created by: &nbsp;</p>
        <a
          className={styles.footerLink}
          href="https:nicholasegner.com"
          target="_blank"
        >
          {" "}
          <NElogo width={50} /> &nbsp; Nicholas Egner - Web Development
        </a>
      </div>
      <div className={styles.insideFooterTwo}>
        <p>Issues with RSVP: </p>&nbsp;
        <a className={styles.mailLink} href="mailto:nick@nicholasegner.com">Click Here</a>
      </div>
    </footer>
  );
}

export default footer;
