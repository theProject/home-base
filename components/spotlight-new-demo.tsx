"use client"

import { Spotlight } from "@/components/ui/spotlight-new"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SpotlightNewDemo() {
  return (
    <div
      className="min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center
                 bg-white dark:bg-black/[0.96] antialiased relative overflow-hidden"
    >
      {/* grid background */}
      <div className="absolute inset-0 bg-grid-black/[0.1] dark:bg-grid-white/[0.02]" />

      {/* radial fade */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      <Spotlight />

      {/* hero content */}
      <div className="relative z-10 w-full max-w-7xl px-4 text-center">
        <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-b from-black dark:from-neutral-50 to-black/70 dark:to-neutral-400 tracking-tight font-geist">
          beautiful. <span className="text-magenta">intriguing.</span> relentless.
        </h1>

        <p className="mt-8 text-base md:text-lg text-black/80 dark:text-neutral-300 max-w-3xl mx-auto font-geist">
          Thirteen years in the shadows. Juice turned to eleven. Ready to power your design, development & consulting
          needs—no limits.
          <br />
          <br />
          {/*<span className="text-magenta">Tristan Smith</span> - Founder and <span className="text-teal-300">CEO</span> (how cool is <span className="text-magenta">that</span>?) */}
        </p>

        {/*<div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"> */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link href="/projects">
            <Button>Our Work</Button>
          </Link>
          <Link href="/contact">
            <Button>Get in Touch</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
