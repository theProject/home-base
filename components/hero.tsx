"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

/**
 * Hero with video background.
 * - Subtle brand tint + vignette for contrast
 * - Bottom blur/darken strip to hide any artifacts/words in the video
 * - Poster for instant paint
 * - Respects reduced motion
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden isolate">
      <BackgroundVideo
        mp4="/media/Abstract_Hacker_Loop_Video_Generation.mp4"
        poster="/media/hero-video-poster-blur.jpg"
      />

      <div className="container mx-auto px-4 pt-24 pb-16 sm:pt-32 sm:pb-24 relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur supports-[backdrop-filter]:bg-black/20">
              <Sparkles className="h-3.5 w-3.5" /> Design • AI • Games
            </span>

            <h1 className="mt-6 font-geist text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
              We build <span className="text-[#e20074]">brands</span>, ship{" "}
              <span className="text-[#05f2af]">software</span>, and craft{" "}
              <span className="underline decoration-[#e20074]/40 decoration-4 underline-offset-8">
                playable worlds
              </span>
              .
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/80">
              theProject is a studio in Eastern PA delivering production-grade
              apps, games, and AI systems—for startups, agencies, and local orgs
              that care about polish and performance.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/projects">See our work</Link>
              </Button>
            </div>

            {/* Credibility row */}
            <div className="mt-10 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-8 gap-y-4 text-sm text-white/70">
              <span>hellertownpolice.org</span>
              <span>Hello, Friend.</span>
              <span>DarkFrost</span>
              <span>TasaiYume</span>
            </div>
          </motion.div>

          {/* Right: optional low-contrast silhouette (replace devices) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="relative hidden lg:block h-[520px]"
          >
            <DeviceSilhouette className="absolute right-2 top-4 opacity-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Background video with brand tint, vignette, and bottom blur/darken strip */
function BackgroundVideo({
  mp4,
  poster,
  webm,
}: {
  mp4: string;
  poster: string;
  webm?: string;
}) {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      {/* LQIP gradient (shows immediately even before poster) */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(226,0,116,0.18),transparent_60%),radial-gradient(900px_600px_at_100%_120%,rgba(5,242,175,0.16),transparent_60%)]" />

      {/* video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        {webm && <source src={webm} type="video/webm" />}
        <source src={mp4} type="video/mp4" />
      </video>

      {/* global contrast protection */}
      <div className="absolute inset-0 bg-black/55" />

      {/* brand tint wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 20% 30%, rgba(226,0,116,0.25) 0%, transparent 60%), radial-gradient(90% 70% at 80% 70%, rgba(5,242,175,0.20) 0%, transparent 60%)",
        }}
      />

      {/* soft vignette */}
      <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_45%,black_60%,transparent_100%)] bg-black/20" />

      {/* bottom blur + darken strip to hide any text/artifacts */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%]">
        {/* backdrop blur (blurs the video behind) */}
        <div className="h-full backdrop-blur-md supports-[backdrop-filter]:bg-black/10" />
        {/* feathered dark gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/35" />
      </div>

      {/* reduced motion: hide video but retain color wash */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          video {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

/** Minimal “device silhouette” as a design hint on the right */
function DeviceSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="520"
      height="520"
      viewBox="0 0 520 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* laptop slab 
      <rect x="40" y="280" width="360" height="220" rx="20" fill="url(#g1)" />
      <rect x="60" y="300" width="320" height="180" rx="16" fill="black" opacity=".3" />
      {/* phone slab *
      <rect x="360" y="60" width="120" height="260" rx="28" fill="url(#g2)" />
      <rect x="372" y="92" width="96" height="196" rx="22" fill="black" opacity=".3" />
      {/* gradients */}
      <defs>
        <linearGradient id="g1" x1="40" y1="280" x2="400" y2="500" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e20074" stopOpacity="0.7" />
          <stop offset="1" stopColor="#05f2af" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="g2" x1="360" y1="60" x2="480" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#05f2af" stopOpacity="0.7" />
          <stop offset="1" stopColor="#e20074" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}
