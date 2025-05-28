import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  //experimental: {
  //  serverActions: {
  //    allowedOrigins: [
  //      'http://localhost:3000',
  //      'https://symmetrical-happiness-qj7jggj5w99c6w4q-3000.app.github.dev/'
  //    ]
  //  }
  //}
}

export default withPayload(nextConfig, { devBundleServerPackages: false })