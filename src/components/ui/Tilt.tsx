"use client";

import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const spring = { stiffness: 170, damping: 18, mass: 0.6 };

/**
 * Tilts its content in 3D toward the pointer and sweeps a soft highlight
 * across it. Only reacts to a real mouse, and stays flat for visitors who
 * prefer reduced motion, so touch devices and keyboards are unaffected.
 */
export function Tilt({
  children,
  className,
  radius = "rounded-2xl",
  max = 7,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  /** Corner radius of the content, so the highlight follows its shape. */
  radius?: string;
  /** Maximum tilt in degrees. */
  max?: number;
  glare?: boolean;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const hover = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const shine = useSpring(hover, spring);

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const gx = useTransform(sx, (value) => value * 100);
  const gy = useTransform(sy, (value) => value * 100);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.5), rgba(255,255,255,0) 55%)`;

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
    hover.set(1);
  };

  const onPointerLeave = () => {
    x.set(0.5);
    y.set(0.5);
    hover.set(0);
  };

  return (
    <div
      className={cn("h-full [perspective:1100px]", className)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("relative h-full will-change-transform", radius)}
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden="true"
            style={{ background: glareBackground, opacity: shine }}
            className={cn("pointer-events-none absolute inset-0 mix-blend-soft-light", radius)}
          />
        )}
      </motion.div>
    </div>
  );
}
