// components/CodeBlock.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'

type CodeProps = {
  language?: string
  code?: string
}

export default function CodeBlock({ language = 'javascript', code = '' }: CodeProps) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  const className = language ? `language-${language}` : undefined

  return (
    <pre className="code-block">
      <code ref={codeRef} className={className} data-lang={language}>
        {code}
      </code>
    </pre>
  )
}