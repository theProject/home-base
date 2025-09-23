import Header from "@/components/header";
import Footer from "@/components/footer";
import BorderButton  from "@/components/ui/border-button";
import Link from "next/link";
import type { Metadata } from "next";
import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  Rocket,
  Building2,
  Server,
  Database,
  Shield,
  Link2,
  BarChart3,
  Workflow,
  Cpu,
  Cloud,
  Layers,
  Check,
  MapPin,
  HeartHandshake,
  Cog,
  BadgeCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Custom Software Development | theProject. — Dashboards • Integrations • APIs (Hellertown & Lehigh Valley)",
  description:
    "We design and deliver tailor-made software: internal tools, dashboards, APIs, data pipelines, and integrations with security, performance, and maintainability in mind.",
};

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

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
  );
}

const focus = [
  {
    icon: Workflow,
    title: "Internal Tools",
    blurb:
      "Operations dashboards, content pipelines, approvals, and automations.",
  },
  {
    icon: Link2,
    title: "Systems Integration",
    blurb:
      "Tie together CRMs, ERPs, storefronts, and data warehouses with clean APIs.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    blurb:
      "Event tracking, KPIs, and executive dashboards with alerts & SLAs.",
  },
];

const capabilities = [
  { icon: Server, title: "Node/Next APIs & workers" },
  { icon: Database, title: "Postgres / Supabase / Payload CMS" },
  { icon: Cloud, title: "Vercel / Azure / Serverless" },
  { icon: Layers, title: "Queueing & background jobs" },
  { icon: Shield, title: "RBAC, SSO, and audit logs" },
  { icon: Cpu, title: "Performance budgets & tests" },
];

const stack = [
  "Next.js 15 / React 19 / TypeScript",
  "Postgres / Prisma / Supabase",
  "Payload CMS (headless)",
  "Redis / Qdrant / Pinecone (when needed)",
  "Azure / Vercel / Docker",
  "Grafana / OpenTelemetry",
];

