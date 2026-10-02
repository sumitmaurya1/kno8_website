import type { ReactNode } from "react";

/**
 * A template re-mounts on every navigation, so this CSS animation replays
 * as a page-to-page transition without shipping any JavaScript.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page">{children}</div>;
}
