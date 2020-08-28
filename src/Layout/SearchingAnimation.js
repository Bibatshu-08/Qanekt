import React from "react";
import { motion } from "framer-motion";

const SearchingAnimation = ({ searching }) => {
  return (
    <>
      {searching && (
        <motion.div exit={{ x: 1000 }} className="searching">
          <h1>SearchingAnimation</h1>
        </motion.div>
      )}
    </>
  );
};

export default SearchingAnimation;
