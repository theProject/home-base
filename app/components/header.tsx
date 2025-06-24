"use client"

import { useState, type ComponentType, type SVGProps } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { X, Menu, Folder, Settings, FileText, Mail, Shield, Gamepad, Home } from "lucide-react"

const ThemeToggle = dynamic(() => import("@/components/theme-toggle"), {
  ssr: false,
})

type NavLink = {
  label: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => setMobileMenuOpen((o) => !o)

  const links: NavLink[] = [
    { label: "Home", href: "/", Icon: Home },
    { label: "Projects", href: "/projects", Icon: Folder },
    { label: "Services", href: "/services", Icon: Settings },
    { label: "Blog", href: "/blog", Icon: FileText },
    { label: "Arcade", href: "/arcade", Icon: Gamepad },
    { label: "Contact", href: "/contact", Icon: Mail },
    { label: "Privacy", href: "/privacy", Icon: Shield },
  ]

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-xs dark:bg-black/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <svg
              id="Layer_2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1638.16 1333.13"
              className="h-6 w-auto"
            >
              <g id="logoMainLayer">
                <polygon
                  points="804.62 0 0 1330.9 500.66 1330.91 1046.54 418.11 804.62 0"
                  fill="#e20074"
                />
                <polygon
                  points="1188.87 579.3 743.47 1333.13 1638.16 1330.82 1188.87 579.3"
                  fill="#05f2af"
                />
              </g>
            </svg>
            <span className="font-geist text-xl md:text-2xl font-bold text-black dark:text-white">
              theProject<span className="text-magenta">.</span>
            </span>
          </Link>
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

      {/* Mobile nav panel */}
      <div
        className={`fixed top-16 bottom-0 right-0 z-40 w-32 bg-white text-black dark:bg-black dark:text-white rounded-l-xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-start h-full pt-8 bg-white/80 backdrop-blur-xs dark:bg-black/80">
          {links.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex w-full items-center gap-2 px-4 py-3 transition-colors hover:text-magenta dark:hover:text-magenta"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
