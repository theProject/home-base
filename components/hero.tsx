"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

/**
 * Enhanced Hero component.
 *
 * This component retains the original layout and visuals (gradient backdrop,
 * copy on the left, device mockups on the right) but introduces gentle
 * animations to breathe life into the first fold of the site.  Each major
 * element fades and slides into view when the user scrolls to the hero, and
 * the device cluster now floats up and down on an infinite loop.  These
 * enhancements were inspired by the subtle but delightful motions used by
 * leading studios such as R/GA and Ustwo.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient / aurora backdrop */}
      <BackgroundAuroa />

      <div className="container mx-auto px-4 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
              <Sparkles className="h-3.5 w-3.5" /> Design • AI • Games
            </span>

            <h1 className="mt-6 font-geist text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground">
              We build <span className="text-[#e20074]">brands</span>, ship {" "}
              <span className="text-cyan-400">software</span>, and craft {" "}
              <span className="underline decoration-[#e20074]/40 decoration-4 underline-offset-8">playable worlds</span>.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              theProject is a studio in Eastern PA delivering production-grade apps,
              games, and AI systems—for startups, agencies, and local orgs that
              care about polish and performance.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/projects">See our work</Link>
              </Button>
            </div>

            {/* Credibility row */}
            <div className="mt-10 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <span>hellertownpolice.org</span>
              <span>Hello, Friend.</span>
              <span>DarkFrost</span>
              <span>TasaiYume</span>
            </div>
          </motion.div>

          {/* Right: device cluster */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ y: [0, -10, 0], opacity: 1, x: 0 }}
            transition={{
              opacity: { duration: 0.6, ease: "easeOut", delay: 0.1 },
              x: { duration: 0.6, ease: "easeOut", delay: 0.1 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            viewport={{ once: true }}
            className="relative h-[420px] sm:h-[480px] md:h-[520px] lg:h-[560px]"
          >
            <LaptopMockup className="absolute -right-4 bottom-0 scale-[.98] sm:scale-100" />
            <PhoneMockup className="absolute -right-6 sm:-right-10 top-10 rotate-6" />
            <TabletMockup className="absolute right-24 bottom-2 -rotate-6 hidden md:block" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function BackgroundAuroa() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      {/* Base */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(226,0,116,0.20),transparent_60%),radial-gradient(900px_600px_at_100%_120%,rgba(34,211,238,0.18),transparent_60%)]" />
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),transparent_30%,transparent_70%,rgba(0,0,0,0.45))]" />
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(65%_65%_at_50%_35%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to_right,rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.2)_1px,transparent_1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  )
}

/* ---------- Device Mockups (CSS-only frames) ---------- */
function LaptopMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[520px] max-w-full drop-shadow-2xl ${className}`}>
      <div className="mx-auto w-full rounded-[18px] border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-2 shadow-xl">
        {/* top bar */}
        <div className="mx-auto h-4 w-40 rounded-b-xl bg-black/50" />
        {/* screen */}
        <div className="relative rounded-[14px] border border-white/10 bg-zinc-950 overflow-hidden">
          <ScreenHero variant="app" />
        </div>
        {/* keyboard deck */}
        <div className="mx-auto mt-2 h-2 w-[92%] rounded-b-2xl bg-gradient-to-b from-zinc-700/50 to-zinc-900/70 shadow-inner" />
      </div>
    </div>
  )
}

function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[190px] sm:w-[210px] drop-shadow-2xl ${className}`}>
      <div className="rounded-[36px] border border-white/15 bg-gradient-to-b from-zinc-900 to-black p-2">
        {/* dynamic island */}
        <div className="mx-auto mb-2 h-5 w-28 rounded-full bg-black/60" />
        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950">
          <ScreenHero variant="game" />
        </div>
      </div>
    </div>
  )
}

function TabletMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[280px] drop-shadow-2xl ${className}`}>
      <div className="rounded-[28px] border border-white/15 bg-gradient-to-b from-zinc-900 to-black p-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-950">
          <ScreenHero variant="docs" />
        </div>
      </div>
    </div>
  )
}

/**
 * Fake screen content to avoid external image assets while keeping the look.
 * Swap this for real screenshots by replacing the inner JSX with an <Image />.
 */
function ScreenHero({ variant }: { variant: "app" | "game" | "docs" }) {
  const gradient = {
    app: "from-[#0ea5e9]/30 via-transparent to-[#e20074]/25",
    game: "from-[#e20074]/40 via-transparent to-[#0ea5e9]/30",
    docs: "from-[#0ea5e9]/25 via-transparent to-[#e20074]/25",
  }[variant]

  return (
    <div className="relative h-full w-full">
      {/* background wash */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_70%_20%,rgba(255,255,255,0.08),transparent)]" />

      {/* headline bar mimic */}
      <div className="absolute left-0 right-0 top-0 flex items-center gap-2 border-b border-white/5 bg-black/30 px-3 py-2 text-xs text-white/70">
        <div className="h-2 w-2 rounded-full bg-red-500/70" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/70" />
        <div className="h-2 w-2 rounded-full bg-green-500/70" />
        <span className="ml-2">Hero studio</span>
      </div>

      {/* content blocks */}
      <div className="absolute inset-x-0 bottom-0 top-9 space-y-3 overflow-hidden px-4 pb-4">
        <div className="mt-4 h-8 w-4/5 rounded bg-white/10" />
        <div className="h-4 w-2/3 rounded bg-white/10" />
        <div className="h-4 w-3/5 rounded bg-white/10" />
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="h-24 rounded-lg bg-white/10" />
          <div className="h-24 rounded-lg bg-white/10" />
          <div className="h-24 rounded-lg bg-white/10" />
        </div>
        <div className="mt-auto flex gap-2">
          <div className="h-9 w-28 rounded-md bg-white/15" />
          <div className="h-9 w-28 rounded-md border border-white/15" />
        </div>
      </div>

      {/* subtle inner glow */}
      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
    </div>
  )
}