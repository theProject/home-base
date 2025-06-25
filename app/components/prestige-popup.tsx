"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export interface PrestigePopupProps {
  platform: "Apple" | "PlayStation" | "Nintendo" | "Steam" | "WebDev"
  children: React.ReactNode
}

const platformLogos: Record<PrestigePopupProps["platform"], string> = {
  Apple: "/AppleDev.png",
  PlayStation: "/PlayStation.PNG",
  Nintendo: "/Nintendo.jpeg",
  Steam: "/Steam.JPG",
  WebDev: "/ReactDev.PNG",
}

export function PrestigePopup({ platform, children }: PrestigePopupProps) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const handleClick = (e: MouseEvent) =>
      contentRef.current && !contentRef.current.contains(e.target as Node) && setOpen(false)

    document.addEventListener("keydown", handleKey)
    document.addEventListener("mousedown", handleClick)
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.removeEventListener("mousedown", handleClick)
    }
  }, [open])

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(true)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/70"
          >
            <div
              ref={contentRef}
              className="rounded-xl bg-background p-6 text-center text-foreground shadow-xl"
            >
              <Image
                src={platformLogos[platform]}
                alt={`${platform} logo`}
                width={64}
                height={64}
                className="mx-auto mb-4"
              />
              <p className="text-sm">
                Coming soon to this platform. We're developing the site still and look forward to sharing it with you.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PrestigePopup