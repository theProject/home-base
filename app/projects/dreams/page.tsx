import Header from "@/components/header"
import Footer from "@/components/footer"
import BorderButton  from "@/components/ui/border-button"
import Link from "next/link"
import Image from "next/image"

export default function DreamsPage() {
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
            <span className="text-magenta">Sleepy Game</span>
          </h1>

          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image src="/sleepyGame.png" alt="Sleepy Game" fill className="object-cover" />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Having four daughters sure lends to some really cool games for the kiddos! Sleepy Game was designed with
              our own children in mind, creating a soothing yet engaging experience that helps transition to bedtime.
            </p>

            <h2>Gameplay</h2>
            <p>
              Guide the friendly moon character through a peaceful night sky, avoiding blocks and collecting stars. The
              gentle pace and soothing colors are designed to calm active minds while still providing an engaging
              challenge.
            </p>

            <h2>Features</h2>
            <ul>
              <li>Progressive difficulty that gets easier as bedtime approaches</li>
              <li>Soothing soundtrack that incorporates sleep-inducing frequencies</li>
              <li>Customizable characters and environments</li>
              <li>Parent dashboard to set play time limits and bedtime schedules</li>
            </ul>

            <h2>Availability</h2>
            <p>
              Sleepy Game is available on iOS and Android devices, with a special version for tablets that includes
              additional bedtime stories and lullabies.
            </p>

            <div className="mt-8">
              <Link href="/contact">
                <BorderButton>Download Now</BorderButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
