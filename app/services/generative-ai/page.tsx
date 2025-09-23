import Header from "@/components/header";
import Footer from "@/components/footer";
import BorderButton from "@/components/ui/border-button";
import Link from "next/link";
import type { Metadata } from "next";
import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  Rocket,
  Cpu,
  Database,
  Shield,
  Layers,
  Network,
  BookText,
  Bot,
  Search,
  Brain,
  ClipboardCheck,
  Gauge,
  Cloud,
  Check,
  MapPin,
  HeartHandshake,
  Cog,
  BadgeCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Generative AI Solutions | theProject. — RAG • Chatbots • Automations (Hellertown & Lehigh Valley)",
  description:
    "Design & build practical AI: RAG search, copilots, document Q&A, automations, and analytics. OpenAI/Azure, vector DBs, privacy-minded deployments.",
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
    icon: Bot,
    title: "Chatbots & Copilots",
    blurb: "Task-aware assistants for teams, customers, and workflows.",
  },
  {
    icon: Search,
    title: "RAG & Search",
    blurb:
      "Ask your docs. Vector search across PDFs, policies, wikis, and tickets.",
  },
  {
    icon: Network,
    title: "Automations",
    blurb: "Email triage, data entry, tagging, summarization, and alerts.",
  },
];

const capabilities = [
  { icon: Database, title: "Vector DBs (Pinecone, pgvector)" },
  { icon: Layers, title: "Embeddings, rerankers, hybrid search" },
  { icon: Shield, title: "PII redaction & access control" },
  { icon: Cloud, title: "Azure OpenAI / OpenAI" },
  { icon: Brain, title: "Function calling / tools" },
  { icon: Gauge, title: "Eval harness & analytics" },
];

const stack = [
  "Next.js / Node / Python",
  "OpenAI / Azure OpenAI",
  "Supabase / Postgres / Payload CMS",
  "Pinecone / pgvector",
  "LangChain / custom tool calling",
  "Vercel / Azure / Serverless",
];

const plans = [
  {
    name: "Discovery & Design",
    price: "from $1.5k–$3k",
    tagline:
      "Workshops, data audit, success metrics, and a practical roadmap.",
    highlights: [
      "Use-case mapping & feasibility",
      "Data sources & privacy review",
      "Model selection guidance",
      "Rough UX flows & KPIs",
      "Fixed proposal & timeline",
    ],
    badge: "Fast start",
    cta: "/contact",
  },
  {
    name: "Pilot (RAG / Copilot)",
    price: "from $8k–$20k",
    tagline:
      "A working prototype integrated with your data and simple guardrails.",
    highlights: [
      "Ingestion pipelines (docs/wikis/CRM)",
      "Vector search + reranking",
      "Basic auth & audit logging",
      "Prompt library & evals",
      "Stakeholder demo + iteration",
    ],
    featured: true,
    badge: "Most popular",
    cta: "/contact",
  },
  {
    name: "Production",
    price: "from $30k+",
    tagline: "Reliability, monitoring, and compliance for real workloads.",
    highlights: [
      "Observability & eval dashboards",
      "Role-based access & redaction",
      "Fine-tuning or adapters (when useful)",
      "CI/CD + cost controls",
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
                Generative AI Solutions
              </span>
              <h1 className="mt-4 font-geist text-4xl md:text-5xl font-bold text-black dark:text-white">
                Practical AI that earns its keep — RAG, copilots, automations
              </h1>
              <p className="mt-4 max-w-2xl text-black/75 dark:text-white/75">
                We build useful AI, not science projects. From chat over your
                docs to workflow copilots with evals, guardrails, and analytics.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Glow>
                  <Link href="/contact" aria-label="Start an AI project">
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
                  <BadgeCheck className="h-4 w-4 text-magenta" /> Privacy-minded
                  deployments
                </span>
                <span className="inline-flex items-center gap-2">
                  <Cog className="h-4 w-4 text-magenta" /> CI/CD + eval gates
                </span>
                <span className="inline-flex items-center gap-2">
                  <Layers className="h-4 w-4 text-magenta" /> RAG done right
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
              Local shops to enterprises — we’ll scope realistic wins with clear
              ROI.
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
              <Brain className="h-5 w-5 text-magenta" /> Core capabilities
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
            Pricing excludes model usage fees; we’ll estimate monthly run-rate
            during discovery. Fixed bids after design. Payment plans available.
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
                Education, libraries, community orgs — ask about discounted
                rates and pro-bono options.
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
                Ready to make AI useful?
              </h3>
              <p className="mt-2 max-w-2xl text-black/75 dark:text-white/75">
                We’ll design a realistic pilot, wire it to your data, and prove
                value quickly.
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
