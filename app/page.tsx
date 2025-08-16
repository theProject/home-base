import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import { BentoCard } from "@/components/bento-card"
import { InteractiveRoadmap } from "@/components/interactive-roadmap"
import Hero from "@/components/hero"
import { MissionStatementSection } from "@/components/mission-statement-section"
import { ScriptShareCard } from "@/components/script-share-card"
import { GitHubProfileSection } from "@/components/github-profile-section"
import BackToTop from "@/components/back-to-top"
import {
  Gamepad2,
  Layers,
  Brain,
  Shield,
  Smartphone,
  Sparkles,
  Code2,
  TerminalSquare,
  FileText,
  GitMerge,
} from "lucide-react"

export default function Page() {
  const bentoGridItems = [
    {
      title: "DarkFrost - The JRPG",
      description:
        "An epic journey awaits in a world of frost and mystery. Classic JRPG mechanics with a modern twist.",
      icon: <Gamepad2 className="w-10 h-10" />,
      span: "col-span-1 md:col-span-2 row-span-1",
      ctaText: "Learn More",
      ctaLink: "/projects/darkfrost",
    },
    {
      title: "DarkFrost - Intro Card Game",
      description:
        "A fast-paced mobile card game introducing the lore of DarkFrost. Collect, strategize, and conquer.",
      icon: <Layers className="w-10 h-10" />,
      span: "col-span-1 row-span-1",
      ctaText: "Coming Soon",
    },
    {
      title: "Hello, Friend",
      description:
        "Your lifetime context AI. Understands your past to assist your future, privately and securely.",
      icon: <Brain className="w-10 h-10" />,
      span: "col-span-1 row-span-1",
      ctaText: "Visit Site",
      ctaLink: "https://sayhellofriend.com",
    },
    {
      title: "The Realms of Ambiguity",
      description:
        "Navigate a world where nothing is as it seems. Coming soon to iOS and Android.",
      icon: <Smartphone className="w-10 h-10" />,
      span: "col-span-1 md:col-span-2 row-span-1",
      ctaText: "Coming Soon",
    },
    {
      title: "hellertownpolice.org",
      description:
        "Serving the community of Hellertown. Official website for news, resources, and contact.",
      icon: <Shield className="w-10 h-10" />,
      span: "col-span-1 row-span-1",
      ctaText: "Visit Site",
      ctaLink: "https://hellertownpolice.org",
    },
    {
      title: "Explore Our Tech",
      description:
        "Dive deep into the innovative technologies powering our projects and services.",
      icon: <Sparkles className="w-10 h-10" />,
      span: "col-span-1 row-span-1",
      ctaText: "Tech Stack",
      ctaLink: "/projects#tech-arsenal",
    },
  ]

  const scriptShareItems = [
    {
      title: "Automated File Organizer",
      description:
        "A Python script that sorts files in a directory into subfolders based on file type. Keep your downloads tidy!",
      icon: <FileText className="w-8 h-8" />,
      tags: ["Python", "Automation", "Utility"],
      ctaLink: "#",
    },
    {
      title: "CLI Project Starter",
      description:
        "Quickly scaffold new projects with this Bash script. Creates common directory structures and boilerplate files.",
      icon: <TerminalSquare className="w-8 h-8" />,
      tags: ["Bash", "CLI", "DevOps"],
      ctaLink: "#",
    },
    {
      title: "Git Branch Cleaner",
      description:
        "A handy script to list and optionally delete local Git branches that have been merged into main/master.",
      icon: <GitMerge className="w-8 h-8" />,
      tags: ["Git", "Productivity", "Version Control"],
      ctaLink: "#",
    },
    {
      title: "React Component Generator",
      description:
        "Node.js script to generate a new React component with boilerplate code, including styles and test files.",
      icon: <Code2 className="w-8 h-8" />,
      tags: ["Node.js", "React", "Frontend"],
      ctaLink: "#",
    },
  ]

  return (
    <AuroraBackground>
      <div className="relative z-10 min-h-screen bg-transparent flex flex-col">
        <Header />
        <main className="flex-grow">
          {/* Hero */}
          <Hero />

          {/* --- Experience Our Creations (removed per request) ---
          <section> ... </section>
          ------------------------------------------------------- */}

          {/* Our Flagship Projects */}
          <section className="container mx-auto px-4 pt-20 pb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-geist text-center mb-16">
              Our Flagship <span className="text-primary">Projects</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bentoGridItems.map((item, index) => (
                <BentoCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  ctaText={item.ctaText}
                  ctaLink={item.ctaLink}
                  span={item.span as any}
                />
              ))}
            </div>
          </section>

          {/* Our Journey (Timeline) */}
          <InteractiveRoadmap />

          {/* Script Share */}
          <section className="py-16 sm:py-24 bg-background/30 dark:bg-black/30 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-geist text-center mb-4">
                <span className="text-primary">Script</span> Share
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Useful scripts from our toolkit, shared with the community. Grab what you need!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {scriptShareItems.map((script, index) => (
                  <ScriptShareCard
                    key={index}
                    title={script.title}
                    description={script.description}
                    icon={script.icon}
                    tags={script.tags}
                    ctaLink={script.ctaLink}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Our Driving Force */}
          <MissionStatementSection />

          {/* GitHub */}
          <GitHubProfileSection
            username="theProject"
            profileUrl="https://github.com/theProject"
          />
        </main>

        <BackToTop />
        <Footer />
      </div>
    </AuroraBackground>
  )
}
