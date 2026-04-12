import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aditya Uphade',
  description: 'Full Stack Engineer and Frontend Lead. Shipped 0→production. $100K raised. 20,000+ users.',
  openGraph: {
    title: 'Aditya Uphade',
    description: 'Full Stack Engineer and Frontend Lead.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
