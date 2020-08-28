import React from "react";
import { motion } from "framer-motion";
import "../Landingpage.css";
/* image imports */
import tennis from "../tennis.png";
import photography from "../photography.png";

const interests = [
  { id: 12, type: "Sports" },
  { id: 124, type: "Science" },
  { id: 122, type: "Art" },
  { id: 121, type: "Movies" },
  { id: 125, type: "Literature" },
];

const LandingHome = () => {
  return (
    <>
      <motion.main exit={{ x: 1000 }} className="main">
        <section className="hero">
          <div className="hero-text-wrapper">
            <h1 className="hero-text">
              Meet people based <br /> on your interests
            </h1>
            <h2 className="hero-sub-text">
              Meet people based on your interests
            </h2>
          </div>
          <div className="hero-image-wrapper">
            <img className="hero-image" src={tennis} alt="tennis player" />
          </div>
        </section>

        <section className="mosaic-grid">
          {interests.map((interest, index) => (
            <div key={interest.id} className={`mosaic mosaic${index + 1}`}>
              <div className="image-wrapper">
                <img className="image" src={photography} alt="tennis player" />
              </div>
              <h1 className="interest-title">{interest.type}</h1>
            </div>
          ))}
        </section>
      </motion.main>
    </>
  );
};

export default LandingHome;
