'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MetricModal, type MetricData } from '@/components/MetricModal'

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
          {
            num: '$100K',
            label: 'seed raised',
            detail:
              'I built the investor demo solo — a live walkthrough of FIAB\'s multi-level nested tables and permission flows. The demo closed a $100K seed round on the spot, with zero slides. Every pixel of what the investor saw was mine.',
          },
          {
            num: '1,000+',
            label: 'users onboarded',
            detail:
              'Within weeks of launch, FIAB onboarded its first cohort of 1,000+ users. I designed the onboarding flows and RBAC setup wizard that made this possible without a dedicated support team.',
          },
          {
            num: '~50%',
            label: 'onboarding error rate cut',
            detail:
              'Analysed drop-off in the onboarding funnel and rebuilt error states and validation feedback. The onboarding error rate dropped by roughly 50% post-launch.',
          },
          {
            num: '~60%',
            label: 'feature cycle time cut',
            detail:
              'Introduced component-level design tokens and a shared Shadcn config. The team went from design handoff to shipped feature in roughly half the time compared to before.',
          },
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
          {
            num: '20,000+',
            label: 'platform users',
            detail:
              'Primary SDE-1 on Morningstar\'s research platform. I owned bug triage and feature delivery for a live product used by 20,000+ active users across analysts and institutional clients.',
          },
          {
            num: '40%',
            label: 'backlog resolved',
            detail:
              'Inherited a long-standing bug backlog. Triaged, prioritised, and resolved 40% of it within the first few months while simultaneously shipping new features and leading the UI revamp.',
          },
          {
            num: '25%',
            label: 'registration increase',
            detail:
              'Led a full UI revamp of the registration and onboarding flow. In the first month post-launch, sign-ups jumped 25% and the platform added 1,000+ new users.',
          },
        ],
        tags: ['Vue.js', 'Node.js', 'CI/CD', 'AWS', 'Auth0'],
      },
    ],
  },
]

export default function Work() {
  const [openMetric, setOpenMetric] = useState<MetricData | null>(null)

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

        {/* ── BACK — mobile only, sidebar handles this on desktop ── */}
        <motion.div variants={item}>
          <Link
            href="/"
            className="hi"
            style={{ color: 'var(--muted)', fontSize: 13, padding: '4px 8px', margin: '-4px -8px' }}
          >
            ← Aditya Uphade
          </Link>
        </motion.div>

        {/* ── ENTRIES ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          {work.map(({ company, role, period, projects }) => (
            <motion.div key={company} variants={item}>

              {/* Company header */}
              <div
                style={{
                  paddingBottom: 16,
                  borderBottom: '1px solid var(--border)',
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '4px 16px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ fontWeight: 500, fontSize: 15 }}>
                    {company}
                  </span>
                  <span style={{ color: 'var(--subtle)', fontSize: 11, fontFamily: 'var(--mono)', whiteSpace: 'nowrap' }}>
                    {period}
                  </span>
                </div>
                <span style={{ color: 'var(--muted)', fontSize: 13, display: 'block', marginTop: 3 }}>
                  {role}
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
                        <span style={{ fontWeight: 500, fontSize: 13 }}>
                          {proj.name}
                        </span>
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
                        fontSize: 14,
                        lineHeight: 1.8,
                        marginBottom: proj.stats.length ? 20 : 14,
                      }}
                    >
                      {proj.narrative}
                    </p>

                    {proj.stats.length > 0 && (
                      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 14 }}>
                        {proj.stats.map(stat => (
                          <button
                            key={stat.label}
                            onClick={() => setOpenMetric(stat)}
                            className="hi"
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: '6px 10px',
                              margin: '-6px -10px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 2,
                              textAlign: 'left',
                            }}
                          >
                            <span
                              style={{
                                fontSize: 18,
                                fontWeight: 600,
                                color: 'var(--gold)',
                                letterSpacing: '-0.02em',
                                lineHeight: 1,
                              }}
                            >
                              {stat.num}
                            </span>
                            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{stat.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: proj.stats.length ? 8 : 0 }}>
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
                            borderRadius: 3,
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

      <MetricModal metric={openMetric} onClose={() => setOpenMetric(null)} />
    </main>
  )
}
