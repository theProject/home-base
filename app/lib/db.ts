// app/lib/db.ts
import { Pool } from "@neondatabase/serverless"

if (!process.env.NEON_DATABASE_URL) {
  console.warn("No NEON_DATABASE_URL provided—database operations will fail.")
}

export const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
})

// Typing `err` fixes the implicit-any error
pool.on("error", (err: Error) => {
  console.error("Unexpected idle client error", err)
})

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
