import React from 'react'

import type { IGithubContributionProps } from '@/payload-types'
import type { PagePropsWithParams } from "@/types"
import { getGitHubContributions } from '@/utilities/github-contributions'
import { GitHubContributionFallback, GithubContributionsGraph } from './github-contributions-graph'
import { getPayloadConfig } from '@/utilities/getPayloadConfig'

export async function GitHubContributionBlock(props: { blockProps: IGithubContributionProps, params: PagePropsWithParams['params'] }) {
  const {
    blockProps: {
      username: usernameFromProps,
      githubContributionGraphConfig
    },
    params: paramsFromProps
  } = props || {}

  let username = usernameFromProps
  let contributions: ReturnType<typeof getGitHubContributions> = Promise.resolve([])

  if (githubContributionGraphConfig === 'useSocialUsername') {
    try {
      const [payload, params] = await Promise.all([getPayloadConfig(), paramsFromProps])
      const links = await payload.find({
        collection: 'socials',
        where: {
          'tenant.slug': { equals: params.domain }
        },
        select: { socialsLinks: true }
      })

      const githubLink = links.docs?.at(0)?.socialsLinks?.find(link => {
        return link.link.includes('github')
      })
      const github = new URL(githubLink?.link || '')?.pathname
      username = github.replace('/','')
      contributions = getGitHubContributions(username)
    } catch (error) {
      console.error('Something wrong to fetch social link', error)
      contributions = Promise.resolve([])
    }
  }

  if (githubContributionGraphConfig === 'useAnotherUsername' && usernameFromProps) {
    contributions = getGitHubContributions(usernameFromProps)
  }

  return (
    <React.Suspense fallback={<GitHubContributionFallback />}>
      <GithubContributionsGraph contributions={contributions} {...props.blockProps} username={username} />
    </React.Suspense>
  )
}