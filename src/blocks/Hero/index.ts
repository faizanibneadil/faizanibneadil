import type { Block } from 'payload'
import { RevalidateProfileAvatar } from './hooks/RevalidateProfileAvatar'

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
            type: 'text',
            name: 'headline',
            label: 'Headline',
        },
        {
            type: 'upload',
            relationTo: 'media',
            name: 'profile',
            label: 'Profile Image',
            hooks: {
                afterChange: [RevalidateProfileAvatar()]
            }
        }
    ]
}