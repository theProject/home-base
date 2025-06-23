// components/CodeBlock.tsx
import React from 'react'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

type CodeProps = {
  language?: string
  code?: string
}

export default function CodeBlock({ language, code }: CodeProps) {
  return (
    <pre className="code-block">
      <code data-lang={language}>{code}</code>
    </pre>
  )
}