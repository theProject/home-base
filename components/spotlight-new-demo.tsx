"use client"
import { Spotlight } from "@/components/ui/spotlight-new"

export default function SpotlightNewDemo() {
  return (
    <div className="h-[100vh] w-full rounded-md flex md:items-center md:justify-center bg-white dark:bg-black/[0.96] antialiased bg-grid-black/[0.02] dark:bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-black dark:from-neutral-50 to-black/70 dark:to-neutral-400 bg-opacity-50 font-geist tracking-tight">
          beautiful. <span className="text-magenta">intriguing.</span> relentless.
        </h1>
        <p className="mt-8 font-normal text-base md:text-lg text-black/80 dark:text-neutral-300 max-w-3xl text-center mx-auto font-geist">
          Celebrating 13 years of business, crafting mobile applications, video games, and currently treading the
          frontier with generative AI. We are the leaders in the Lehigh Valley - just ask. AI is our specialty.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button className="px-6 py-3 rounded-md bg-magenta text-white font-medium font-geist hover:bg-opacity-90 transition-all">
            Our Work
          </button>
          <button className="px-6 py-3 rounded-md border border-black/20 dark:border-white/20 text-black dark:text-white font-medium font-geist hover:bg-black/5 dark:hover:bg-white/10 transition-all">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  )
}
