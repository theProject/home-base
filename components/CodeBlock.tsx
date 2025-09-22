// components/CodeBlock.tsx
"use client"

import React, { useEffect, useState } from "react"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-css"
import "prismjs/components/prism-markup"
import "prism-themes/themes/prism-vsc-dark-plus.css"
import "@/styles/prism-custom.css" // Custom styles for the code block

type CodeProps = {
  language?: string
  code?: string
}

export default function CodeBlock({ language = "typescript", code = "" }: CodeProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative mt-8">
      {/* Tab-style container */}
      <div className="absolute -top-3 right-4 z-10 flex items-center space-x-1 rounded-4xl bg-[#000000] px-2 py-1 border border-fuchsia-700/40 shadow-md">
        {language && (
          <div className="rounded-md bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 px-3 py-0.5 text-xs font-semibold text-white">
            {language.toUpperCase()}
          </div>
        )}
        <button
          onClick={handleCopy}
          className="rounded-md bg-[#00e0d8] hover:bg-teal-400 text-black px-3 py-0.5 text-xs font-semibold transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Editor Container */}
      <div className="rounded-4xl bg-[#000000] border border-fuchsia-700/40 shadow-lg overflow-hidden p-4">
        <pre className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-fuchsia-600/40 rounded-3xl">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  )
}
