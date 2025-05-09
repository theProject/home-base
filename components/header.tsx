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
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            viewBox="0 0 1920 1920"
            xmlSpace="preserve"
            className="h-10 w-auto"
          >
            <style>{`.st0{fill:#e20074}`}</style>
            <path
              className="st0"
              d="M735.15 343.2c38.66 0 70 31.34 70 70v800c0 38.66-31.34 70-70 70h-480c-38.66 0-70-31.34-70-70v-800c0-38.66 31.34-70 70-70zm0-120h-480c-25.6 0-50.49 5.04-73.99 14.98-22.64 9.58-42.95 23.26-60.36 40.67s-31.09 37.72-40.67 60.36c-9.94 23.5-14.98 48.4-14.98 73.99v800c0 25.6 5.04 50.49 14.98 73.99 9.58 22.64 23.26 42.95 40.67 60.36s37.72 31.09 60.36 40.67c23.5 9.94 48.4 14.98 73.99 14.98h480c25.6 0 50.49-5.04 73.99-14.98 22.64-9.58 42.95-23.26 60.36-40.67s31.09-37.72 40.67-60.36c9.94-23.5 14.98-48.4 14.98-73.99v-800c0-25.6-5.04-50.49-14.98-73.99-9.58-22.64-23.26-42.95-40.67-60.36s-37.72-31.09-60.36-40.67c-23.5-9.94-48.4-14.98-73.99-14.98"
            />
            <path
              d="M1125.15 563.2c38.66 0 70 31.34 70 70v800c0 38.66-31.34 70-70 70h-480c-38.66 0-70-31.34-70-70v-800c0-38.66 31.34-70 70-70zm0-120h-480c-25.6 0-50.49 5.04-73.99 14.98-22.64 9.58-42.95 23.26-60.36 40.67s-31.09 37.72-40.67 60.36c-9.94 23.5-14.98 48.4-14.98 73.99v800c0 25.6 5.04 50.49 14.98 73.99 9.58 22.64 23.26 42.95 40.67 60.36s37.72 31.09 60.36 40.67c23.5 9.94 48.4 14.98 73.99 14.98h480c25.6 0 50.49-5.04 73.99-14.98 22.64-9.58 42.95-23.26 60.36-40.67s31.09-37.72 40.67-60.36c9.94-23.5 14.98-48.4 14.98-73.99v-800c0-25.6-5.04-50.49-14.98-73.99-9.58-22.64-23.26-42.95-40.67-60.36s-37.72-31.09-60.36-40.67c-23.5-9.94-48.4-14.98-73.99-14.98"
              style={{ fill: "#05f2af" }}
            />
            <path
              className="st0"
              d="M455.15 1283.2h120v120h-120z"
            />
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
