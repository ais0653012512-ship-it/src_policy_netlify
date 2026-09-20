import type { Metadata, Viewport } from 'next'

import RecaptchaPage from './RecaptchaPage'

const TITLE = 'reCAPTCHA'
const DESCRIPTION =
  'This helps us combat harmful conduct, detect and prevent spam, and maintain the integrity of our Products.'

export const metadata: Metadata = {
  title: {
    absolute: TITLE,
  },
  description: DESCRIPTION,
  applicationName: 'reCAPTCHA',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: '/images/meta/recaptcha.png',
    shortcut: '/images/meta/recaptcha.png',
    apple: '/images/meta/recaptcha.png',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'reCAPTCHA',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function Page() {
  return <RecaptchaPage />
}
