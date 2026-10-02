import { cn } from "@/lib/utils";
import { Orb } from "./Orb";
import { Parallax } from "./Parallax";
import { Spark } from "./Spark";

/**
 * A small cluster of spheres and stars beside a section heading.
 * Desktop only, purely decorative, and confined to the empty space next to
 * the heading so it never sits on top of content.
 */
export function SectionDecor({
  side = "right",
  variant = "a",
}: {
  side?: "left" | "right";
  variant?: "a" | "b" | "c";
}) {
  const edge =
    side === "right"
      ? "right-[max(3rem,calc((100vw-1240px)/2+3rem))]"
      : "left-[max(3rem,calc((100vw-1240px)/2+3rem))]";
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute top-14 hidden h-56 w-64 lg:block", edge)}
    >
      {variant === "a" && (
        <>
          <Parallax distance={90} className="absolute left-10 top-2">
            <Orb tone="blue" className="h-16 w-16" />
          </Parallax>
          <Parallax distance={40} className="absolute left-40 top-24">
            <Spark className="h-7 w-7" />
          </Parallax>
          <Parallax distance={130} className="absolute bottom-2 left-24">
            <Orb tone="violet" className="h-7 w-7 [animation-delay:-3s]" />
          </Parallax>
        </>
      )}
      {variant === "b" && (
        <>
          <Parallax distance={70} className="absolute left-6 top-4">
            <Spark className="h-10 w-10 [animation-delay:-1.5s]" />
          </Parallax>
          <Parallax distance={120} className="absolute left-32 top-12">
            <Orb tone="violet" className="h-20 w-20 [animation-delay:-2s]" />
          </Parallax>
          <Parallax distance={50} className="absolute bottom-4 left-16">
            <Spark className="h-5 w-5" />
          </Parallax>
        </>
      )}
      {variant === "c" && (
        <>
          <Parallax distance={110} className="absolute left-44 top-2">
            <Orb tone="violet" className="h-10 w-10" />
          </Parallax>
          <Parallax distance={60} className="absolute left-12 top-16">
            <Spark className="h-8 w-8 [animation-delay:-2.5s]" />
          </Parallax>
          <Parallax distance={140} className="absolute bottom-0 left-36">
            <Orb tone="blue" className="h-14 w-14 [animation-delay:-5s]" />
          </Parallax>
        </>
      )}
    </div>
  );
}
