"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const borderButtonVariants = cva(
  "relative inline-flex items-center justify-center font-geist font-medium transition-colors duration-300",
  {
    variants: {
      size: {
        sm: "px-3 py-1.5 text-sm rounded-md",
        md: "px-4 py-2 text-base rounded-lg",
        lg: "px-6 py-3 text-lg rounded-xl",
      },
      variant: {
        default:
          "border border-magenta text-magenta hover:bg-magenta hover:text-white dark:hover:bg-magenta/90",
        ghost:
          "border border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

export interface BorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof borderButtonVariants> {}

const BorderButton = React.forwardRef<HTMLButtonElement, BorderButtonProps>(
  ({ className, size, variant, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(borderButtonVariants({ size, variant }), className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

BorderButton.displayName = "BorderButton"

export default BorderButton;
