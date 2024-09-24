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
          className="dark:bg-rose-500/10 bg-rose-500/85 border-2 border-rose-400 dark:text-white text-rose-50 p-2 rounded-[16px] font-bold text-base flex items-center gap-2"
        >
          <span className="p-2 dark:bg-rose-500 bg-rose-50 text-rose-500 dark:text-white rounded-full">
            <Icon path={mdiAlertCircle} size={0.8} />
          </span>
          <p>{msg}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