const plans = [
  {
    name: "Starter (Internal Tool)",
    price: "from $5k–$12k",
    tagline: "One focused tool: forms, workflows, or a small dashboard.",
    highlights: [
      "Auth, roles, and basic CRUD",
      "1–2 integrations (e.g., Stripe/HubSpot)",
      "Clean UI with your branding",
      "Testing & handoff docs",
      "2-week warranty",
    ],
    badge: "Budget friendly",
    cta: "/contact",
  },
  {
    name: "Growth (Business App)",
    price: "from $15k–$40k",
    tagline:
      "Multi-user app with integrations, reporting, and CI/CD. Your new spine.",
    highlights: [
      "Design system & UX polish",
      "RBAC, audit logs, and backups",
      "Background jobs & webhooks",
      "Metrics, logging, and alerts",
      "30-day stabilization",
    ],
    featured: true,
    badge: "Most popular",
    cta: "/contact",
  },
  {
    name: "Scale (Platform)",
    price: "from $40k+",
    tagline: "Complex data models, multi-region, and compliance guidance.",
    highlights: [
      "Domain-driven design & roadmap",
      "Data model & migration strategy",
      "SLOs, error budgets & observability",
      "Infra as code & cost controls",
      "SLA & ongoing partnership",
    ],
    cta: "/contact",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero */}
        <section className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-12">
            <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(600px_300px_at_10%_-10%,#e20074_6%,transparent_60%),radial-gradient(600px_300px_at_110%_10%,#01F9C6_6%,transparent_60%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs text-black/70 dark:text-white/70">
                <Rocket className="h-3.5 w-3.5" />
                Custom Software Development
              </span>
              <h1 className="mt-4 font-geist text-4xl md:text-5xl font-bold text-black dark:text-white">
                Purpose-built software that fits your business like a glove
              </h1>
              <p className="mt-4 max-w-2xl text-black/75 dark:text-white/75">
                We build the tools your team actually needs — secure, fast, and
                maintainable. Dashboards, APIs, integrations, and data flows.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Glow>
                  <Link href="/contact" aria-label="Start a custom software project">
                    <BorderButton size="lg">Free Consultation</BorderButton>
                  </Link>
                </Glow>
                <Link
                  href="/projects"
                  className="font-geist text-sm text-black/80 hover:text-magenta dark:text-white/80 dark:hover:text-magenta transition-colors"
                >
                  See work →
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-black/70 dark:text-white/70">
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-magenta" /> Production-grade
                </span>
                <span className="inline-flex items-center gap-2">
                  <Cog className="h-4 w-4 text-magenta" /> CI/CD & observability
                </span>
                <span className="inline-flex items-center gap-2">
                  <Layers className="h-4 w-4 text-magenta" /> Clean architectures
                </span>
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
              Shops, clinics, makers, and growing teams — we’ll streamline your
              workflows without bloat.
            </p>
          </div>
        </section>

        {/* Focus Areas */}
        <section className="max-w-7xl mx-auto mt-12">
          <h2 className="font-geist text-2xl md:text-3xl font-bold text-black dark:text-white">
            Where we shine
          </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {focus.map((f, i) => {
              const I = f.icon as Icon;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-black/10 dark:border-white/10 p-5 hover:border-magenta/40 dark:hover:border-magenta/40 transition-colors"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10">
                    <I className="h-5 w-5 text-magenta" />
                  </div>
                  <h3 className="font-geist text-lg font-semibold text-black dark:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                    {f.blurb}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Capabilities */}
        <section className="max-w-7xl mx-auto mt-12">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
            <h3 className="font-geist text-lg font-semibold text-black dark:text-white flex items-center gap-2">
              <Server className="h-5 w-5 text-magenta" /> Core capabilities
            </h3>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {capabilities.map((c, i) => {
                const I = c.icon as Icon;
                return (
                  <div
                    key={i}
                    className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm text-black/80 dark:text-white/80 flex items-center gap-2"
                  >
                    <I className="h-4 w-4 text-magenta" />
                    {c.title}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="max-w-7xl mx-auto mt-12">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-6">
            <h3 className="font-geist text-lg font-semibold text-black dark:text-white flex items-center gap-2">
              <Cog className="h-5 w-5 text-magenta" /> Preferred stack
            </h3>
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
            Transparent pricing
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border p-6 transition-colors ${
                  (p as any).featured
                    ? "border-magenta/60 bg-magenta/[0.04] dark:bg-magenta/[0.06]"
                    : "border-black/10 dark:border-white/10"
                }`}
              >
                {p.badge && (
                  <span className="absolute right-4 top-4 rounded-full border border-magenta/50 bg-white dark:bg-black px-2 py-0.5 text-xs text-magenta">
                    {p.badge}
                  </span>
                )}
                <h3 className="font-geist text-xl font-bold text-black dark:text-white">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                  {p.tagline}
                </p>
                <div className="mt-4 text-2xl font-geist font-semibold text-black dark:text-white">
                  {p.price}
                </div>
                <ul className="mt-4 space-y-2">
                  {p.highlights.map((h, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-black/80 dark:text-white/80"
                    >
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
            Ranges depend on scope, integrations, compliance, and timelines.
            Fixed bids after discovery. Payment plans available.
          </p>
        </section>

        {/* Nonprofit */}
        <section className="max-w-7xl mx-auto mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-25 [background:radial-gradient(400px_240px_at_0%_0%,#e20074_8%,transparent_60%),radial-gradient(400px_240px_at_100%_100%,#01F9C6_8%,transparent_60%)]" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-magenta" />
                <h3 className="font-geist text-lg md:text-xl font-bold text-black dark:text-white">
                  Charitable Non-Profits
                </h3>
              </div>
              <p className="text-black/75 dark:text-white/75">
                Work that helps the community matters to us. Ask about
                discounted rates and pro-bono availability.
              </p>
              <Glow>
                <Link href="/contact">
                  <BorderButton size="sm">Let’s chat</BorderButton>
                </Link>
              </Glow>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-25 [background:radial-gradient(400px_240px_at_0%_0%,#e20074_8%,transparent_60%),radial-gradient(400px_240px_at_100%_100%,#01F9C6_8%,transparent_60%)]" />
            <div className="relative">
              <h3 className="font-geist text-2xl md:text-3xl font-bold text-black dark:text-white">
                Need a tool that actually fits?
              </h3>
              <p className="mt-2 max-w-2xl text-black/75 dark:text-white/75">
                We’ll map your process, design a lean solution, and ship it with
                metrics and maintainability.
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
  );
}
