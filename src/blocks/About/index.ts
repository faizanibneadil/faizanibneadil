import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const About: Block = {
    slug: 'about',
    interfaceName: 'IAboutProps',
    fields: [
        {
            type: 'richText',
            name: 'content',
            label: 'About Me',
            editor: lexicalEditor()
        },
    ]
}