import { CodeBlock } from "@payloadcms/richtext-lexical";


export const Code = CodeBlock({
    slug: 'code-block',
    fieldOverrides:{
        interfaceName: 'TCodeBlockProps'
    },
    defaultLanguage: 'js',
    languages: {
        ts: 'TypeScript',
        js: 'JavaScript'
    },
    typescript: {
        fetchTypes: [
            {
                // The index.bundled.d.ts contains all the types for Payload in one file, so that Monaco doesn't need to fetch multiple files.
                // This file may be removed in the future and is not guaranteed to be available in future versions of Payload.
                url: 'https://unpkg.com/payload@3.59.0-internal.8435f3c/dist/index.bundled.d.ts',
                filePath: 'file:///node_modules/payload/index.d.ts',
            },
            {
                url: 'https://unpkg.com/@types/react@19.1.17/index.d.ts',
                filePath: 'file:///node_modules/@types/react/index.d.ts',
            },
        ],
        paths: {
            payload: ['file:///node_modules/payload/index.d.ts'],
            react: ['file:///node_modules/@types/react/index.d.ts'],
        },
        typeRoots: ['node_modules/@types', 'node_modules/payload'],
        // Enable type checking. By default, only syntax checking is enabled.
        enableSemanticValidation: true,
    },
})