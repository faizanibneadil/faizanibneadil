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
            },
            defaultValue: async ({ req, user }) => {
                try {
                    const avatar = await req.payload.findByID({
                        collection: "users",
                        id: user?.id as number,
                        select: { profile: true },
                        req
                    })

                    const image = avatar?.profile && typeof avatar.profile === 'object'
                        ? avatar.profile?.id
                        : avatar.profile

                    return image
                } catch (error) {
                    req.payload.logger.error({ error }, 'Something went wrong to fetch default profile picture from users collection.')
                    return null
                }
            }
        }
    ]
}