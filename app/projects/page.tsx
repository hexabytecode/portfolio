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
    tags: ['React', 'ReactFlow', 'FastAPI', 'Python', 'Tailwind CSS'],
    githubHref: 'https://github.com/hexabytecode/vector-shift-clone',
    liveHref: 'https://super-robot-orpin.vercel.app/',
    featured: false,
  },
  {
    num: '02',
    name: 'QKart — E-Commerce',
    desc: 'Full-stack e-commerce platform with JWT auth and REST APIs. Improved cross-device compatibility and cut app load time by 20%.',
    tags: ['React', 'Node.js', 'JWT', 'Material UI'],
    githubHref: 'https://github.com/hexabytecode/QKart-react',
    liveHref: 'https://qkart-psi-one.vercel.app/',
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
          {projects.map(({ num, name, desc, tags, githubHref, liveHref, featured }) => (
            <motion.div key={num} variants={item}>
              <ProjectRow
                num={num}
                name={name}
                desc={desc}
                tags={tags}
                githubHref={githubHref}
                liveHref={liveHref}
                featured={featured}
              />
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
  githubHref,
  liveHref,
  featured,
}: {
  num: string
  name: string
  desc: string
  tags: string[]
  githubHref?: string
  liveHref?: string
  featured: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '24px 0',
        borderBottom: '1px solid var(--border)',
        transition: 'border-color 0.2s',
        borderColor: hovered ? 'var(--muted)' : 'var(--border)',
      }}
    >
      {/* Name row */}
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
          <span style={{ fontSize: 10, color: 'var(--subtle)', fontFamily: 'var(--mono)', fontWeight: 500 }}>
            {num}
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
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

        {/* Links */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.15s',
          }}
        >
          {githubHref && (
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontSize: 11,
                fontFamily: 'var(--mono)',
                letterSpacing: '0.04em',
                color: 'var(--muted)',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              GitHub ↗
            </a>
          )}
          {liveHref && (
            <a
              href={liveHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontSize: 11,
                fontFamily: 'var(--mono)',
                letterSpacing: '0.04em',
                color: 'var(--gold)',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gold)')}
            >
              Live ↗
            </a>
          )}
        </div>
      </div>

      {/* Description */}
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

      {/* Tags */}
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
              border: '1px solid',
              borderColor: hovered ? 'var(--muted)' : 'var(--border)',
              color: 'var(--subtle)',
              transition: 'border-color 0.2s',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
