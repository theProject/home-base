import { neon, neonConfig } from "@neondatabase/serverless"

// Configure neon to use fetch API
neonConfig.fetchConnectionCache = true

// Create a SQL client with better error handling
const createSqlClient = () => {
  const connectionString = process.env.NEON_DATABASE_URL
  if (!connectionString) {
    console.warn("No NEON_DATABASE_URL provided. Database operations will fail.")
  }
  return neon(connectionString || "")
}

// Create the SQL client lazily only when needed
let sqlClient: ReturnType<typeof neon> | null = null

// Get the SQL client, creating it if necessary
const getSql = () => {
  if (!sqlClient) {
    sqlClient = createSqlClient()
  }
  return sqlClient
}

// Initialize the database by creating the contacts table if it doesn't exist
export async function initializeDatabase() {
  const sql = getSql()
  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `
}

// Insert a new contact form submission
export async function insertContactSubmission(name: string, email: string, subject: string, message: string) {
  const sql = getSql()
  const result = await sql`
    INSERT INTO contacts (name, email, subject, message)
    VALUES (${name}, ${email}, ${subject}, ${message})
    RETURNING id
  `
  return result[0]
}

// Get all contact submissions
export async function getContactSubmissions() {
  const sql = getSql()
  return await sql`SELECT * FROM contacts ORDER BY created_at DESC`
}

export { getSql as sql }
