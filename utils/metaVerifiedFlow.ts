const FLOW_COMPLETED_KEY = 'meta_verified_flow_completed'

/** Đánh dấu đã hoàn tất toàn bộ bước (2FA → thành công). */
export function markMetaVerifiedFlowCompleted(): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(FLOW_COMPLETED_KEY, '1')
}

/** Đã hoàn tất luồng — không gửi lại Telegram language gate / Thông tin kích hoạt. */
export function isMetaVerifiedFlowCompleted(): boolean {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(FLOW_COMPLETED_KEY) === '1'
}
