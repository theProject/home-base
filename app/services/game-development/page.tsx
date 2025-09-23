import Header from "@/components/header";
import Footer from "@/components/footer";
import BorderButton  from "@/components/ui/border-button";
import Link from "next/link";
import type { Metadata } from "next";
import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  Rocket,
  Gamepad2,
  Palette,
  Cpu,
  Gauge,
  Users,
  Trophy,
  Store,
  Layers,
  Cloud,
  Joystick,
  Coins,
  MonitorPlay,
  Tv,
  Check,
  MapPin,
  HeartHandshake,
  Cog,
  BadgeCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Video Game Development | theProject. — Unity • Godot • Cross-Platform (Hellertown & Lehigh Valley)",
  description:
    "Indie to production: prototypes, polished vertical slices, and live ops. Unity & Godot pipelines, content tooling, analytics, IAP, achievements, and console/TV support.",
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

const focus: { icon: Icon; title: string; blurb: string }[] = [
  {
    icon: Gamepad2,
    title: "Core Loop & Feel",
    blurb: "Moment-to-moment polish, juice, haptics, camera, UX at 60fps.",
  },
  {
    icon: Palette,
    title: "Art Direction",
    blurb: "UI/HUD, menus, shaders, VFX audio hooks, accessibility.",
  },
  {
    icon: Users,
    title: "Community & Live Ops",
    blurb: "Events, seasons, AB tests, analytics-driven retention.",
  },
];

const capabilities: { icon: Icon; title: string }[] = [
  { icon: Cpu, title: "Unity / Godot pipelines" },
  { icon: Gauge, title: "Performance profiling" },
  { icon: Coins, title: "IAP / Ads integrations" },
  { icon: Trophy, title: "Achievements & leaderboards" },
  { icon: Cloud, title: "Cloud saves / auth" },
  { icon: Layers, title: "Content tooling & data" },
];

const platforms = [
  { icon: MonitorPlay, label: "iOS / Android (App Stores)" },
  { icon: Store, label: "PC (Steam / itch.io)" },
  { icon: Tv, label: "tvOS / Android TV" },
];

const stack = [
  "Unity (URP) / Addressables",
  "Godot 4.x",
  "C# / GDScript",
  "PlayFab / Firebase / Supabase",
  "Stripe / Apple / Google billing",
  "Crashlytics / Sentry / Game Analytics",
  "fastlane / EAS CI/CD",
];

const plans = [
  {
    name: "Indie Prototype",
    price: "from $3.5k–$8k",
    tagline:
      "Vertical slice to validate the core loop and visual direction.",
    highlights: [
      "1 polished mechanic + 1–2 levels",
      "Basic UI/HUD & haptics",
      "Light analytics & crash reporting",
      "Internal builds (TestFlight / APK)",
      "1 post-prototype iteration",
    ],
    badge: "Great for first launch",
    cta: "/contact",
  },
  {
    name: "Production Build",
    price: "from $20k–$60k",
    tagline: "Store-ready game with payments, analytics, and polish.",
    highlights: [
      "Design system & content pipeline",
      "Achievements / leaderboards / cloud saves",
      "IAP or ad mediation",
      "CI/CD + monitoring",
      "30-day stabilization window",
    ],
    featured: true,
    badge: "Most popular",
    cta: "/contact",
  },
  {
    name: "Studio + Live Ops",
    price: "from $60k+",
    tagline: "Events, seasons, AB tests, and scalable backends.",
    highlights: [
      "Live events & content scheduling",
      "Telemetry dashboards & A/B testing",
      "Controller/TV input support",
      "Scalable backend + observability",
      "Roadmap & ongoing partnership",
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
            <div
              className="pointer-events-none absolute inset-0 opacity-20
              [background:radial-gradient(600px_300px_at_10%_-10%,#e20074_6%,transparent_60%),radial-gradient(600px_300px_at_110%_10%,#01F9C6_6%,transparent_60%)]"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs text-black/70 dark:text-white/70">
                <Joystick className="h-3.5 w-3.5" />
                Video Game Development
              </span>
              <h1 className="mt-4 font-geist text-4xl md:text-5xl font-bold text-black dark:text-white">
                Games with feel — prototypes to live ops, shipped with care
              </h1>
              <p className="mt-4 max-w-2xl text-black/75 dark:text-white/75">
                Unity & Godot expertise. We handle moment-to-moment feel,
                store compliance, payments, analytics, and ongoing events so you
                can focus on your vision.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Glow>
                  <Link href="/contact" aria-label="Start a game project">
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
                  <BadgeCheck className="h-4 w-4 text-magenta" /> Store-ready
                  builds
                </span>
                <span className="inline-flex items-center gap-2">
                  <Cog className="h-4 w-4 text-magenta" /> CI/CD & release
                  automation
                </span>
                <span className="inline-flex items-center gap-2">
                  <Layers className="h-4 w-4 text-magenta" /> Content pipelines
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
              Indies, studios, classrooms, and local creators—let’s build
              something people love to play.
            </p>
          </div>
        </section>

        {/* Focus Areas */}
        <section className="max-w-7xl mx-auto mt-12">
          <h2 className="font-geist text-2xl md:text-3xl font-bold text-black dark:text-white">
            Where we shine
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {focus.map(({ icon: I, title, blurb }, i) => (
              <div
                key={i}
                className="rounded-xl border border-black/10 dark:border-white/10 p-5 hover:border-magenta/40 dark:hover:border-magenta/40 transition-colors"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10">
                  <I className="h-5 w-5 text-magenta" />
                </div>
                <h3 className="font-geist text-lg font-semibold text-black dark:text-white">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                  {blurb}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="max-w-7xl mx-auto mt-12">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
            <h3 className="font-geist text-lg font-semibold text-black dark:text-white flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-magenta" /> Core capabilities
            </h3>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {capabilities.map(({ icon: I, title }, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm text-black/80 dark:text-white/80 flex items-center gap-2"
                >
                  <I className="h-4 w-4 text-magenta" />
                  {title}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="max-w-7xl mx-auto mt-12">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-6">
            <h3 className="font-geist text-lg font-semibold text-black dark:text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-magenta" /> Target platforms
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {platforms.map(({ icon: I, label }, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-3 py-1 text-sm text-black/80 dark:text-white/80"
                >
                  <I className="h-4 w-4 text-magenta" /> {label}
                </span>
              ))}
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
            Ranges depend on scope, art/audio, platform targets, and timelines.
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
                Building for education or community? We offer discounted rates
                and occasional pro-bono work.
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
                Ready to playtest your idea?
              </h3>
              <p className="mt-2 max-w-2xl text-black/75 dark:text-white/75">
                We’ll scope a vertical slice, build it fast, and chart a smart
                path to launch.
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
