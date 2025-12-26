'use client'
import { Highlight, themes } from 'prism-react-renderer'
import { CopyButton } from './CopyButton'
import { PagePropsWithParams } from '@/types'
import type { TCodeBlockProps } from '@/payload-types'
import { useTheme } from 'next-themes'

export function CodeBlockClient(props: { blockProps: TCodeBlockProps, params: PagePropsWithParams['params'] }) {
    const {
        blockProps: {
            blockType,
            blockName,
            code,
            id,
            language
        },
    } = props || {}

    const { theme, systemTheme } = useTheme()

    const themesMap = {
        light: themes.vsLight,
        dark: themes.vsDark
    }

    const themeToUse = themesMap[theme as keyof typeof themesMap] || themesMap[systemTheme as keyof typeof themesMap]
    
    if (!code || !language) return null

    return (
        <section id="contact" aria-label={blockName ?? blockType} className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-x bg-secondary/80 px-2 py-8 md:px-4 dark:bg-secondary/40">
            <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />
            {/* <CopyButton code={code} /> */}

            <Highlight code={code} language={language} theme={themeToUse}>
                {({ getLineProps, getTokenProps, tokens }) => (
                    <pre className="p-4 text-xs overflow-x-auto">
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ className: 'table-row', line })}>
                                <span className="table-cell select-none text-right text-white/25">{i + 1}</span>
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
            <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
        </section>
    )
}