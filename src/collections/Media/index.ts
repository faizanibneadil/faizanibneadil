import type { CollectionConfig } from 'payload'

import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'

export const Media: CollectionConfig = {
  slug: 'media',
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
  upload: true,
}