import type React from "react"

export function AuroraBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div className="aurora-bg" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
