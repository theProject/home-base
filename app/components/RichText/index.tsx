// app/components/RichText/RichText.tsx
'use client'

import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { jsxConverter } from './converters'

type Props = {
  data: SerializedEditorState
  className?: string
}

export function RichText({ data, className }: Props) {
  return (
    <div className={className}>
      <RichTextConverter
        data={data}
        converters={jsxConverter}
      />
    </div>
  )
}
