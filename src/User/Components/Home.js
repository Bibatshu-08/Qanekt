import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UserDisplay from "./UserDisplay";

const Home = ({ setShowModal, token }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Anonymous",
      interests: ["sports", "music"],
      age: 20,
      bio: "done telling",
    },
    {
      id: 2,
      username: "Anonymous",
      interests: ["sports", "science"],
      age: 10,
      bio: "doasdfsding",
    },
    {
      id: 3,
      username: "Anonymous",
      interests: ["sports", "art", "sports", "art", "sports", "art"],
      age: 20,
      bio: "donawfe tawefwefelling",
    },
    {
      id: 4,
      username: "Anonymous",
      age: 52,
      interests: ["sports", "science"],
      bio: "done tawdfwafeadfawfing",
    },
    {
      id: 5,
      username: "Anonymous",
      interests: ["sports", "science"],
      age: 23,
      bio: "doawfwefne telling",
    },
  ]);
  const [xOffset, setXOffset] = useState(Math.random() + 1);
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    setShowModal(true);
    page++;
    setUsers([]);
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

  useEffect(() => {
    async function getUserConnections() {
      try {
        const options = {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        };
        console.log(options);
        const response = await fetch("/api/connections");
        console.log(response);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      } catch (error) {
        console.log(error);
      }
    }
    async function getUserData() {
      try {
        const options = {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        };
        console.log(options);
        const response = await fetch("/api/connections");
        console.log(response);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
    getUserConnections();
  });

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
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
            key={user.id}
            user={user}
            index={index}
          />
        ))}
      </motion.div>
      {/* </AnimateSharedLayout> */}

      <button className="previous" onClick={handleNextPage}>
        <span role="img" aria-label="previous">
          👈
        </span>
        Previous
      </button>
      <button className="next" onClick={handleNextPage}>
        Next
        <span role="img" aria-label="previous">
          👉
        </span>
      </button>
    </motion.div>
  );
};

export default Home;
