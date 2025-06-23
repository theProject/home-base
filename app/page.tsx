import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import { BentoCard } from "@/components/bento-card"
import { InteractiveRoadmap } from "@/components/interactive-roadmap"
import BackToTop from "@/components/back-to-top"
import { Gamepad2, Layers, Brain, Shield, Sparkles, Smartphone } from "lucide-react"

export default function Page() {
  const bentoGridItems = [
    {
      title: "DarkFrost - The JRPG",
      description:
        "An epic journey awaits in a world of frost and mystery. Classic JRPG mechanics with a modern twist.",
      icon: <Gamepad2 className="w-10 h-10" />,
      span: "col-span-1 md:col-span-2 row-span-1",
      ctaText: "Learn More",
      ctaLink: "/projects/darkfrost", // Example link
    },
    {
      title: "DarkFrost - Intro Card Game",
      description: "A fast-paced mobile card game introducing the lore of DarkFrost. Collect, strategize, and conquer.",
      icon: <Layers className="w-10 h-10" />,
      span: "col-span-1 row-span-1",
      ctaText: "Play Now",
      ctaLink: "/projects/darkfrost-cards", // Example link
    },
    {
      title: "Hello, Friend",
      description: "Your lifetime context AI. Understands your past to assist your future, privately and securely.",
      icon: <Brain className="w-10 h-10" />,
      span: "col-span-1 row-span-1",
      ctaText: "Discover AI",
      ctaLink: "/projects/hellofriend", // Example link
    },
    {
      title: "The Realms of Ambiguity",
      description: "Navigate a world where nothing is as it seems. Coming soon to iOS and Android.",
      icon: <Smartphone className="w-10 h-10" />,
      span: "col-span-1 md:col-span-2 row-span-1",
      ctaText: "Coming Soon",
    },
    {
      title: "hellertownpolice.org",
      description: "Serving the community of Hellertown. Official website for news, resources, and contact.",
      icon: <Shield className="w-10 h-10" />,
      span: "col-span-1 row-span-1",
      ctaText: "Visit Site",
      ctaLink: "https://hellertownpolice.org",
    },
    {
      title: "Explore Our Tech",
      description: "Dive deep into the innovative technologies powering our projects and services.",
      icon: <Sparkles className="w-10 h-10" />,
      span: "col-span-1 row-span-1",
      ctaText: "Tech Stack",
      ctaLink: "/services", // Example link
    },
  ]

  return (
    <AuroraBackground>
      <div className="relative z-10 min-h-screen bg-transparent flex flex-col">
        <Header />
        <main className="flex-grow">
          <section className="container mx-auto px-4 pt-24 pb-16 sm:pt-32">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground font-geist">
                Innovating Digital <span className="text-primary">Experiences</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
                We build cutting-edge applications, immersive games, and intelligent AI solutions. Explore our world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bentoGridItems.map((item, index) => (
                <BentoCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  className={item.className}
                  ctaText={item.ctaText}
                  ctaLink={item.ctaLink}
                  span={item.span as any} // Cast for simplicity, ensure valid spans
                />
              ))}
            </div>
          </section>

          <InteractiveRoadmap />
        </main>
        <BackToTop />
        <Footer />
      </div>
    </AuroraBackground>
  )
}
