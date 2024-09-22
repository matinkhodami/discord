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
          className="bg-rose-400/10 border-2 border-rose-400 text-white p-2 rounded-[16px] font-bold text-base flex items-center gap-2"
        >
          <span className="p-2 bg-rose-500 rounded-full">
            <Icon path={mdiAlertCircle} size={0.8} />
          </span>
          <p>{msg}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
