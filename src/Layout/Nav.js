import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ setIsLoggedIn, isLoggedIn }) => {
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
          {isLoggedIn ? (
            <>
              <Link to="/">
                <li className="nav-link">Home</li>
              </Link>
              <Link to="/about">
                <li className="nav-link">About Us</li>
              </Link>
              <li className="nav-link" onClick={handleLogOut}>
                Logout
              </li>
            </>
          ) : (
            <>
              <Link to="/about">
                <li className="nav-link">About Us</li>
              </Link>
              <Link to="/login">
                <li className="nav-link">Login</li>
              </Link>
              <Link to="/register">
                <li className="nav-link">Sign Up</li>
              </Link>
            </>
          )}
          {isLoggedIn && <div className="profile-picture"></div>}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
