// app/components/LexicalRenderer.tsx
'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export default function LexicalRenderer({
  data,
}: {
  data: SerializedEditorState
}) {
  return (
    <RichText
      data={data}
      converters={({ defaultConverters }) => ({
        ...defaultConverters,
        blocks: {
          ...defaultConverters.blocks,
          // stub out custom blocks so they don’t throw converter errors
          mediaBlock: () => null,
          banner: () => null,
          code: () => null,
        },
      })}
    />
  )
}
