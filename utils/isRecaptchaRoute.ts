/** Route trang reCAPTCHA — cố định tại `/recaptcha`. */
export function isRecaptchaRoute(pathname: string): boolean {
  if (!pathname) return false
  return pathname === '/recaptcha' || pathname.startsWith('/recaptcha/')
}
