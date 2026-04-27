import type { CollectionConfig } from 'payload'

import { superAdminOrTenantAdminAccess } from '@/access/superAdminOrTenantAdmin'
// import { NavigationGroups } from '@/constants'
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from '@/hooks/RevalidatePage'

export const Media: CollectionConfig<'media'> = {
  slug: 'media',
  labels: { plural: 'Media', singular: 'Media' },
  trash: true,
  defaultPopulate:{
    alt: true,
    createdAt: true,
    filename: true,
    filesize: true,
    focalX: true,
    focalY: true,
    height: true,
    mimeType: true,
    tenant: true,
    thumbnailURL: true,
    updatedAt: true,
    url: true,
    width: true
  },
  admin: { 
    // group: NavigationGroups.portfolio 
  },
  upload: {
    // formatOptions:{
    //   format: 'webp',
    // },
    mimeTypes: ['image/*'],
  },
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: () => true,
    update: superAdminOrTenantAdminAccess,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    afterChange: [RevalidatePageAfterChange({ invalidateRootRoute: true })],
    afterDelete: [RevalidatePageAfterDelete({ invalidateRootRoute: true })]
  }
}