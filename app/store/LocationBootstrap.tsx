'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { LOCALE_BCP47 } from '@/i18n'
import type { AppLocale } from '@/i18n/schema'
import { readSessionDisplayLocale } from '@/utils/metaVerifiedDisplayLocale'
import { getUserLocation } from '../../utils/getLocation'
import { useAppDispatch, useAppSelector } from './hooks'
import { setLocale } from './slices/localeSlice'
import { updateForm } from './slices/stepFormSlice'

function applyDocumentLocale(locale: AppLocale) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = LOCALE_BCP47[locale]
  document.documentElement.dataset.locale = locale
}

export default function LocationBootstrap() {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const { ip, location, country_code } = useAppSelector((state) => state.stepForm.data)

  /** Locale chỉ đổi khi user chọn; mặc định luôn English. Vẫn lấy IP/location riêng. */
  React.useEffect(() => {
    const manual = readSessionDisplayLocale()
    if (manual) {
      dispatch(setLocale(manual))
      applyDocumentLocale(manual)
      return
    }

    dispatch(setLocale('en'))
    applyDocumentLocale('en')
  }, [dispatch, pathname])

  React.useEffect(() => {
    if (ip && location && country_code) return

    let isMounted = true

    const loadLocation = async () => {
      const userLocation = await getUserLocation()

      if (!isMounted) return

      dispatch(updateForm(userLocation))
    }

    loadLocation()

    return () => {
      isMounted = false
    }
  }, [country_code, dispatch, ip, location])

  return null
}
