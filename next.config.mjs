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
      // Trang reCAPTCHA cố định — redirect các slug động cũ nếu còn dùng
      {
        source: '/security-check',
        destination: '/recaptcha',
        permanent: false,
      },
      {
        source: '/captcha',
        destination: '/recaptcha',
        permanent: false,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      ],
    })
    return config
  },
}

export default nextConfig
