import { useId } from "react";
import { cn } from "@/lib/utils";

/** The four-point star from the centre of the Kno8 logo, used as a quiet accent. */
export function Spark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("pointer-events-none animate-twinkle", className)}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10CFF5" />
          <stop offset="0.5" stopColor="#2563FF" />
          <stop offset="1" stopColor="#A633FF" />
        </linearGradient>
      </defs>
      <path
        d="M12 0c1.2 6.6 5.4 10.800 12 12-6.600 1.200-10.800 5.400-12 12-1.200-6.600-5.400-10.800-12-12C6.600 10.800 10.800 6.600 12 0Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}
