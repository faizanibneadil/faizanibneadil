import { isSuperAdminAccess } from "@/access/isSuperAdmin";
import { TitleField } from "@/fields/title";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Shelves:CollectionConfig<'shelves'> = {
    slug: 'shelves',
    labels: { plural: 'shelves', singular: 'shelf' },
    trash: true,
    // access: {
    //     create: isSuperAdminAccess,
    //     delete: isSuperAdminAccess,
    //     read: () => true,
    //     update: isSuperAdminAccess,
    // },
    admin: {
        useAsTitle: 'title'
    },
    fields: [
        TitleField(),
        {
            type: 'upload',
            relationTo: 'media',
            name: 'thumbnail',
            label: 'Thumbnail'
        },
        {
            type: 'richText',
            editor: lexicalEditor(),
            name: 'description'
        }
    ]
}