"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { subscribe, writeStore } from "@/lib/clientStore";
import { cn } from "@/lib/utils";

export const THEME_KEY = "kno8-theme";

const isDark = () => document.documentElement.classList.contains("dark");

/** Switches between the light and dark themes and remembers the choice on this device. */
export function ThemeToggle({ className }: { className?: string }) {
  // The server always renders the light state; the saved theme is applied
  // before paint by the inline script in the root layout.
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  const toggle = () => {
    const next = !isDark();
    document.documentElement.classList.toggle("dark", next);
    writeStore(THEME_KEY, next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      className={cn(
        "inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-fg/15 bg-surface text-fg transition-colors hover:border-electric/50",
        className,
      )}
    >
      {dark ? (
        <Sun aria-hidden="true" className="h-5 w-5" />
      ) : (
        <Moon aria-hidden="true" className="h-5 w-5" />
      )}
    </button>
  );
}
