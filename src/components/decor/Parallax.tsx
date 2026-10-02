"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Moves its children against the scroll direction so they read as nearer or farther. */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  /** Total travel in pixels while the element crosses the viewport. */
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} aria-hidden="true" style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
