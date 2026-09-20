import { Metadata } from 'next'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'NovaStack',
    description:
      'A technology platform that helps engineering teams build, run, and scale modern digital products.',
  } as Metadata,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        label: 'Bắt đầu',
        href: '#',
        variant: 'primary',
      },
    ],
  },
  footer: {
    copyright: <>© {new Date().getFullYear()} NovaStack</>,
    links: [
      {
        href: 'mailto:hello@novastack.dev',
        label: 'Liên hệ',
      },
    ],
  },
  signup: {
    title: 'NovaStack',
    features: [],
  },
}

export default siteConfig
