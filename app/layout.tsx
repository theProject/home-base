import type React from "react"
import "../app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"

export const metadata = {
  title: "theProject.",
  description:
    "Celebrating 13 years of business crafting mobile applications, video games, and generative AI.",
    generator: 'v0.dev'
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-GZVVZXVK5X"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600;700&family=Geist+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        {/* Vercel telemetry */}
        <Analytics />
        <SpeedInsights />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
