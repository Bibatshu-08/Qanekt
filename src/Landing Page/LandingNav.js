import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingNav = () => {
  return (
    <motion.header exit={{ x: "100vw" }} className="header-landing">
      <nav className="nav-landing">
        <div className="logo">
          <Link to="/">
            <h1>Quanekt</h1>
          </Link>
        </div>
        <div className="nav-items">
          <Link to="/login">
            <li className="nav-item">Login</li>
          </Link>
          <Link to="/register">
            <li className="nav-item">Sign Up</li>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

export default LandingNav;
