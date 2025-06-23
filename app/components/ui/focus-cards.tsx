"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export interface FocusCardProps {
  image: string
  alt: string
  title: string
  description: string
  summary?: string // Added summary
  href: string
  tags?: string[]
}

export const FocusCard = ({
  image,
  alt,
  title,
  description,
  summary, // Added summary
  href,
  tags,
}: FocusCardProps) => {
  return (
    <motion.div
      className={cn(
        "interactive-glow-card group relative flex flex-col justify-between overflow-hidden rounded-2xl", // Applied interactive-glow-card
        "h-full min-h-[400px] md:min-h-[450px]", // Ensure consistent card height
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Link href={href} className="block h-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={alt}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-black/90" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
          <h3 className="mb-2 text-2xl font-bold font-geist md:text-3xl">{title}</h3>
          <p className="mb-3 text-sm text-neutral-300 md:text-base">{description}</p>
          {summary && ( // Display summary if provided
            <p className="mb-4 text-xs text-neutral-400 md:text-sm italic">{summary}</p>
          )}
          {tags && tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-2 py-1 text-xs text-neutral-200 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="mt-auto flex items-center text-sm font-medium text-primary transition-colors duration-300 group-hover:text-magenta dark:text-primary-dark dark:group-hover:text-magenta">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export const FocusCardsContainer = ({
  cards,
  className,
}: {
  cards: FocusCardProps[]
  className?: string
}) => {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {cards.map((card, index) => (
        <FocusCard key={index} {...card} />
      ))}
    </div>
  )
}
