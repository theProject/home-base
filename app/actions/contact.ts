"use server"

import { sendAdminNotification, sendUserConfirmation } from "@/lib/email"
import { insertContactSubmission, initializeDatabase } from "@/lib/db"

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "Please fill out all fields",
    }
  }

  try {
    // Initialize the database if needed
    await initializeDatabase()

    // Store the submission in the database
    await insertContactSubmission(name, email, subject, message)

    // Send email notifications
    await Promise.all([sendAdminNotification(name, email, subject, message), sendUserConfirmation(name, email)])

    return {
      success: true,
      message: "Your message has been sent successfully! We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error processing contact form:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    }
  }
}
