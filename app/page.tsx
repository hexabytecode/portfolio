'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AnimatedShapes } from '@/components/AnimatedShapes'
import { CopyEmail } from '@/components/CopyEmail'
import { MetricModal, type MetricData } from '@/components/MetricModal'

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
}

const item = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
}

const navLinks = [
  { label: 'Work',     href: '/work' },
  { label: 'Projects', href: '/projects' },
  { label: 'GitHub',   href: 'https://github.com/hexabytecode', external: true },
  { label: 'Resume',   href: 'https://drive.google.com/file/d/1fCW4BxicHebNve0xj6afuYR2gKsu469R/view?usp=sharing', external: true },
]

const footerLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adityauphade/' },
  { label: 'GitHub',   href: 'https://github.com/hexabytecode' },
]

const highlights: MetricData[] = [
  {
    num: '$100K',
    label: 'raised from a\nsingle demo',
    detail:
      'The investor demo I built for Finance in a Box (FIAB) at Levich closed a $100K seed round on the spot — a live product walkthrough, zero slides. I was the sole frontend engineer: designed the UI, built the demo flow, and shipped everything solo.',
  },
  {
    num: '20,000+',
    label: 'users across\nproducts built',
    detail:
      "At Morningstar, I was the primary SDE-1 on a research platform used by 20,000+ active users. I owned bug triage, feature delivery, and led a full UI revamp that added 1,000+ sign-ups in its first month. At Levich, I built FIAB's frontend from scratch and onboarded the first cohort of 1,000+ users.",
  },
  {
    num: '0→1',
    label: 'twice, as the\nsole engineer',
    detail:
      'Finance in a Box at Levich and Urban Farms Analytics — both products built from empty repo to production, solo. No templates, no handoffs. I owned the architecture, design system, component library, and deployment end to end, on both.',
  },
]

export default function Home() {
  const [openMetric, setOpenMetric] = useState<MetricData | null>(null)

  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(48px, 8vw, 96px) clamp(24px, 6vw, 72px)',
        maxWidth: 680,
      }}
    >
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        style={{ display: 'flex', flexDirection: 'column', gap: 48, flex: 1 }}
      >

        {/* ── HERO ── */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <motion.h1
            variants={item}
            style={{
              fontSize: 'clamp(36px, 6vw, 52px)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--text)',
            }}
          >
            Aditya Uphade
          </motion.h1>
          <motion.p
            variants={item}
            style={{ color: 'var(--muted)', fontSize: 14 }}
          >
            full stack engineer &amp; frontend lead,{' '}
            <span style={{ color: 'var(--subtle)' }}>based in Bangalore.</span>
          </motion.p>
        </section>

        {/* ── SHAPES ── */}
        <motion.div variants={item} style={{ width: 'fit-content' }}>
          <AnimatedShapes />
        </motion.div>

        {/* ── NAV ── */}
        <motion.nav
          variants={item}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}
        >
          {navLinks.map(({ label, href, external }) => (
            <NavLink key={label} href={href} external={external}>
              {label}
            </NavLink>
          ))}
        </motion.nav>

        {/* ── HIGHLIGHTS — clickable, open modal ── */}
        <motion.div
          variants={item}
          style={{ display: 'flex', gap: '20px 48px', flexWrap: 'wrap' }}
        >
          {highlights.map(h => (
            <button
              key={h.num}
              onClick={() => setOpenMetric(h)}
              className="hi"
              style={{
                background: 'none',
                border: 'none',
                padding: '6px 10px',
                margin: '-6px -10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(22px, 4vw, 28px)',
                  fontWeight: 600,
                  color: 'var(--gold)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {h.num}
              </span>
              <span style={{ fontSize: 11, color: 'var(--subtle)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                {h.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── STATEMENT ── */}
        <motion.p
          variants={item}
          style={{
            color: 'var(--muted)',
            fontSize: 14,
            lineHeight: 1.85,
            maxWidth: 460,
          }}
        >
          led both builds solo — from blank repo to live product. one investor demo raised
          $100K in seed funding on the spot. care about the decisions that compound:
          architecture, design systems, and code that teams can actually own.
        </motion.p>

        {/* ── FOOTER ── */}
        <motion.footer
          variants={item}
          style={{
            marginTop: 'auto',
            paddingTop: 48,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', alignItems: 'center' }}>
            <CopyEmail />
            {footerLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hi"
                style={{ color: 'var(--muted)', fontSize: 13, padding: '4px 8px', margin: '-4px -8px' }}
              >
                {label}
              </a>
            ))}
          </div>
          <span style={{ color: 'var(--subtle)', fontSize: 12, paddingLeft: 2 }}>© 2026</span>
        </motion.footer>

      </motion.div>

      <MetricModal metric={openMetric} onClose={() => setOpenMetric(null)} />
    </main>
  )
}

function NavLink({
  href,
  external,
  children,
}: {
  href: string
  external?: boolean
  children: React.ReactNode
}) {
  const style: React.CSSProperties = {
    color: 'var(--muted)',
    fontSize: 13,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 3,
    padding: '4px 8px',
    margin: '-4px -8px',
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="hi" style={style}>
        {children}
        <span style={{ opacity: 0.5, fontSize: 10 }}>↗</span>
      </a>
    )
  }
  return (
    <Link href={href} className="hi" style={style}>
      {children}
    </Link>
  )
}
