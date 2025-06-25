import { GameCard, type GameCardProps } from "@/components/arcade/game-card"
import { ArcadeContactForm } from "@/components/arcade/arcade-contact-form"
import { Sparkles, Gamepad2, Lightbulb } from "lucide-react"
import { AuroraBackground } from "@/components/aurora-background" // Assuming this exists and is suitable
import Header from "@/components/header" // Import your existing Header
import Footer from "@/components/footer" // Import your existing Footer
import BackToTop from "@/components/back-to-top" // Import BackToTop

const arcadeGames: GameCardProps[] = [
  {
    id: "1",
    title: "Pixel Pioneer",
    description: "Navigate treacherous pixel landscapes and gather ancient artifacts. A retro adventure!",
    language: "JavaScript",
    imageUrl: "/placeholder-kw6g7.png",
    reviewScore: 4.5,
    slug: "pixel-pioneer",
    tags: ["Retro", "Platformer", "Adventure"],
    ctaText: "Coming Soon",
  },
  {
    id: "2",
    title: "Synth Runner",
    description: "Dash through a neon-drenched cityscape, dodging obstacles in this fast-paced endless runner.",
    language: "TypeScript",
    imageUrl: "/synthwave-runner.png",
    reviewScore: 4.8,
    slug: "synth-runner",
    tags: ["Endless Runner", "Sci-Fi", "Music"],
    ctaText: "Coming Soon",
  },
  {
    id: "3",
    title: "AI Dream Weaver",
    description: "Generate stunning 3D models from your text prompts. Unleash your imagination!",
    language: "Python, Next.js",
    imageUrl: "/ai-3d-model-generation-interface.png",
    reviewScore: 4.2,
    slug: "ai-dream-weaver",
    tags: ["AI", "3D Modeling", "Creative Tool"],
    className: "md:col-span-2",
    ctaLink: "https://frostscript.com",
  },
  {
    id: "4",
    title: "Code Breaker AI",
    description: "Challenge an AI in a game of wits and logic. Can you crack the code before it does?",
    language: "Next.js",
    imageUrl: "/ai-code-breaking-game.png",
    reviewScore: 4.6,
    slug: "code-breaker-ai",
    tags: ["Puzzle", "AI", "Logic"],
    ctaLink: "/games/code-breaker-ai.html",
  },
  {
    id: "5",
    title: "Galaxy Glider",
    description: "Pilot your starship through asteroid fields and alien territories. High-octane space action!",
    language: "JavaScript",
    imageUrl: "/placeholder.svg?width=400&height=300",
    reviewScore: 4.3,
    slug: "galaxy-glider",
    tags: ["Space Shooter", "Action", "Arcade"],
    ctaText: "Coming Soon",
  },
  {
    id: "6",
    title: "Prompt Sculptor",
    description: "Another take on AI creativity: sculpt intricate digital art using only text commands.",
    language: "Python, Next.js",
    imageUrl: "/placeholder.svg?width=400&height=300",
    reviewScore: 4.0,
    slug: "prompt-sculptor",
    tags: ["AI", "Art Generation", "Experimental"],
    ctaText: "Coming Soon",
  },
]

export default function ArcadePage() {
  return (
    <>
      <Header />
      <div className="relative min-h-screen bg-gray-900 text-gray-100 overflow-hidden synthwave-bg-dots">
        <AuroraBackground className="opacity-30 synthwave-aurora" /> {/* Adjusted Aurora */}
        <main className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
          {/* Hero Section */}
          <section className="text-center mb-16 md:mb-24">
            <Gamepad2 className="mx-auto h-16 w-16 text-primary mb-6 animate-pulse synthwave-icon-glow" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight synthwave-title">
              Welcome to <span className="text-primary synthwave-text-glow">theProject.</span> Arcade
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Dive into our collection of mini-games, AI-powered creative tools, and experimental projects. Click any
              card to play or explore! New challenges and features warped in regularly.
            </p>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full synthwave-divider-glow"></div>
          </section>

          {/* Games Bento Grid Section */}
          <section className="mb-16 md:mb-24">
            <div className="flex items-center justify-center mb-10">
              <Sparkles className="h-8 w-8 text-primary mr-3 synthwave-icon-glow" />
              <h2 className="text-3xl md:text-4xl font-bold synthwave-subtitle">Featured Experiments & Games</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-4 rounded-xl synthwave-grid-glow border border-primary/20">
              {arcadeGames.map((game) => (
                <GameCard key={game.id} {...game} />
              ))}
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Lightbulb className="h-8 w-8 text-primary mr-3 synthwave-icon-glow" />
              <h2 className="text-3xl md:text-4xl font-bold text-center synthwave-subtitle">Got a Game Idea?</h2>
            </div>
            <p className="text-center text-gray-300 mb-8">
              Have a concept for a mini-game or a cool AI feature you'd love to see us build? Share your vision with us!
            </p>
            <ArcadeContactForm />
          </section>
        </main>
        <BackToTop />
      </div>
      <Footer />
    </>
  )
}
