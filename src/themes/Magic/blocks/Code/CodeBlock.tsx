import type { BlockProps } from '@/types'
import { CodeBlockClient } from './CodeBlockClient'

export async function CodeBlock(props: BlockProps<'code-block'>) {
  const {
    blockProps,
    params: paramsFromProps,
    searchParams: searchParamsFromProps
  } = props || {}

  const {
    blockType,
    blockName,
    code,
    id,
    language
  } = blockProps || {}

  const params = paramsFromProps instanceof Promise ? await paramsFromProps : paramsFromProps
  const searchParams = searchParamsFromProps instanceof Promise ? await searchParamsFromProps : searchParamsFromProps
  
  if (!code || !language) {
    return null
  }

  return <CodeBlockClient  {...props} />
}