'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isTAMIRoute = pathname?.startsWith('/tami')
  const isHomePage = pathname === '/'

  return (
    <>
      {!isTAMIRoute && <Navbar />}
      <main className="">{children}</main>
      {!isTAMIRoute && !isHomePage && <Footer />}
    </>
  )
}

