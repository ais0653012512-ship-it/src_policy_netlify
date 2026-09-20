'use client'

import { usePathname } from 'next/navigation'
import * as React from 'react'

import { useAppSelector } from '@/app/store/hooks'
import { getSiteDescription, getSiteTitle } from '@/utils/siteTitle'

/** Chỉ đồng bộ title Community Standards — không ghi đè landing `/` */
const SYNC_PREFIXES = ['/community-standards', '/metadata']

export default function TitleSync() {
  const locale = useAppSelector((s) => s.locale.locale)
  const pathname = usePathname()

  React.useEffect(() => {
    if (typeof document === 'undefined') return

    const shouldSync =
      !!pathname &&
      SYNC_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))

    if (!shouldSync) return

    document.title = getSiteTitle(locale)
    const description = getSiteDescription(locale)
    document
      .querySelectorAll(
        'meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]',
      )
      .forEach((el) => el.setAttribute('content', description))
  }, [locale, pathname])

  return null
}
