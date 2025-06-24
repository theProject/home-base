"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays, UserCircle } from "lucide-react"
import type { Post } from "@/components/BlogCard" // Assuming this type is defined in BlogCard.tsx or a types file

interface FeaturedBlogPostCardProps {
  post: Post
  className?: string
}

export function FeaturedBlogPostCard({ post, className }: FeaturedBlogPostCardProps) {
  const { title, slug, description, heroImage, publishedAt, authors, readTime } = post

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={cn("interactive-glow-card overflow-hidden group", className)}
    >
      <Link href={`/blog/${slug}`} className="block">
        <div className="md:flex">
          {heroImage?.url && (
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src={heroImage.url || "/placeholder.svg"}
                alt={heroImage.alt || title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="p-6 md:p-8 flex flex-col md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-geist mb-3 group-hover:text-primary transition-colors">
              {title}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-4 line-clamp-3 flex-grow">{description}</p>
            <div className="text-xs text-muted-foreground/80 mb-4 space-y-1">
              <div className="flex items-center">
                <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
                <span>{formattedDate}</span>
                {readTime && <span className="mx-1.5">•</span>}
                {readTime && <span>{readTime} min read</span>}
              </div>
              {authors && authors.length > 0 && (
                <div className="flex items-center">
                  <UserCircle className="w-3.5 h-3.5 mr-1.5" />
                  <span>By {authors.map((author) => author.name).join(", ")}</span>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-auto self-start bg-transparent group-hover:bg-primary/10 group-hover:text-primary transition-colors"
            >
              Read More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
