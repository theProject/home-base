'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { BorderButton } from '@/components/ui/border-button'
import {
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  IdCardIcon,
} from 'lucide-react'
import { sendUpdatesLead } from '@/actions/sendUpdatesLead'
import Link from 'next/link'

/* ---------- Prize banner ---------- */
type PrizeSize = 'small' | 'medium' | 'large'

const PRIZE_COPY: Record<PrizeSize, { title: string; blurb: string; badge: string }> = {
  small: {
    title: 'You won a Small Prize! 🎉',
    blurb: 'Nice pull — grab your sticker or mini swag at the booth.',
    badge: 'S',
  },
  medium: {
    title: 'You won a Medium Prize! 🚀',
    blurb: 'Solid win — claim a wristband or upgraded swag at the booth.',
    badge: 'M',
  },
  large: {
    title: 'You won a LARGE Prize! 🏆',
    blurb: 'Big winner — show this screen to redeem your premium item!',
    badge: 'L',
  },
}

function PrizeBanner({ size }: { size: PrizeSize }) {
  const { title, blurb, badge } = PRIZE_COPY[size]

  const bg =
    size === 'small'
      ? 'bg-teal-600/10 ring-teal-500/40'
      : size === 'medium'
      ? 'bg-fuchsia-600/10 ring-fuchsia-500/40'
      : 'bg-black/60 ring-black/40'

  const stripe =
    size === 'small'
      ? 'from-[#00b3b3] via-black to-[#e20074]'
      : size === 'medium'
      ? 'from-[#e20074] via-black to-[#00b3b3]'
      : 'from-black via-[#e20074] to-[#00b3b3]'

  return (
    <div className={`mb-8 rounded-xl p-5 ring-1 ${bg}`}>
      <div className={`mb-4 h-1 w-full rounded-full bg-gradient-to-r ${stripe}`} />
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xl font-bold">
          {badge}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm opacity-90">{blurb}</p>
          <p className="mt-3 text-xs opacity-70">
            Show this page to our team to redeem. One prize per scan. While supplies last.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------- Counter with animation ---------- */
function AnimatedCounter({ count }: { count: number }) {
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    let frame: number
    let current = 0
    const step = Math.ceil(count / 60) || 1

    function animate() {
      if (current < count) {
        current += step
        if (current > count) current = count
        setDisplayCount(current)
        frame = requestAnimationFrame(animate)
      }
    }

    animate()
    return () => cancelAnimationFrame(frame)
  }, [count])

  return (
    <p className="text-magenta mt-2 font-medium text-center">
      👆 This page has been tapped <b>{displayCount.toLocaleString()}</b> times via NFC!
    </p>
  )
}

