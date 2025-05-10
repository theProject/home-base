"use client"

import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { X, Menu, Folder, Settings, FileText, Mail, Shield } from "lucide-react"

// render ThemeToggle only in the browser
const ThemeToggle = dynamic(() => import("@/components/theme-toggle"), {
  ssr: false,
})

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => setMobileMenuOpen(o => !o)

  const links = [
    { label: "Projects", href: "/projects", Icon: Folder },
    { label: "Services", href: "/services", Icon: Settings },
    { label: "Blog",     href: "/blog",     Icon: FileText },
    { label: "Contact",  href: "/contact",  Icon: Mail },
    { label: "Privacy",  href: "/privacy",  Icon: Shield },
  ]

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-xs dark:bg-black/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          {/* LOGO */}
          <svg
            id="Layer_2"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1613.39 1330.98"
            className="h-6 w-auto"
          >
            <defs>
              <linearGradient
                id="linear-gradient"
                x1="392.57" y1="659.38"
                x2="772.1"  y2="896.53"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0"    stopColor="#e20074" />
                <stop offset=".11"  stopColor="#de0376" />
                <stop offset=".21"  stopColor="#d30e7c" />
                <stop offset=".31"  stopColor="#c02087" />
                <stop offset=".41"  stopColor="#a53997" />
                <stop offset=".5"   stopColor="#835aab" />
                <stop offset=".6"   stopColor="#5982c4" />
                <stop offset=".69"  stopColor="#29b0e0" />
                <stop offset=".7"   stopColor="#24b6e4" />
                <stop offset=".78"  stopColor="#1ec0db" />
                <stop offset=".91"  stopColor="#10dbc3" />
                <stop offset="1"    stopColor="#05f2af" />
              </linearGradient>
              <linearGradient
                id="linear-gradient-2"
                x1="1608.17" y1="1340.03"
                x2="876.99"  y2="917.88"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".82" stopColor="#05f2af" />
                <stop offset=".87" stopColor="#06eeb2" />
                <stop offset=".91" stopColor="#0ce3bb" />
                <stop offset=".96" stopColor="#15d1cc" />
                <stop offset="1"    stopColor="#23b7e2" />
                <stop offset="1"    stopColor="#24b6e4" />
              </linearGradient>
            </defs>
            <g id="logoMainLayer">
              <path
                d="M804.6,0L0,1330.92h500.66l568.5-911.2L804.6,0ZM438.29,1164.13l-188.85,1.13L779.17,312.37l87.71,146.71-428.59,705.05Z"
                fill="url(#linear-gradient)"
              />
              <path
                id="triCompound"
                d="M1125.94,510.82l-487.45,820.16h974.91l-487.45-820.16ZM1125.94,892.74l160.19,269.52h-320.37l160.19-269.52Z"
                fill="url(#linear-gradient-2)"
              />
            </g>
          </svg>
          <span className="font-geist text-xl md:text-2xl font-bold text-black dark:text-white">
            theProject<span className="text-magenta">.</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-geist text-sm text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={toggleMobileMenu}
            className={`transition-colors ${
              mobileMenuOpen ? "text-teal-300" : "text-black dark:text-white"
            }`}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`
          fixed top-16 bottom-0 right-0
          z-40 w-32
          bg-white text-black
          dark:bg-black dark:text-white
          rounded-l-xl
          transition-transform duration-300 ease-in-out
          md:hidden
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <nav className="flex flex-col items-end justify-start h-full pt-8 pr-1 bg-white/80 backdrop-blur-xs dark:bg-black/80">
          {links.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex w-full justify-left items-center gap-2 px-4 py-4 transition-colors hover:text-magenta dark:hover:text-magenta bg-white/80 backdrop-blur-xs dark:bg-black/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
