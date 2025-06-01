import { iconField } from "@/fields/icon";
import type { GlobalConfig } from "payload";
import { revalidateSocials } from "./hooks/revalidateSocials";

export const Socials: GlobalConfig<'socials'> = {
    slug: 'socials',
    hooks: {
        afterChange: [revalidateSocials],
    },
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
                            type: 'text',
                            name: 'title',
                            label: 'Title',
                            required: true
                        },
                        {
                            type: 'text',
                            name: 'link',
                            label: 'Link',
                            required: true
                        },
                        iconField
                    ]
                }
            ]
        }
    ]
}