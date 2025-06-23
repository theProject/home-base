"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PlatformCardProps {
  gradientFrom: string
  gradientTo: string
  children: React.ReactNode
}

const PlatformCard = ({ gradientFrom, gradientTo, children }: PlatformCardProps) => {
  return (
    <motion.div
      className={cn("interactive-glow-card relative overflow-hidden p-6 group", gradientFrom, gradientTo)}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

export default PlatformCard
