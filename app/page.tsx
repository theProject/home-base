import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import { BentoCard } from "@/components/bento-card"
import { InteractiveRoadmap } from "@/components/interactive-roadmap"
import { AnimatedHeroText } from "@/components/animated-hero-text"
import { PlatformCard } from "@/components/platform-card"
import BackToTop from "@/components/back-to-top"
import {
  Gamepad2,
  Layers,
  Brain,
  Shield,
  Sparkles,
  Smartphone,
  Apple,
  Globe,
  MonitorPlay,
  Puzzle,
  DiscAlbum,
} from "lucide-react"

// Android icon as an SVG string (simple version)
const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.25 8H6.75C5.7835 8 5 8.7835 5 9.75V16.25C5 17.2165 5.7835 18 6.75 18H17.25C18.2165 18 19 17.2165 19 16.25V9.75C19 8.7835 18.2165 8 17.25 8ZM7 10H8V11H7V10ZM16 11H17V10H16V11ZM8.25 5C8.25 4.58579 7.91421 4.25 7.5 4.25C7.08579 4.25 6.75 4.58579 6.75 5V7H8.25V5ZM15.75 5V7H17.25V5C17.25 4.58579 16.9142 4.25 16.5 4.25C16.0858 4.25 15.75 4.58579 15.75 5Z" />
  </svg>
)

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
      description: "A fast-paced mobile card game introducing the lore of DarkFrost. Collect, strategize, and conquer.",
      icon: <Layers className="w-10 h-10" />,
      span: "col-span-1 row-span-1",
      ctaText: "Play Now",
      ctaLink: "/projects/darkfrost-cards",
    },
    {
      title: "Hello, Friend",
      description: "Your lifetime context AI. Understands your past to assist your future, privately and securely.",
      icon: <Brain className="w-10 h-10" />,
      span: "col-span-1 row-span-1",
      ctaText: "Discover AI",
      ctaLink: "/projects/hellofriend",
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
      ctaLink: "/services",
    },
  ]

  const platformItems = [
    {
      platformName: "Android",
      icon: <AndroidIcon />,
      description: "Explore our range of innovative apps and games available on the Google Play Store.",
      ctaLink: "#", // Replace with actual Play Store link
      gradientFrom: "from-green-400/30",
      gradientTo: "to-lime-500/30",
    },
    {
      platformName: "Apple (iOS & macOS)",
      icon: <Apple className="w-6 h-6" />,
      description: "Discover beautifully crafted applications for your iPhone, iPad, and Mac.",
      ctaLink: "#", // Replace with actual App Store link
      gradientFrom: "from-slate-400/30",
      gradientTo: "to-neutral-500/30",
    },
    {
      platformName: "Web (React)",
      icon: <Globe className="w-6 h-6" />,
      description: "Access our powerful web applications and interactive experiences from any browser.",
      ctaLink: "#", // Replace with link to web apps
      gradientFrom: "from-sky-400/30",
      gradientTo: "to-blue-500/30",
    },
    {
      platformName: "Steam (PC)",
      icon: <MonitorPlay className="w-6 h-6" />,
      description: "Immerse yourself in our PC games available on the Steam platform.",
      ctaLink: "#", // Replace with Steam store link
      gradientFrom: "from-neutral-700/30",
      gradientTo: "to-slate-800/30",
    },
    {
      platformName: "PlayStation",
      icon: <DiscAlbum className="w-6 h-6" />, // Generic icon
      description: "Experience our captivating games on PlayStation consoles.",
      ctaLink: "#", // Replace with PlayStation store link
      gradientFrom: "from-blue-600/30",
      gradientTo: "to-indigo-700/30",
    },
    {
      platformName: "Nintendo",
      icon: <Puzzle className="w-6 h-6" />, // Generic icon
      description: "Enjoy fun and engaging titles on your Nintendo Switch.",
      ctaLink: "#", // Replace with Nintendo eShop link
      gradientFrom: "from-red-500/30",
      gradientTo: "to-rose-600/30",
    },
  ]

  return (
    <AuroraBackground>
      <div className="relative z-10 min-h-screen bg-transparent flex flex-col">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="container mx-auto px-4 pt-32 pb-20 sm:pt-40 md:pt-48 text-center">
            <AnimatedHeroText />
            <p className="mt-8 text-lg md:text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
              We don't just build; we craft digital marvels. From immersive games to intelligent AI, our passion is to
              innovate and inspire.
            </p>
          </section>

          {/* Platforms Section */}
          <section className="py-16 sm:py-24 bg-background/30 dark:bg-black/30 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-geist text-center mb-4">
                Experience Our Creations
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Available across your favorite platforms. Dive in and explore.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {platformItems.map((item, index) => (
                  <PlatformCard
                    key={index}
                    platformName={item.platformName}
                    icon={item.icon}
                    description={item.description}
                    ctaLink={item.ctaLink}
                    gradientFrom={item.gradientFrom}
                    gradientTo={item.gradientTo}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Bento Grid Projects Section */}
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

          {/* Interactive Roadmap Section */}
          <InteractiveRoadmap />
        </main>
        <BackToTop />
        <Footer />
      </div>
    </AuroraBackground>
  )
}
