import Header from "@/components/header"
import Footer from "@/components/footer"
import BorderButton  from "@/components/ui/border-button"
import Link from "next/link"
import Image from "next/image"

export default function GoogooitPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/projects" className="inline-flex items-center text-magenta mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Projects
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 font-geist">
            <span className="text-magenta">darkFrost</span>
          </h1>

          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image src="/darkFrostArt.png" alt="darkFrost" fill className="object-cover" />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Welcome to darkFrost - where we are engaged to build the ultimate game. The one that never ends. This is
              our flagship project, representing years of development and our vision for the future of immersive gaming.
            </p>

            <h2>A Living World</h2>
            <p>
              darkFrost is set in a persistent world that continues to evolve whether you're playing or not. The actions
              of every player have lasting consequences, shaping the landscape, politics, and history of this rich
              fantasy universe.
            </p>

            <h2>Endless Adventure</h2>
            <p>
              Unlike traditional games with defined endings, darkFrost is designed to be a perpetual experience. Our
              procedural storytelling engine creates unique quests and challenges based on your character's history,
              ensuring that no two players will have the same experience.
            </p>

            <h2>Key Features</h2>
            <ul>
              <li>Persistent world that evolves in real-time</li>
              <li>Dynamic weather and seasonal systems that affect gameplay</li>
              <li>Player-driven economy with real supply and demand</li>
              <li>Faction system with complex political relationships</li>
              <li>Skill-based combat with hundreds of unique abilities</li>
              <li>Housing and territory control</li>
              <li>Crafting system with millions of possible combinations</li>
            </ul>

            <h2>Development Status</h2>
            <p>
              darkFrost is currently in closed alpha testing. Our team is working diligently to refine the core systems
              and expand the world. We're selectively adding testers who can provide valuable feedback as we move toward
              our beta phase.
            </p>

            <div className="mt-8">
              <Link href="/contact">
                <BorderButton>Apply for Alpha Access</BorderButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
