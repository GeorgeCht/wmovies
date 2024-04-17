import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // @see: https://nextjs.org/docs/app/api-reference/components/image#minimumcachettl
    minimumCacheTTL: 960,
    // @see: https://nextjs.org/docs/messages/next-image-unconfigured-host
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
