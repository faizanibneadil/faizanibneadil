import { PayloadSDK } from '@payloadcms/sdk'
import type { Config } from '@/payload-types'

export const sdk = new PayloadSDK<Config>({
  baseInit: { credentials: 'include' },
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL! + '/api',
  fetch: async (url,init) => {
    console.log('Before Init')
    const response = await fetch(url,init)
    console.log('After Init')
    return response
  }
})