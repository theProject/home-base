import { GameCard, type GameCardProps } from "../components/arcade/game-card"

import { Sparkles, Gamepad2, Lightbulb } from "lucide-react"
import { AuroraBackground } from "../components/aurora-background"
import Header from "../components/header"
import Footer from "../components/footer"
import BackToTop from "../components/back-to-top"

const arcadeGames: GameCardProps[] = [
  {
    id: "1",
    title: "Synth Runner",
    description: "Reset electrical connectors to make your synth-racecar fly again!",
    language: "TypeScript",
    imageUrl: "/synthwave-runner.png",
    reviewScore: 4.8,
    slug: "Psyntax-sadness",
    tags: ["Endless Runner", "Sci-Fi", "Music"],
    ctaLink: "https://frostscript.com",
  },
  {
    id: "2",
    title: "iMagine 3D AI",
    description: "Generate stunning 3D models from your text prompts. Unleash your imagination!",
    language: "Python, Next.js",
    imageUrl: "/ai-3d-model-generation-interface.png",
    reviewScore: 4.2,
    slug: "ai-dream-weaver",
    tags: ["AI", "3D Modeling", "Creative Tool"],
    // Removed className to keep GameCardProps clean
    ctaLink: "https://www.frostscript.com",
  },
  {
    id: "3",
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
    id: "4",
    title: "okayhacker | simulation",
    description: "Master 14 real-world hacking challenges in this terminal-based simulator.",
    language: "React, Next.js",
    imageUrl: "/61817404-0660-44AC-B275-0ACF6A3FBC1F.png",
    reviewScore: 5.0,
    slug: "okayhacker",
    tags: ["Console", "Hacking", "Simulation"],
    ctaLink: "/arcade/okayhacker",
  },
];

export default function ArcadePage() {
  return (
    <>
      <Header />
      <div className="relative min-h-screen bg-gray-900 text-gray-100 overflow-hidden synthwave-bg-dots">
        {/* AuroraBackground doesn't accept className, wrap it */}
        <div className="opacity-30 synthwave-aurora pointer-events-none">
  <AuroraBackground>
    {/* minimal, invisible child to satisfy required `children` */}
    <div />
  </AuroraBackground>
</div>


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

          
        </main>

        <BackToTop />
      </div>
      <Footer />
    </>
  )
}
