import type React from "react"
// app/studio/layout.tsx
export { metadata, viewport } from "next-sanity/studio"

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    //look at adding nav or a header or osmething some day here
    <>{children}</>
  )
}
