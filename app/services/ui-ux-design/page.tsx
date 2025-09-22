import Header from "@/components/header"
import Footer from "@/components/footer"
import { BorderButton } from "@/components/ui/border-button"
import Link from "next/link"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Palette,
  PenTool,
  Type as TypeIcon,
  Grid,
  Eye,
  Users,
  LineChart,
  Layout,
  Sparkles,
  Shapes,
  BadgeCheck,
  Lightbulb,
  MousePointer2,
  MapPin,
  Check,
} from "lucide-react"

export const metadata: Metadata = {
  title: "UI/UX Design | theProject. — Hellertown & Lehigh Valley",
  description:
    "Local to Hellertown, PA — serving the Lehigh Valley & beyond. Expert UI/UX, branding, logo & font design, accessible design systems, and data-driven UX.",
}

type Feature = { icon: LucideIcon; title: string; blurb: string }
type Pillar  = { icon: LucideIcon; title: string; points: string[] }
type Plan    = {
  name: string
  price: string
  tagline: string
  highlights: string[]
  badge?: string
  featured?: boolean
  cta: string
}

const features: Feature[] = [
  { icon: Palette,      title: "Brand-true Aesthetics", blurb: "Color systems, grids, and motion that feel uniquely you." },
  { icon: Layout,       title: "Design Systems",        blurb: "Reusable components, tokens, and docs for consistency." },
  { icon: Eye,          title: "Accessibility (A11y)",  blurb: "Contrast, semantics, focus, and keyboard paths (WCAG-friendly)." },
  { icon: Users,        title: "User-Centered",         blurb: "Lean research, journey maps, and quick prototype feedback." },
  { icon: LineChart,    title: "Conversion-Smart",      blurb: "Clear hierarchies, persuasive UX writing, and testable flows." },
  { icon: MousePointer2,title: "Micro-interactions",    blurb: "Subtle motion and states that guide—not distract." },
]

const pillars: Pillar[] = [
  {
    icon: Grid,
    title: "Foundations",
    points: [
      "8-pt spacing, fluid grids, density rules",
      "Color palettes with contrast ramps",
      "Type scales, rhythm, and optical balance",
    ],
  },
  {
    icon: BadgeCheck,
    title: "Systemization",
    points: [
      "Tokens (colors, spacing, radii, shadows)",
      "Composable components & states",
      "Usage docs and do/don’t examples",
    ],
  },
  {
    icon: Sparkles,
    title: "Delight (with restraint)",
    points: [
      "Meaningful motion & transitions",
      "Empty states, loading, and errors",
      "Touch/hover affordances & feedback",
    ],
  },
  {
    icon: Lightbulb,
    title: "Evidence-Driven",
    points: [
      "Lightweight tests & interviews",
      "Analytics-informed iterations",
      "Accessibility audits & fixes",
    ],
  },
]

const logoPackages: Plan[] = [
  {
    name: "Logo Mini (Budget)",
    price: "$350–$650",
    tagline: "Great for very small businesses or events.",
    highlights: [
      "2 initial concepts, 1 round of revisions",
      "Primary mark + simple wordmark",
      "Export pack (SVG, PDF, PNGs)",
    ],
    cta: "/contact",
    badge: "Affordable",
  },
  {
    name: "Logo Pro",
    price: "$1.8k–$3.5k",
    tagline: "Robust, scalable brand assets.",
    highlights: [
      "3–4 concepts, 2–3 revision rounds",
      "Primary + secondary + monochrome",
      "Favicon, social avatars, lockups",
    ],
    cta: "/contact",
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Brand System",
    price: "$6k–$15k",
    tagline: "Full visual language for growth.",
    highlights: [
      "Logo suite + type & color systems",
      "Brand guide (usage & examples)",
      "Starter design tokens & components",
    ],
    cta: "/contact",
  },
]

