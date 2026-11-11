export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "nodebench-theme";

export const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Runs in <head> before the first paint so the page never flashes the
 * wrong theme. A saved choice wins; otherwise the OS setting decides.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":window.matchMedia("${DARK_QUERY}").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;
