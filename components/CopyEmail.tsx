'use client'
import { useState } from 'react'

const EMAIL = 'adityauphade99@gmail.com'

export function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="hi"
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--muted)',
        fontSize: 13,
        fontFamily: 'inherit',
        padding: '4px 8px',
        margin: '-4px -8px',
        position: 'relative',
        display: 'inline-block',
        textAlign: 'left',
      }}
      aria-label="Copy email address"
    >
      {/* Always in DOM → locks button to the email's natural width */}
      <span style={{
        display: 'block',
        whiteSpace: 'nowrap',
        opacity: copied ? 0 : 1,
        transition: 'opacity 0.15s ease',
      }}>
        {EMAIL}
      </span>
      {/* Overlays in the exact same spot; only visible when copied */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '8px',
          transform: 'translateY(-50%)',
          whiteSpace: 'nowrap',
          opacity: copied ? 1 : 0,
          transition: 'opacity 0.15s ease',
          pointerEvents: 'none',
        }}
      >
        Copied!
      </span>
    </button>
  )
}
