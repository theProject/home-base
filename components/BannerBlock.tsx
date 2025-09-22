// components/BannerBlock.tsx
import React from 'react'

type BannerProps = {
  // match whatever fields your Banner block uses in Payload
  headline?: string
  backgroundImage?: string
  children?: React.ReactNode
}

export default function BannerBlock({ headline, backgroundImage, children }: BannerProps) {
  return (
    <section
      className="banner-block"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
      }}
    >
      {headline && <h2 className="banner-headline">{headline}</h2>}
      <div className="banner-content">{children}</div>
    </section>
  )
}
