/**
 * Tiny helpers for browser-only preferences (theme, dismissed notices),
 * shaped for React's useSyncExternalStore.
 */
const EVENT = "kno8-store";

export function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

export function readStore(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null; // storage can be blocked; fall back to defaults
  }
}

export function writeStore(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore: the preference just won't persist
  }
  window.dispatchEvent(new Event(EVENT));
}
