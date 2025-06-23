"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

interface BentoCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
  ctaText?: string
  ctaLink?: string
  imageSrc?: string // For background image if needed
  span?:
    | "col-span-1"
    | "col-span-2"
    | "row-span-1"
    | "row-span-2"
    | "col-span-1 row-span-1"
    | "col-span-2 row-span-1"
    | "col-span-1 row-span-2"
    | "col-span-2 row-span-2"
}

export function BentoCard({
  title,
  description,
  icon,
  className,
  ctaText,
  ctaLink,
  imageSrc,
  span = "col-span-1 row-span-1",
}: BentoCardProps) {
  const cardContent = (
    <>
      {icon && <div className="mb-4 text-primary">{icon}</div>}
      <h3 className="text-xl md:text-2xl font-bold text-foreground font-geist mb-2">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground mb-4">{description}</p>
      {ctaText && !ctaLink && (
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto">
          {ctaText}
        </Button>
      )}
    </>
  )

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    whileHover: { scale: 1.03 },
  }

  const cardClasses = cn(
    "bento-glow-card flex flex-col justify-between",
    span,
    className,
    imageSrc ? "bg-cover bg-center" : "",
  )

  const cardStyle = imageSrc ? { backgroundImage: `url(${imageSrc})` } : {}

  if (ctaLink) {
    return (
      <motion.div {...motionProps} className={cardClasses} style={cardStyle}>
        <Link href={ctaLink} target={ctaLink.startsWith("http") ? "_blank" : "_self"} className="flex flex-col h-full">
          <div className="flex-grow">{cardContent}</div>
          {ctaText && (
            <div className="mt-auto pt-4">
              <Button variant="outline" size="sm" className="w-full bg-transparent hover:bg-primary/10 group">
                {ctaText}
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:rotate-45" />
              </Button>
            </div>
          )}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div {...motionProps} className={cardClasses} style={cardStyle}>
      {cardContent}
    </motion.div>
  )
}
