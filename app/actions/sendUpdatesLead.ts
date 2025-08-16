'use server'

import nodemailer from 'nodemailer'
import { pool } from '@/lib/db'

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

  const {
    name = 'Unknown',
    email = '',
    phone = '',
    business = '',
    website = '',
    logo = '',
    project = '',
    contact_phone = '',
    consultation = '',
    wants_consult = 'false',
    monthly_updates = 'false',
    beta_updates = 'false',
    genai_series = 'false',
  } = data as Record<string, string>

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
    // 1. Send Email
    await transporter.sendMail({
      from: `"theProject NFC" <${process.env.BREVO_FROM_EMAIL}>`,
      to: process.env.BREVO_FROM_EMAIL,
      subject: `📥 New NFC Form Submission from ${name}`,
      html,
    })

    // 2. Insert into Neon DB
    await pool.query(
      `
      INSERT INTO nfc_leads (
        name, email, phone, business, website, logo,
        project, contact_phone, wants_consult,
        monthly_updates, beta_updates, genai_series, consultation
      )
      VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9::boolean, $10::boolean, $11::boolean, $12::boolean, $13
      )
    `,
      [
        name,
        email,
        phone,
        business,
        website,
        logo,
        project,
        contact_phone,
        wants_consult === 'true',
        monthly_updates === 'true',
        beta_updates === 'true',
        genai_series === 'true',
        consultation,
      ]
    )

    return {
      success: true,
      message: 'Thanks! Your submission was received.',
    }
  } catch (err) {
    console.error('Error handling lead:', err)
    return {
      success: false,
      message: 'Failed to submit. Please try again later.',
    }
  }
}
