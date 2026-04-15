'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AnimatedShapes } from '@/components/AnimatedShapes'
import { CopyEmail } from '@/components/CopyEmail'

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

const highlights = [
  { num: '$100K',   label: 'raised from a\nsingle demo' },
  { num: '20,000+', label: 'users across\nproducts built' },
  { num: '0→1',     label: 'twice, as the\nsole engineer' },
]

export default function Home() {
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
          <motion.p variants={item} style={{ color: 'var(--muted)', fontSize: 14 }}>
            full stack engineer &amp; frontend lead,{' '}
            <span style={{ color: 'var(--subtle)' }}>based in Bangalore.</span>
          </motion.p>
        </section>

        {/* ── SHAPES ── */}
        <motion.div variants={item}>
          <AnimatedShapes />
        </motion.div>

        {/* ── NAV ── */}
        <motion.nav
          variants={item}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 28px' }}
        >
          {navLinks.map(({ label, href, external }) => (
            <NavLink key={label} href={href} external={external}>
              {label}
            </NavLink>
          ))}
        </motion.nav>

        {/* ── HIGHLIGHTS ── */}
        <motion.div
          variants={item}
          style={{
            display: 'flex',
            gap: '20px 48px',
            flexWrap: 'wrap',
          }}
        >
          {highlights.map(({ num, label }) => (
            <div key={num} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span
                style={{
                  fontSize: 'clamp(22px, 4vw, 28px)',
                  fontWeight: 600,
                  color: 'var(--gold)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {num}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--subtle)',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                }}
              >
                {label}
              </span>
            </div>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', alignItems: 'center' }}>
            <CopyEmail />
            {footerLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--muted)', fontSize: 13, transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {label}
              </a>
            ))}
          </div>
          <span style={{ color: 'var(--subtle)', fontSize: 12 }}>© 2026</span>
        </motion.footer>

      </motion.div>
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
    transition: 'color 0.15s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 3,
  }
  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) =>
      (e.currentTarget.style.color = 'var(--text)'),
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) =>
      (e.currentTarget.style.color = 'var(--muted)'),
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style} {...handlers}>
        {children}
        <span style={{ opacity: 0.5, fontSize: 10 }}>↗</span>
      </a>
    )
  }
  return (
    <Link href={href} style={style} {...handlers}>
      {children}
    </Link>
  )
}
