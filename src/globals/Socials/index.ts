import { SocialTypes } from "@/constants/SocialsTypes";
import type { GlobalConfig } from "payload";

export const Socials: GlobalConfig<'socials'> = {
    slug: 'socials',
    fields: [
        {
            type: 'array',
            name: 'socialsLinks',
            labels: { plural: 'Socials Links', singular: 'Social Link' },
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'select',
                            name: 'type',
                            label: 'Type',
                            options: SocialTypes.map(type => ({ label: type, value: type }))
                        },
                        {
                            type: 'text',
                            name: 'link',
                            label: 'Link'
                        }
                    ]
                }
            ]
        }
    ]
}