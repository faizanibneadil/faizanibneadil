import type { CollectionConfig } from 'payload'

import { superAdminOrTenantAdminAccess } from '@/access/superAdminOrTenantAdmin'
import { NavigationGroups } from '@/constants'
import { RevalidatePageAfterChange, RevalidatePageAfterDelete } from '@/hooks/RevalidatePage'

export const Media: CollectionConfig = {
  slug: 'media',
  trash: true,
  admin: { group: NavigationGroups.portfolio },
  upload: {
    formatOptions:{
      format: 'webp',
    },
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