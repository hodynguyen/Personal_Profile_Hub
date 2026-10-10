import { useSyncExternalStore } from "react";

// Theme follows the visitor's local clock: light by day, dark at night.
// A manual toggle overrides it until the next day/night switch.

export type Theme = "light" | "dark";

const DAY_START = 6; // 06:00
const NIGHT_START = 18; // 18:00

function themeForTime(now: Date): Theme {
  const h = now.getHours();
  return h >= DAY_START && h < NIGHT_START ? "light" : "dark";
}

function nextSwitch(now: Date): Date {
  const next = new Date(now);
  next.setMinutes(0, 0, 0);
  const h = now.getHours();
  if (h < DAY_START) next.setHours(DAY_START);
  else if (h < NIGHT_START) next.setHours(NIGHT_START);
  else {
    next.setDate(next.getDate() + 1);
    next.setHours(DAY_START);
  }
  return next;
}

let theme: Theme = themeForTime(new Date());
// Last clock-derived theme; a manual choice stands until this changes
let autoTheme: Theme = theme;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

function apply(next: Theme) {
  theme = next;
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(next);
  listeners.forEach((l) => l());
}

function schedule() {
  clearTimeout(timer);
  const now = new Date();
  // Small buffer so the timer lands inside the new period
  timer = setTimeout(resync, nextSwitch(now).getTime() - now.getTime() + 1000);
}

// Also runs on tab return: timers are throttled in background tabs and paused during sleep
function resync() {
  const auto = themeForTime(new Date());
  if (auto !== autoTheme) {
    autoTheme = auto;
    apply(auto);
  }
  schedule();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    apply(theme);
    resync();
    document.addEventListener("visibilitychange", resync);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", resync);
    }
  };
}

export function toggleTheme() {
  apply(theme === "light" ? "dark" : "light");
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, () => theme);
}
