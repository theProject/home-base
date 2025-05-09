"use client"

import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { X, Menu } from "lucide-react"

// ⬇️  render ThemeToggle only in the browser
const ThemeToggle = dynamic(() => import("@/components/theme-toggle"), {
  ssr: false,
})

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-xs dark:bg-black/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* ─────── Brand ─────── */}
        <div className="flex items-center gap-2">
          {/* LOGO */}
          <svg
            version="1.1"
            id="slimeyMainLayer"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            viewBox="0 0 1920 1080"
            xmlSpace="preserve"
            className="h-10 w-auto"
          >
            <style>{`.st3{fill:#fff}`}</style>
            <g id="slimeyGroup">
              <path
                id="bodyStroke"
                d="M729.87 430.64c24.17-17.42 50.19-30.66 77.1-41.74 62.07-25.55 94.66-72.64 105.32-137.64 4.12-25.13 8.49-50.56 19.53-73.94 5.87-12.42 14.6-23.68 29.44-23.47 15.49.22 24.75 11.34 30.47 24.99 12.74 30.41 16.36 63.21 24.01 94.91 12.35 51.16 41.57 87.34 89.07 109.32 48.84 22.6 97.89 44.89 134.73 86.37 33.43 37.64 52.68 81.22 56.08 131.64 3.2 47.45-8.8 90.79-35.59 129.91-27.1 39.56-63.89 67.33-106.88 87.72-32.88 15.59-67.33 25.96-102.98 32.23-52.36 9.22-104.9 9.42-157.64 2.43-45.95-6.09-89.96-18.19-131.37-39.1-64.06-32.35-112.48-79.96-128.96-151.21-18.61-80.45 6.38-149.91 65.97-206.67 9.71-9.25 20.84-17.01 31.7-25.75"
              />
              <path
                id="bodyColor"
                d="M1135.6 802.42c13.34-6.91 27.26-12.9 39.91-20.89 56.66-35.79 93.36-84.73 97.96-153.81 3.75-56.23-14.44-104.59-52.26-146.18-32.19-35.39-73.58-56.32-116.1-75.33-61.03-27.28-98.75-72.65-112.4-138.54-5.28-25.49-8.63-51.53-17.93-76.08-2.58-6.81-5.87-14.71-14.05-14.5-8.2.2-10.91 8.34-13.36 15.2-9.22 25.75-12.39 52.93-18.64 79.39-10.63 45.01-29.54 84.59-69.6 111.45-28.36 19.02-60.48 30.57-89.92 47.39-47.82 27.31-88.12 61.89-108.13 114.93-20.45 54.19-19.15 108.2 10.26 158.84 42.1 72.51 112.16 102.95 189.39 121.26 45.98 10.9 92.81 10.87 139.53 8.76 46.56-2.11 91.56-12.59 135.34-31.89"
                style={{ fill: "#e20074" }}
              />
              <path
                id="mouthStroke"
                d="M842.95 736.28c-26.54-14.91-49.47-33.12-63.07-60.57-5.7-11.5-4.81-23.65 4.84-33.08 9.44-9.22 20.85-8.76 30.89-1.43 36 26.28 77.68 34.39 120.55 37.93 49.22 4.07 97.5-.4 143.03-21.53 7.87-3.65 15.36-8.41 22.34-13.6 13.28-9.88 26.58-10.65 36.83-1.19 9.92 9.15 10.32 25.68.95 39.68-25.71 38.36-62.31 61.43-106.16 72.5-60.58 15.28-120.35 12.01-178.28-12.87-3.9-1.68-7.64-3.77-11.92-5.84"
              />
              <path
                id="mouthBody"
                d="M1067.21 683.77c-27.29 9.78-55.43 14.65-84.4 15.87-52.74 2.23-104.13-2.53-152.18-26.74-4.99-2.52-10.94-6.55-15.49-1.65-4.99 5.37-2.64 12.34 1.04 18.13 12.98 20.44 33.1 31.77 54.79 39.44 59.85 21.16 120.25 22.06 180.22.31 21.95-7.96 41.91-19.71 55.56-39.72 3.8-5.56 5.51-12.57 1.41-17.71-4.51-5.66-10.61-1.32-15.91 1.14-7.94 3.68-16.02 7.09-25.04 10.93"
                style={{ fill: "#832fbd" }}
              />
              <path
                id="leftOuterEyeStroke"
                d="M892.87 621.14c-48.45 15.31-97.63-26.84-90.09-76.61 4.23-27.88 27.39-53.83 52.45-58.78 34.53-6.82 61.24 4.02 77.06 34.57 17.58 33.96 8.35 84.26-39.42 100.82"
              />
              <path
                id="leftEyeBodyFill"
                className="st3"
                d="M924.99 574.94c14.56-37.86-12.54-79.13-53.6-79.53-29.36-.29-53.38 23.02-56.93 53.54-3.35 28.81 16.14 56.05 45.2 63.15 26.5 6.48 54.36-9.01 65.33-37.16"
              />
              <path
                id="leftPupil"
                d="M849.66 546.68c5.52-11.3 12.89-19.54 26.19-17.65 10.32 1.46 17.35 8.57 19.69 18.13 3.15 12.83-1.41 23.34-13.8 29.77-8.37 4.35-15.76 2.64-22.44-3.05-8.18-6.97-13.12-15.4-9.64-27.2"
              />
              <path
                id="rightEyeOuterStroke"
                d="M1071.74 620.22c-48.45 15.31-97.63-26.84-90.09-76.61 4.23-27.88 27.39-53.83 52.45-58.78 34.53-6.82 61.24 4.02 77.06 34.57 17.58 33.96 8.35 84.26-39.42 100.82"
              />
              <path
                id="rightEyeBodyFill"
                className="st3"
                d="M1103.86 574.02c14.56-37.86-12.54-79.13-53.6-79.53-29.36-.29-53.38 23.02-56.93 53.54-3.35 28.81 16.14 56.05 45.2 63.15 26.5 6.48 54.36-9.01 65.33-37.16"
              />
              <path
                id="rightPupil"
                d="M1059.29 576.69c-14.65 6.45-23.74-.63-30.57-12.03-5.72-9.55-.96-26.54 8.89-32.18 11.79-6.75 22.51-5.17 30.91 5.95 8.95 11.86 7.58 24.88-3.28 34.15-1.69 1.44-3.67 2.56-5.95 4.11"
              />
            </g>
          </svg>

          <span className="font-geist text-xl md:text-2xl font-bold text-black dark:text-white">
            theProject<span className="text-magenta">.</span>
          </span>
        </div>

        {/* ─────── Desktop nav ─────── */}
        <nav className="hidden items-center gap-6 md:flex">
          {[
            ["Projects", "/projects"],
            ["Services", "/services"],
            ["Blog", "/blog"],
            ["Contact", "/contact"],
            ["Privacy", "/privacy"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="font-geist text-sm text-black/80 transition-colors hover:text-black dark:text-white/80 dark:hover:text-white"
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* ─────── Mobile actions ─────── */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label={mobileMenuOpen ? "Close main navigation" : "Open main navigation"}
            className="text-black dark:text-white"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-16 z-40 transform bg-white/95 dark:bg-black/95 backdrop-blur-xs transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full">
          {[
            ["Projects", "/projects"],
            ["Services", "/services"],
            ["Blog", "/blog"],
            ["Contact", "/contact"],
            ["Privacy", "/privacy"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="font-geist text-xl py-4 text-black dark:text-white hover:text-magenta dark:hover:text-magenta transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
