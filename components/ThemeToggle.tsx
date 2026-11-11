"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { DARK_QUERY, THEME_STORAGE_KEY } from "@/lib/theme";
import { applyTheme, getSavedTheme, useTheme } from "@/hooks/use-theme";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  // Until someone picks a theme, follow the OS. Also keep other tabs in step.
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const resolve = () => getSavedTheme() ?? (media.matches ? "dark" : "light");

    // If a hydration error elsewhere makes React re-render from the root, it
    // rebuilds <html> without the class the init script added. Put it back.
    applyTheme(resolve());

    const onSystemChange = () => {
      if (!getSavedTheme()) applyTheme(resolve());
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) applyTheme(resolve());
    };

    media.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Dark theme"
      aria-pressed={isDark}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "grid place-items-center size-8 -my-1",
        "hover:text-orange-50 transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        className
      )}
    >
      {/* Icons swap with CSS, so the right one shows on first paint, before hydration. */}
      <Moon className="size-[18px] dark:hidden" aria-hidden />
      <Sun className="size-[18px] hidden dark:block" aria-hidden />
    </button>
  );
}
