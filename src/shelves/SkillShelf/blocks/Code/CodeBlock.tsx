import type { BlockProps } from '@/types'
import { CodeBlockClient } from './CodeBlockClient'

export async function CodeBlock(props: BlockProps<'code-block'>) {
  const {
    blockProps,
    params,
    searchParams
  } = props || {}

  const {
    blockType,
    blockName,
    code,
    id,
    language
  } = blockProps || {}
  
  if (!code || !language) {
    return null
  }

  return <CodeBlockClient  {...props} />
}