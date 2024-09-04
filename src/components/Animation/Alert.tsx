"use client";

import { motion, AnimatePresence } from "framer-motion";

import Icon from "@mdi/react";
import { mdiAlertCircle, mdiCheckCircle } from "@mdi/js";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PopUpVariant = {
  hidden: {
    opacity: 0,
    x: -200,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    },
  }
};
const PopUp = ({
  message,
  type,
}: {
  message: string | undefined;
  type: "Error" | "Success";
}) => {
  return (
    <AnimatePresence mode="popLayout">
      { message && (
        <motion.span
          layout
          variants={PopUpVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Alert
            variant={type === "Error" ? "error" : "success"}
            className="mt-2"
          >
            <Icon
              path={type === "Error" ? mdiAlertCircle : mdiCheckCircle}
              size={1}
            />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default PopUp;
