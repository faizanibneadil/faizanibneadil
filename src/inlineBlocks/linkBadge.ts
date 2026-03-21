import { Block } from "payload";

export const linkBadge: Block = {
    slug: 'linkBadge',
    interfaceName: 'TLinkBadge',
    fields: [
        {
            type: 'text',
            name: 'url',
            validate: (value: string | null | undefined) => {
                try {

                    if (!value) {
                        return 'URL is required.'
                    }

                    new URL(value)
                    return true
                } catch (error) {
                    return 'Invalid URL'
                }
            }
        },
        {
            type: 'text',
            name: 'label',
            label: 'Link Label'
        }
    ]
}