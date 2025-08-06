'use server'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.STEP_SERVER,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
})

export async function sendUpdatesLead(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const name = data.name || 'Unknown'
  const email = data.email || 'No email provided'

  const html = `
    <h2>New NFC Landing Page Lead</h2>
    <ul style="font-family: sans-serif; font-size: 14px;">
      ${Object.entries(data)
        .map(
          ([key, value]) =>
            `<li><strong>${key.replace(/([A-Z])/g, ' $1')}:</strong> ${value}</li>`
        )
        .join('\n')}
    </ul>
  `

  try {
    await transporter.sendMail({
      from: `"theProject NFC" <${process.env.BREVO_FROM_EMAIL}>`,
      to: process.env.BREVO_FROM_EMAIL, // Admin destination
      subject: `📥 New NFC Form Submission from ${name}`,
      html,
    })

    return {
      success: true,
      message: 'Thanks! Your submission was received.',
    }
  } catch (err) {
    console.error('Email send error (Brevo):', err)
    return {
      success: false,
      message: 'Failed to send. Please try again later.',
    }
  }
}
