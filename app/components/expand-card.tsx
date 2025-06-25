"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ExpandCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function ExpandCard({
  title,
  description,
  icon,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ExpandCardProps) {
  
  return (
    <motion.article
      layoutId={`card-${title}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "interactive-glow-card relative rounded-3xl p-6 overflow-hidden cursor-pointer",
        "bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 from-slate-50 to-slate-100",
        "border border-slate-200 dark:border-slate-700",
        className
      )}
    >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <h3 className="mb-2 text-2xl font-bold text-foreground font-geist">{title}</h3>
        <p className="mb-6 text-sm text-muted-foreground">{description}</p>
        <div className="mt-auto flex items-center text-sm font-medium text-primary group-hover:underline">
          Explore
        </div>
    </motion.article>
  )
}

export default ExpandCard
