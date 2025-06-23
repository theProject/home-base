"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DownloadCloud } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ScriptShareCardProps {
  title: string
  description: string
  icon: React.ReactNode
  tags: string[]
  ctaLink: string
  className?: string
}

export function ScriptShareCard({ title, description, icon, tags, ctaLink, className }: ScriptShareCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.4 }}
      className={cn("interactive-glow-card flex flex-col h-full group", className)}
    >
      <div className="flex-grow p-6">
        <div className="mb-4 text-primary w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground font-geist mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs group-hover:bg-primary/15 group-hover:text-primary transition-colors duration-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="mt-auto p-6 pt-0">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full bg-transparent group-hover:border-primary group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300"
        >
          <Link href={ctaLink} target="_blank" rel="noopener noreferrer">
            Get Script
            <DownloadCloud className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}
