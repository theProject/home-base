// app/(public)/privacy/page.tsx  ← adjust path if needed
"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import  BorderButton  from "@/components/ui/border-button"
import Link from "next/link"

export default function PrivacyPage() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <article className="mx-auto max-w-3xl">
          {/* ─────────────────────────────────────────  TITLE  ── */}
          <header className="mb-12">
            <h1 className="font-geist text-5xl font-bold leading-tight">
              Privacy <span className="text-magenta">Policy</span>
            </h1>
            <p className="mt-1 text-sm italic">Last updated: {today}</p>
          </header>

          {/* ================================================================= */}
          {/* 1. Our Core Commitment                                           */}
          <section className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-semibold mt-0 text-magenta">1. Our Core Commitment</h2>
            <p>
              <br></br>
              <strong>Your data is yours—always.</strong> We build every workflow, feature and business process around
              the principle that
              <em> information never moves anywhere without your clear, informed permission.</em> We will never sell,
              rent, barter or otherwise disclose your personal data for third-party advertising purposes.
            </p>
            <p>
              We apply a <b>privacy-by-design</b> methodology across our code base, internal procedures and vendor
              evaluations. Whenever a new feature is proposed, the first checkpoint is: “Can we deliver the value{" "}
              <i>without</i> collecting more data?” If the answer is no, we collect only the minimum required and make
              the data path fully transparent to you.
            </p>
          </section>

          <hr className="my-12 border-t-2 border-magenta" />

          {/* ================================================================= */}
          {/* 2. What We Collect & Why                                         */}
          <section className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-semibold">2. What We Collect&nbsp;&amp;&nbsp;Why</h2>

            <h3 className="mt-6 text-2xl font-semibold text-magenta">2.1 Identity &amp; Contact</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <b>Name &amp; Username</b>
              </li>
              <li>
                <b>Email &amp; Phone</b>
              </li>
              <li>
                <b>User Uploaded Profile &amp; Other User Provided Profile Options</b>
              </li>
            </ul>
            <br />
            <p className="mt-1! text-sm">
              Used to create and secure your account, send notices you consent to and respond to support requests.
            </p>

            <h3 className="mt-6 text-2xl font-semibold  text-magenta">2.2 Technical &amp; Usage</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <b>IP address &amp; device data</b> (browser, OS, time-zone)
              </li>
              <li>
                <b>Interaction data</b> (pages visited, feature usage, crash logs)
              </li>
            </ul>
            <p className="mt-1! text-sm">
              Collected via first-party analytics to keep our platform secure, detect fraud and improve performance.{" "}
              <b>Analytics cookies are opt-in only.</b>
            </p>

            <h3 className="mt-6 text-2xl font-semibold text-magenta">2.3 Content You Provide</h3>
            <p>
              <br></br>
              When you upload files, submit forms or chat with our AI assistants, we store the content so that the
              service can function (e.g.&nbsp;show past chat history).{" "}
              <strong>We retain user-generated content for the life of the account</strong> unless you delete it or
              request erasure. This lifetime retention enables long-term projects and audit trails.
            </p>
          </section>

          <hr className="my-12 border-t-2 border-magenta" />

          {/* ================================================================= */}
          {/* 3. Special Note: “Hello, Friend.” Our Breakthrough Product                     */}
          <section className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-semibold text-magenta">
              3. “Hello,&nbsp;Friend"{" "}
              <span className="text-3xl font-semibold text-white"> Our Breakthrough Product</span>
            </h2>
            <p>
              <br></br>
              <b>Hello,&nbsp;Friend.</b> is an AI-driven conversational tool designed for coaching and mental-wellness
              purposes. Because highly personal data can surface in the conversation, we enforce additional rules:
            </p>
            <ul className="space-y-1">
              <li>
                <b>End-to-End Encryption</b> Chat content is encrypted in transit and at rest. Only you—and the model
                processing pipeline—can view the text.
              </li>
              <li>
                <b>Safeguards for Crisis Language</b> If the model detects credible indications of self-harm, suicide,
                violent extremism or child exploitation, the session is <i>immediately interrupted</i> and you are
                provided with local emergency contacts. No automatic law-enforcement reporting occurs unless required by
                jurisdictional law.
              </li>
              <li>
                <b>No Users Under 18</b> We reserve the right to refuse or terminate service for anyone under 18.
                Accounts identified as being operated by minors are deleted, consistent with the Children’s Online
                Privacy Protection Act (COPPA) and international equivalents.
              </li>
              <li>
                <b>Lifetime Storage with Control</b> Chat logs stay available for as long as your account exists, so you
                can track personal progress over years. You can delete any or all logs at any time from the in-app
                dashboard; deletion is irreversible.
              </li>
            </ul>
          </section>

          <hr className="my-12 border-t-2 border-magenta" />

          {/* ================================================================= */}
          {/* 4. Your Control Panel                                            */}
          <section className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-semibold text-magenta">4. Your Control Panel</h2>
            <br></br>
            <p>Inside every product we ship you will find a dedicated “Privacy” tab allowing you to:</p>
            <ul className="space-y-1">
              <li>
                <b>Download&nbsp;Data</b> Export your entire dataset in JSON or CSV.
              </li>
              <li>
                <b>Delete&nbsp;Data</b> Erase individual items or wipe your whole account.
              </li>
              <li>
                <b>Granular Consents</b> Toggle analytics, marketing emails, beta-feedback, etc.
              </li>
            </ul>
          </section>

          <hr className="my-12 border-t-2 border-magenta" />

          {/* ================================================================= */}
          {/* 5. Lawful Bases                                                  */}
          <section className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-semibold text-magenta">5. Lawful Bases for Processing</h2>
            <br></br>
            <p>We rely on one of the following:</p>
            <ul className="space-y-1">
              <li>
                <b>Consent</b> When you explicitly opt in (e.g.&nbsp;newsletter, analytics).
              </li>
              <li>
                <b>Contract</b> When data is required to deliver or improve a feature you requested.
              </li>
              <li>
                <b>Legal Obligation</b> Where regulators mandate retention (e.g.&nbsp;tax records).
              </li>
              <li>
                <b>Vital Interest</b> Limited to crisis-response scenarios described above.
              </li>
            </ul>
          </section>

          <hr className="my-12 border-t-2 border-magenta" />

          {/* ================================================================= */}
          {/* 6. Security                                                      */}
          <section className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-semibold text-magenta">6. Security Practices</h2>
            <br></br>
            <ul className="space-y-1">
              <li>TLS&nbsp;1.3 for all connections.</li>
              <li>AES-256 encryption at rest within ISO&nbsp;27001-certified data centres.</li>
              <li>MFA-only administrative access with Just-in-Time credentials.</li>
              <li>Quarterly vulnerability scans and semi-annual external penetration tests.</li>
              <li>Continuous audit logging stored on append-only, tamper-evident infrastructure.</li>
            </ul>
          </section>

          <hr className="my-12 border-t-2 border-magenta" />

          {/* ================================================================= */}
          {/* 7. Retention & Deletion                                          */}
          <section className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-semibold text-magenta">7. Retention&nbsp;&amp;&nbsp;Deletion</h2>
            <br></br>
            <p>
              We store personal data only while your account is active or as needed to comply with legal obligations.
              Encrypted off-site backups are rotated every <b>30&nbsp;days</b>; analytics logs are anonymised after{" "}
              <b>14&nbsp;days</b>. When you delete data, we propagate the deletion through live replicas <em>and</em>{" "}
              backups within 30&nbsp;days.
            </p>
          </section>

          <hr className="my-12 border-t-2 border-magenta" />

          {/* ================================================================= */}
          {/* 8. International Compliance                                      */}
          <section className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-semibold text-magenta">8. UK&nbsp;&amp;&nbsp;EU Compliance</h2>
            <br></br>
            <p>
              We adhere to the UK GDPR, EU GDPR, the proposed EU AI Act and the UK Digital Information Bill. Data for
              UK/EU users is processed exclusively inside the EEA/UK, and any onward transfer relies on
              <b> Standard Contractual Clauses (SCCs)</b> and supplementary measures.
            </p>
          </section>

          <hr className="my-12 border-t-2 border-magenta" />

          {/* ================================================================= */}
          {/* 9. Children & COPPA                                              */}
          <section className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-semibold text-magenta">9. Children &amp; COPPA</h2>
            <br></br>
            <p>
              Our services are not directed to children under 13, and we do not knowingly collect data from anyone under
              that age. If we learn that a child under 13 has provided personal information, we will delete it
              immediately. For certain products—including
              <i> Hello,&nbsp;Friend.</i>—we reserve the right to refuse service to anyone under 18 due to the sensitive
              nature of AI-based mental-wellness content.
            </p>
          </section>

          <hr className="my-12 border-t-2 border-magenta" />

          {/* ================================================================= */}
          {/*10. Your Rights                                                   */}
          <section className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-semibold text-magenta">10. Your Rights</h2>
            <br />
            <ul className="space-y-1">
              <li>Access, correct or delete your data.</li>
              <li>Port your data to another controller in a machine-readable format.</li>
              <li>Restrict or object to processing.</li>
              <li>Withdraw consent at any time (without affecting lawful processing before withdrawal).</li>
              <li>Lodge a complaint with your local data-protection authority.</li>
            </ul>
          </section>

          <hr className="my-12 border-t-2 border-magenta" />

          {/* ================================================================= */}
          {/*11. Contact                                                      */}
          <section className="prose prose-lg dark:prose-invert">
            <h2 className="text-3xl font-semibold text-magenta">11. Contact</h2>
            <p>
              <br></br>
              <b>Email</b>: <a href="mailto:privacy@bytheproject.com">privacy@bytheproject.com</a>
              <br />
              <b>Phone</b>: (484) 894-2519
              <br />
              <b>Data Protection Officer</b>: Tristan Smith
            </p>
          </section>
        </article>

        {/* Back to home */}
        <div className="mt-16 text-center">
          <Link href="/">
            <BorderButton size="sm">Back&nbsp;to&nbsp;Home</BorderButton>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
