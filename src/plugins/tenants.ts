import { isSuperAdmin } from "@/access/isSuperAdmin"
import { getUserTenantIDs } from "@/utilities/getUserTenantIDs"
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant"
import type { Config } from "payload"


export const multiTenancy = multiTenantPlugin<Config>({
    collections: {
        pages: {},
        blogs: {},
        media: {},
        notes: {},
        projects: {},
        educations: {},
        achievements: {},
        certifications: {},
        hackathons: {},
        licenses: {},
        publications: {},
        researches: {},
        skills: {},
        experiences: {},
        "form-submissions": {},
        forms: {},
        menus: { isGlobal: true },
        socials: { isGlobal: true },
        integration: { isGlobal: true },
        "portfolio-settings": { isGlobal: true }
    },
    tenantField: {
        access: {
            read: () => true,
            update: ({ req }) => {
                if (isSuperAdmin(req.user)) {
                    return true
                }
                return getUserTenantIDs(req.user).length > 0
            },
        },
    },
    i18n:{
        translations: {
            en: {
                "nav-tenantSelector-label": 'Portfolios',
                "assign-tenant-button-label": 'Assign Portfolio',
                "field-assignedTenant-label": 'Assigned Portfolio'
            }
        }
    },
    tenantsArrayField: {
        includeDefaultField: false,
    },
    userHasAccessToAllTenants: (user) => isSuperAdmin(user),
})