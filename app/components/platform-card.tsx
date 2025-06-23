"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PlatformCardProps {
  platformName: string
  icon: React.ReactNode
  description: string
  ctaLink: string
  /** Tailwind gradient classes ― e.g. `from-green-400/30` */
  gradientFrom?: string
  gradientTo?: string
  className?: string
}

/**
 * PlatformCard – a Material 3-inspired expressive card
 * with a light-magenta hover / touch glow.
 */
export function PlatformCard({
  platformName,
  icon,
  description,
  ctaLink,
  gradientFrom = "from-primary/20",
  gradientTo = "to-primary/5",
  className,
}: PlatformCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "interactive-glow-card relative rounded-3xl p-6 overflow-hidden",
        "bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 from-slate-50 to-slate-100",
        "border border-slate-200 dark:border-slate-700",
        className,
      )}
    >
      {/* animated border gradient */}
      <motion.div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-3xl opacity-0",
          `bg-gradient-to-r ${gradientFrom} ${gradientTo}`,
        )}
        style={{
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />

      <Link
        href={ctaLink}
        target={ctaLink.startsWith("http") ? "_blank" : undefined}
        rel={ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
        className="relative z-10 flex flex-col h-full"
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>

        <h3 className="mb-2 text-2xl font-bold text-foreground font-geist">{platformName}</h3>

        <p className="mb-6 flex-grow text-sm text-muted-foreground">{description}</p>

        <div className="mt-auto flex items-center text-sm font-medium text-primary group-hover:underline">
          Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.article>
  )
}

/* also export a default for flexibility */
export default PlatformCard
