import React from "react";
import { motion } from "framer-motion";
import "../Landingpage.css";
import { Link } from "react-router-dom";
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
            <h1 className="hero-text">Meet people based on your interests</h1>
            <h2 className="hero-sub-text">
              Meet people based on your interests
            </h2>
            <Link to="/register">
              <button className="cta">Sign Up</button>
            </Link>
            <h4 className="muted-text">
              Already Have An Account?
              <strong>
                <Link to="/register"> Login </Link>
              </strong>
              Instead!
            </h4>
          </div>
          <div className="hero-image-wrapper">
            <img className="hero-image" src={tennis} alt="tennis player" />
          </div>
        </section>

        <section className="what-we-do">
          <h1 className="section-title">What We Do</h1>
          <p className="section-description">
            We connect you with people all around the world based on your
            interests. You can sign up for free and make the best use of our
            service and all of that is just a click away.
          </p>
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

        <section className="how-we-do">
          <h1 className="section-title">How We Do It</h1>
          <p className="section-description">
            You see some things are better off kept secret
            <strong> *winks* </strong> What's not a secret anymore is an awesome
            platform that connects you to awesome people just like you.
          </p>
        </section>
        <footer className="footer">
          <div className="logo-container">
            <li>Logo</li>
          </div>
          <div className="social-links">
            <li className="social-link"></li>
          </div>
          <div className="website-links">
            <li className="website-link"></li>
          </div>
        </footer>
      </motion.main>
    </>
  );
};

export default LandingHome;
