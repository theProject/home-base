// app/api/updates-hit/route.ts
import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function POST() {
  try {
    const { rows } = await pool.query<{ count: number }>(
      `
      UPDATE nfc_counter
      SET count = count + 1
      WHERE id = 1
      RETURNING count;
      `
    )

    return NextResponse.json({ count: rows[0]?.count ?? 0 })
  } catch (err) {
    console.error('Error updating evergreen counter:', err)
    return NextResponse.json({ error: 'Failed to update count' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { rows } = await pool.query<{ count: number }>(
      `
      SELECT count FROM nfc_counter
      WHERE id = 1;
      `
    )

    return NextResponse.json({ count: rows[0]?.count ?? 0 })
  } catch (err) {
    console.error('Error retrieving evergreen counter:', err)
    return NextResponse.json({ error: 'Failed to retrieve count' }, { status: 500 })
  }
}
