import type { NextConfig } from "next"

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  output: undefined,
  images: {
    unoptimized: true,
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: securityHeaders,
    },
  ],
  turbopack: {
    resolveAlias: {
      'onnxruntime-node': '',
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'onnxruntime-node': false,
      }
    }
    return config
  },
}

export default nextConfig
