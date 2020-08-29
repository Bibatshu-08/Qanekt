/* package imports */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./styles/App.css";

/* Layout imports */
import Nav from "./Layout/Nav";
import Loader from "./Layout/Loader";
import Modal from "./Layout/Modal";
import About from "./Layout/About";
import SearchingAnimation from "./Layout/SearchingAnimation";

/* Landing Page imports */
import Login from "./Landing Page/Auth/Login";
import Register from "./Landing Page/Auth/Register";
import LandingHome from "./Landing Page/LandingHome";

/* User imports */
import Home from "./User/Components/Home";
import Profile from "./User/Components/Profile";
// import Location from "./User/Components/Location";

function App() {
  /* state variables */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searching, setSearching] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState({});

  useEffect(() => {
    // localStorage.setItem(isLoggedIn, false);
    // localStorage.clear();
    const temp = JSON.parse(localStorage.getItem("isLoggedIn"));
    const authToken = localStorage.getItem("token");
    console.log(authToken);
    setToken(authToken);
    console.log(temp);
    if (temp) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Router>
        {isLoading && <Loader setIsLoading={setIsLoading} />}
        <Modal showModal={showModal} />
        <SearchingAnimation searching={searching} />
        {isLoggedIn ? (
          <main className="container" key="user">
            <Nav setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            <Route
              render={({ location }) => (
                <AnimatePresence
                  exitBeforeEnter
                  onExitComplete={() => {
                    setShowModal(false);
                  }}
                >
                  <Switch location={location} key={location.pathname}>
                    <Route
                      path="/"
                      exact
                      render={(props) => (
                        <Home
                          setSearching={setSearching}
                          setShowModal={setShowModal}
                        />
                      )}
                    />

                    <Route path="/about" render={(props) => <About />} />
                    <Route path="/profile" render={(props) => <Profile />} />
                    {/* <Route path="/location" render={(props) => <Location />} /> */}

                    <Redirect to="/" />
                  </Switch>
                </AnimatePresence>
              )}
            />
          </main>
        ) : (
          <main className="landing-container" key="landingpage">
            <Nav />
            <Route
              render={({ location }) => (
                <AnimatePresence
                  exitBeforeEnter
                  onExitComplete={() => {
                    setShowModal(false);
                  }}
                >
                  <Switch location={location} key={location.pathname}>
                    <Route path="/" exact render={(props) => <LandingHome />} />
                    <Route
                      path="/login"
                      render={(props) => (
                        <Login
                          token={token}
                          // error={error}
                          // setError={setError}
                          setToken={setToken}
                          isLoggedIn={isLoggedIn}
                          setIsLoggedIn={setIsLoggedIn}
                          setShowModal={setShowModal}
                          location={props.location}
                        />
                      )}
                    />
                    <Route path="/about" render={(props) => <About />} />
                    <Route path="/register" render={(props) => <Register />} />
                    <Redirect to="/" />
                  </Switch>
                </AnimatePresence>
              )}
            />
          </main>
        )}
      </Router>
    </>
  );
}

export default App;
