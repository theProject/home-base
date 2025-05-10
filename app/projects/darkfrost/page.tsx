import Header from "@/components/header"
import Footer from "@/components/footer"
import { BorderButton } from "@/components/ui/border-button"
import Link from "next/link"
import Image from "next/image"

export default function DarkFrostPage() {
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
            The Prequel - <span className="text-magenta">darkFrost ~0~</span>
          </h1>

          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image src="/zeroGame.png" alt="DarkFrost Zero" fill className="object-cover" />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Our world is so big, we made a game just for you to learn how deep this goes! DarkFrost Zero is the
              prequel to our upcoming epic adventure game series.
            </p>

            <h2>The World of DarkFrost</h2>
            <p>
              In the frozen lands of Etheria, ancient powers stir beneath the ice. Players take on the role of a young
              hero who discovers they have the ability to control frost and fire - opposing elements that have been at
              war for centuries.
            </p>

            <h2>Card-Based Combat</h2>
            <p>
              DarkFrost Zero introduces our unique card-based combat system, where strategy and timing are key. Collect
              powerful creatures like the Ice Monster and build your deck to face increasingly challenging opponents.
            </p>

            <h2>Development Timeline</h2>
            <ul>
              <li>Alpha Testing: In Progress</li>
              <li>Beta Release: Q3 2025</li>
              <li>Full Release: Q1 2026</li>
            </ul>

            <div className="mt-8">
              <Link href="/contact">
                <BorderButton>Join the Playtest</BorderButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
