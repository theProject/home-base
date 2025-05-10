import Header from "@/components/header"
import Footer from "@/components/footer"
import { BorderButton } from "@/components/ui/border-button"
import Link from "next/link"
import Image from "next/image"

export default function ImaginePage() {
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
            <span className="text-magenta">iMagineering</span>
          </h1>

          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image src="/iMagine.png" alt="iMagineering Interface" fill className="object-cover" />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Our state-of-the-art Photo generating and orchestration platform - placing your work with any tool at the
              center of what you do. There is nothing better than iMagineering for creative professionals.
            </p>

            <h2>Unleash Your Creativity</h2>
            <p>
              iMagineering combines advanced AI image generation with intuitive editing tools, allowing artists and
              designers to create stunning visuals with unprecedented ease. Whether you're a professional designer or
              just starting out, iMagineering adapts to your skill level and creative vision.
            </p>

            <h2>Key Features</h2>
            <ul>
              <li>Advanced text-to-image generation with fine-tuned controls</li>
              <li>Seamless integration with industry-standard design tools</li>
              <li>Style transfer and image manipulation with precise parameter control</li>
              <li>Collaborative workspaces for team projects</li>
              <li>Extensive library of styles, textures, and presets</li>
              <li>High-resolution output suitable for commercial printing</li>
            </ul>

            <h2>Use Cases</h2>
            <p>iMagineering is being used by professionals across multiple industries:</p>
            <ul>
              <li>Advertising agencies creating campaign visuals</li>
              <li>Game developers designing concept art</li>
              <li>Publishers producing book covers and illustrations</li>
              <li>Fashion designers exploring new patterns and styles</li>
              <li>Architects visualizing spaces and structures</li>
            </ul>

            <div className="mt-8">
              <Link href="/contact">
                <BorderButton>Start Creating</BorderButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
