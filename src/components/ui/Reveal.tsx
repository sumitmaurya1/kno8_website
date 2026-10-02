"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Swings a block up into place in 3D the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      style={{ transformPerspective: 1100, transformOrigin: "50% 100%" }}
      initial={{ opacity: 0, y: 44, rotateX: 14, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
