import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
export const Hero: Block = {
    slug: 'hero',
    interfaceName: 'IHeroProps',
    fields: [
        {
            type: 'text',
            name: 'nameOnResume',
            label: 'Name On Resume'
        },
        {
            type: 'relationship',
            relationTo: 'media',
            name: 'profile',
            label: 'Profile Image'
        }
    ]
}