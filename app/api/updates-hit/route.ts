import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const counterPath = path.resolve(process.cwd(), 'public', 'updates-count.json')

export async function POST() {
  let count = 0

  try {
    if (fs.existsSync(counterPath)) {
      const raw = fs.readFileSync(counterPath, 'utf-8')
      count = JSON.parse(raw).count || 0
    }

    count += 1
    fs.writeFileSync(counterPath, JSON.stringify({ count }), 'utf-8')
  } catch (err) {
    console.error('Error updating counter:', err)
  }

  return NextResponse.json({ count })
}
