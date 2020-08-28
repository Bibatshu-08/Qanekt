import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UserDisplay = ({ user, index, xOffset, yOffset }) => {
  const [isOpen, setIsOpen] = useState(false);

  const offsetVariants = {
    initial: {
      // y: 0,
      borderRadius: "50%",
    },
    animate1: {
      x: xOffset,
      // y: yOffset,
    },
    animate: {
      borderRadius: isOpen ? "10px" : "50%",
      width: isOpen ? "400px" : "200px",
      height: "200px",
    },
    animate2: {
      x: xOffset * Math.random() - 0.5 * 250,
      // y: yOffset * Math.random() * 100,
    },
    animate3: {
      x: xOffset * Math.random() - 0.5 * 250,
      // y: yOffset * Math.random() * 100,
    },
    animate4: {
      x: xOffset * Math.random() - 0.5 * 100,
      // y: yOffset * Math.random() * 100,
    },
    animate5: {
      x: xOffset * Math.random() - 0.5 * 100,
      // y: yOffset * Math.random() * 100,
    },
  };

  const handleUserOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      onClick={handleUserOpen}
      key={user.id}
      // variants={offsetVariants}
      // initial="initial"
      // animate="animate"
      initial={{ borderRadius: "50%", x: xOffset }}
      animate={{
        borderRadius: isOpen ? "10px" : "50%",
        width: isOpen ? "400px" : "200px",
        height: "200px",
        x: xOffset * (Math.random() - 0.5) * 100,
      }}
      style={{
        width: "180px",
        height: "180px",
        backgroundColor: "#cccccc",
      }}
      className={`user-${index + 1} user`}
    >
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {user.username}
      </motion.h1>
      <AnimatePresence>
        {isOpen && (
          <motion.h1
            style={{ backgroundColor: "red" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {user.age}
          </motion.h1>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserDisplay;
