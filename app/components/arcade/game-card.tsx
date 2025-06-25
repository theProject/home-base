"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Star, Cpu, Share2, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface GameCardProps {
  id: string
  title: string
  description: string
  language: string
  imageUrl: string
  reviewScore: number
  slug: string
  tags: string[]
  ctaText?: string
  ctaLink?: string
  className?: string
}

export function GameCard({
  title,
  description,
  language,
  imageUrl,
  reviewScore,
  slug,
  tags,
  ctaText = "Play Game",
  ctaLink,
  className,
}: GameCardProps) {
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent link navigation if share is part of the card link
    e.stopPropagation()
    const shareUrl = `${window.location.origin}/arcade/${slug}`
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: `Check out this cool game on theProject. Arcade: ${description}`,
          url: shareUrl,
        })
        .catch(console.error)
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          alert("Link copied to clipboard!") // Replace with a toast notification
        })
        .catch(console.error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className={cn(
        "interactive-glow-card group relative flex flex-col overflow-hidden rounded-2xl p-4 md:p-5 synthwave-card-bg",
        className,
      )}
    >
      <Link
        href={ctaLink ? ctaLink : "#"}
        className="flex flex-col h-full"
        target={ctaLink?.startsWith("http") ? "_blank" : undefined}
        rel={ctaLink?.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={ctaLink ? undefined : (e) => e.preventDefault()}
      >
        <div className="relative w-full h-40 md:h-48 mb-4 rounded-lg overflow-hidden border border-primary/30">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-primary/80 text-white rounded-full h-8 w-8"
              onClick={handleShare}
              aria-label={`Share ${title}`}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-primary-foreground mb-1 font-geist truncate synthwave-text-glow">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2 h-[2.5em]">{description}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Cpu className="h-3 w-3 text-primary" />
            <span>{language}</span>
          </div>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.round(reviewScore) ? "text-yellow-400 fill-yellow-400" : "text-gray-500",
                )}
              />
            ))}
            <span className="ml-1">({reviewScore.toFixed(1)})</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={!ctaLink}
            className="w-full bg-transparent hover:bg-primary/20 border-primary/50 group-hover:border-primary text-primary group-hover:text-primary-foreground group-hover:bg-primary transition-all duration-300"
          >
            {ctaText} <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:rotate-45" />
          </Button>
        </div>
      </Link>
    </motion.div>
  )
}
