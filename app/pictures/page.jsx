"use client";
import React from "react";
import Link from "next/link";
import styles from "../page.module.css";
import { useState } from "react";
import Image from "next/image";

function Pictures() {
  const [background, setBackground] = useState({ show: false, image: "" });
  const totalImages = 88;

  const imageReveal = () => {
    return (
      <>
        <img
          className={styles.displayImage}
          src={`https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/Engagement/${background.image}.jpg`}
        />
      </>
    );
  };

  return (
    <div>
      <div className={styles.background} />
      <h1 className={styles.teamChat} style={{ textAlign: "center" }}>
        Engagement Photos
      </h1>
      <br/><br/>
      <div className={styles.picturesContainer}>
        {Array.from({ length: totalImages }, (_, i) => {
          const num = String(i + 1).padStart(3, "0");

          return (
            <div
              key={num}
              className={styles.thumb}
              onClick={() => setBackground({ show: true, image: num })}
            >
              <Image
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: "cover", objectPosition: "50% 20%" }}
                src={`https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/Engagement/${num}.jpg`}
                alt={`Engagement photo ${num}`}
              />
            </div>
          );
        })}
      </div>
      <br /> <br /> <br />
      {background.show && (
        <div
          onClick={() => setBackground({ show: false, image: "" })}
          className={styles.blkBackground}
        >
          <div className={styles.exitOutImage}>X</div>
          {imageReveal()}
        </div>
      )}
    </div>
  );
}

export default Pictures;
