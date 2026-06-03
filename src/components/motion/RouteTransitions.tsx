"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function RouteTransitions({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="min-h-[calc(100vh-4rem)]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

