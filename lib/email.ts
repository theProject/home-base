import { ServerClient } from "postmark"

// Initialize Postmark client
const client = new ServerClient(process.env.POSTMARK_API_TOKEN || "")
const fromEmail = process.env.POSTMARK_FROM_EMAIL || "tjsmith@theproject.com"

// Send an email to the site admin
export async function sendAdminNotification(name: string, email: string, subject: string, message: string) {
  return await client.sendEmail({
    From: fromEmail,
    To: fromEmail, // Send to yourself
    Subject: `New Contact Form Submission: ${subject}`,
    HtmlBody: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${message.replace(/\n/g, "<br>")}
      </div>
    `,
    TextBody: `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
    `,
    MessageStream: "outbound",
  })
}

// Send a confirmation email to the user
export async function sendUserConfirmation(name: string, email: string) {
  return await client.sendEmail({
    From: fromEmail,
    To: email,
    Subject: "Thank you for contacting theProject",
    HtmlBody: `
      <h2>Thank you for reaching out!</h2>
      <p>Hello ${name},</p>
      <p>We've received your message and appreciate your interest in theProject. Our team will review your inquiry and get back to you as soon as possible.</p>
      <p>In the meantime, feel free to explore our <a href="https://theproject.com/projects">projects</a> and <a href="https://theproject.com/blog">blog</a> to learn more about our work.</p>
      <p>Best regards,<br>The theProject Team</p>
    `,
    TextBody: `
      Thank you for reaching out!
      
      Hello ${name},
      
      We've received your message and appreciate your interest in theProject. Our team will review your inquiry and get back to you as soon as possible.
      
      In the meantime, feel free to explore our projects and blog to learn more about our work.
      
      Best regards,
      The theProject Team
    `,
    MessageStream: "outbound",
  })
}
