"use client";

import Icon from "@mdi/react";
import { motion } from "framer-motion";
import { mdiWeatherNight, mdiWhiteBalanceSunny } from "@mdi/js";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();
  // console.log(theme);
  return (
    <Button className="w-[48px] h-[48px] dark:bg-dark !bg-primary relative" size="icon">
      <motion.span
        animate={{
          rotate: theme === "dark" ? 180 : 0,
          scale: theme === "dark" ? 0 : 1,
        }}
        className="absolute w-full h-full flex justify-center items-center"
        onClick={() => setTheme("dark")}
      >
        <Icon
          path={mdiWeatherNight}
          size={1}
          className="h-[1.2rem] w-[1.2rem] mx-auto"
        />
      </motion.span>
      <motion.span
        animate={{
          rotate: theme === "light" ? 180 : 0,
          scale: theme === "light" ? 0 : 1,
        }}
        className="w-full h-full flex justify-center items-center"
        onClick={() => setTheme("light")}
      >
        <Icon
          path={mdiWhiteBalanceSunny}
          size={1}
          className="h-[1.2rem] w-[1.2rem] "
        />
      </motion.span>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
