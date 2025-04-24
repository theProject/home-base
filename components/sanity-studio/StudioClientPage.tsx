'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioClientPage() {
  return (
    // you may need to force 100% height so the desk UI fills the viewport
    <div style={{ height: '100vh' }}>
      <NextStudio config={config} />
    </div>
  )
}
