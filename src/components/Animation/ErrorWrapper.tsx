import { motion, AnimatePresence } from "framer-motion";
import Icon from "@mdi/react";
import { mdiAlertCircle } from "@mdi/js";
export default function errorWrapper({ msg }: { msg: string | "" }) {
  return (
    <AnimatePresence mode="popLayout">
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-br from-rose-800 to-rose-200 text-white p-2 rounded-md font-bold text-base flex items-center gap-2"
        >
          <Icon path={mdiAlertCircle} size={1} />
          <p>{msg}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
