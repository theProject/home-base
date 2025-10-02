"use client";

import React, { type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * LiquidGlass (Parallax): brand-aligned hero with gooey blobs, glass card, and subtle scroll parallax.
 * - Tailwind for styling; only dependency is framer-motion
 * - Respects prefers-reduced-motion
 * - Safe to drop into Next.js App Router
 */
export default function LiquidGlass({
  title = "Tech Insights & Innovations",
  subtitle = "Deep dives into engineering, AI, offensive security, and game design — from the studio building it.",
  badgeText = (
    <>
      Project <span className="text-magenta">Relentless</span> — Blog
    </>
  ),
  className = "",
  height = "py-20 md:py-28",
}: {
  title?: string
  subtitle?: string
  badgeText?: ReactNode
  className?: string
  height?: string
}) {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 400], [0, -30]); // magenta
  const y2 = useTransform(scrollY, [0, 400], [0, 24]);  // teal
  const y3 = useTransform(scrollY, [0, 400], [0, -18]); // soft white

  const style1 = prefersReduced ? { y: 0 } : { y: y1 };
  const style2 = prefersReduced ? { y: 0 } : { y: y2 };
  const style3 = prefersReduced ? { y: 0 } : { y: y3 };

  return (
    <section className={`relative overflow-hidden border-b border-border dark:border-neutral-800 ${className}`}>
      {/* Goo filter */}
      <svg className="absolute inset-0 h-0 w-0" aria-hidden>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -15" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Background wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-neutral-50 dark:from-neutral-950 dark:to-neutral-900" />

      {/* Blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full blur-2xl"
        style={{ ...style1, filter: "url(#goo)" }}
      >
        <div
          className={`h-full w-full rounded-full bg-[radial-gradient(closest-side,_rgba(226,0,116,0.45),_transparent_70%)] ${prefersReduced ? "" : "animate-pulse"}`}
          style={{ animationDuration: "6s" }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full blur-2xl"
        style={{ ...style2, filter: "url(#goo)" }}
      >
        <div
          className={`h-full w-full rounded-full bg-[radial-gradient(closest-side,_rgba(5,242,175,0.45),_transparent_70%)] ${prefersReduced ? "" : "animate-pulse"}`}
          style={{ animationDuration: "7.5s" }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-12 left-1/3 h-64 w-64 rounded-full blur-2xl"
        style={{ ...style3, filter: "url(#goo)" }}
      >
        <div
          className={`h-full w-full rounded-full bg-[radial-gradient(closest-side,_rgba(255,255,255,0.12),_transparent_70%)] ${prefersReduced ? "" : "animate-pulse"}`}
          style={{ animationDuration: "8s" }}
        />
      </motion.div>

      {/* Glass card */}
      <div className={`relative container mx-auto px-4 ${height}`}>
        <motion.div
          className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl dark:bg-white/5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="px-6 py-10 md:px-10">
            {badgeText ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs uppercase tracking-wider text-white/80">
                {badgeText}
              </div>
            ) : null}
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">{title}</h1>
            {subtitle ? (
              <p className="mt-3 text-lg md:text-xl text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
