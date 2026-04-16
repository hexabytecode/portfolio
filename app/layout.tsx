import type { Metadata } from 'next'
import './globals.css'
import { CustomCursor } from '@/components/CustomCursor'
import { Sidebar } from '@/components/Sidebar'

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
      <body>
        <CustomCursor />
        <div className="root-layout">
          <Sidebar />
          <div className="root-main">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
