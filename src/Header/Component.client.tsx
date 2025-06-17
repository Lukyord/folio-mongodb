'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header id="header" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="header-nav">
        <Link href="/">
          <p>
            T<span className="font-bit">ana</span>b<span className="font-bit">or</span>dee Tan
            <span className="font-bit">s</span>i<span className="font-bit">r</span>i
          </p>
        </Link>

        <ul className="menu">
          {data.navItems &&
            data.navItems.map((item) => (
              <li key={item.id}>
                <Link href={item.link.url || ''}>{item.link.label}</Link>
              </li>
            ))}
        </ul>
      </div>
    </header>
  )
}
