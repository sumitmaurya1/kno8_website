import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Kno8 mark. Every use of the logo on the site goes through this file;
 * the artwork lives in /public/brand (the favicon is src/app/icon.png).
 */
export const logoMark = {
  src: "/brand/kno8-mark.png",
  width: 475,
  height: 732,
};

export function LogoMark({
  className,
  sizes = "48px",
}: {
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src={logoMark.src}
      alt=""
      width={logoMark.width}
      height={logoMark.height}
      sizes={sizes}
      className={cn("object-contain", className)}
    />
  );
}

export function Logo({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-auto" />
      <span
        className={cn(
          "font-display text-[1.45rem] font-semibold leading-none tracking-[-0.04em]",
          tone === "dark" ? "text-white" : "text-fg",
        )}
      >
        Kno8
      </span>
    </span>
  );
}
