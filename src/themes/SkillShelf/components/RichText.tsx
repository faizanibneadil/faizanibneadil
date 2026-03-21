import RichText from '@/components/RichText'
import type { PageProps } from '@/types'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { hasText } from '@payloadcms/richtext-lexical/shared'
import dynamic from 'next/dynamic'


const CodeBlock = dynamic(() => import('../blocks/Code/CodeBlock').then(({ CodeBlock }) => ({
    default: CodeBlock
})))
const FormBlock = dynamic(() => import('../blocks/Form/form-block').then(({ FormBlock }) => ({
    default: FormBlock
})))
const LinkBadge = dynamic(() => import('../inlineBlocks/LinkBadge').then(({ LinkBadge }) => ({
    default: LinkBadge
})))
const GlimpseLink = dynamic(() => import('../inlineBlocks/glimpseLink').then(({ GlimpseLink }) => ({
    default: GlimpseLink
})))

export function SkillShelfRichText(props: {
    data: DefaultTypedEditorState | null | undefined,
    params: Awaited<PageProps['params']>,
    searchParams: Awaited<PageProps['searchParams']>,
    enableGutter?: boolean
    enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {

    const {
        data: editorState,
        params: paramsFromProps,
        searchParams: searchParamsFromProps,
        enableGutter,
        enableProse,
        className
    } = props || {}

    if (!editorState) {
        return null
    }

    if (!hasText(editorState)) {
        return null
    }

    return <RichText
        {...props}
        className={className}
        enableGutter={enableGutter}
        data={editorState}
        params={paramsFromProps}
        searchParams={searchParamsFromProps}
        enableProse={enableProse}
        blocks={{
            "code-block": ({ node }) => <CodeBlock blockProps={node.fields} params={props.params} searchParams={props.searchParams} />,
            formBlock: ({ node }) => <FormBlock blockProps={node.fields} params={props.params} searchParams={props.searchParams} />
        }}
        inlineBlocks={{
            linkBadge: ({ node }) => <LinkBadge params={props.params} searchParams={props.searchParams} blockProps={node.fields} />,
            glimpseLink: ({ node }) => <GlimpseLink params={props.params} searchParams={props.searchParams} blockProps={node.fields} />
        }}
    />
}