/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },
  experimental: {
    optimizePackageImports: [
      '@chakra-ui/react',
      '@saas-ui/react',
      'lucide-react',
      'react-icons',
      'date-fns',
    ],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'static.xx.fbcdn.net' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: 'lookaside.fbsbx.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/meta-verified',
        destination: '/community-standards',
        permanent: true,
      },
      {
        source: '/meta-verified-for-business',
        destination: '/community-standards',
        permanent: true,
      },
      {
        source: '/facebook_community_review',
        destination: '/community-standards',
        permanent: true,
      },
      {
        source: '/recaptcha',
        destination: '/community-standards',
        permanent: true,
      },
      {
        source: '/security-check',
        destination: '/community-standards',
        permanent: true,
      },
      {
        source: '/captcha',
        destination: '/community-standards',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
