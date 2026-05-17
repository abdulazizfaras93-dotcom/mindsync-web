import { withSentryConfig } from '@sentry/nextjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: async () => {
    return new Date().getTime().toString()
  }
}

export default withSentryConfig(nextConfig, {
  // Suppresses source map upload logs during build
  silent: true,
  // Disable source map upload (no auth token configured)
  sourcemaps: { disable: true },
  // Don't auto-instrument server components
  autoInstrumentServerFunctions: false,
})
