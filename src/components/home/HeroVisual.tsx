"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { AnimatedGradient } from "@/components/ui/AnimatedGradient";
import { logoMark } from "@/components/ui/Logo";

const spring = { stiffness: 55, damping: 16, mass: 0.8 };

/**
 * The logo as a 3D object: it turns toward the pointer, floats gently,
 * drifts up as the page scrolls and sits inside a slowly turning orbit.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const sx = useSpring(pointerX, spring);
  const sy = useSpring(pointerY, spring);

  const rotateY = useTransform(sx, [-1, 1], [-16, 16]);
  const rotateX = useTransform(sy, [-1, 1], [11, -11]);
  // Foreground and background move by different amounts to read as depth.
  const scriptX = useTransform(sx, [-1, 1], [-18, 18]);
  const scriptY = useTransform(sy, [-1, 1], [-10, 10]);
  const glowX = useTransform(sx, [-1, 1], [14, -14]);

  const { scrollY } = useScroll();
  const lift = useTransform(scrollY, [0, 700], [0, -70]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, pointerX, pointerY]);

  return (
    <motion.div
      style={{ y: lift }}
      className="relative mx-auto aspect-[4/5] w-full max-w-[20rem] [perspective:1200px] sm:max-w-[24rem] lg:max-w-none"
    >
      <motion.div style={{ x: glowX }} className="absolute inset-0">
        <AnimatedGradient />
      </motion.div>

      {/* Orbit: a circle laid almost flat, turning slowly behind the mark. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[42%] aspect-square w-[108%]"
        style={{ transform: "translate(-50%, -50%) rotateX(74deg) rotateZ(-14deg)" }}
      >
        <div className="absolute inset-0 animate-[spin_26s_linear_infinite] rounded-full border border-iris/25">
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-aqua shadow-[0_0_18px_4px_rgba(16,207,245,0.7)]" />
          <span className="absolute -bottom-1 left-1/4 h-2 w-2 rounded-full bg-orchid shadow-[0_0_14px_3px_rgba(166,51,255,0.7)]" />
        </div>
      </div>

      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute inset-x-[10%] bottom-[16%] top-0 will-change-transform"
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformPerspective: 1200 }}
          initial={{ opacity: 0, scale: 0.7, rotateY: -70 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className="absolute inset-0 animate-float">
            <Image
              src={logoMark.src}
              alt="Kno8 logo"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 70vw"
              className="object-contain drop-shadow-[0_40px_45px_rgba(77,70,255,0.35)]"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative handwritten echo of the tagline. */}
      <motion.p
        aria-hidden="true"
        style={{ x: scriptX, y: scriptY }}
        className="absolute bottom-0 right-0 font-script text-[2.5rem] leading-[0.8] text-iris sm:text-5xl"
        initial={{ opacity: 0, rotate: -4 }}
        animate={{ opacity: 1, rotate: -12 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
      >
        Ideas
        <br />
        Companies
        <br />
        Possibilities
      </motion.p>
    </motion.div>
  );
}
