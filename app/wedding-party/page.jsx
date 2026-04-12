import React from "react";
import styles from "../page.module.css";
function page() {
  const partyObject = [
    // Bride Side
    {
      name: "Nicholas Egner",
      title: "Man of Honor (Brother of the Bride)",
      link: "https://nicholasegner.com/",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Nicholas-Egner.png",
      group: "bride",
    },
    {
      name: "Amanda Landwehr Klamm",
      title: "Matron of Honor (College Friend)",
      link: "https://www.facebook.com/amanda.landwehr.5/",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Amanda-Landwehr.png",
      group: "bride",
    },
    {
      name: "Ashley Veitch",
      title: "Bridesmaid (High School Friend)",
      link: "https://www.facebook.com/ashley.wittenberg",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Ashley-Veitch.png",
      group: "bride",
    },
    {
      name: "Bri Haagenson",
      title: "Bridesmaid (Sister-in-law)",
      link: "https://www.facebook.com/bri.shomion",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Bri-Haagenson.png",
      group: "bride",
    },
    {
      name: "Courtney Allen",
      title: "Bridesmaid (College Friend)",
      link: "https://www.facebook.com/courtney.allen.551651",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Courtney-Allen.png",
      group: "bride",
    },
    {
      name: "Sarah Grounds-Bartholomew",
      title: "Bridesmaid (College Friend)",
      link: "https://www.facebook.com/sarah.bartholomew.142",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Sarah-Bartholomew.png",
      group: "bride",
    },
    {
      name: "Katie Host",
      title: "Bridesmaid (Post College Friend)",
      link: "https://www.facebook.com/katie.hopfner",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Katie-Host.png",
      group: "bride",
    },
    {
      name: "Courtney Critton",
      title: "Bridesmaid (College Friend)",
      link: "https://www.facebook.com/courtney.gruber.5",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Courtney-Critton.png",
      group: "bride",
    },
    {
      name: "Jordan Rath",
      title: "Bridesmaid (College Friend)",
      link: "https://www.facebook.com/jordan.simpson.547389",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Jordan-Rath.png",
      group: "bride",
    },

    // Groom Side
    {
      name: "Zach Hunter",
      title: "Best Man (College Friend)",
      link: "https://www.facebook.com/zach.hunter.98",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Zach-Hunter.png",
      group: "groom",
    },
    {
      name: "Sam Milewsky",
      title: "Groomsman (College Friend)",
      link: "https://www.facebook.com/samilewsky",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Sam-Milewsky.png",
      group: "groom",
    },
    {
      name: "Rob Rice",
      title: "Groomsman (Madison Friend)",
      link: "",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Rob-Rice.png",
      group: "groom",
    },
    {
      name: "Ryan Haagenson",
      title: "Groomsman (Brother of the Bride)",
      link: "https://www.facebook.com/rahaagen",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Ryan-Haagenson.png",
      group: "groom",
    },
    {
      name: "Brett Nelson",
      title: "Groomsman (Friend from College)",
      link: "https://www.facebook.com/brettnelson15",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Brett-Nelson.png",
      group: "groom",
    },
    {
      name: "Weston Oasen",
      title: "Groomsman (Friend from College)",
      link: "",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Weston-Oasen.png",
      group: "groom",
    },
    {
      name: "Brady Wegscheid",
      title: "Groomsman (High School Friend)",
      link: "https://www.facebook.com/brady.wegscheid",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Brady-Wegscheid.png",
      group: "groom",
    },
    {
      name: "Laiya Restivo",
      title: "Groomswoman (Sister of the Groom)",
      link: "https://www.facebook.com/pamelaiya/",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/Laiya-Restivo.png",
      group: "groom",
    },
    {
      name: "Jake Rath",
      title: "Groomsman (Friend from College)",
      link: "https://www.facebook.com/jake.rath.291941",
      pic: "https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/jake-rath.png",
      group: "groom",
    },

    // Personal Attendants
    {
      name: "Maddi Wittenberg",
      title: "Personal Attendant",
      link: "",
      pic: "",
      group: "attendant",
    },
    {
      name: "Ian Veitch",
      title: "Personal Attendant",
      link: "",
      pic: "",
      group: "attendant",
    },

    // Ushers
    {
      name: "Nick Weber",
      title: "Usher",
      link: "",
      pic: "",
      group: "usher",
    },
    {
      name: "Al Weber",
      title: "Usher",
      link: "",
      pic: "",
      group: "usher",
    },

    // Junior Bridesmaids
    {
      name: "Sadie Haagenson",
      title: "Junior Bridesmaid (Niece)",
      link: "",
      pic: "",
      group: "junior",
    },
    {
      name: "Vinny Restivo",
      title: "Junior Bridesmaid (Niece)",
      link: "",
      pic: "",
      group: "junior",
    },

    // Flower Girl
    {
      name: "Lucy Haagenson",
      title: "Flower Girl (Niece)",
      link: "",
      pic: "",
      group: "special",
    },

    // Ring Bearer
    {
      name: "Sully the Schnoodle",
      title: "Ring Bearer",
      link: "",
      pic: "",
      group: "special",
    },
  ];
  return (
    <div className={styles.partyPageContain}>
      <h1 className={styles.saveTitle}>Wedding Party</h1>
      <div className={styles.background}></div>
      <div className={styles.partySplit}>
        <div>
          <div className={styles.brideGroomContain}>
            <img
              width={170}
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/leslie-bride.png"
            />
            <h2>Bride Side</h2>
          </div>
          <div className={styles.divide} />
          {partyObject
            .filter((item) => item.group === "bride")
            .map((item, index) => (
              <div className={styles.personCard} key={item.name}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardLink}
                >
                  <img src={item.pic} alt={item.name} />
                  <div className={styles.personText}>
                    <h4>{item.name}</h4>
                    <p>{item.title}</p>
                  </div>
                </a>
              </div>
            ))}
        </div>
        <div>
          <div className={styles.brideGroomContain}>
            <img
              width={170}
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/brian-groom.png"
            />
            <h2>Groom Side</h2>
          </div>
          <div className={styles.divide} />
          {partyObject
            .filter((item) => item.group === "groom")
            .map((item, index) => {
              const Wrapper = item.link ? "a" : "div";

              return (
                <div className={styles.personCard} key={item.name}>
                  <Wrapper
                    {...(item.link && {
                      href: item.link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className={styles.cardLink}
                  >
                    <img src={item.pic} alt={item.name} />
                    <div className={styles.personText}>
                      <h4>{item.name}</h4>
                      <p>{item.title}</p>
                    </div>
                  </Wrapper>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.weddingOther}>
        <h2>Personal Attendants</h2>
        <h4>Maddi Wittenberg </h4>
        <h4>Ian Veitch</h4>

        <br />

        <h2>Ushers</h2>
        <h4>Nick Weber </h4>
        <h4>Al Weber</h4>
        <br />
        <h2>Junior Bridesmaids</h2>
        <h4>Sadie Haagenson - Niece </h4>
        <h4>Vinny Restivo - Niece</h4>
        <br />
        <h2>Flower Girl</h2>
        <h4>Lucy Haagenson - Niece </h4>
        <br />
        <h2>Ring Bearer </h2>
        <h4>Sully the Schnoodle</h4>
        <img
          width={150}
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/leslieWedding/weddingParty/sully.png"
        />

        <br />
        <br />
      </div>
    </div>
  );
}

export default page;
