"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface PlatformCardProps {
  platformName: string
  icon: React.ReactNode
  description: string
  ctaLink: string
  className?: string
  gradientFrom?: string
  gradientTo?: string
}

export function PlatformCard({
  platformName,
  icon,
  description,
  ctaLink,
  className,
  gradientFrom = "from-primary/20",
  gradientTo = "to-secondary/20",
}: PlatformCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.3 }} // Staggered appearance
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 30px -5px rgba(var(--primary-rgb), 0.3)", // Use primary color for glow
      }}
      className={cn(
        "relative group rounded-3xl p-6 overflow-hidden transition-all duration-300 ease-in-out",
        "bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 from-slate-50 to-slate-100", // Base background
        "border border-slate-200 dark:border-slate-700",
        className,
      )}
    >
      {/* Subtle animated gradient border effect */}
      <motion.div
        className={cn(
          "absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          `bg-gradient-to-r ${gradientFrom} ${gradientTo}`,
        )}
        style={{
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <Link href={ctaLink} target="_blank" rel="noopener noreferrer" className="relative z-10 flex flex-col h-full">
        <div className="mb-6 text-primary w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-foreground font-geist mb-2">{platformName}</h3>
        <p className="text-muted-foreground text-sm mb-6 flex-grow">{description}</p>
        <div className="mt-auto flex items-center text-sm font-medium text-primary group-hover:underline">
          Explore
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  )
}
