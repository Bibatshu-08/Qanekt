import React, { useState } from "react";
import { motion } from "framer-motion";

const Calendar = (param1) => {
  const [xOffset, setXOffset] = useState(1);
  const [yOffset, setYOffset] = useState(1);

  const offsetVariants = {
    initial: {
      x: 50,
      y: 0,
    },
    animate: {
      x: xOffset * Math.random() * 500 + 1,
      y: yOffset * Math.random() * 500 + 1,
    },
  };

  const handleClick = () => {
    const randomX = Math.random() * 500;
    const randomY = Math.random() * 500;
    setXOffset(randomX);
    setYOffset(randomY);
  };

  return (
    <motion.div exit={{ x: 1000 }} className="home">
      <div className="root-user">Hello</div>

      <motion.div
        variants={offsetVariants}
        initial="initial"
        animate="animate"
        style={{
          borderRadius: "50%",
          width: "200px",
          height: "200px",
          backgroundColor: "#cccccc",
        }}
        className="circle-one"
      >
        <h1>Hello</h1>
      </motion.div>
      <motion.div
        variants={offsetVariants}
        initial="initial"
        animate="animate"
        style={{
          borderRadius: "50%",
          width: "200px",
          height: "200px",
          backgroundColor: "#cccccc",
        }}
        className="circle-one"
      >
        <h1>Hello</h1>
      </motion.div>
      <motion.div
        variants={offsetVariants}
        initial="initial"
        animate="animate"
        style={{
          borderRadius: "50%",
          width: "200px",
          height: "200px",
          backgroundColor: "#cccccc",
        }}
        className="circle-one"
      >
        <h1>Hello</h1>
      </motion.div>
      <motion.div
        variants={offsetVariants}
        initial="initial"
        animate="animate"
        style={{
          borderRadius: "50%",
          width: "200px",
          height: "200px",
          backgroundColor: "#cccccc",
        }}
        className="circle-one"
      >
        <h1>Hello</h1>
      </motion.div>

      <button className="i-want-more" onClick={handleClick}>
        MORE
      </button>
    </motion.div>
  );
};

export default Calendar;
