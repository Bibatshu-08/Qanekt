import React from "react";
import { Link } from "react-router-dom";
import logo from '../styles/assets/logo.png'

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
            <img src={logo} alt="Qanekt" className="logo" />
          </Link>
          <h3>Quanekt</h3>
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
              <li className="nav-link logout" onClick={handleLogOut}>
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
                <li className="nav-link register">Sign Up</li>
              </Link>
            </>
          )}
          <Link to="/profile">
            {isLoggedIn && <div className="profile-picture"></div>}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
