'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const stagger = {
  animate: { transition: { staggerChildren: 0.07 } },
}

const item = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] } },
}

const work = [
  {
    company: 'Levich',
    role: 'Software Engineer — Full Stack / Frontend Lead',
    period: 'Apr 2024 – Present',
    projects: [
      {
        name: 'FIAB — Finance in a Box',
        period: 'Dec 2024 – Present',
        narrative:
          'Sole frontend engineer on a month-end checklist SaaS. Rebuilt UI from scratch on a custom Shadcn design system, shipped a multi-level nested table component, and designed a full RBAC system with module and data-level permissions. The investor demo I built raised $100K in seed funding and onboarded the first cohort of 1,000+ users.',
        stats: [
          { num: '$100K', label: 'seed raised' },
          { num: '1,000+', label: 'users onboarded' },
          { num: '~50%', label: 'onboarding error rate cut' },
          { num: '~60%', label: 'feature cycle time cut' },
        ],
        tags: ['React', 'TypeScript', 'Shadcn/UI', 'RBAC', 'Playwright', 'SpecKit'],
      },
      {
        name: 'Urban Farms — Internal Analytics',
        period: 'Apr – Nov 2024',
        narrative:
          'Internal dashboard for 500+ farming team members to record and analyse field data from mobile devices. Designed a mobile-first component library on Shadcn/UI — every data-entry flow optimised for gloves-on, one-handed use in the field.',
        stats: [],
        tags: ['React', 'Shadcn/UI', 'Mobile-first', 'Data visualisation'],
      },
    ],
  },
  {
    company: 'Morningstar',
    role: 'Software Developer',
    period: 'Aug 2021 – Apr 2023',
    projects: [
      {
        name: '',
        period: '',
        narrative:
          'Primary SDE-1 owner of bug triage and feature enhancements on a platform serving 20,000+ users. Resolved 40% of the outstanding backlog and led a full UI revamp that contributed to 1,000+ sign-ups and a 25% registration increase in the first month post-launch. Automated research article publishing end-to-end, replacing a manual JSON workflow with a scheduled cron pipeline.',
        stats: [
          { num: '20,000+', label: 'platform users' },
          { num: '40%',     label: 'backlog resolved' },
          { num: '25%',     label: 'registration increase' },
        ],
        tags: ['Vue.js', 'Node.js', 'CI/CD', 'AWS', 'Auth0'],
      },
    ],
  },
]

export default function Work() {
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
          Work
        </motion.p>

        {/* ── ENTRIES ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          {work.map(({ company, role, period, projects }) => (
            <motion.div key={company} variants={item}>

              {/* Company header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: '4px 16px',
                  paddingBottom: 16,
                  borderBottom: '1px solid var(--border)',
                  marginBottom: 28,
                }}
              >
                <div>
                  <span style={{ fontWeight: 500, fontSize: 15 }}>{company}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 12, marginLeft: 12 }}>
                    {role}
                  </span>
                </div>
                <span
                  style={{
                    color: 'var(--subtle)',
                    fontSize: 11,
                    fontFamily: 'var(--mono)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {period}
                </span>
              </div>

              {/* Projects */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {projects.map((proj, i) => (
                  <div key={i}>
                    {proj.name && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          flexWrap: 'wrap',
                          gap: '2px 12px',
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ fontWeight: 500, fontSize: 13 }}>{proj.name}</span>
                        {proj.period && (
                          <span style={{ color: 'var(--subtle)', fontSize: 11, fontFamily: 'var(--mono)' }}>
                            {proj.period}
                          </span>
                        )}
                      </div>
                    )}

                    <p
                      style={{
                        color: 'var(--muted)',
                        fontSize: 13,
                        lineHeight: 1.75,
                        marginBottom: proj.stats.length ? 20 : 14,
                      }}
                    >
                      {proj.narrative}
                    </p>

                    {proj.stats.length > 0 && (
                      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 14 }}>
                        {proj.stats.map(({ num, label }) => (
                          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <span
                              style={{
                                fontSize: 18,
                                fontWeight: 600,
                                color: 'var(--gold)',
                                letterSpacing: '-0.02em',
                                lineHeight: 1,
                              }}
                            >
                              {num}
                            </span>
                            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {proj.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            padding: '3px 8px',
                            border: '1px solid var(--border)',
                            color: 'var(--subtle)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </main>
  )
}
