import { lexicalEditor, LinkFeature } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const Contact: Block = {
    slug: 'contact',
    interfaceName: 'IContactProps',
    fields: [
        {
            type: 'richText',
            editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures, }) {
                    return [...defaultFeatures, LinkFeature()]
                },
            }),
            name: 'content'
        }
    ]
}