import { RichTextLinkFeature } from "@/utilities/RichTextLinkFeature";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";


export const Experiences: CollectionConfig<'experiences'> = {
    slug: 'experiences',
    labels: { plural: 'Experiences', singular: 'Experience' },
    admin: {
        useAsTitle: 'title'
    },
    fields: [
        {
            type: 'text',
            label: 'Title',
            name: 'title',
            required: true,
            admin: {
                description: 'Job title. eg: (Frontend, Backend, DevOps, QA, ...) etc'
            }
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'employmentType',
                    type: 'select',
                    options: [
                        { label: 'Full time', value: 'full-time' },
                        { label: 'Part time', value: 'part-time' },
                        { label: 'Contract', value: 'contract' },
                        { label: 'Freelance', value: 'freelance' },
                        { label: 'Internship', value: 'internship' },
                    ],
                    admin: {
                        width: '33.33%',
                        description: 'Type of employment',
                    },
                },
                {
                    type: 'select',
                    name: 'jobType',
                    options: [
                        { label: 'On Site', value: 'on-site' },
                        { label: 'Remote', value: 'remote' },
                        { label: 'Hybrid', value: 'hybrid' },
                    ],
                    admin: {
                        width: '33.33%',
                        description: 'Choose whether this job is office-based, remote, or a mix (Hybrid).'
                    }
                },
                {
                    type: 'text',
                    label: 'Company',
                    name: 'company',
                    admin: {
                        width: '33.33%',
                    }
                },
                {
                    type: 'date',
                    name: 'start',
                    label: 'Start',
                    admin: {
                        width: '50%',
                        description: 'Employment date / Joining Date'
                    }
                },
                {
                    type: 'date',
                    name: 'end',
                    label: 'End',
                    admin: {
                        width: '50%',
                        description: 'End date of employment. If you are skill employee of the company then leave it. We will show the present text like this (Present)'
                    }
                },
                {
                    name: 'website',
                    type: 'text',
                    admin: {
                        width: '50%',
                        description: 'Company website URL',
                    },
                },
                {
                    name: 'location',
                    type: 'text',
                    admin: {
                        width: '50%',
                        description: 'Location (e.g., "NY - USA", "Remote")',
                    },
                },
            ]
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            admin: {
                width: '50%',
                description: 'Company logo',
            },
        },
        {
            type: 'richText',
            editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures, }) {
                    return [...rootFeatures, RichTextLinkFeature()]
                },
            }),
            name: 'description',
            label: 'Description'
        },
        {
            type: 'relationship',
            relationTo: 'skills',
            name: 'relatedSkills',
            label: 'Related Skills / Tech Stack',
            hasMany: true,
        },
    ]
}