import { redirect } from 'next/navigation'

/** Không còn dùng trang reCAPTCHA — chuyển thẳng vào Community Standards. */
export default function Page() {
  redirect('/community-standards')
}
