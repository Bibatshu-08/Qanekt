import React, { useState } from "react";
import { motion } from "framer-motion";
import UserDisplay from "./UserDisplay";

const Home = ({ setShowModal }) => {
  const [users, setUsers] = useState([
    { id: 123, username: "Anonymous", age: 20, bio: "done telling" },
    { id: 1233, username: "Anonymous", age: 10, bio: "doasdfsding" },
    { id: 1235, username: "Anonymous", age: 20, bio: "donawfe tawefwefelling" },
    {
      id: 1263,
      username: "Anonymous",
      age: 50,
      bio: "done tawdfwafeadfawfing",
    },
    { id: 123645, username: "Anonymous", age: 23, bio: "doawfwefne telling" },
  ]);
  const [xOffset, setXOffset] = useState(Math.random() + 1);
  const [yOffset, setYOffset] = useState(0);

  const handleMoreUsers = () => {
    setShowModal(true);

    setUsers([]);
    console.log("hello");
    setTimeout(() => {
      setUsers([
        { id: 123, username: "Anonymous", age: 200, bio: "done telling" },
        { id: 1233, username: "Anonymous", age: 100, bio: "doasdfsding" },
        {
          id: 1235,
          username: "Anonymous",
          age: 20,
          bio: "donawfe tawefwefelling",
        },
        {
          id: 1263,
          username: "Anonymous",
          age: 50,
          bio: "done tawdfwafeadfawfing",
        },
        {
          id: 123645,
          username: "Anonymous",
          age: 230,
          bio: "doawfwefne telling",
        },
      ]);
    }, 1000);
    setTimeout(() => {
      setShowModal(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      exit={{ x: 1500 }}
      className="home"
    >
      <motion.div
        style={{
          borderRadius: "50%",
          width: "200px",
          height: "200px",
          backgroundColor: "#000",
        }}
        className="root-user"
      >
        Hello
      </motion.div>
      {/* <AnimateSharedLayout> */}
      <motion.div className="users" initial={{ borderRadius: 10 }}>
        {users.map((user, index) => (
          <UserDisplay
            xOffset={xOffset}
            yOffset={yOffset}
            key={user.id}
            user={user}
            index={index}
          />
        ))}
      </motion.div>
      {/* </AnimateSharedLayout> */}

      <button className="i-want-more" onClick={handleMoreUsers}>
        MORE
      </button>
    </motion.div>
  );
};

export default Home;
