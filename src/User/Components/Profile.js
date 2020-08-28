import React from "react";
import "./profile.css";
import Multiselect from "./Multiselect";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <motion.div exit={{ x: 1000 }} className="profile">
      <h1>Tell Us More About You</h1>

      <div className="formbox">
        {/* this div consists of name, age, and gender  */}
        <div className="layer-one">
          <div className="name">
            <form action="">
              <label for="user_name">
                <h3>First name:</h3>
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                placeholder="Enter your name here"
              />
            </form>
          </div>

          <div className="age">
            <form action="">
              <label for="age">
                <h3>Age:</h3>
              </label>
              <input type="text" id="age" name="age" placeholder="Enter age" />
            </form>
          </div>

          <div className="gender">
            <form action="">
              <label for="gender">
                <h3>Gender:</h3>
              </label>
              <select name="gender">
                <option value="None selected">Please select below</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Others</option>
                <option value="N">Prefer not to say</option>
              </select>
            </form>
          </div>
        </div>

        {/* this div consists of interest sections */}
        <div className="layer-two">
          <h3>Interests</h3>
          <Multiselect /> {/*Multiselect drop down menu */}
        </div>

        {/* the textarea section for more information */}
        <div className="layer-three">
          <label for="story">
            <h3>What is your unique story?</h3>
          </label>
          <textarea
            name="story"
            id="story"
            required
            wrap
            autofocus
            placeholder="This is your opportunity to discuss more about your interests in detail . . ."
          ></textarea>
        </div>

        <input type="submit" value="Submit" className="submit-button" />
      </div>
    </motion.div>
  );
}
