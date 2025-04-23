import { NextResponse } from "next/server"
import { getContactSubmissions, initializeDatabase } from "@/lib/db"

export async function GET() {
  try {
    // Initialize the database if needed
    await initializeDatabase()

    // Get all contact submissions
    const contacts = await getContactSubmissions()

    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}
