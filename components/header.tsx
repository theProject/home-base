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
        width="40"
        height="40"
        viewBox="0 0 101.05 187.21" // Updated viewBox from your new SVG
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-auto" // This will scale your SVG (height 40px, width auto)
      >
        {/* New SVG content starts here */}
        <path d="M26.24 61.97c2.74 4.25 7.42 6.78 10.1 11.25l1.85-1.49.4 2.27 2.23-.75-.35 2.14c1.71-.09 3.54 2.03 4.46 2.34.07 1.24-.1 2.51 0 3.75-6.73-2.73-8.14 1.23-11.96 5.25H24c-.4-6.59.93-9.78.79-15.4-.07-2.81-2.72-8.86 1.45-9.35Zm4.42 16.55-2.16 3.32c2.19 3.79 10.35-2.09 9.7-4.49l-7.09-3.41c-3.01.59-3.43 4.05-.44 4.59Z" fill="#f9fafa"/>
        <path d="M80.07 6.47c33.2 21.82 21.82 72.12-18.69 74.25-4.83-1.21-11.61-1.4-16.45-3-.91-.31-2.75-2.44-4.46-2.34l.35-2.14-2.23.75-.4-2.27-1.85 1.49c-12.19-12.1-17.85-22-15.33-39.75 4.08-8.63 9.24-19.76 17.19-25.5C49.01.83 68.79.02 80.07 6.47M58.99 23.16c-23.29 1.93-21.28 38.67 4.94 34.99 20.09-2.82 17.85-36.88-4.94-34.99" fill="#d7e2c2"/>
        <path d="m80.81 5.72-.75.75C68.79.02 49.01.83 38.2 7.97l-.75-.75C51-1.75 66.49-2.48 80.81 5.72" fill="#565a54"/>
        <path d="m37.45 7.22.75.75c-7.96 5.75-13.12 16.87-17.19 25.5 1.47-12.58 6.04-19.36 16.45-26.25Z" fill="#636761"/>
        <path d="M80.81 5.72c10.65 6.1 18.04 17.06 19.44 29.25h-.75c-2.99-10.28-9.65-22.91-19.44-28.5zm19.44 31.5c.16 2.22-.15 4.52 0 6.75h-.75c.04-2.55-.17-3.95 0-6.75z" fill="#5e635d"/>
        <path d="M100.25 37.22h-.75c.04-.6.13-1.81 0-2.25h.75c.15 1.33-.04 1.74 0 2.25m0 6.75c0 .08 1.04.71.74 1.49H99.5v-1.49z" fill="#656866"/>
        <path d="M58.99 23.16c22.78-1.89 25.02 32.18 4.94 34.99-26.22 3.68-28.23-33.06-4.94-34.99m11.84 8.32c-12.37-13.42-33.15 5.13-21.06 18.5s33.1-5.44 21.06-18.5" fill="#bcc5a9"/>
        <path d="M70.83 31.48c12.04 13.07-8.43 32.45-21.06 18.5s8.69-31.92 21.06-18.5" fill="#e6edd1"/>
        <path d="M50.16 100.97c1.78-.18 2.94-.28 3.74 1.5-1.04 1.97-15.98 17-18.69 19.5-2.2 2.04-5.46 2.75-4.5 6.22.23.83 1.5.12 2.26 4.28 1.77 7.72 9.1 11.29 13.84 17.24l2.6-1.49c.8.82 5.87 6.81 5.97 7.27.34 1.68-.42 3.72.77 5.47-2.89.19-22.19 7.93-22.82 8.99-.58.98-.61 5.05-.34 6.24 4.27 2.27 1.56 6.88 2.97 11.02l-5.15-.83-.09-4.42c-3.21 1.32-5.74.31-8.97 0-.37-1.41.21-1.52.75-2.25h9.71c-.31-4.02-4.8-2.94-7.47-3 .32-1.87.25-12.1-.39-13.49l-16.21-20.1c-5.06.5-8.51-1.89-8.12-7.27.15-2.1 12.22-25.53 13.51-26.25 5.28-2.65 12.37 2.51 17.93 1.86 1.11.21 3.36 2.48 5.44 1.38 5.24-3.29 7.09-11.03 13.25-11.87ZM27.6 123.34c.23-2.86 3.51-4.89 5.36-7l-12.61-3.28c-2.73 5.48-7.48 13.06 3.32 11.96 1.26-.17.84-1.06 1.67-1.52.48-.26 1.75.22 2.26-.17Zm-.73 9.25c-2.09-1.31-14.79 4.17-14.82 5.5l17.54 21.99 10.05-9.88c-4.63-5.52-10.13-10.72-12.77-17.6Zm-21.83 1.47c-1.94.66-1.91 5.01.66 5.21 4.49.35 4.74-7.04-.66-5.21m25.41 29.96c-2.92.5-1.99 5.58.55 5.15 2.92-.5 1.99-5.58-.55-5.15" fill="#525157"/>
        <path d="M44.93 81.47c0 .5-.02 1 0 1.5-4.05 3.01-6.56 7.62-10.46 10.89-3.37 3.87-12.65 6.96-11.98 12.37l-8.22-2.63c7.41-4.9 11.92-11.14 18.69-16.88 3.82-4.02 5.23-7.98 11.96-5.25Zm16.45-.75-3.99 3.15c-1.14 5.4.28 10.55-1.99 15.6l-2.18-.09-.15-2.05-1.41-.11c.77-4.45-1.17-12.07 1.5-16.5 4.42.52 1.72-1.84 8.22 0" fill="#545359"/>
        <path d="M44.93 82.97c.11.75 1.37 2.26.75 3.75h5.98c-.19 2.74.6 8.51 0 10.5-.06.21-2.49 1.72-1.5 3.75-1.94.2-3.11.78-4.49 2.25-.86-5.63 4.64-15.84-4.49-16.5 1.16-1.28 1.98-2.97 3.74-3.75Z" fill="#f8f8f9"/>
        <path d="M32.97 132.47c-.75-4.17-2.03-3.45-2.26-4.28-.96-3.47 2.3-4.18 4.5-6.22.77 3.81 3.21 9.04-2.24 10.5" fill="#f6f7f8"/>
        <path d="M40.44 109.22c-2.94 4.39-4.77 4.79-8.97 2.25-.35-1.05.54-1.67.75-2.25z" fill="#eaebed"/>
        <path d="M24.75 176.72c2.68.06 7.16-1.02 7.47 3h-9.71c.8-1.07 1.9-.97 2.24-3" fill="#acacb1"/>
        <path d="m49.42 148.22-2.6 1.49c-1.88-1.4-3.3-3.7-4.87-5.24 2.97-1.35 5.4 1.61 7.48 3.75Z" fill="#d0d7df"/>
        <path d="m51.66 97.22 1.41.11.15 2.05 2.18.09c-.15.33-1.29 2.61-1.5 3-.8-1.78-1.96-1.68-3.74-1.5-.99-2.03 1.43-3.54 1.5-3.75m1.49-18c.03 3.3-1.58 3.9-1.5 7.5h-5.98c.68-1.97-1.04-3.1-.75-4.5 3.62.35 4.5.33 5.98-3 .65.14 1.54-.11 2.24 0Z" fill="#d1d2d8"/>
        <path d="M50.91 79.22c-1.48 3.33-2.36 3.35-5.98 3-.07-1.49.04-3 0-4.5.66.22 5.05 1.3 5.98 1.5m5.98.75c-.2.01-2.39 1.49-3.74.75.13-.34-.09-1.04 0-1.5 1.27.2 2.52.32 3.74.75" fill="#5c5f62"/>
        <path d="M5.04 134.06c5.4-1.83 5.15 5.57.66 5.21-2.57-.2-2.61-4.55-.66-5.21" fill="#c6cbda"/>
        <path d="M30.45 164.02c2.54-.43 3.47 4.65.55 5.15-2.54.43-3.47-4.65-.55-5.15" fill="#c0c6d5"/>
        {/* New SVG content ends here */}
      </svg>

      <span className="font-geist text-xl md:text-2xl font-bold text-black dark:text-white">
        theProject<span className="text-magenta">.</span>
      </span>
    </div>

    {/* ─────── Desktop nav ─────── */}
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
