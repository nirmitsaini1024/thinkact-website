import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'TAMI B2P Hub - The Borrower-to-Processor Platform',
  description: 'A unified POS + LP experience, designed for speed, accuracy, and borrower delight.',
}

export default function TAMILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}

