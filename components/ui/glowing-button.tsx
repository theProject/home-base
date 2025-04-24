import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface GlowingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  glowColor?: "magenta" | "blue" | "teal"
}

const GlowingButton = forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, variant = "default", size = "default", glowColor = "magenta", children, ...props }, ref) => {
    const glowStyles = {
      magenta: "bg-[conic-gradient(from_90deg_at_50%_50%,#e20074_100%,#e20074_50%,#e20074_100%)]",
      blue: "bg-[conic-gradient(from_90deg_at_50%_50%,#e20074_0%,#e20074_50%,#e20074_100%)]",
      teal: "bg-[conic-gradient(from_90deg_at_50%_50%,#e20074_50%,#e20074_100%,#e20074_100%)]",
    }

    const variantStyles = {
      default: "bg-magenta text-white hover:bg-magenta/90",
      outline: "bg-transparent border border-magenta text-magenta hover:bg-magenta/10",
      ghost: "bg-transparent text-magenta hover:bg-magenta/10",
    }

    const sizeStyles = {
      default: "px-6 py-3 text-base",
      sm: "px-4 py-2 text-sm",
      lg: "px-8 py-4 text-lg",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-md font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-magenta/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black",
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {/* Glow effect behind the button */}
        <span className={cn("absolute inset-0 -z-10", glowStyles[glowColor])} />

        {/* Button background */}
        <span
          className={cn(
            "absolute inset-[1px] -z-5 rounded-[4px]",
            variant === "default" ? "bg-magenta/70" : "bg-white/70 dark:bg-black/70",
          )}
        ></span>

        {/* Button content */}
        <span
          className={cn(
            "relative z-10 flex items-center justify-center",
            variant === "default" ? "text-white" : variant === "outline" ? "text-magenta" : "text-magenta",
          )}
        >
          {children}
        </span>
      </button>
    )
  },
)

GlowingButton.displayName = "GlowingButton"

export { GlowingButton }
