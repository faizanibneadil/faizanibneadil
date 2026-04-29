import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

export default async (pase: unknown, { defaultConfig }: { defaultConfig: NextConfig }) => {
  return withPayload({
    ...defaultConfig,
    poweredByHeader: false,
    reactCompiler: true,
    typedRoutes: false,
    turbopack: {
      root: path.resolve(dirname),
    },
    devIndicators: {
      position: 'bottom-right'
    },
    webpack: (webpackConfig) => {
      webpackConfig.resolve.extensionAlias = {
        '.cjs': ['.cts', '.cjs'],
        '.js': ['.ts', '.tsx', '.js', '.jsx'],
        '.mjs': ['.mts', '.mjs'],
      }
  
      return webpackConfig
    },
    images: {
      qualities: [100],
      remotePatterns: [
        ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
          const url = new URL(item)

          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', '') as 'http' | 'https',
          }
        }),
      ],
    },
    cacheComponents:true,
    logging: {
      browserToTerminal: true,
      fetches: {
        fullUrl: true,
        hmrRefreshes: true
      },
      serverFunctions: true
    }
  }, { devBundleServerPackages: false })
}