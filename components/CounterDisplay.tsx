'use client'

import { useEffect, useState } from 'react'

export default function CounterDisplay() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch('/api/counter', { method: 'GET' })
        const data = await res.json()
        setCount(data.count)
      } catch (err) {
        console.error('Failed to fetch count:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
  }, [])

  if (loading) return <p className="text-white/60">Loading visitors...</p>
  if (count === null) return <p className="text-red-500">Error loading count</p>

  return (
    <p className="text-sm text-white/80 mt-4 text-center">
      <strong>{count}</strong> awesome people have stopped by!
    </p>
  )
}
