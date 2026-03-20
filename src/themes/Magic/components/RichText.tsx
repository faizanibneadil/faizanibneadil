import RichText from '@/components/RichText'
import type { PageProps } from '@/types'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { hasText } from '@payloadcms/richtext-lexical/shared'
import dynamic from 'next/dynamic'

const CodeBlock = dynamic(() => import('../blocks/Code/CodeBlock').then(({ CodeBlock }) => CodeBlock))
const FormBlock = dynamic(() => import('../blocks/Form/form-block').then(({ FormBlock }) => FormBlock))

export function MagicRichText(props: {
    data: DefaultTypedEditorState | null | undefined,
    params: Awaited<PageProps['params']>,
    searchParams: Awaited<PageProps['searchParams']>,
    enableGutter?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {

    const {
        data: editorState,
        params: paramsFromProps,
        searchParams: searchParamsFromProps,
        enableGutter
    } = props || {}

    if (!editorState) {
        return null
    }

    if (!hasText(editorState)) {
        return null
    }

    return <RichText {...props} enableGutter={enableGutter} data={editorState} params={paramsFromProps} searchParams={searchParamsFromProps} blocks={{
        "code-block": ({ node }) => <CodeBlock blockProps={node.fields} params={props.params} searchParams={props.searchParams} />,
        formBlock: ({ node }) => <FormBlock blockProps={node.fields} params={props.params} searchParams={props.searchParams} />
    }} />
}