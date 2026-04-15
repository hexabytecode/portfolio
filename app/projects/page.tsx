'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
}

const item = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] } },
}

const projects = [
  {
    num: '01',
    name: 'VectorShift Clone',
    desc: 'Modular NodeBase pipeline builder with ReactFlow. Kahn\'s Algorithm for DAG validation (100% accuracy). FastAPI backend cut API latency to 320ms.',
    tags: ['React', 'ReactFlow', 'FastAPI', 'Python'],
    href: 'https://github.com/hexabytecode',
    linkType: 'github' as const,
    featured: false,
  },
  {
    num: '02',
    name: 'QKart — E-Commerce',
    desc: 'Full-stack e-commerce platform with JWT auth and REST APIs. Improved cross-device compatibility and cut app load time by 20%.',
    tags: ['React', 'Node.js', 'JWT', 'Material UI'],
    href: 'https://github.com/hexabytecode',
    linkType: 'github' as const,
    featured: false,
  },
]

export default function Projects() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        padding: 'clamp(48px, 8vw, 96px) clamp(24px, 6vw, 72px)',
        maxWidth: 700,
      }}
    >
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        style={{ display: 'flex', flexDirection: 'column', gap: 64 }}
      >

        {/* ── BACK ── */}
        <motion.div variants={item}>
          <Link
            href="/"
            style={{ color: 'var(--muted)', fontSize: 13, transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ← Aditya Uphade
          </Link>
        </motion.div>

        {/* ── LABEL ── */}
        <motion.p
          variants={item}
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}
        >
          Projects
        </motion.p>

        {/* ── LIST ── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map(project => (
            <motion.div key={project.num} variants={item}>
              <ProjectRow {...project} />
            </motion.div>
          ))}

          {/* GitHub link */}
          <motion.div variants={item} style={{ paddingTop: 32 }}>
            <a
              href="https://github.com/hexabytecode"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--muted)',
                fontSize: 13,
                transition: 'color 0.15s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              More on GitHub ↗
            </a>
          </motion.div>
        </div>

      </motion.div>
    </main>
  )
}

function ProjectRow({
  num,
  name,
  desc,
  tags,
  href,
  linkType,
  featured,
}: {
  num: string
  name: string
  desc: string
  tags: string[]
  href: string | null
  linkType?: 'github' | 'live'
  featured: boolean
}) {
  const [hovered, setHovered] = useState(false)

  const inner = (
    <div
      style={{
        padding: '24px 0',
        borderBottom: '1px solid var(--border)',
        transition: 'border-color 0.2s',
        borderColor: hovered ? 'var(--subtle)' : 'var(--border)',
        cursor: href ? 'pointer' : 'default',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 16,
          marginBottom: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span
            style={{
              fontSize: 10,
              color: 'var(--subtle)',
              fontFamily: 'var(--mono)',
              fontWeight: 500,
            }}
          >
            {num}
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: hovered ? 'var(--text)' : 'var(--text)',
              letterSpacing: '-0.01em',
              transition: 'opacity 0.15s',
              opacity: hovered ? 1 : 0.9,
            }}
          >
            {name}
            {featured && (
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  opacity: 0.8,
                }}
              >
                Featured
              </span>
            )}
          </span>
        </div>
        {href && (
          <span
            style={{
              color: 'var(--muted)',
              fontSize: 11,
              fontFamily: 'var(--mono)',
              letterSpacing: '0.04em',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {linkType === 'live' ? 'Live ↗' : 'GitHub ↗'}
          </span>
        )}
      </div>

      <p
        style={{
          color: 'var(--muted)',
          fontSize: 12,
          lineHeight: 1.7,
          maxWidth: 520,
          marginBottom: 12,
          paddingLeft: 22,
        }}
      >
        {desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingLeft: 22 }}>
        {tags.map(tag => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              padding: '3px 8px',
              border: '1px solid var(--border)',
              color: hovered ? 'var(--subtle)' : 'var(--subtle)',
              borderColor: hovered ? 'var(--subtle)' : 'var(--border)',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </a>
    )
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </div>
  )
}
