// FAQ PAGE
import React from "react";
import styles from "../page.module.css";

function faq() {
  return (
    <div className={styles.faqContain}>
      <div className={styles.background}></div>
      <h1 className={styles.alexbrushregularTWO}>Frequently Asked Questions</h1>

      <ol className={styles.olFAQ}>
        <li>Where is the wedding? </li>
        <p>
          Both the ceremony and reception are at the Lumber Exchange Event
          Center <br />
          <strong> Address:</strong> 10 S 5th St, Minneapolis, MN 55402
        </p>

        <li>Are Children Invited?</li>
        <p>
          While we adore all the little ones, we are hosting an adults-only
          (21+) celebration. <br />
          We have made a few exceptions for our nieces, who will be celebrating
          with us. We appreciate your understanding!
        </p>
        <li>Can I bring a plus one?</li>
        <p>
          We are only able to accommodate the guests named on the invitation.{" "}
          <br />
          If a plus one has been reserved for you, it will be clearly indicated
          on the envelope and when you RSVP.{" "}
        </p>
        <li>What is the dress code?</li>
        <p>
          We invite guests to wear black or predominantly black attire. Formal
          evening wear is requested.{" "}
        </p>
        <li>What is the timeline for the day?</li>
        <p>
          5:00pm - 5:30pm - Ceremony <br />
          5:30pm - 6:45pm - Cocktail hour
          <br />
          7:00pm - 8:25pm - Dinner
          <br />
          8:30pm - 12am - Reception/Dancing
        </p>
        <li>Is there a hotel block? How do I book it?</li>
        <p>(Click Below)</p>
        <a href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1742845748015&key=GRP&guestreslink2=true&app=resvlink">
          <p>AC Hotel</p>
        </a>
        <a href="https://book.passkey.com/event/51125925/owner/1070/home">
          <p> Minneapolis Marriott City Center</p>
        </a>
        <li>Is parking available at the venue?</li>
        <p>Parking is available onsite at a cost.</p>
        <li>Will transportation be provided to/from the venue?</li>
        <p>There will be no transportation provided</p>
      </ol>
    </div>
  );
}

export default faq;
