import type { Metadata } from "next"
import Link from "next/link"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { BorderButton } from "../../components/ui/border-button"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Code,
  Rocket,
  Shield,
  Wrench,
  Server,
  Globe,
  Gauge,
  Database,
  Check,
  MapPin,
  HeartHandshake,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Full-Stack Web Development | theProject. — Hellertown & Lehigh Valley",
  description:
    "Local to Hellertown, PA — serving the Lehigh Valley & beyond. We build fast, SEO-ready websites and apps with Next.js, React, and a scalable cloud stack.",
}

type Feature = { icon: LucideIcon; title: string; blurb: string }

const features: Feature[] = [
  { icon: Gauge,   title: "Performance-First",   blurb: "Lighthouse A scores, edge caching, image/CDN optimization." },
  { icon: Globe,   title: "SEO & Accessibility", blurb: "Semantic HTML, sitemaps, OpenGraph, WCAG-friendly." },
  { icon: Server,  title: "SSR/ISR Ready",       blurb: "Next.js App Router with streaming, ISR, and server actions." },
  { icon: Database,title: "Scalable Data",       blurb: "Postgres/Neon, Prisma, Payload CMS, or your headless of choice." },
  { icon: Shield,  title: "Security",            blurb: "Auth, rate limits, input validation, OWASP best practices." },
  { icon: Wrench,  title: "DevOps",              blurb: "CI/CD, preview envs, observability, rollbacks, alerts." },
]

const stack = [
  "Next.js", "React 19", "TypeScript", "Tailwind v4",
  "Payload CMS", "Postgres/Neon", "Vercel", "Edge / Serverless",
]

type Plan = {
  name: string
  price: string
  tagline: string
  highlights: string[]
  cta: string
  featured?: boolean
  badge?: string
}

const plans: Plan[] = [
  {
    name: "Starter (Local Small Biz)",
    price: "from $1.8k–$3.5k",
    tagline: "Perfect for Hellertown & Lehigh Valley mom-and-pop shops.",
    highlights: [
      "Up to 3 pages (Home, Services, Contact)",
      "Mobile-first, fast & SEO-ready",
      "Basic CMS (edit text & images)",
      "Google Analytics & contact form",
      "Launch + quick training",
    ],
    cta: "/contact",
    badge: "Budget friendly",
  },
  {
    name: "Growth",
    price: "from $10k–$25k",
    tagline: "Dynamic content, integrations, auth.",
    highlights: [
      "Custom components & layouts",
      "Auth + protected routes",
      "API integrations (1–2)",
      "Performance budget",
      "1 month post-launch support",
    ],
    cta: "/contact",
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Scale",
    price: "from $30k+",
    tagline: "Complex apps, dashboards, multi-region.",
    highlights: [
      "Design system + theming",
      "Complex data models",
      "CI/CD + observability",
      "Compliance guidance",
      "SLA & ongoing partnership",
    ],
    cta: "/contact",
  },
]

