/* components/theme-toggle.tsx */
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();          // “resolved” works with system ↔ manual
  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle colour theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        flex h-9 w-9 items-center justify-center rounded-full
        transition-opacity hover:opacity-80
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      "
    >
      {isDark ? (
        /* dark-mode → show moon */
        <Moon className="h-6 w-6 text-yellow-400" />
      ) : (
        /* light-mode → show sun */
        <Sun className="h-6 w-6 text-orange-500" />
      )}
    </button>
  );
}
