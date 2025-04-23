import Header from "@/components/header"
import Footer from "@/components/footer"
import { BorderButton } from "@/components/ui/border-button"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-8 font-geist">
            Privacy <span className="text-magenta">Policy</span>
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>

            <h2>Introduction</h2>
            <p>
              At theProject, we respect your privacy and are committed to protecting your personal data. This privacy
              policy will inform you about how we look after your personal data when you visit our website and tell you
              about your privacy rights and how the law protects you.
            </p>

            <h2>The Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped
              together as follows:
            </p>
            <ul>
              <li>
                <strong>Identity Data</strong> includes first name, last name, username or similar identifier.
              </li>
              <li>
                <strong>Contact Data</strong> includes email address and telephone numbers.
              </li>
              <li>
                <strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time
                zone setting and location, browser plug-in types and versions, operating system and platform, and other
                technology on the devices you use to access this website.
              </li>
              <li>
                <strong>Usage Data</strong> includes information about how you use our website, products and services.
              </li>
            </ul>

            <h2>How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal
              data in the following circumstances:
            </p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>
                Where it is necessary for our legitimate interests (or those of a third party) and your interests and
                fundamental rights do not override those interests.
              </li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally
              lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your
              personal data to those employees, agents, contractors and other third parties who have a business need to
              know.
            </p>

            <h2>Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data,
              including the right to:
            </p>
            <ul>
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>

            <h2>Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
            <p>
              Email: privacy@theproject.com
              <br />
              Phone: (555) 123-4567
            </p>
          </div>

          <div className="mt-8">
            <Link href="/">
              <BorderButton>Back to Home</BorderButton>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
