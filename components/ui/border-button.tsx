"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface BorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  children: React.ReactNode
}

const BorderButton = forwardRef<HTMLButtonElement, BorderButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    // Padding based on size
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      default: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex overflow-hidden rounded-md p-[2px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black",
          className,
        )}
        {...props}
      >
        {/* Animated border - rainbow gradient */}
        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0ea5e9_0%,#8b5cf6_25%,#ec4899_50%,#f59e0b_75%,#0ea5e9_100%)] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Button content */}
        <span
          className={cn(
            "relative z-10 inline-flex h-full w-full items-center justify-center rounded-[5px] bg-black text-white backdrop-blur-3xl",
            sizeClasses[size],
          )}
        >
          {children}
        </span>
      </button>
    )
  },
)

BorderButton.displayName = "BorderButton"

export { BorderButton }
