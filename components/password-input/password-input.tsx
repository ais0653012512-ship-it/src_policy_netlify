'use client'

import { useState, forwardRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    allowToggle?: boolean
    /** Nút hiện mật khẩu (khi đang ẩn) */
    ariaShowPassword: string
    /** Nút ẩn mật khẩu (khi đang hiện) */
    ariaHidePassword: string
    /** Khi không cho bật tắt hiển thị */
    ariaPasswordToggleDisabled: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    (
        {
            className,
            allowToggle = true,
            onChange,
            onKeyDown,
            ariaShowPassword,
            ariaHidePassword,
            ariaPasswordToggleDisabled,
            ...props
        },
        ref
    ) => {
        const [show, setShow] = useState(false)
        const [allowEdit, setAllowEdit] = useState(false)

        const stripSpaces = (value: string) => value.replace(/\s/g, '')

        const toggleAriaLabel = allowToggle
            ? show
                ? ariaHidePassword
                : ariaShowPassword
            : ariaPasswordToggleDisabled

        return (
            <div className={`mv-input mv-activation-input input relative w-full border border-meta-border h-[40px] px-[11px] rounded-[10px] bg-white text-[14px] text-meta-text mb-[10px] transition-all duration-200 ${className ?? ''}`}>
                <input
                    type={show ? 'text' : 'password'}
                    ref={ref}
                    className={'w-full outline-[0] h-full hide-password-toggle'}
                    readOnly={!allowEdit}
                    onFocus={() => setAllowEdit(true)}
                    autoCorrect='off'
                    autoCapitalize='none'
                    spellCheck={false}
                    {...props}
                    autoComplete='off'
                    autoSave='off'
                    data-lpignore='true'
                    data-1p-ignore='true'
                    data-bwignore='true'
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.code === 'Space') {
                            e.preventDefault()
                        }
                        onKeyDown?.(e)
                    }}
                    onChange={(e) => {
                        const cleaned = stripSpaces(e.target.value)
                        onChange?.({
                            ...e,
                            target: { ...e.target, value: cleaned },
                            currentTarget: { ...e.currentTarget, value: cleaned },
                        } as React.ChangeEvent<HTMLInputElement>)
                    }}
                />
                <button
                    type="button"
                    onClick={allowToggle ? () => setShow((prev) => !prev) : undefined}
                    className={`absolute inset-y-0 right-0 flex items-center px-3 ${allowToggle ? 'text-meta-text-secondary cursor-pointer' : 'text-meta-text-muted cursor-default'}`}
                    tabIndex={-1}
                    aria-label={toggleAriaLabel}
                    aria-pressed={allowToggle ? show : undefined}
                >
                    {allowToggle ? (show ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />) : <EyeOff className="w-4 h-4" />}
                </button>

                <style>
                    {`
                        .hide-password-toggle::-ms-reveal,
                        .hide-password-toggle::-ms-clear {
                            display: none;
                        }
                    `}
                </style>
            </div>
        )
    }
)

PasswordInput.displayName = 'PasswordInput'
export default PasswordInput
