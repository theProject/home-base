"use client"

import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { X, Menu } from "lucide-react"

// ⬇️ render ThemeToggle only in the browser
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
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2160 2160"
            xmlSpace="preserve"
            className="h-14 w-auto"
          >
            <defs>
              {/* Thicken everything by dilating 2px */}
              <filter id="bolder" x="-10%" y="-10%" width="120%" height="120%">
                <feMorphology in="SourceAlpha" operator="dilate" radius="6" result="thick" />
                <feMerge>
                  <feMergeNode in="thick" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Your existing gradient */}
              <linearGradient
                id="a"
                gradientUnits="userSpaceOnUse"
                x1="849.429"
                y1="1103.308"
                x2="1442.112"
                y2="1542.881"
              >
                <stop offset="0" stopColor="#e30075" />
                <stop offset="0.04" stopColor="#bb2c80" />
                <stop offset="0.084" stopColor="#955589" />
                <stop offset="0.133" stopColor="#727b92" />
                <stop offset="0.186" stopColor="#549b9a" />
                <stop offset="0.246" stopColor="#3cb7a1" />
                <stop offset="0.313" stopColor="#27cda6" />
                <stop offset="0.391" stopColor="#18deaa" />
                <stop offset="0.488" stopColor="#0de9ad" />
                <stop offset="0.623" stopColor="#07f0af" />
                <stop offset="1" stopColor="#05f2af" />
              </linearGradient>
            </defs>

            {/* Wrap all your paths in this group to apply the filter */}
            <g filter="url(#bolder)">
              <path
                d="m1251.37 977.89-315 530h630zm-2.29 122.88 204.75 344.5h-409.5z"
                opacity="0.851"
                fill="#05f2af"
              />
              <path
                d="m1030 562.17-545.26 945.72h339.29l385.26-647.48zm-239.91 882.26-209.81 1.83 457.53-770.15 100.84 175.52z"
                fill="url(#a)"
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