export default function UpdatesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string }>({})
  const [tapCount, setTapCount] = useState<number | null>(null)

  // Read ?size= from URL (accepts small|medium|large, case-insensitive; also supports sm/md/lg shorthand)
  const searchParams = useSearchParams()
  const rawSize = (searchParams.get('size') || '').toLowerCase()
  const normalized =
    rawSize === 'sm' ? 'small' :
    rawSize === 'md' ? 'medium' :
    rawSize === 'lg' ? 'large' :
    rawSize
  const prizeSize = (['small', 'medium', 'large'].includes(normalized) ? normalized : null) as PrizeSize | null

  useEffect(() => {
    fetch('/api/updates-hit', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setTapCount(data.count))
      .catch(() => setTapCount(null))
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setIsSubmitting(true)

    try {
      const result = await sendUpdatesLead(formData)
      setFormStatus(result)
      if (result.success) {
        e.currentTarget.reset()
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
          {/* Prize banner (NFC param) */}
          {prizeSize && <PrizeBanner size={prizeSize} />}

          <div className="text-center">
            <h1 className="text-5xl font-bold font-geist text-white mb-2">
              Welcome. You’ve been tapped in.
            </h1>
            <p className="text-white/70 max-w-xl mx-auto">
              You — who received our swag — keep tapping it. New promos every week!
            </p>
            <p className="mt-2">
              Fill this out and we’ll reach out to create a custom designed logo for you —
              <b> on the house</b>. No strings attached.
            </p>

            {tapCount !== null && <AnimatedCounter count={tapCount} />}
          </div>

          {formStatus.success ? (
            <div className="bg-green-900/30 p-6 rounded-lg border border-green-800">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-green-400 mr-3 h-6 w-6" />
                <h3 className="text-xl font-bold text-green-400">Submission Received</h3>
              </div>
              <p className="text-green-300">Thanks! We'll be in touch shortly.</p>
              <BorderButton
                className="mt-6 border-[#e20074] hover:border-[#e20074]"
                onClick={() => setFormStatus({})}
              >
                Submit Another
              </BorderButton>
            </div>
          ) : (
            <form id="updates-form" onSubmit={handleSubmit} className="space-y-6">
              {formStatus.message && !formStatus.success && (
                <div className="bg-red-900/30 p-4 rounded-md flex items-start">
                  <AlertCircle className="text-red-400 mr-3 h-5 w-5 mt-0.5" />
                  <p className="text-red-400">{formStatus.message}</p>
                </div>
              )}

              {/* Basic Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Input name="name" required placeholder="Your Name" className="focus-visible:ring-[#05F2AF]" />
                <Input name="email" required placeholder="Your Email" className="focus-visible:ring-[#05F2AF]" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input name="business" placeholder="Business Name" className="focus-visible:ring-[#05F2AF]" />
                <Input name="phone" placeholder="Phone Number" className="focus-visible:ring-[#05F2AF]" />
              </div>
              <Input name="website" placeholder="Website URL" className="focus-visible:ring-[#05F2AF]" />

              {/* Project + Logo */}
              <Textarea name="logo" placeholder="Describe your free logo idea..." rows={3} className="focus-visible:ring-[#05F2AF]" />
              <Textarea name="project" placeholder="Any design/dev/cybersecurity work to discuss?" rows={3} className="focus-visible:ring-[#05F2AF]" />

              {/* Preferred contact method */}
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium text-white">Preferred contact method</legend>
                <label className="block">
                  <input type="checkbox" name="contact_email" value="email" className="mr-2" /> Email
                </label>
                <label className="block">
                  <input type="checkbox" name="contact_phone" value="phone" className="mr-2" /> Phone
                </label>
              </fieldset>

              {/* Consult */}
              <label className="block">
                <input type="checkbox" name="wantsConsult" className="mr-2" /> I’m interested in a consultation
              </label>
              <Textarea name="consultation" placeholder="Describe what you’d like to consult about" rows={3} className="focus-visible:ring-[#05F2AF]" />

              {/* Opt-ins */}
              <label className="block">
                <input type="checkbox" name="monthlyUpdates" className="mr-2" /> Notify me monthly about updates at theProject
              </label>
              <label className="block">
                <input type="checkbox" name="betaUpdates" className="mr-2" /> Notify me when new products enter beta
              </label>
              <label className="block">
                <input type="checkbox" name="genaiSeries" className="mr-2" /> I’d like to join the Generative AI & Prompt Engineering hands-on learning series
              </label>

              {/* Privacy */}
              <p className="text-white/60 text-sm">
                🔒 We do not share, sell, or subcontract your contact info. Ever.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto mt-4 bg-[#e20074] text-white px-6 py-3 rounded-full shadow-md hover:shadow-[#e20074]/40 transition-all duration-300 text-lg font-semibold"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
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
            <Link href="https://m.facebook.com/theprojectllc/" target="_blank" aria-label="Facebook">
              <Facebook className="text-[#e20074] w-6 h-6" />
            </Link>
            <Link href="https://instagram.com/xotheproject" target="_blank" aria-label="Instagram">
              <Instagram className="text-[#e20074] w-6 h-6" />
            </Link>
            <Link href="https://www.linkedin.com/company/the-project-llc" target="_blank" aria-label="LinkedIn">
              <Linkedin className="text-[#e20074] w-6 h-6" />
            </Link>
            <Link href="https://m.youtube.com/@theprojectdev" target="_blank" aria-label="YouTube">
              <Youtube className="text-[#e20074] w-6 h-6" />
            </Link>
            <a href="/theProject.vcf" download aria-label="Business Card" className="text-[#e20074]">
              <IdCardIcon className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
