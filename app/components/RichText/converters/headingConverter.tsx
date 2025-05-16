// app/components/RichText/converters/headingConverter.tsx
import React from 'react'
import type { JSXConverters } from '@payloadcms/richtext-lexical/react'
import type { SerializedHeadingNode } from '@payloadcms/richtext-lexical'

export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    // Use React.ElementType so TS knows it's a valid component/tag
    const Tag = node.tag as React.ElementType

    if (Tag === 'h2') {
      const text = (children as string[])
        .join('')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      return <h2 id={text}>{children}</h2>
    }

    // Fallback for h1, h3, etc.
    return React.createElement(Tag, {}, children)
  },
}