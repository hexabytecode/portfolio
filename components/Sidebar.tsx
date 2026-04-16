'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CopyEmail } from '@/components/CopyEmail'

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

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sidebar">
      {/* Identity */}
      <div style={{ marginBottom: 48 }}>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            lineHeight: 1.2,
            padding: '3px 6px',
            margin: '-3px -6px',
            borderRadius: 3,
            transition: 'color 0.15s ease',
          }}
          className="hi"
        >
          Aditya Uphade
        </Link>
        <p style={{ fontSize: 12, color: 'var(--subtle)', lineHeight: 1.6, marginTop: 8 }}>
          full stack engineer &amp;<br />frontend lead, Bangalore
        </p>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navLinks.map(({ label, href, external }) => {
          const isActive = !external && pathname === href
          if (external) {
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hi"
                style={{
                  ...linkStyle,
                  color: 'var(--muted)',
                }}
              >
                {label}
                <span style={{ opacity: 0.45, fontSize: 10, marginLeft: 3 }}>↗</span>
              </a>
            )
          }
          return (
            <Link
              key={label}
              href={href}
              className="hi"
              style={{
                ...linkStyle,
                color: isActive ? 'var(--text)' : 'var(--muted)',
                fontWeight: isActive ? 500 : 400,
              }}
            >
              {label}
              {isActive && (
                <span style={{
                  marginLeft: 'auto',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  flexShrink: 0,
                }} />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer — pinned to bottom */}
      <div style={{ marginTop: 'auto', paddingTop: 40, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <CopyEmail />
        {footerLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hi"
            style={{ color: 'var(--muted)', fontSize: 13, padding: '4px 8px', margin: '0 -8px' }}
          >
            {label}
          </a>
        ))}
        <span style={{ fontSize: 11, color: 'var(--subtle)', paddingLeft: 2, paddingTop: 4 }}>© 2026</span>
      </div>
    </aside>
  )
}

const linkStyle: React.CSSProperties = {
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  padding: '6px 8px',
  margin: '0 -8px',
}
