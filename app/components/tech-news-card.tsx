"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TechNewsCardProps {
  sourceName: string
  logoUrl: string // Expecting path to an SVG or PNG in /public
  feedUrl: string
  description: string
  className?: string
}

export function TechNewsCard({ sourceName, logoUrl, feedUrl, description, className }: TechNewsCardProps) {
  return (
    <Link
      href={feedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "interactive-glow-card group flex flex-col items-center justify-center text-center p-6 rounded-xl h-full",
        "bg-card dark:bg-neutral-800/50 border border-border dark:border-neutral-700/50", // Base styling
        className,
      )}
    >
      <div className="relative w-16 h-16 mb-4">
        <Image
          src={logoUrl || "/placeholder.svg"}
          alt={`${sourceName} logo`}
          fill
          sizes="64px"
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-magenta transition-colors">
        {sourceName}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
      <div className="mt-auto flex items-center text-sm font-medium text-magenta">
        View Feed <ArrowUpRight className="ml-1.5 h-4 w-4" />
      </div>
    </Link>
  )
}
