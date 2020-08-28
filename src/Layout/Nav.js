import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ setIsLoggedIn }) => {
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo-container">
          <Link to="/">
            <li className="logo">Logo</li>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/">
            <li className="nav-link">Home</li>
          </Link>
          <Link to="/about">
            <li className="nav-link">About Us</li>
          </Link>
          <li className="nav-link" onClick={handleLogOut}>
            Logout
          </li>
          <div className="profile-picture"></div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
