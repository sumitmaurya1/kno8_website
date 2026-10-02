"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { companies } from "@/data/companies";
import { cn } from "@/lib/utils";

interface MapNode {
  key: string;
  name: string;
  category: string;
  description: string;
  href: string;
  logo?: string;
  future: boolean;
}

const FUTURE_SLOTS = 2;
const RADIUS = 37; // % of the square, centre to node

const kno8Node = {
  name: "Kno8",
  category: "Parent company",
  description:
    "Kno8 sits at the centre: one parent organisation that designs, builds and launches companies. Hover or focus a node to see what it is.",
};

const nodes: MapNode[] = [
  ...companies.map((company) => ({
    key: company.slug,
    name: company.name,
    category: company.category,
    description: company.description,
    href: `/companies/${company.slug}`,
    logo: company.logo,
    future: false,
  })),
  ...Array.from({ length: FUTURE_SLOTS }, (_, index) => ({
    key: `future-${index}`,
    name: "Future Venture",
    category: "Coming next",
    description:
      "An open place in the ecosystem. Kno8 continuously explores opportunities across technology, health, media, education, consumer products and digital services.",
    href: "/ventures",
    future: true,
  })),
];

/** Spread the nodes evenly around the centre, alternating companies and open slots where possible. */
function position(index: number, total: number) {
  const angle = ((index / total) * 360 - 90 - 180 / total) * (Math.PI / 180);
  return {
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  };
}

export function EcosystemMap() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const active = nodes.find((node) => node.key === activeKey);
  const detail = active ?? kno8Node;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div
        className="relative mx-auto aspect-square w-full max-w-[36rem] lg:col-span-7"
        onMouseLeave={() => setActiveKey(null)}
      >
        <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="eco-line" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10CFF5" />
              <stop offset="0.5" stopColor="#2563FF" />
              <stop offset="1" stopColor="#A633FF" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            stroke="#C9D1E8"
            strokeWidth="0.3"
            strokeDasharray="0.6 1.8"
            strokeLinecap="round"
            fill="none"
            className="origin-center animate-[spin_90s_linear_infinite]"
          />
          <circle cx="50" cy="50" r={RADIUS / 2} stroke="#E2E7F3" strokeWidth="0.3" fill="none" />
          {nodes.map((node, index) => {
            const { x, y } = position(index, nodes.length);
            const isActive = node.key === activeKey;
            return node.future ? (
              <motion.line
                key={node.key}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={isActive ? "#2563FF" : "#B4BDD6"}
                strokeWidth="0.45"
                strokeDasharray="1.2 1.6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.12 }}
              />
            ) : (
              <motion.line
                key={node.key}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke="url(#eco-line)"
                strokeWidth={isActive ? 1.1 : 0.7}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.2 + index * 0.12 }}
              />
            );
          })}
        </svg>

        <div
          className="absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line bg-white shadow-[0_30px_50px_-22px_rgba(77,70,255,0.55)]"
          onMouseEnter={() => setActiveKey(null)}
        >
          <LogoMark className="h-[50%] w-auto" sizes="96px" />
          <span className="font-display text-sm font-semibold tracking-tight sm:text-base">Kno8</span>
        </div>

        <ul>
          {nodes.map((node, index) => {
            const { x, y } = position(index, nodes.length);
            const isActive = node.key === activeKey;
            return (
              <li
                key={node.key}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <Link
                  href={node.href}
                  onMouseEnter={() => setActiveKey(node.key)}
                  onFocus={() => setActiveKey(node.key)}
                  onBlur={() => setActiveKey(null)}
                  aria-label={`${node.name} — ${node.category}`}
                  className="group relative block rounded-2xl"
                >
                  <span
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 ease-out-soft sm:h-[4.5rem] sm:w-[4.5rem]",
                      node.future
                        ? "border border-dashed border-navy/30 bg-paper text-navy/60"
                        : "bg-white shadow-[0_14px_30px_-18px_rgba(6,11,34,0.45)]",
                      isActive && "scale-110",
                    )}
                  >
                    {node.logo ? (
                      <Image
                        src={node.logo}
                        alt=""
                        width={72}
                        height={72}
                        className="h-full w-full rounded-2xl"
                      />
                    ) : (
                      <Plus aria-hidden="true" className="h-5 w-5" />
                    )}
                  </span>
                  {/* The label sits on the outside of the ring so the connecting line never crosses it. */}
                  <span
                    className={cn(
                      "absolute left-1/2 w-28 -translate-x-1/2 text-center text-xs font-semibold leading-tight sm:w-36 sm:text-sm",
                      y < 50 ? "bottom-full mb-2" : "top-full mt-2",
                    )}
                  >
                    {node.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div aria-live="polite" className="lg:col-span-5">
        <div className="min-h-[15rem] rounded-3xl border border-line bg-white shadow-card p-7 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {detail.category}
          </p>
          <p className="mt-3 font-display text-3xl font-semibold tracking-tight">{detail.name}</p>
          <p className="mt-4 leading-relaxed text-muted">{detail.description}</p>
          {active && (
            <Link
              href={active.href}
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-electric"
            >
              {active.future ? "See what we're exploring" : `Explore ${active.name}`}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
