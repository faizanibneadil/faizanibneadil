import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
export const Me: Block = {
    slug: 'me',
    fields: [
        {
            type: 'text',
            name: 'nameOnResume',
            label: 'Name On Resume'
        },
        {
            type: 'richText',
            name: 'aboutMe',
            label: 'About Me',
            editor: lexicalEditor()
        },
        {
            type: 'relationship',
            relationTo: 'media',
            name: 'profile',
            label: 'Profile Image'
        }
    ]
}