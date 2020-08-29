import React, { useState } from "react";
import "../../styles/profile.css";
import Multiselect from "./Multiselect";
import { motion } from "framer-motion";

export default function Profile({ user }) {
  const [username, setUsername] = useState(user.username);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [interests, setInterests] = useState(user.interests);

  const handleProfileChanges = async (e) => {
    e.preventDefault();
    console.log(e.target.layer_one.name.user_name);
    const edits = {
      username,
      age,
      about,
      gender,
      interests,
    };

    console.log(edits);

    const response = await fetch("/api/editprofile", {
      body: JSON.stringify(edits),
    });

    console.log(response);
    if (response.ok) window.alert("profile edited");
  };

  return (
    <motion.div exit={{ x: 1000 }} className="profile">
      <h1>Tell Us More About You</h1>

      <div className="formbox">
        <form action="" onSubmit={handleProfileChanges}>
          {/* this div consists of name, age, and gender  */}
          <div className="layer-one">
            <div className="name">
              <label for="user_name">
                <h3>Username:</h3>
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={username}
                placeholder="Enter your name here"
              />
            </div>

            <div className="age">
              <label for="age">
                <h3>Age:</h3>
                <input
                  id="age"
                  value={age}
                  style={{
                    width: "100%",
                    border: "2px solid black",
                    borderRdaius: "20px",
                  }}
                  name="age"
                />
              </label>
            </div>

            <div className="gender">
              <label for="gender">
                <h3>Gender:</h3>
              </label>
              <select id="gender" name="gender" value={gender}>
                <option value="None selected">Please select below</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Others</option>
                <option value="N">Prefer not to say</option>
              </select>
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
              value={interest}
              name="story"
              id="story"
              required
              wrap
              autofocus
              placeholder="This is your opportunity to discuss more about your interests in detail . . ."
            ></textarea>
          </div>

          <input type="submit" value="Submit" className="submit-button" />
        </form>
      </div>
    </motion.div>
  );
}
