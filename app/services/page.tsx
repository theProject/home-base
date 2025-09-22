import Header from "@/components/header"
import Footer from "@/components/footer"
import { Smartphone, Gamepad, Cpu, Code, Palette } from "lucide-react" // removed BarChart
import { BorderButton } from "@/components/ui/border-button"
import Link from "next/link"
import type { ReactNode } from "react"

type Service = {
  icon: ReactNode
  title: string
  description: string
  href: string
}

const services: Service[] = [
  {
    icon: <Code className="h-8 w-8 text-magenta" />,
    title: "Full-Stack Web Development",
    description:
      "Modern, fast, SEO-ready websites and web apps built end-to-end (Next.js, React, APIs, databases, auth, deployments).",
    href: "/services/web-development",
  },
  {
    icon: <Palette className="h-8 w-8 text-magenta" />,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces and flows that convert—wireframes to high-fidelity design systems and prototypes.",
    href: "/services/ui-ux-design",
  },
  {
    icon: <Smartphone className="h-8 w-8 text-magenta" />,
    title: "Mobile App Development",
    description:
      "High-performance iOS/Android apps with smooth UX, native capabilities, and scalable backends.",
    href: "/services/mobile-app-development",
  },
  {
    icon: <Gamepad className="h-8 w-8 text-magenta" />,
    title: "Video Game Development",
    description:
      "From concept to launch—polished gameplay, performant builds, and cross-platform pipelines.",
    href: "/services/game-development",
  },
  {
    icon: <Cpu className="h-8 w-8 text-magenta" />,
    title: "Generative AI Solutions",
    description:
      "RAG, agents, and AI-powered features that unlock automation, insights, and delightful user experiences.",
    href: "/services/generative-ai",
  },
  {
    icon: <Code className="h-8 w-8 text-magenta" />,
    title: "Custom Software Development",
    description:
      "Tailored systems and internal tools that streamline operations and scale with your business.",
    href: "/services/custom-software",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 font-geist">
            Our <span className="text-magenta">Services</span>
          </h1>
          <p className="text-lg text-black/80 dark:text-white/80 mb-12 max-w-2xl">
            We offer a comprehensive range of digital services to help businesses innovate and grow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-black/10 dark:border-white/10 hover:border-magenta/30 dark:hover:border-magenta/30 transition-colors"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-3 font-geist">
                  {service.title}
                </h3>
                <p className="text-black/70 dark:text-white/70 mb-4">
                  {service.description}
                </p>
                <Link href={service.href} aria-label={`Learn more about ${service.title}`}>
                  <BorderButton size="sm">Learn More</BorderButton>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-6 font-geist">
              Our <span className="text-magenta">Process</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-magenta text-white font-bold mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-geist">Discovery</h3>
                <p className="text-black/70 dark:text-white/70">
                  We begin by understanding your business goals, target audience, and project requirements.
                </p>
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-magenta/30"></div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-magenta text-white font-bold mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-geist">Design</h3>
                <p className="text-black/70 dark:text-white/70">
                  Our designers create intuitive interfaces and engaging experiences tailored to your users.
                </p>
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-magenta/30"></div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-magenta text-white font-bold mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-geist">Development</h3>
                <p className="text-black/70 dark:text-white/70">
                  Our engineers build your solution using the latest technologies and best practices.
                </p>
                <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-magenta/30"></div>
              </div>

              <div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-magenta text-white font-bold mb-4">
                  4
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-geist">Launch & Support</h3>
                <p className="text-black/70 dark:text-white/70">
                  We ensure a smooth launch and provide ongoing support to keep your product running optimally.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/contact">
                <BorderButton size="lg">Get Started</BorderButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
