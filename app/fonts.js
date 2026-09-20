import localFont from 'next/font/local'
import { Outfit } from 'next/font/google'

export const optimisticFont = localFont({
    src: '../public/fonts/Optimistic.woff2',
    display: 'swap',
    preload: true,
    variable: '--font-optimistic',
    weight: '300 500 700 900',
})

/** Font riêng cho trang landing Netlify (.app) */
export const landingFont = Outfit({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-landing',
    weight: ['400', '500', '600', '700'],
})
