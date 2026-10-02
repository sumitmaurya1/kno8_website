import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "text";

const variants: Record<Variant, string> = {
  primary:
    // The ::before is a light sheen that sweeps across on hover.
    "relative overflow-hidden bg-brand px-6 text-white shadow-button hover:brightness-110 before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:-skew-x-12 before:bg-white/30 before:opacity-0 before:transition-[transform,opacity] before:duration-700 hover:before:translate-x-[500%] hover:before:opacity-100",
  secondary: "border border-navy/15 bg-white px-6 text-navy hover:border-electric/50",
  light: "bg-white px-6 text-navy hover:bg-paper",
  text: "px-1 text-electric hover:text-iris",
};

export const buttonBase =
  "group/btn inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-[0.95rem] font-semibold transition-[filter,color,background-color,border-color,transform] duration-200 active:scale-[0.97]";

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(buttonBase, variants[variant], className);
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Opens in a new tab and shows an outbound arrow. */
  external?: boolean;
  className?: string;
}) {
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const icon = (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center",
        variant === "text" && "bg-brand h-8 w-8 rounded-full text-white",
      )}
    >
      <Arrow className="h-4 w-4 transition-transform duration-200 ease-out-soft group-hover/btn:translate-x-0.5" />
    </span>
  );
  // The text variant leads with its icon, like a "watch"/"read more" link.
  const content =
    variant === "text" ? (
      <>
        {icon}
        {children}
      </>
    ) : (
      <>
        {children}
        {icon}
      </>
    );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass(variant, className)}
      >
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {content}
    </Link>
  );
}
