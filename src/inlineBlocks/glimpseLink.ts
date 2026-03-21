import { Block } from "payload";

export const glimpseLink:Block = {
    slug: 'glimpseLink',
    interfaceName: 'TGlimpseLink',
    fields: [
        {
            type: 'text',
            name: 'url'
        },
        {
            type: 'text',
            name: 'label'
        }
    ]
}