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
      }}
      aria-label="Copy email address"
    >
      {/* Ghost: always laid out to lock the button's width to the email string */}
      <span style={{ visibility: 'hidden', pointerEvents: 'none', whiteSpace: 'nowrap' }} aria-hidden>
        {EMAIL}
      </span>
      {/* Animated label sits over the ghost, centered */}
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
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
            style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
          >
            {EMAIL}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
