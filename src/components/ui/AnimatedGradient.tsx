import { cn } from "@/lib/utils";

/**
 * Soft brand-coloured light behind a focal element. Uses radial gradients
 * rather than CSS blur so it stays cheap to paint.
 */
export function AnimatedGradient({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const strength = tone === "dark" ? 0.5 : 0.3;
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <div
        className="absolute left-0 top-0 h-[75%] w-[75%] animate-drift rounded-full"
        style={{
          background: `radial-gradient(closest-side, rgba(16,207,245,${strength}), rgba(16,207,245,0))`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[80%] w-[80%] animate-drift rounded-full [animation-delay:-8s] [animation-direction:alternate-reverse]"
        style={{
          background: `radial-gradient(closest-side, rgba(166,51,255,${strength}), rgba(166,51,255,0))`,
        }}
      />
      <div
        className="absolute left-[18%] top-[20%] h-[65%] w-[65%] animate-drift rounded-full [animation-delay:-14s]"
        style={{
          background: `radial-gradient(closest-side, rgba(37,99,255,${strength}), rgba(37,99,255,0))`,
        }}
      />
    </div>
  );
}
