'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { setLocale } from '@/app/store/slices/localeSlice'
import { LOCALE_BCP47 } from '@/i18n'
import { APP_LOCALES, type AppLocale } from '@/i18n/schema'
import { LOCALE_OPTION_LABELS } from '@/i18n/localeOptionLabels'
import { useAppStrings } from '@/hooks/useAppStrings'
import { LANG_MODAL_SEEN_KEY, writeSessionDisplayLocale } from '@/utils/metaVerifiedDisplayLocale'

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
  const [draftLocale, setDraftLocale] = React.useState<AppLocale>(currentLocale)
  const selectId = 'mv-lang-modal-select'

  React.useEffect(() => {
    if (isOpen) setDraftLocale(currentLocale)
  }, [isOpen, currentLocale])

  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const canConfirm = draftLocale !== currentLocale

  const markSeen = () => {
    try {
      localStorage.setItem(LANG_MODAL_SEEN_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  const handleClose = () => {
    markSeen()
    onClose()
  }

  const handleConfirm = () => {
    if (!canConfirm) return
    writeSessionDisplayLocale(draftLocale)
    dispatch(setLocale(draftLocale))
    applyDocumentLang(draftLocale)
    markSeen()
    onClose()
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
              <button type="button" className="mv-lang-modal-btn mv-lang-modal-btn--cancel" onClick={handleClose}>
                {t.languagePicker.cancel}
              </button>
              <button
                type="button"
                className="mv-lang-modal-btn mv-lang-modal-btn--confirm"
                disabled={!canConfirm}
                onClick={handleConfirm}
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
