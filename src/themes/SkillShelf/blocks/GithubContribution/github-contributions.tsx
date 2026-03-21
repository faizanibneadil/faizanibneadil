import { Suspense } from "react"
import type { BlockProps } from "@/types"
import { getGitHubContributions } from '@/utilities/github-contributions'
import { GitHubContributionFallback, GithubContributionsGraph } from './github-contributions-graph'
import { getPayloadConfig } from '@/utilities/getPayloadConfig'

export async function GitHubContributionBlock(props: BlockProps<'github-contributions'>) {
  const {
    blockProps,
    params: paramsFromProps,
    searchParams: searchParamsFromProps
  } = props || {}

  const {
    blockType,
    githubContributionGraphConfig,
    graphBlockMargin,
    graphBlockRadius,
    graphBlockSize,
    graphFontSize,
    hideMonthLabels,
    withTooltip,
    blockName,
    id,
    username: usernameFromProps
  } = blockProps || {}

  const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
  const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps

  let username = usernameFromProps
  let contributions: ReturnType<typeof getGitHubContributions> = Promise.resolve([])

  if (githubContributionGraphConfig === 'useSocialUsername') {
    try {
      const payload = await getPayloadConfig()
      const isNumericDomain = !Number.isNaN(Number(params.domain))
      const links = await payload.find({
        collection: 'socials',
        where: {
          or: [
            {
              'tenant.slug': {
                equals: params.domain
              }
            },
            ...(isNumericDomain
              ? [{
                'tenant.id': {
                  equals: Number(params.domain),
                },
              }]
              : []),
          ]
        },
        select: { socialsLinks: true }
      })

      const github = links.docs?.at(0)?.socialsLinks?.find(link => {
        return link.link.includes('github')
      })
      const github_username = new URL(github?.link || '')?.pathname
      username = github_username.replace('/', '')
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
    <Suspense fallback={<GitHubContributionFallback />}>
      <GithubContributionsGraph contributions={contributions} {...props.blockProps} username={username} />
    </Suspense>
  )
}