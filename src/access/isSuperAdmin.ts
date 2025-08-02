import type { Access, ClientUser } from 'payload'
import { User } from '../payload-types'

export const isSuperAdminAccess: Access = ({ req }): boolean => {
  return isSuperAdmin(req.user)
}

export const isSuperAdmin = (user: User | ClientUser | null): boolean => {
  return Boolean(user?.roles?.includes('super-admin'))
}