import { APP_LOCALES, type AppLocale } from '@/i18n/schema'

const LEGACY_LOCAL_STORAGE_KEY = 'meta_verified_display_locale'
const SESSION_KEY = 'meta_verified_session_ui_locale'
export const LANG_MODAL_SEEN_KEY = 'meta_verified_lang_modal_seen'

function clearLegacyLocalStorage() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(LEGACY_LOCAL_STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

export function readSessionDisplayLocale(): AppLocale | null {
  if (typeof window === 'undefined') return null
  clearLegacyLocalStorage()
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  return (APP_LOCALES as readonly string[]).includes(raw) ? (raw as AppLocale) : null
}

export function writeSessionDisplayLocale(locale: AppLocale) {
  clearLegacyLocalStorage()
  sessionStorage.setItem(SESSION_KEY, locale)
}

