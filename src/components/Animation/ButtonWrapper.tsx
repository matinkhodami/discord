"use client";

import { motion } from "framer-motion";

const ButtonWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.span
      initial={{
        scale: 1,
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.975,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      {children}
    </motion.span>
  );
};

export default ButtonWrapper;
