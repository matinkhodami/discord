import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@mdi/react";
import { mdiCloseCircle } from "@mdi/js";
import Image from "next/image";

import { UploadDropzone } from "./UploadThing";

interface DropZoneFileProps {
  value: string;
  onChange: (url: string) => void;
  endPoint: "serverImage" | "messageFile";
}
const DropZoneFile = ({ value, endPoint, onChange }: DropZoneFileProps) => {
  return (
    <AnimatePresence mode="popLayout">
      {!!value && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="relative w-24 h-24 mx-auto border-lightPrimary border-2 rounded-full">
            <Image src={value} alt="uploaded file" fill className="rounded-full"/>
            <span onClick={() => onChange("")} className="cursor-pointer">
              <Icon
                path={mdiCloseCircle}
                size={1}
                className="text-rose-500 absolute -top-1 -right-1"
              />
            </span>
          </div>
        </motion.div>
      )}
      {!value && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <UploadDropzone
            endpoint={endPoint}
            onClientUploadComplete={(res) => {
              onChange(res[0].url);
            }}
            appearance={{
              container: "dark:bg-lightPrimary/5 cursor-pointer bg-lightSecondary/10",
              label: "text-lightSecondary hover:text-lightSecondary",
              button: cn(
                "bg-lightPrimary font-bold",
                "ut-ready:bg-lightSecondary",
                "ut-uploading:cursor-not-allowed",
                "after:bg-lightSecondary/50"
              ),
              uploadIcon: "text-lightSecondary/90",
              allowedContent: "dark:text-darkMuted/40 text-lightSecondary/80",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropZoneFile;
