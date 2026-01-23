import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

export default async (pase: unknown, { defaultConfig }: { defaultConfig: NextConfig }) => {
  return withPayload({
    ...defaultConfig,
    poweredByHeader: false,
    reactCompiler: true,
    typedRoutes: false,
    turbopack: {
      root: __dirname,
    },
    devIndicators: {
      position: 'bottom-right'
    },
    images: {
      remotePatterns: [{ hostname: 'localhost' }]
    },
    // cacheComponents:true,
  }, { devBundleServerPackages: false })
}