import { PagePropsWithParams } from '@/types'
import type { TCodeBlockProps } from '@/payload-types'
import { CodeBlockClient } from './CodeBlockClient'

export async function CodeBlock(props: { blockProps: TCodeBlockProps, params: PagePropsWithParams['params'] }) {
  const {
    blockProps:{
      code,
      language
    },
    params: paramsFromProps
  } = props || {}

  const params = await paramsFromProps
  
  if (!code || !language) {
    return null
  }

  return <CodeBlockClient  {...props} />
}