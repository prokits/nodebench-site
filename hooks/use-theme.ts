"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/**
 * The `dark` class on <html> is the single source of truth. It is set before
 * paint by `themeInitScript`, and this hook just observes it, so every
 * component that calls useTheme() stays in sync.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const getServerSnapshot = (): Theme => "light";

/**
 * Switches the theme without every `transition-colors` element animating
 * separately, which looks like the page is flickering in pieces.
 */
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (root.classList.contains("dark") === (theme === "dark")) return;

  const freeze = document.createElement("style");
  freeze.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(freeze);

  root.classList.toggle("dark", theme === "dark");

  // Force a style recalc while transitions are off, then restore them.
  void window.getComputedStyle(document.body).backgroundColor;
  requestAnimationFrame(() => freeze.remove());
}

export function getSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "dark" || saved === "light" ? saved : null;
  } catch {
    return null;
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the switch still applies for this visit.
    }
    applyTheme(next);
  }, []);

  return { theme, setTheme };
}
