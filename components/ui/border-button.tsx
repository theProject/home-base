'use client'

import {
  forwardRef,
  useState,
  useEffect,
  type ReactNode,
  type ButtonHTMLAttributes,
} from 'react'
import { cn } from '@/lib/utils'

/* helper ───────────────────────────────────── */
function randomDelay(duration = 8) {
  // any value between –duration s and 0 s
  return `${(Math.random() * -duration).toFixed(2)}s`
}

/* types ────────────────────────────────────── */
interface BorderButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  children: ReactNode
}

/* component ─────────────────────────────────── */
const BorderButton = forwardRef<HTMLButtonElement, BorderButtonProps>(
  (
    {
      className,
      variant = 'default', // ← ready for future use
      size = 'default',
      children,
      ...props
    },
    ref,
  ) => {
    /* 1 ▸ animationDelay = 0 s on server, randomised after mount */
    const [delay, setDelay] = useState('0s')

    useEffect(() => {
      setDelay(randomDelay(8))
    }, [])

    /* 2 ▸ padding by size */
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      default: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    } as const

    return (
      <button
        ref={ref}
        className={cn(
          'group relative inline-flex overflow-hidden rounded-md p-[2px]',
          'focus:outline-hidden focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black',
          className,
        )}
        {...props}
      >
        {/* ─── animated gradient border ───────────────────────── */}
        <span
          className="absolute inset-[-200%] -z-10
                     animate-[spin_4s_linear_infinite]
                     bg-[conic-gradient(from_90deg_at_50%_50%,#e20074_0%,#e20074_25%,#01F9C6_50%,#01F9C6_75%,#e20074_100%)]
                     opacity-70 group-hover:opacity-100"
          style={{ animationDelay: delay }}
          suppressHydrationWarning               /* prevents mismatch error */
        />

        {/* ─── subtle fade overlay ───────────────────────────── */}
        <span
          className="absolute inset-0 -z-5 rounded-md
                     pointer-events-none
                     transition-opacity duration-300
                     opacity-0 group-hover:opacity-100"
        />

        {/* ─── button face ───────────────────────────────────── */}
        <span
          className={cn(
            'relative z-10 inline-flex items-center justify-center rounded-[5px] bg-black text-white backdrop-blur-3xl',
            sizeClasses[size],
          )}
        >
          {children}
        </span>
      </button>
    )
  },
)

BorderButton.displayName = 'BorderButton'
export { BorderButton }
