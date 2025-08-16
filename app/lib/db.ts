import { Pool } from "@neondatabase/serverless"

if (!process.env.NEON_DATABASE_URL) {
  console.warn("No NEON_DATABASE_URL provided—database operations will fail.")
}

export const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
})

pool.on("error", (err: Error) => {
  console.error("Unexpected idle client error", err)
})

// ---------- CONTACTS (Legacy Form) ----------
export type Contact = {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export async function initializeDatabase(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `)
}

export async function insertContactSubmission(
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<number> {
  const { rows } = await pool.query<{ id: number }>(
    `
    INSERT INTO contacts (name, email, subject, message)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
    `,
    [name, email, subject, message]
  )
  return rows[0].id
}

export async function getContactSubmissions(): Promise<Contact[]> {
  const { rows } = await pool.query<Contact>(
    `
    SELECT id, name, email, subject, message, created_at
    FROM contacts
    ORDER BY created_at DESC;
    `
  )
  return rows
}

// ---------- NFC LEADS (Updates Page Submissions) ----------

export type NfcLead = {
  id: number
  name: string
  email: string
  business: string | null
  phone: string | null
  website: string | null
  free_logo: string | null
  project_needs: string | null
  contact_method: string | null
  opted_monthly: boolean
  opted_beta: boolean
  created_at: string
}

export async function insertNfcLead(data: {
  name: string
  email: string
  business?: string
  phone?: string
  website?: string
  free_logo?: string
  project_needs?: string
  contact_method?: string
  opted_monthly?: boolean
  opted_beta?: boolean
}): Promise<void> {
  const {
    name,
    email,
    business,
    phone,
    website,
    free_logo,
    project_needs,
    contact_method,
    opted_monthly = false,
    opted_beta = false,
  } = data

  await pool.query(
    `
    INSERT INTO nfc_leads (
      name, email, business, phone, website,
      free_logo, project_needs, contact_method,
      opted_monthly, opted_beta
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `,
    [
      name,
      email,
      business ?? null,
      phone ?? null,
      website ?? null,
      free_logo ?? null,
      project_needs ?? null,
      contact_method ?? null,
      opted_monthly,
      opted_beta,
    ]
  )
}
