'use client'
import { use } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
// import { CopyButton } from './CopyButton'
import type { BlockProps } from '@/types'
import { useTheme } from 'next-themes'

export function CodeBlockClient(props: BlockProps<'code-block'>) {
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

    const { theme, systemTheme } = useTheme()

    const themesMap = {
        light: themes.vsLight,
        dark: themes.vsDark
    }

    const themeToUse = themesMap[theme as keyof typeof themesMap] || themesMap[systemTheme as keyof typeof themesMap]

    if (!code || !language) return null

    return (
        <section id="contact" aria-label={blockName ?? blockType} className=" rounded-lg bg-border shadow" data-type='block'>
            {/* <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" /> */}
            {/* <CopyButton code={code} /> */}

            <Highlight code={code} language={language} theme={themeToUse}>
                {({ getLineProps, getTokenProps, tokens }) => (
                    <pre className="p-4 text-xs overflow-x-auto rounded-lg border bg-background no-scrollbar">
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ className: 'table-row', line })}>
                                <span className="table-cell select-none text-right text-muted-foreground pl-4">{i + 1}</span>
                                <span className="table-cell pl-4">
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                    ))}
                                </span>
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
            {/* <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" /> */}
        </section>
    )
}