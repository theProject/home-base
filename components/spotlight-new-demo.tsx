"use client"
import { Spotlight } from "@/components/ui/spotlight-new"
import { BorderButton } from "@/components/ui/border-button"

export default function SpotlightNewDemo() {
  return (
    <div className="h-[100vh] w-full rounded-md flex md:items-center md:justify-center bg-white dark:bg-black/[0.96] antialiased relative overflow-hidden">
      {/* Keep the grid background only in the hero section */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]"></div>

      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <Spotlight />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-black dark:from-neutral-50 to-black/70 dark:to-neutral-400 bg-opacity-50 font-geist tracking-tight">
          beautiful. <span className="text-magenta">intriguing.</span> relentless.
        </h1>
        <p className="mt-8 font-normal text-base md:text-lg text-black/80 dark:text-neutral-300 max-w-3xl text-center mx-auto font-geist">
          Celebrating 13 years of business crafting mobile applications, video games, and currently treading the
          frontier with generative AI. We are the leaders in the Lehigh Valley - just ask.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <BorderButton>Our Work</BorderButton>
          <BorderButton>Get in Touch</BorderButton>
        </div>
      </div>
    </div>
  )
}
