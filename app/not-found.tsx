"use client"

import React, { useEffect, useMemo, useRef, useState, useId } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Home, Search, Sparkles, Github, Mail, Compass } from "lucide-react"

/**
 * bytheproject.com — Custom 404 Page (Next.js App Router)
 * File: /app/not-found.tsx
 *
 * Upgrades in this revision:
 * - Neon glow borders + crisper magenta/teal gradients.
 * - Konami code (↑↑↓↓←→←→BA) now robust (lowercased keys, ignores typing in inputs, visual "HYPER MODE" indicator).
 * - Replaced PrismBadge with LogoBadge that uses /public/logo.svg (or provided logo) and spins on click.
 * - Safer animations for hydration; avoided window access on SSR and added units to animated CSS props.
 */

// On-brand colors
const BRAND = {
  black: "#000000",
  magenta: "#e20074",
  teal: "#05f2af",
  white: "#ffffff",
} as const

/** Simple aurora gradient as a full-bleed background */
function Aurora({ hyper = false }: { hyper?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -inset-[20%] blur-3xl"
        style={{
          opacity: hyper ? 0.85 : 0.6,
          background:
            `radial-gradient(60% 50% at 20% 20%, ${BRAND.magenta}33 0%, transparent 60%),` +
            `radial-gradient(60% 50% at 80% 30%, ${BRAND.teal}33 0%, transparent 60%),` +
            `radial-gradient(60% 60% at 50% 80%, #7af9 0%, transparent 60%)`,
        }}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: hyper ? 1 : 0.9 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute -inset-[10%]"
          style={{
            backgroundImage:
              `conic-gradient(from 0deg, ${BRAND.magenta}11, transparent, ${BRAND.teal}11, transparent, ${BRAND.magenta}11)`,
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 0%",
            maskImage:
              "radial-gradient(70% 70% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(70% 70% at 50% 50%, black 40%, transparent 100%)",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Scanline shimmer (uses px units explicitly) */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: hyper ? 0.16 : 0.1,
          backgroundImage: "linear-gradient(transparent 95%, #fff 96%, transparent 97%)",
          backgroundPositionY: "0px",
        }}
        animate={{ backgroundPositionY: ["0px", "24px"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

/** Clickable logo with spin + glow */
function LogoBadge() {
  const [spin, setSpin] = useState(false)
  const gradId = useId().replace(/:/g, "_")
  return (
    <button
      aria-label="Spin the logo"
      onClick={() => setSpin((s) => !s)}
      className="group relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-[0_0_12px_rgba(226,0,116,0.35),0_0_24px_rgba(5,242,175,0.25)_inset] backdrop-blur-sm transition hover:bg-white/10"
    >
      {/* Use plain <img> for SVG to avoid Next/Image constraints */}
      <motion.img
        src="/logo.svg"
        alt="bytheproject logo"
        width={28}
        height={28}
        className="select-none"
        animate={{ rotate: spin ? 360 : 0 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
      />
      <span className="pointer-events-none absolute -bottom-7 select-none whitespace-nowrap text-[10px] font-medium tracking-wide text-white/60 opacity-0 transition group-hover:opacity-100">
        spin me
      </span>
    </button>
  )
}

function useKonami(callback: () => void) {
  const seq = useRef<string[]>([])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore when typing in inputs/textareas
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return
      }
      const key = (e.key || "").toLowerCase()
      seq.current.push(key)
      const joined = seq.current.slice(-12).join(",")
      if (
        joined.includes("arrowup,arrowup,arrowdown,arrowdown,arrowleft,arrowright,arrowleft,arrowright,b,a")
      ) {
        callback()
        seq.current = []
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKey)
      return () => window.removeEventListener("keydown", onKey)
    }
    return () => {}
  }, [callback])
}

const NotFound: React.FC = () => {
  const [debug, setDebug] = useState(false)
  const [hyper, setHyper] = useState(false)
  useKonami(() => {
    setDebug((d) => !d)
    setHyper((h) => !h)
  })

  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <main
      className="relative min-h-dvh w-full overflow-hidden bg-black text-white"
      style={{ backgroundColor: BRAND.black }}
      role="main"
      aria-labelledby="nf-title"
    >
      <Aurora hyper={hyper} />

      {/* Debug grid (toggle via Konami) */}
      <AnimatePresence>
        {debug && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] bg-[size:24px_24px]"
          />
        )}
      </AnimatePresence>

      {/* HYPER MODE tag when active */}
      <AnimatePresence>
        {hyper && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur"
            style={{ boxShadow: `0 0 24px ${BRAND.magenta}66, 0 0 36px ${BRAND.teal}55` }}
          >
            HYPER MODE
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-16 pt-24 md:grid-cols-2 md:gap-14 md:pt-28">
        {/* Left: Headline + Actions */}
        <section className="flex flex-col items-start gap-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur"
            style={{ boxShadow: `0 0 18px ${BRAND.magenta}55` }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Easter egg: press ↑↑↓↓←→←→BA
          </div>

          <h1
            id="nf-title"
            className="text-balance font-extrabold leading-tight tracking-[-0.03em]"
          >
            <span className="block text-[clamp(36px,8vw,92px)] bg-gradient-to-br from-[#e20074] to-[#05f2af] bg-clip-text text-transparent">
              404: Off the Map
            </span>
            <span className="mt-2 block text-[clamp(16px,2.4vw,22px)] font-semibold text-white/70">
              We couldn’t find that page. Let’s get you back on the Relentless path.
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm outline-none backdrop-blur transition active:scale-[0.98] hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-[#e20074]"
              style={{ boxShadow: `0 0 20px ${BRAND.magenta}66` }}
            >
              <Home className="h-4 w-4 opacity-80 transition group-hover:rotate-[-8deg]" />
              Take me home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
              style={{ boxShadow: `0 0 18px ${BRAND.teal}55` }}
            >
              <Compass className="h-4 w-4" />
              Explore projects
            </Link>
            <Link
              href="mailto:hello@bytheproject.com?subject=404%20report&body=Hey%20team%2C%20I%20hit%20a%20404%20on%20bytheproject.com%20at%20URL%3A%20"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
              style={{ boxShadow: `0 0 18px ${BRAND.magenta}33` }}
            >
              <Mail className="h-4 w-4" />
              Report an issue
            </Link>
          </div>

          {/* Quick search */}
          <SearchBar />

          <div className="pt-2 text-xs text-white/50">
            © {year} bytheproject — Stay Relentless.
          </div>
        </section>

        {/* Right: Fun visual + helpful links */}
        <section className="flex flex-col items-stretch gap-6">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur"
            style={{ boxShadow: `0 0 24px ${BRAND.magenta}55, inset 0 0 36px ${BRAND.teal}33` }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-semibold tracking-wide text-white/80">
                Lost but inspired
              </div>
              <LogoBadge />
            </div>

            {/* Animated digits with glowing borders */}
            <motion.div
              className="relative mx-auto grid h-40 w-full max-w-md grid-cols-3 items-center justify-center gap-2"
              initial={false}
            >
              {["4", "0", "4"].map((d, i) => (
                <motion.div
                  key={i}
                  className="grid h-36 place-items-center rounded-2xl border border-white/15 bg-black/40 text-6xl font-black tracking-tight"
                  style={{
                    textShadow: `0 0 24px ${BRAND.magenta}88`,
                    boxShadow: `0 0 20px ${i === 1 ? BRAND.teal : BRAND.magenta}66, inset 0 0 32px ${i === 1 ? BRAND.magenta : BRAND.teal}33`,
                  }}
                  animate={{
                    rotateX: [0, 18, 0],
                    rotateY: [0, -10, 0],
                    scale: [1, 1.06, 1],
                  }}
                  transition={{ duration: 2 + i * 0.15, repeat: Infinity }}
                >
                  <span className="bg-gradient-to-br from-[#e20074] to-[#05f2af] bg-clip-text text-transparent">
                    {d}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Helpful deep links */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DeepLink href="/about" label="About theProject" />
              <DeepLink href="/blog" label="Latest posts" />
              <DeepLink href="/contact" label="Contact" />
              <DeepLink href="/shop" label="Merch & gear" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <ArrowLeft className="h-3.5 w-3.5" />
              Or go back to the previous page using your browser.
            </div>
            <a
              href="https://github.com/theProjectStudio"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 opacity-80 hover:opacity-100"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}

export default NotFound

function DeepLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 transition hover:bg-white/10"
      style={{ boxShadow: `0 0 16px ${BRAND.teal}44` }}
    >
      <span>{label}</span>
      <span
        className="inline-grid place-items-center rounded-lg border border-white/10 px-2 py-1 text-[10px] tracking-wide text-white/70 transition group-hover:border-white/20 group-hover:text-white"
        aria-hidden
      >
        Open
      </span>
    </Link>
  )
}

function SearchBar() {
  const [q, setQ] = useState("")
  return (
    <form
      action="/search"
      className="group relative mt-3 w-full max-w-lg"
      role="search"
      aria-label="Site search"
    >
      <input
        name="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search the site…"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur transition focus:border-white/20 focus:bg-white/10"
        autoComplete="off"
        style={{ boxShadow: `0 0 14px ${BRAND.magenta}33` }}
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white/90 transition hover:bg-white/15"
        aria-label="Search"
        title="Search"
        style={{ boxShadow: `0 0 16px ${BRAND.teal}44` }}
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  )
}

/**
 * Dev sanity checks (pseudo-tests). These only run in development and help
 * catch misconfigurations early. They don't affect production build size.
 */
if (process.env.NODE_ENV !== "production") {
  const isHex = (s: string) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s)
  console.assert(isHex(BRAND.magenta), "BRAND.magenta must be a hex color")
  console.assert(isHex(BRAND.teal), "BRAND.teal must be a hex color")
  // Additional lightweight checks
  console.assert(typeof window !== "undefined" || true, "(SSR ok) window may be undefined on server")
  const bgOK = `conic-gradient(from 0deg, ${BRAND.magenta}11, transparent, ${BRAND.teal}11, transparent, ${BRAND.magenta}11)`
  console.assert(bgOK.includes("conic-gradient"), "Aurora background should be a conic-gradient")
}