function Glow({ children }: { children: ReactNode }) {
  return (
    <div className="relative inline-flex">
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-[2px] -z-10 rounded-md opacity-60 blur-[6px]
        [background:conic-gradient(from_90deg_at_50%_50%,#e20074_0%,#e20074_25%,#01F9C6_50%,#01F9C6_75%,#e20074_100%)]
        animate-[spin_6s_linear_infinite]"
      />
      {children}
    </div>
  )
}

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero */}
        <section className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-12">
            <div className="pointer-events-none absolute inset-0 opacity-20
              [background:radial-gradient(600px_300px_at_10%_-10%,#e20074_6%,transparent_60%),radial-gradient(600px_300px_at_110%_10%,#01F9C6_6%,transparent_60%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs text-black/70 dark:text-white/70">
                <Rocket className="h-3.5 w-3.5" />
                Full-Stack Web Development
              </span>
              <h1 className="mt-4 font-geist text-4xl md:text-5xl font-bold text-black dark:text-white">
                Lightning-fast websites &amp; web apps that scale
              </h1>
              <p className="mt-4 max-w-2xl text-black/75 dark:text-white/75">
                Local to <strong>Hellertown, PA</strong> — proudly serving the <strong>Lehigh Valley</strong> and beyond.
                We ship modern, SEO-ready experiences with Next.js, React, and a rock-solid cloud stack—designed,
                built, and deployed end-to-end.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Glow>
                  <Link href="/contact" aria-label="Start a web project">
                    <BorderButton size="lg">Get a Quote</BorderButton>
                  </Link>
                </Glow>
                <Link
                  href="/projects"
                  className="font-geist text-sm text-black/80 hover:text-magenta dark:text-white/80 dark:hover:text-magenta transition-colors"
                >
                  See projects →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Local spotlight */}
        <section className="max-w-7xl mx-auto mt-8">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-magenta" />
              <h2 className="font-geist text-lg font-semibold text-black dark:text-white">
                Hellertown &amp; Lehigh Valley Friendly
              </h2>
            </div>
            <p className="text-sm text-black/70 dark:text-white/70 md:ml-2">
              We love partnering with local restaurants, shops, gyms, makers, contractors, and clinics.
              In-person meetups welcome—let’s keep business in the Valley.
            </p>
          </div>
        </section>

        {/* Quick stats */}
        <section className="max-w-7xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ["90+ Lighthouse", "Performance targets"],
            ["<200ms", "TTFB on edge"],
            ["A11y", "WCAG-friendly"],
            ["SEO", "Best practices"],
          ].map(([k, v], i) => (
            <div key={i} className="rounded-lg border border-black/10 dark:border-white/10 p-4 text-center">
              <div className="font-geist text-xl font-bold text-black dark:text-white">{k}</div>
              <div className="text-xs text-black/60 dark:text-white/60">{v}</div>
            </div>
          ))}
        </section>

        {/* Feature grid */}
        <section className="max-w-7xl mx-auto mt-14">
          <h2 className="font-geist text-2xl md:text-3xl font-bold text-black dark:text-white">
            Built for speed, search, and scale
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={i}
                  className="group rounded-xl border border-black/10 dark:border-white/10 p-5 hover:border-magenta/40 dark:hover:border-magenta/40 transition-colors"
                >
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 text-black dark:bg-white/10 dark:text-white group-hover:text-magenta">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-geist text-lg font-semibold text-black dark:text-white">{f.title}</h3>
                  <p className="mt-1 text-sm text-black/70 dark:text-white/70">{f.blurb}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Tech stack */}
        <section className="max-w-7xl mx-auto mt-14">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-6">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-magenta" />
              <h3 className="font-geist text-lg font-semibold text-black dark:text-white">Preferred stack</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((s, i) => (
                <span
                  key={i}
                  className="rounded-md border border-black/10 dark:border-white/10 px-3 py-1 text-sm text-black/80 dark:text-white/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-7xl mx-auto mt-14">
          <h2 className="font-geist text-2xl md:text-3xl font-bold text-black dark:text-white">
            Transparent pricing that fits your stage
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border p-6 transition-colors ${
                  p.featured
                    ? "border-magenta/60 bg-magenta/[0.04] dark:bg-magenta/[0.06]"
                    : "border-black/10 dark:border-white/10"
                }`}
              >
                {p.badge && (
                  <span className="absolute right-4 top-4 rounded-full border border-magenta/50 bg-white dark:bg-black px-2 py-0.5 text-xs text-magenta">
                    {p.badge}
                  </span>
                )}
                <h3 className="font-geist text-xl font-bold text-black dark:text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">{p.tagline}</p>
                <div className="mt-4 text-2xl font-geist font-semibold text-black dark:text-white">{p.price}</div>

                <ul className="mt-4 space-y-2">
                  {p.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-black/80 dark:text-white/80">
                      <Check className="mt-0.5 h-4 w-4 text-magenta shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Glow>
                    <Link href={p.cta}>
                      <BorderButton size="sm">Start {p.name}</BorderButton>
                    </Link>
                  </Glow>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-black/60 dark:text-white/60">
            Pricing ranges depend on scope, integrations, and timelines. Fixed bids after discovery. Payment plans available.
          </p>
        </section>

        {/* Nonprofit invite */}
        <section className="max-w-7xl mx-auto mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-25
              [background:radial-gradient(400px_240px_at_0%_0%,#e20074_8%,transparent_60%),radial-gradient(400px_240px_at_100%_100%,#01F9C6_8%,transparent_60%)]" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-magenta" />
                <h3 className="font-geist text-lg md:text-xl font-bold text-black dark:text-white">
                  Charitable Non-Profits
                </h3>
              </div>
              <p className="text-black/75 dark:text-white/75">
                Doing good in the community? Reach out—we offer discounted rates and pro-bono partnerships when possible.
                Let’s work together for the greater good.
              </p>
              <Glow>
                <Link href="/contact">
                  <BorderButton size="sm">Talk to us</BorderButton>
                </Link>
              </Glow>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-25
              [background:radial-gradient(400px_240px_at_0%_0%,#e20074_8%,transparent_60%),radial-gradient(400px_240px_at_100%_100%,#01F9C6_8%,transparent_60%)]" />
            <div className="relative">
              <h3 className="font-geist text-2xl md:text-3xl font-bold text-black dark:text-white">
                Ready to build something great?
              </h3>
              <p className="mt-2 max-w-2xl text-black/75 dark:text-white/75">
                Tell us about your goals and we’ll propose a clear plan, timeline, and budget—no fluff.
              </p>
              <div className="mt-5">
                <Glow>
                  <Link href="/contact">
                    <BorderButton size="lg">Let’s talk</BorderButton>
                  </Link>
                </Glow>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
