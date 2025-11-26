import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

export default async (pase: unknown, { defaultConfig }: { defaultConfig: NextConfig }) => {
  return withPayload({
    ...defaultConfig,
    poweredByHeader: false,
    reactCompiler: true,
    // turbopack: {
    //   root: __dirname
    // },
    images: {
      remotePatterns: [{ hostname: 'localhost' }]
    },
    // cacheComponents:true,
  }, { devBundleServerPackages: false })
}