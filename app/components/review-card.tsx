"use client"

import type React from "react"

import { Star } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ReviewCardProps {
  name: string
  avatarUrl: string
  rating?: number
  reviewText: string
  source?: string
  sourceIcon?: React.ReactNode
  className?: string
}

/**
 * A highly–decorative card for displaying user reviews.
 * It leverages the global `interactive-glow-card` class for the
 * light-magenta hover / focus effect used across the site.
 */
export function ReviewCard({
  name,
  avatarUrl,
  rating = 5,
  reviewText,
  source = "Facebook",
  sourceIcon,
  className,
}: ReviewCardProps) {
  return (
    <article
      className={cn(
        "interactive-glow-card relative overflow-hidden rounded-2xl p-6 bg-background/70 dark:bg-white/5 backdrop-blur-md border border-border shadow-lg transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
    >
      {/* Glow overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Header: Avatar & author */}
        <header className="flex items-center gap-3">
          <Image
            src={avatarUrl || "/placeholder.svg"}
            alt={`${name} avatar`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold leading-none text-foreground">{name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {Array.from({ length: rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary/80 text-primary" />
              ))}
            </div>
          </div>
        </header>

        {/* Review text */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-5">{reviewText}</p>

        {/* Footer: source */}
        <footer className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
          {sourceIcon}
          <span>{source}</span>
        </footer>
      </div>
    </article>
  )
}

export default ReviewCard
