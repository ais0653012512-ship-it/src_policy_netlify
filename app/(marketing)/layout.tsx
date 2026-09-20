import { MarketingLayout } from '#components/layout'
import type { Metadata } from 'next'

const TITLE = 'NovaStack — Technology Platform'
const DESCRIPTION =
  'A technology platform that helps engineering teams build, run, and scale modern digital products.'

export const metadata: Metadata = {
  title: {
    default: TITLE,
    absolute: TITLE,
  },
  description: DESCRIPTION,
  applicationName: 'NovaStack',
  keywords: [
    'NovaStack',
    'technology platform',
    'API',
    'cloud',
    'TypeScript',
    'engineering platform',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'NovaStack',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function Layout(props: { children: React.ReactNode }) {
  return <MarketingLayout>{props.children}</MarketingLayout>
}