const uiPlans: Plan[] = [
  {
    name: "Starter Site UI",
    price: "from $1.2k",
    tagline: "Landing + 2 subpages, brand-aligned.",
    highlights: [
      "Wireframes → polished mockups",
      "Mobile-first, accessible patterns",
      "Hand-off kit (assets & specs)",
    ],
    cta: "/contact",
    badge: "Small-biz friendly",
  },
  {
    name: "Product UX Sprint",
    price: "from $6k",
    tagline: "Research, prototypes, and usability tests.",
    highlights: [
      "User & stakeholder interviews",
      "Task flows and clickable prototype",
      "Test plan + findings & next steps",
    ],
    cta: "/contact",
    featured: true,
    badge: "High impact",
  },
  {
    name: "Design System Setup",
    price: "from $12k",
    tagline: "Component library + tokens + docs.",
    highlights: [
      "Foundations (type, color, spacing)",
      "Core components & states",
      "Usage guidelines & examples",
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

export default function Page() {
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
                <PenTool className="h-3.5 w-3.5" />
                UI/UX Design & Branding
              </span>
              <h1 className="mt-4 font-geist text-4xl md:text-5xl font-bold text-black dark:text-white">
                Beautiful, usable, and brand-true digital experiences
              </h1>
              <p className="mt-4 max-w-2xl text-black/75 dark:text-white/75">
                Local to <strong>Hellertown, PA</strong> — proudly serving the <strong>Lehigh Valley</strong> and beyond.
                We craft interfaces that convert and brands that last—from lean landing pages to full design systems.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Glow>
                  <Link href="/contact" aria-label="Book a free design consult">
                    <BorderButton size="lg">Free Consultation</BorderButton>
                  </Link>
                </Glow>
                <Link
                  href="/projects"
                  className="font-geist text-sm text-black/80 hover:text-magenta dark:text-white/80 dark:hover:text-magenta transition-colors"
                >
                  See design work →
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
                Hellertown & Lehigh Valley Friendly
              </h2>
            </div>
            <p className="text-sm text-black/70 dark:text-white/70 md:ml-2">
              We love partnering with local restaurants, shops, gyms, makers, contractors, clinics, and non-profits.
              In-person sessions welcome—let’s keep business in the Valley.
            </p>
          </div>
        </section>

        {/* Feature grid */}
        <section className="max-w-7xl mx-auto mt-12">
          <h2 className="font-geist text-2xl md:text-3xl font-bold text-black dark:text-white">
            Principles that drive expert-level UI
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

        {/* Pillars / methodology */}
        <section className="max-w-7xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-magenta" />
                    <h3 className="font-geist font-semibold text-black dark:text-white">{p.title}</h3>
                  </div>
                  <ul className="mt-2 space-y-2">
                    {p.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-black/80 dark:text-white/80">
                        <Check className="mt-0.5 h-4 w-4 text-magenta shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        {/* Typography & Font Design */}
        <section className="max-w-7xl mx-auto mt-12">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-6">
            <div className="flex items-center gap-2">
              <TypeIcon className="h-5 w-5 text-magenta" />
              <h3 className="font-geist text-lg font-semibold text-black dark:text-white">Typography & Font Design</h3>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-black/75 dark:text-white/75">
              <p><strong>Type selection & pairing.</strong> We curate families with clear roles (display, UI, mono), then define a
                responsive scale and line-height rhythm that reads beautifully on every device.</p>
              <p><strong>Custom wordmarks.</strong> For brands that need an ownable voice, we craft bespoke lettering and refine
                kerning, optical balance, and negative space.</p>
              <p><strong>Performance & licensing.</strong> We tune subsets/weights for speed and advise on licensing that fits your budget.</p>
            </div>
          </div>
        </section>

        {/* Logo & Branding packages */}
        <section className="max-w-7xl mx-auto mt-12">
          <h2 className="font-geist text-2xl md:text-3xl font-bold text-black dark:text-white">
            Logo & Branding Packages
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {logoPackages.map((p, i) => (
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
                      <BorderButton size="sm">Free Consultation</BorderButton>
                    </Link>
                  </Glow>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-black/60 dark:text-white/60">
            Non-profits: we offer discounts and occasional pro-bono work—reach out and let’s do good together.
          </p>
        </section>

        {/* UI/UX service plans */}
        <section className="max-w-7xl mx-auto mt-12">
          <h2 className="font-geist text-2xl md:text-3xl font-bold text-black dark:text-white">
            UI/UX Packages for Every Stage
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {uiPlans.map((p, i) => (
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
                      <BorderButton size="sm">Free Consultation</BorderButton>
                    </Link>
                  </Glow>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* “What good looks like” examples (textual) */}
        <section className="max-w-7xl mx-auto mt-12">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-6">
            <div className="flex items-center gap-2">
              <Shapes className="h-5 w-5 text-magenta" />
              <h3 className="font-geist text-lg font-semibold text-black dark:text-white">
                What expert-level UI looks like
              </h3>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-black/75 dark:text-white/75">
              <p><strong>Information hierarchy that breathes.</strong> Clear visual priority, generous whitespace, and
                scannable sections that reduce cognitive load.</p>
              <p><strong>Predictable patterns with tasteful novelty.</strong> Familiar controls and navigation, plus
                just-enough delight in states and micro-interactions.</p>
              <p><strong>Accessible by default.</strong> Sufficient contrast, logical focus order, visible focus rings,
                and complete keyboard paths—no surprises.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-25
              [background:radial-gradient(400px_240px_at_0%_0%,#e20074_8%,transparent_60%),radial-gradient(400px_240px_at_100%_100%,#01F9C6_8%,transparent_60%)]" />
            <div className="relative">
              <h3 className="font-geist text-2xl md:text-3xl font-bold text-black dark:text-white">
                Let’s design something customers love
              </h3>
              <p className="mt-2 max-w-2xl text-black/75 dark:text-white/75">
                Book a free consult—walk out with a plan, timeline, and clear next steps.
              </p>
              <div className="mt-5">
                <Glow>
                  <Link href="/contact">
                    <BorderButton size="lg">Free Consultation</BorderButton>
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
