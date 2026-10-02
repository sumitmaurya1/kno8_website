"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { buildSteps } from "@/data/content";

/** Five-step process. Horizontal from the lg breakpoint, vertical below it. */
export function BuildTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <ol ref={ref} className="relative grid gap-10 lg:grid-cols-5 lg:gap-8">
      {/* Track + progress: vertical on small screens, horizontal on large. */}
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-[7px] top-2 w-px bg-line lg:bottom-auto lg:left-0 lg:right-0 lg:top-[7px] lg:h-px lg:w-auto"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: progress }}
        className="absolute bottom-2 left-[6px] top-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-aqua via-electric to-orchid lg:hidden"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute left-0 right-0 top-[6px] hidden h-[3px] origin-left rounded-full bg-gradient-to-r from-aqua via-electric to-orchid lg:block"
      />

      {buildSteps.map((step, index) => (
        <li key={step.title} className="relative pl-10 lg:pl-0 lg:pt-12">
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-[3px] border-iris bg-surface lg:top-0"
          />
          <p className="text-sm font-bold text-iris">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 font-display text-xl font-bold tracking-tight">
            {step.title}
          </h3>
          <p className="mt-3 max-w-md leading-relaxed text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
