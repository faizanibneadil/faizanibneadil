import type { CollectionConfig } from 'payload'

import { createAccess } from './access/create'
import { readAccess } from './access/read'
import { updateAndDeleteAccess } from './access/updateAndDelete'
import { externalUsersLogin } from './endpoints/externalUsersLogin'
import { ensureUniqueUsername } from './hooks/ensureUniqueUsername'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { setCookieBasedOnDomain } from './hooks/setCookieBasedOnDomain'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'

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
  access: {
    create: createAccess,
    delete: updateAndDeleteAccess,
    read: readAccess,
    update: updateAndDeleteAccess,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  endpoints: [externalUsersLogin],
  fields: [
    {
      admin: {
        position: 'sidebar',
      },
      saveToJWT: true,
      name: 'roles',
      type: 'select',
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
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        position: 'sidebar',
      },
    },
    {
      type: 'select',
      name: 'field',
      label: 'Field',
      saveToJWT:true,
      options: [
        { label: "Information Technology (IT)", value: "information_technology" },
        { label: "Healthcare & Medicine", value: "healthcare_medicine" },
        { label: "Engineering", value: "engineering" },
        { label: "Finance & Accounting", value: "finance_accounting" },
        { label: "Sales & Marketing", value: "sales_marketing" },
        { label: "Education & Teaching", value: "education_teaching" },
        { label: "Business Management & Administration", value: "business_management" },
        { label: "Law & Legal Services", value: "law_legal_services" },
        { label: "Media & Communications", value: "media_communications" },
        { label: "Design & Creative Arts", value: "design_creative_arts" },
        { label: "Skilled Trades", value: "skilled_trades" },
        { label: "Hospitality & Tourism", value: "hospitality_tourism" },
        { label: "Logistics & Supply Chain", value: "logistics_supply_chain" },
        { label: "Construction & Real Estate", value: "construction_real_estate" },
        { label: "Customer Service & Support", value: "customer_service" },
        { label: "Data Science & Analytics", value: "data_science_analytics" },
        { label: "Human Resources (HR)", value: "human_resources" },
        { label: "Pharmaceutical & Biotechnology", value: "pharmaceutical_biotech" },
        { label: "Banking & Investment", value: "banking_investment" },
        { label: "Government & Public Sector", value: "government_public_sector" }
      ]
    }
  ],
  // The following hook sets a cookie based on the domain a user logs in from.
  // It checks the domain and matches it to a tenant in the system, then sets
  // a 'payload-tenant' cookie for that tenant.

  hooks: {
    afterLogin: [setCookieBasedOnDomain],
  },
}