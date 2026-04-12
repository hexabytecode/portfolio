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
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--muted)',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        padding: 0,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        transition: 'color 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
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
            style={{ color: 'var(--gold)' }}
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
