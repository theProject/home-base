import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuroraBackground } from "@/components/aurora-background"
import { BentoCard } from "@/components/bento-card"
import { InteractiveRoadmap } from "@/components/interactive-roadmap"
import { AnimatedHeroText } from "@/components/animated-hero-text"
import { ExpandCard } from "@/components/expand-card"
import { PrestigePopup } from "@/components/prestige-popup"
import { FeaturedBlogPostCard } from "@/components/featured-blog-post-card"
import { MissionStatementSection } from "@/components/mission-statement-section"
import { ScriptShareCard } from "@/components/script-share-card"
import { FacebookReviewsSection } from "@/components/facebook-reviews-section"
import { GitHubProfileSection } from "@/components/github-profile-section" // New import
import BackToTop from "@/components/back-to-top"
import {
  Gamepad2,
  Layers,
  Brain,
  Shield,
  Sparkles,
  Smartphone,
  Globe,
  MonitorPlay,
  Puzzle,
  DiscAlbum,
  Code2,
  TerminalSquare,
  FileText,
  GitMerge,
} from "lucide-react"
import type { Post } from "@/components/BlogCard"

// Android icon as an SVG string
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
      ctaText: "Coming Soon",
    },
    {
      title: "Hello, Friend",
      description: "Your lifetime context AI. Understands your past to assist your future, privately and securely.",
      icon: <Brain className="w-10 h-10" />,
      span: "col-span-1 row-span-1",
      ctaText: "Visit Site",
      ctaLink: "https://sayhellofriend.com",
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
      ctaLink: "/projects#tech-arsenal",
    },
  ]

  const platformItems = [
    {
      title: "Android",
      icon: <AndroidIcon />,
      description:
        "Explore our range of innovative apps and games available on the Google Play Store.",
      image: "/AndroidDev.png",
    },
    {
      title: "Web (React)",
      icon: <Globe className="w-6 h-6" />,
      description:
        "Access our powerful web applications and interactive experiences from any browser.",
      image: "/ReactDev.png",
    },
    {
      title: "Steam (PC)",
      icon: <MonitorPlay className="w-6 h-6" />,
      description: "Immerse yourself in our PC games available on the Steam platform.",
      image: "/Steam.png",
    },
    {
      title: "PlayStation",
      icon: <DiscAlbum className="w-6 h-6" />,
      description: "Experience our captivating games on PlayStation consoles.",
      image: "/PlayStation.png",
    },
    {
      title: "Nintendo",
      icon: <Puzzle className="w-6 h-6" />,
      description: "Enjoy fun and engaging titles on your Nintendo Switch.",
      image: "/Nintendo.png",
    },
  ]

  const mockFeaturedPost: Post = {
    id: "1",
    title: "The Future of AI in Game Development: A Deep Dive",
    slug: "future-ai-game-dev",
    publishedAt: new Date().toISOString(),
    description:
      "Explore how artificial intelligence is revolutionizing game design, storytelling, and player experiences. We break down the latest trends and predict what's next.",
    heroImage: { url: "/ai-gaming-concept.png", alt: "AI in Gaming" },
    authors: [{ id: "1", name: "Dr. Evo Lex", avatar: { url: "/author-avatar.png" } }],
    categories: [{ id: "1", name: "AI & Tech", slug: "ai-tech" }],
    readTime: 8,
  }

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
          {/* Hero Section */}
          <section className="container mx-auto px-4 pt-32 pb-20 sm:pt-40 md:pt-48 text-center">
            <AnimatedHeroText />
            <p className="text-[1.2em] leading-relaxed font-sans">
              Forget the degrees. We are{" "}
              <span className="text-white">the</span>{" "}
              <span className="text-[#e20074]">Project.</span>, the{" "}
              <strong className="text-[#e20074]">relentless</strong> misfits who learned by doing, we learned by{" "}
              <span className="text-[#00FFFF]">hacking code apart</span> and learning through{" "}
              <strong className="text-white">trial and error</strong>, fueled by a{" "}
              <strong className="text-white">burning craving</strong> for design and{" "}
              <strong className="text-white">innovation</strong>. We don't just create; we{" "}
              <strong className="text-white">defy expectations</strong>, building{" "}
              <strong className="text-white">digital marvels</strong> that prove our worth with every line of code.
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
                  <PrestigePopup key={index} logo={item.image}>
                    <ExpandCard
                      title={item.title}
                      icon={item.icon}
                      description={item.description}
                    />
                  </PrestigePopup>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Blog Post Section */}
          <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-geist text-center mb-12">
                From Our <span className="text-primary">Insights</span>
              </h2>
              <FeaturedBlogPostCard post={mockFeaturedPost} />
            </div>
          </section>

          {/* Mission Statement Section */}
          <MissionStatementSection />

          {/* Reviews Section */}
          <section className="py-16 sm:py-24 bg-background/30 dark:bg-black/30 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-geist text-center mb-4">
                Loved by Our <span className="text-primary">Community</span>
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Hear what people are saying about our projects and our passion for innovation.
              </p>
              <FacebookReviewsSection />
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

          {/* Script Share Section */}
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

          {/* GitHub Profile Section */}
          <GitHubProfileSection username="theProject" profileUrl="https://github.com/theProject" />

          {/* Interactive Roadmap Section */}
          <InteractiveRoadmap />
        </main>
        <BackToTop />
        <Footer />
      </div>
    </AuroraBackground>
  )
}
