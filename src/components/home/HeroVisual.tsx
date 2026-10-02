"use client";

import Image from "next/image";
import { useEffect, type ReactNode } from "react";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Spark } from "@/components/decor/Spark";
import { AnimatedGradient } from "@/components/ui/AnimatedGradient";
import { logoMark } from "@/components/ui/Logo";

const spring = { stiffness: 55, damping: 16, mass: 0.8 };

/** Orbits around the mark: size, tilt, speed and the colour of the light travelling on each. */
const orbits = [
  { size: "108%", tilt: "rotateX(74deg) rotateZ(-14deg)", duration: 26, dot: "bg-aqua shadow-[0_0_18px_4px_rgba(16,207,245,0.75)]" },
  { size: "134%", tilt: "rotateX(70deg) rotateZ(24deg)", duration: 40, dot: "bg-orchid shadow-[0_0_18px_4px_rgba(166,51,255,0.75)]" },
  { size: "84%", tilt: "rotateX(78deg) rotateZ(-38deg)", duration: 18, dot: "bg-electric shadow-[0_0_16px_4px_rgba(37,99,255,0.75)]" },
];

/** A decoration that sits at a fixed spot and shifts with the pointer by `depth` pixels. */
function Floater({
  sx,
  sy,
  depth,
  left,
  top,
  delay,
  children,
}: {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  depth: number;
  left: string;
  top: string;
  delay: number;
  children: ReactNode;
}) {
  const x = useTransform(sx, [-1, 1], [-depth, depth]);
  const y = useTransform(sy, [-1, 1], [-depth * 0.6, depth * 0.6]);
  return (
    <motion.div
      style={{ left, top, x, y }}
      className="absolute"
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * The logo as the centre of a small system: it turns toward the pointer and
 * floats, inside a glowing halo, three tilted orbits and a scatter of
 * stars that move at different depths.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const sx = useSpring(pointerX, spring);
  const sy = useSpring(pointerY, spring);

  const rotateY = useTransform(sx, [-1, 1], [-16, 16]);
  const rotateX = useTransform(sy, [-1, 1], [11, -11]);
  // The glow moves against the logo to read as depth.
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

      {/* Halo: a ring of brand colour that turns slowly behind the mark. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="absolute inset-0 animate-[spin_22s_linear_infinite] rounded-full opacity-60 blur-2xl [mask-image:radial-gradient(closest-side,transparent_58%,black_74%,transparent_100%)]"
          style={{
            backgroundImage:
              "conic-gradient(from 0deg, #10CFF5, #2563FF, #A633FF, #6D35FF, #10CFF5)",
          }}
        />
      </div>

      {/* Orbits: circles laid almost flat at different angles, each carrying a light. */}
      {orbits.map((orbit, index) => (
        <div
          key={orbit.size}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 aspect-square"
          style={{ width: orbit.size, transform: `translate(-50%, -50%) ${orbit.tilt}` }}
        >
          <div
            className="absolute inset-0 rounded-full border border-iris/25"
            style={{
              animation: `spin ${orbit.duration}s linear infinite${index % 2 ? " reverse" : ""}`,
            }}
          >
            <span className={`absolute -top-1.5 left-1/2 h-3 w-3 rounded-full ${orbit.dot}`} />
          </div>
        </div>
      ))}

      {/* Soft contact shadow so the mark reads as hovering above the page. */}
      <span
        aria-hidden="true"
        className="absolute bottom-[-3%] left-1/2 h-[7%] w-[52%] -translate-x-1/2 rounded-[50%] bg-iris/35 blur-xl"
      />

      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute inset-x-[10%] inset-y-[4%] will-change-transform"
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
            {/* Light sweep, clipped to the logo's own shape. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              style={{
                maskImage: `url(${logoMark.src})`,
                WebkitMaskImage: `url(${logoMark.src})`,
              }}
            >
              <span className="absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/55 to-transparent" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stars at different depths. */}
      <div aria-hidden="true" className="absolute inset-0">
        <Floater sx={sx} sy={sy} depth={20} left="78%" top="-2%" delay={1.6}>
          <Spark className="h-7 w-7" />
        </Floater>
        <Floater sx={sx} sy={sy} depth={50} left="-10%" top="44%" delay={1.7}>
          <Spark className="h-5 w-5 [animation-delay:-1.5s]" />
        </Floater>
        <Floater sx={sx} sy={sy} depth={30} left="82%" top="90%" delay={1.8}>
          <Spark className="h-9 w-9 [animation-delay:-3s]" />
        </Floater>
      </div>
    </motion.div>
  );
}
