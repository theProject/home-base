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
  timestamp?: string // Optional: if you want to display it
}

export function ReviewCard({
  name,
  avatarUrl,
  rating = 5,
  reviewText,
  source = "Facebook",
  sourceIcon,
  className,
  timestamp,
}: ReviewCardProps) {
  const formattedDate = timestamp
    ? new Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <article
      className={cn(
        "interactive-glow-card relative overflow-hidden rounded-2xl p-6 bg-background/70 dark:bg-white/5 backdrop-blur-md border border-border shadow-lg transition-transform duration-300 hover:-translate-y-1 flex flex-col h-full", // Added flex flex-col h-full
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="relative z-10 flex flex-col gap-4 flex-grow">
        {" "}
        {/* Added flex-grow */}
        <header className="flex items-center gap-3">
          <Image
            src={avatarUrl || "/placeholder.svg?width=48&height=48&query=User+Avatar"}
            alt={`${name} avatar`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover border-2 border-primary/30"
          />
          <div>
            <h3 className="text-lg font-semibold leading-none text-foreground">{name}</h3>
            <div className="flex items-center gap-0.5 text-xs text-muted-foreground mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < rating ? "fill-primary/80 text-primary" : "fill-muted/50 text-muted-foreground",
                  )}
                />
              ))}
            </div>
          </div>
        </header>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-5 flex-grow">{reviewText}</p>{" "}
        {/* Added flex-grow */}
        <footer className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            {sourceIcon}
            <span>{source}</span>
          </div>
          {formattedDate && <time dateTime={timestamp}>{formattedDate}</time>}
        </footer>
      </div>
    </article>
  )
}

export default ReviewCard
