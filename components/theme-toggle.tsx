// components/theme-toggle.tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // ✅ Reveal once the client is ready
  useEffect(() => setMounted(true), [])

  // Placeholder that keeps markup stable (suppress warning just in case)
  if (!mounted) {
    return (
      <button
        aria-label="Toggle colour scheme"
        className="flex h-9 w-9 items-center justify-center rounded-md"
        suppressHydrationWarning
      >
        <Sun className="h-6 w-6 opacity-0" />
      </button>
    )
  }

  const current = theme === "system" ? systemTheme : theme

  return (
    <button
      aria-label="Toggle colour scheme"
      className="flex h-9 w-9 items-center justify-center rounded-md"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
    >
      {current === "dark" ? <Moon className="h-6 w-6 text-yellow-400" /> : <Sun className="h-6 w-6 text-orange-500" />}
    </button>
  )
}
