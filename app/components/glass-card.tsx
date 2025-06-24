import { cn } from "@/lib/utils"
import type React from "react"

type GlassCardProps = {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn("glass-card rounded-2xl p-6 md:p-8 transition-all duration-300 ease-in-out", className)}>
      {children}
    </div>
  )
}
