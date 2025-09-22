import Header from "@/components/header"
import Footer from "@/components/footer"
import BorderButton  from "@/components/ui/border-button"
import Link from "next/link"
import Image from "next/image"

export default function PoliticalPage() {
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
            <span className="text-magenta">AI / Cloud Power Users</span>
          </h1>

          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image src="/aiDan.png" alt="AI Cloud Infrastructure" fill className="object-cover" />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Come check out some thin systems we've been working on and see the incredible work just talking about
              ideas gets us. Our AI and cloud infrastructure solutions are designed for power users who need maximum
              performance and flexibility.
            </p>

            <h2>Enterprise AI Solutions</h2>
            <p>
              We've developed a suite of AI tools specifically for enterprise clients who need to process massive
              datasets and generate actionable insights. Our systems integrate seamlessly with existing cloud
              infrastructure while providing significant performance improvements.
            </p>

            <h2>Key Technologies</h2>
            <ul>
              <li>Distributed computing architecture for maximum scalability</li>
              <li>Custom neural network configurations optimized for specific industry needs</li>
              <li>Real-time data processing with sub-millisecond latency</li>
              <li>Secure, compliant infrastructure that meets industry standards</li>
              <li>Intuitive interfaces that make complex operations accessible</li>
            </ul>

            <h2>Case Studies</h2>
            <p>
              Our solutions have been implemented across various industries, from healthcare to finance, resulting in
              significant efficiency improvements and cost savings. Clients report an average of 40% reduction in
              processing time and 35% decrease in operational costs.
            </p>

            <div className="mt-8">
              <Link href="/contact">
                <BorderButton>Schedule a Consultation</BorderButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
