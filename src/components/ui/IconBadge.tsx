import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Tinted circle that carries a card's icon. */
export function IconBadge({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#ECEBFF] text-iris",
        className,
      )}
    >
      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
    </span>
  );
}
