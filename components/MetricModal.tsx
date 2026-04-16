'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

export interface MetricData {
  num: string
  label: string
  detail: string
}

export function MetricModal({
  metric,
  onClose,
}: {
  metric: MetricData | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!metric) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [metric, onClose])

  return (
    <AnimatePresence>
      {metric && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(10,10,10,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '32px 28px',
              maxWidth: 420,
              width: '100%',
            }}
          >
            <span
              style={{
                fontSize: 'clamp(38px, 7vw, 52px)',
                fontWeight: 700,
                color: 'var(--gold)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                display: 'block',
                marginBottom: 8,
              }}
            >
              {metric.num}
            </span>

            <span
              style={{
                fontSize: 10,
                color: 'var(--subtle)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 600,
                display: 'block',
                marginBottom: 20,
              }}
            >
              {metric.label.replace('\n', ' ')}
            </span>

            <p
              style={{
                fontSize: 13,
                lineHeight: 1.85,
                color: 'var(--muted)',
              }}
            >
              {metric.detail}
            </p>

            <button
              onClick={onClose}
              className="hi"
              style={{
                marginTop: 28,
                fontSize: 11,
                color: 'var(--subtle)',
                background: 'none',
                border: 'none',
                padding: '4px 6px',
                margin: '28px -6px -4px',
                fontFamily: 'var(--mono)',
                letterSpacing: '0.06em',
                display: 'block',
              }}
            >
              close ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
