import type { CollectionConfig } from 'payload'

import { createAccess } from './access/create'
import { readAccess } from './access/read'
import { updateAndDeleteAccess } from './access/updateAndDelete'
import { externalUsersLogin } from './endpoints/externalUsersLogin'
import { ensureUniqueUsername } from './hooks/ensureUniqueUsername'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { setCookieBasedOnDomain } from './hooks/setCookieBasedOnDomain'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'
import { NavigationGroups } from '@/constants'

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  tenantsCollectionSlug: 'tenants',
  arrayFieldAccess: {},
  tenantFieldAccess: {},
  rowFields: [
    {
      name: 'roles',
      type: 'select',
      defaultValue: ['tenant-viewer'],
      hasMany: true,
      options: ['tenant-admin', 'tenant-viewer'],
      required: true,
    },
  ],
})

export const Users: CollectionConfig<'users'> = {
  slug: 'users',
  trash: true,
  access: {
    create: createAccess,
    delete: updateAndDeleteAccess,
    read: readAccess,
    update: updateAndDeleteAccess,
  },
  admin: {
    useAsTitle: 'email',
    // group: NavigationGroups.management,
  },
  auth: true,
  endpoints: [externalUsersLogin],
  fields: [
    {
      type: 'upload',
      name: 'profile',
      relationTo: 'media',
      label: 'Profile Avatar',
      admin:{ position: 'sidebar'}
    },
    {
      admin: {
        position: 'sidebar',
      },
      saveToJWT: true,
      name: 'roles',
      type: 'select',
      interfaceName: 'TUserRole',
      defaultValue: ['user'],
      hasMany: true,
      options: ['super-admin', 'user'],
      access: {
        update: ({ req }) => {
          return isSuperAdmin(req.user)
        },
      },
    },
    {
      name: 'username',
      type: 'text',
      hooks: {
        beforeValidate: [ensureUniqueUsername],
      },
      index: true,
      // unique: true
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        initCollapsed: true,
        condition: (fields, siblings, ctx) => {
          if (fields?.roles?.includes('user')) {
            return true
          }
          return false
        }
      },
      interfaceName: 'TUserTenants',
      saveToJWT: true
    },
    {
      type: 'relationship',
      relationTo: 'industries',
      hasMany: false,
      saveToJWT: true,
      name: 'Industry',
      admin: {
        allowCreate:false,
        allowEdit:false,
        isSortable:false,
        condition: (fields, siblings, ctx) => {
          if (fields?.roles?.includes('user')) {
            return true
          }
          return false
        }
      }
    }
  ],
  // The following hook sets a cookie based on the domain a user logs in from.
  // It checks the domain and matches it to a tenant in the system, then sets
  // a 'payload-tenant' cookie for that tenant.

  hooks: {
    afterLogin: [setCookieBasedOnDomain],
    afterError: [console.log]
  },
}