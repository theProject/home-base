"use client"

import { useEffect, useState } from "react"
import { ArrowUpToLine} from "lucide-react"
import { BorderButton } from "@/components/ui/border-button"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <BorderButton
        onClick={scrollToTop}
        className="rounded-lg p-1 bg-teal-300 hover:bg-magenta/90 transition-colors"
        aria-label="Back to top"
      >
        <ArrowUpToLine className="h-8 w-6 text-white" />
      </BorderButton>
    </div>
  )
}
