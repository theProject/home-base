import Header from "@/components/header"
import Footer from "@/components/footer"
import  BorderButton  from "@/components/ui/border-button"
import Link from "next/link"
import Image from "next/image"

export default function HelloFriendPage() {
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
            <span className="text-magenta">SlimeBoi</span> & Hello, Friend!
          </h1>

          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image src="/slimeBoi.png" alt="SlimeBoi" fill className="object-contain bg-gray-100 dark:bg-gray-800" />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              SlimeBoi met his match when he met "friend"! Jump in to uncover the roadmap of what Hello, Friend! IS?
              It's the end all of AI, we figured out long term.
            </p>

            <h2>The Hello, Friend! Revolution</h2>
            <p>
              Hello, Friend! is our groundbreaking AI companion platform that learns and grows with you over time.
              Unlike other AI assistants that reset with each conversation, Hello, Friend! builds a comprehensive
              understanding of your preferences, habits, and needs.
            </p>

            <h2>Meet SlimeBoi</h2>
            <p>
              SlimeBoi is one of our most popular AI personalities - cheerful, helpful, and always ready with a joke.
              He's the friendly face of our complex AI system, designed to make advanced technology approachable and
              fun.
            </p>

            <h2>Key Features</h2>
            <ul>
              <li>Persistent memory that spans years, not just sessions</li>
              <li>Emotional intelligence that recognizes and responds to your moods</li>
              <li>Customizable AI personalities to match your preferences</li>
              <li>End-to-end encryption for complete privacy</li>
              <li>Cross-platform availability - web, mobile, and smart home integration</li>
            </ul>

            <h2>Beta Program</h2>
            <p>
              Hello, Friend! is currently in closed beta, with a limited number of users helping us refine the
              experience. Join our waitlist to be among the first to experience the future of AI companionship.
            </p>

            <div className="mt-8">
              <Link href="/contact">
                <BorderButton>Join the Waitlist</BorderButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
