'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
      aria-label="Copy email address"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
          >
            Copied!
          </motion.span>
        ) : (
          <motion.span
            key="email"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {EMAIL}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
