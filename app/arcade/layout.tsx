import type React from "react"
import type { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "The Arcade | theProject.",
  description:
    "Explore mini-games, 3D modeling from prompts, and other cool interactive experiments by theProject. Dive into a retro-futuristic world of interactive fun!",
  openGraph: {
    title: "The Arcade | theProject.",
    description: "Dive into a retro-futuristic world of interactive fun and cutting-edge AI experiments!",
    url: "https://bytheproject.com/arcade", // Replace with your actual domain later
    siteName: "theProject.",
    images: [
      {
        url: "/og-arcade.png",
        width: 1200,
        height: 630,
        alt: "theProject. Arcade - Interactive Fun & AI Experiments",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Arcade | theProject.",
    description: "Explore mini-games, AI-powered 3D modeling, and interactive experiments.",
    images: ["/og-arcade.png"],
  },
}

export default function ArcadeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Suspense>{children}</Suspense>
    </>
  )
}
