'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { BorderButton } from '@/components/ui/border-button'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { sendContactEmail } from '@/actions/contact'
import Link from 'next/link'

export default function UpdatesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string }>({})
  const [tapCount, setTapCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/updates-hit', { method: 'POST' })
      .then(res => res.json())
      .then(data => setTapCount(data.count))
      .catch(() => setTapCount(null))
  }, [])

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const result = await sendContactEmail(formData)
      setFormStatus(result)
      if (result.success) {
        const form = document.getElementById('updates-form') as HTMLFormElement
        form.reset()
      }
    } catch {
      setFormStatus({ success: false, message: 'Something went wrong. Try again?' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-10"
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold font-geist text-white mb-2">Welcome. You’ve been tapped in.</h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Fill this out and we’ll reach out to create something custom for you — on the house.
            </p>
            {tapCount !== null && (
              <p className="text-magenta mt-2 font-medium">👆 This page has been tapped <b>{tapCount}</b> times via NFC!</p>
            )}
          </div>

          {formStatus.success ? (
            <div className="bg-green-900/30 p-6 rounded-lg border border-green-800">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-green-400 mr-3 h-6 w-6" />
                <h3 className="text-xl font-bold text-green-400">Submission Received</h3>
              </div>
              <p className="text-green-300">{formStatus.message}</p>
              <BorderButton className="mt-6" onClick={() => setFormStatus({})}>
                Submit Another
              </BorderButton>
            </div>
          ) : (
            <form id="updates-form" action={handleSubmit} className="space-y-6">
              {formStatus.message && !formStatus.success && (
                <div className="bg-red-900/30 p-4 rounded-md flex items-start">
                  <AlertCircle className="text-red-400 mr-3 h-5 w-5 mt-0.5" />
                  <p className="text-red-400">{formStatus.message}</p>
                </div>
              )}

              {/* Basic Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Input name="name" required placeholder="Your Name" />
                <Input name="email" required placeholder="Your Email" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input name="business" placeholder="Business Name" />
                <Input name="phone" placeholder="Phone Number" />
              </div>
              <Input name="website" placeholder="Website URL" />

              {/* Project + Logo */}
              <Textarea name="logo" placeholder="Describe your free logo idea..." rows={3} />
              <Textarea name="project" placeholder="Any design/dev/cybersecurity work to discuss?" rows={3} />
              <Input name="contactMethod" placeholder="Preferred method of contact" />

              {/* Consult */}
              <label className="block">
                <input type="checkbox" name="wantsConsult" className="mr-2" />
                I’m interested in a consultation
              </label>
              <Textarea name="consultation" placeholder="Describe what you’d like to consult about" rows={3} />

              {/* Opt-ins */}
              <label className="block">
                <input type="checkbox" name="monthlyUpdates" className="mr-2" />
                Notify me monthly about updates at theProject
              </label>
              <label className="block">
                <input type="checkbox" name="betaUpdates" className="mr-2" />
                Notify me when new products enter beta
              </label>
              <label className="block">
                <input type="checkbox" name="genaiSeries" className="mr-2" />
                I’d like to join the Generative AI & Prompt Engineering hands-on learning series
              </label>

              {/* Privacy */}
              <p className="text-white/60 text-sm">
                🔒 We do not share, sell, or subcontract your contact info. Ever.
              </p>

              <BorderButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit'}
              </BorderButton>
            </form>
          )}

          {/* Mission Statement */}
          <div className="text-center pt-12">
            <p className="italic text-white/70">
              “At theProject, we are <b>relentless</b> — in our pursuit of design that communicates, tech that empowers, and solutions that leave a lasting impact.”
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 text-white/80 mt-8 text-2xl">
            <Link href="https://m.facebook.com/theprojectllc/" target="_blank" aria-label="Facebook">📘</Link>
            <Link href="https://instagram.com/xotheproject" target="_blank" aria-label="Instagram">📷</Link>
            <Link href="https://www.linkedin.com/company/the-project-llc" target="_blank" aria-label="LinkedIn">💼</Link>
            <Link href="https://m.youtube.com/@theprojectdev" target="_blank" aria-label="YouTube">📺</Link>
            <Link href="/theProject.vcf" download className="underline text-sm ml-2 mt-1">📇 Download vCard</Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}