import React from "react";
import { motion } from "framer-motion";
import "../styles/landing.css";
import { Link } from "react-router-dom";
/* image imports */
import connect from "../styles/assets/connect.png";
import tennis from "../styles/assets/tennis.png";
import singer from "../styles/assets/singer.png";
import photography from "../styles/assets/photography.png";
import artist from "../styles/assets/artist.png";
import scientist from "../styles/assets/scientist.png";
import coder from "../styles/assets/coder.png";

const interests = [
  { id: 1, type: "Singing", image: singer },
  { id: 2, type: "Photography", image: photography },
  { id: 3, type: "Art", image: artist },
  { id: 4, type: "Science", image: scientist },
  { id: 5, type: "Technology", image: coder },
];

const LandingHome = () => {
  return (
    <>
      <motion.main
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        exit={{ x: "100vw" }}
        className="main"
      >
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
            <img className="hero-image" src={connect} alt="tennis player" />
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
                <img
                  className="image"
                  src={interest.image}
                  alt="tennis player"
                />
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
            <h1 className="social-links-title">Social Links</h1>
            <li className="social-link">Facebook</li>
            <li className="social-link">Twitter</li>
            <li className="social-link">Instagram</li>
          </div>
          <div className="website-links">
            <h1 className="website-link">Website Links</h1>
          </div>
        </footer>
      </motion.main>
    </>
  );
};

export default LandingHome;
