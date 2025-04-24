// Replace Postmark with Brevo
import nodemailer from "nodemailer"

// Initialize Brevo transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_SMTP_USER || "",
    pass: process.env.BREVO_SMTP_PASSWORD || "",
  },
})

const fromEmail = process.env.BREVO_FROM_EMAIL || "contact@theproject.com"

// Send an email to the site admin
export async function sendAdminNotification(name: string, email: string, subject: string, message: string) {
  return await transporter.sendMail({
    from: `"theProject Contact" <${fromEmail}>`,
    to: fromEmail, // Send to yourself
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${message.replace(/\n/g, "<br>")}
      </div>
    `,
    text: `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
    `,
  })
}

// Send a confirmation email to the user
export async function sendUserConfirmation(name: string, email: string) {
  return await transporter.sendMail({
    from: `"theProject" <${fromEmail}>`,
    to: email,
    subject: "Thank you for contacting theProject",
    html: `
      <h2>Thank you for reaching out!</h2>
      <p>Hello ${name},</p>
      <p>We've received your message and appreciate your interest in theProject. Our team will review your inquiry and get back to you as soon as possible.</p>
      <p>In the meantime, feel free to explore our <a href="https://theproject.com/projects">projects</a> and <a href="https://theproject.com/blog">blog</a> to learn more about our work.</p>
      <p>Best regards,<br>The theProject Team</p>
    `,
    text: `
      Thank you for reaching out!
      
      Hello ${name},
      
      We've received your message and appreciate your interest in theProject. Our team will review your inquiry and get back to you as soon as possible.
      
      In the meantime, feel free to explore our projects and blog to learn more about our work.
      
      Best regards,
      The theProject Team
    `,
  })
}
