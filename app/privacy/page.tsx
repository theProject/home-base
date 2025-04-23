'use client';

import Header from "@/components/header";
import Footer from "@/components/footer";

/**
 * Keep the date string static during SSR so React’s server & client markup match
 * and you avoid the “Text content does not match server-rendered HTML” error.
 * (Runs only on the server; the browser never re-evaluates it.)
 */
const LAST_UPDATED = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
}).format(new Date());

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 font-geist text-4xl font-bold text-black dark:text-white md:text-5xl">
            Privacy <span className="text-magenta">Policy</span>
          </h1>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>Last updated: {LAST_UPDATED}</p>

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
                <strong>Technical Data</strong> includes IP address, browser type and version, time-zone setting,
                location, browser plug-in types and versions, operating system, platform, and other tech on the devices
                you use to access this website.
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
              <li>To perform the contract we are about to enter into or have entered into with you.</li>
              <li>
                Where it is necessary for our legitimate interests (or those of a third party) and your interests and
                fundamental rights do not override those interests.
              </li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally
              lost, used or accessed in an unauthorised way, altered, or disclosed. Access is limited to employees,
              agents, contractors and other third parties who have a business need to know.
            </p>

            <h2>Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data-protection laws in relation to your personal data,
              including the right to:
            </p>
            <ul>
              <li>Request access, correction, or erasure of your personal data.</li>
              <li>Object to or request restriction of processing.</li>
              <li>Request transfer of your data.</li>
              <li>Withdraw consent at any time where we rely on consent to process your data.</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
              <br />
              <strong>Email:</strong> devops@theproject.com
              <br />
              <strong>Phone:</strong> (484) 894-2519
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
