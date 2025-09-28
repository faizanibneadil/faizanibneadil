import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
// const nextConfig:NextConfig = {
//   // Your Next.js config here
//   turbopack: {
//     root: __dirname
//   }
// }

export default async (pase: unknown, { defaultConfig }: { defaultConfig: NextConfig }) => {
  return withPayload({
    ...defaultConfig,
    poweredByHeader: false,
    turbopack: {
      root: __dirname
    },
    images: {
      remotePatterns: [{ hostname: 'localhost' }]
    }
  }, { devBundleServerPackages: false })
}