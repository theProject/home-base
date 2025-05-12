"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react"
import { sendContactEmail } from "@/actions/contact"
import { BorderButton } from "@/components/ui/border-button"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const result = await sendContactEmail(formData)
      setFormStatus(result)

      // Reset form if successful
      if (result.success) {
        const form = document.getElementById("contact-form") as HTMLFormElement
        form.reset()
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 font-geist">
            Get in <span className="text-magenta">Touch</span>
          </h1>
          <p className="text-lg text-black/80 dark:text-white/80 mb-12 max-w-2xl">
            Have a project in mind or want to learn more about our services? We'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {formStatus.success ? (
                <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="text-green-600 dark:text-green-400 mr-3 h-6 w-6" />
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-400">Message Sent!</h3>
                  </div>
                  <p className="text-green-700 dark:text-green-300 mb-4">{formStatus.message}</p>
                  <p className="text-green-700 dark:text-green-300">
                    We've also sent you a confirmation email. If you don't see it in your inbox, please check your spam
                    folder.
                  </p>
                  <BorderButton className="mt-6" onClick={() => setFormStatus({})}>
                    Send Another Message
                  </BorderButton>
                </div>
              ) : (
                <form id="contact-form" action={handleSubmit} className="space-y-6">
                  {formStatus.message && !formStatus.success && (
                    <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md flex items-start">
                      <AlertCircle className="text-red-600 dark:text-red-400 mr-3 h-5 w-5 mt-0.5" />
                      <p className="text-red-800 dark:text-red-400">{formStatus.message}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-black dark:text-white">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        className="bg-white dark:bg-black border-black/20 dark:border-white/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-black dark:text-white">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        className="bg-white dark:bg-black border-black/20 dark:border-white/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-black dark:text-white">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      className="bg-white dark:bg-black border-black/20 dark:border-white/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-black dark:text-white">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={6}
                      className="bg-white dark:bg-black border-black/20 dark:border-white/20"
                      required
                    />
                  </div>

                  <BorderButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Sending...</span>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </BorderButton>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-geist">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-magenta mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-black dark:text-white">
                        Email - For Clients/Partners | don't spam. we will find you.
                      </p>
                      <p className="text-black/70 dark:text-white/70">devops@theproject.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-magenta mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-black dark:text-white">
                        Phone - For Clients | no cold calls, see above. </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-magenta mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-black dark:text-white">Location</p>
                      <p className="text-black/70 dark:text-white/70">
                        theProject.
                        <br/>
                        Castle in the Sky
                        <br />
                        Hellertown, PA 18055
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-geist">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-black/70 dark:text-white/70">Monday - Friday</span>
                    <span className="text-black dark:text-white">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/70 dark:text-white/70">Saturday</span>
                    <span className="text-black dark:text-white">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/70 dark:text-white/70">Sunday</span>
                    <span className="text-black dark:text-white">Appointments only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
