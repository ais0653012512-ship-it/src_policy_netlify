'use client'

import React from 'react'

import { useAppStrings } from '@/hooks/useAppStrings'

import Modal from './Modal'

interface SuccessModalProps {
  isOpend: boolean
  onToggleSuccess: (value: boolean) => void
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpend, onToggleSuccess }) => {
  const t = useAppStrings()
  const [isOpen, setIsOpen] = React.useState(isOpend)

  React.useEffect(() => {
    setIsOpen(isOpend)
  }, [isOpend])

  const handleClose = () => {
    setIsOpen(false)
    onToggleSuccess(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      title={t.success.title}
      onClose={handleClose}
      panelClassName="mv-secure-modal"
      titleClassName="mv-modal-title"
      backdropClassName="mv-secure-backdrop"
    >
      <div className="flex min-h-full w-full min-w-0 flex-col gap-6 pb-2 pt-1">
        <div className="w-full min-w-0">
          <div className="mv-secure-success-mark">
            <img src="/images/meta/succes.png" alt="" />
          </div>
          <p className="mv-secure-body mb-3 text-[15px]">{t.success.p1}</p>
          <p className="mv-secure-body mb-4 text-[14px] leading-[1.6]">{t.success.p2}</p>
          <p className="mv-secure-note">{t.success.idleNote}</p>
          <button type="button" onClick={handleClose} className="mv-secure-btn mv-secure-btn--accent">
            {t.success.cta}
          </button>
        </div>

        <div className="mv-secure-footer-logo">
          <img src="/images/meta/logo-gray.svg" width="100%" height="100%" alt="" />
        </div>
      </div>
    </Modal>
  )
}

export default SuccessModal
