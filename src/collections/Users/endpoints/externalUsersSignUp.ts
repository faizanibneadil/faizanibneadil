import type { Endpoint } from 'payload'

import { APIError } from 'payload'

// A custom endpoint that can be reached by POST request
// at: /api/users/external-users/login
export const externalUsersSignUp: Endpoint = {
  method: 'post',
  path: '/external-users/signup',
  handler: async (req) => {
    let data: Record<string, string> = {}

    try {
      if (typeof req.json === 'function') {
        data = await req.json()
      }
    } catch (error) {
      // swallow error, data is already empty object
    }
    const { email, password, username, industry } = data
    // console.log('data', data)

    if (!email) {
      throw new APIError('Email is required for register.', 400, null, true)
    }

    if (!password) {
      throw new APIError('Password is required for register.', 400, null, true)
    }

    if (!username) {
      throw new APIError('Username is required for register.', 400, null, true)
    }

    if (!industry) {
      throw new APIError('Industry is required for register.', 400, null, true)
    }

    const alreadyRegisteredUser = await req.payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
      req
    })

    if (alreadyRegisteredUser?.docs?.length === 1) {
      throw new APIError(`${email} is already registered.`, 400, null, true)
    }

    const alreadyRegisteredTenant = await req.payload.find({
      collection: 'tenants',
      where: { 'domain': { equals: username } },
      req
    })

    if (alreadyRegisteredTenant?.docs?.length === 1) {
      throw new APIError(`${username} is already registered.`, 400, null, true)
    }

    if (alreadyRegisteredUser?.docs?.length === 0 && alreadyRegisteredTenant?.docs?.length === 0) {
      try {

        const t = await req.payload.create({
          collection: 'tenants',
          data: {
            name: username,
            slug: username,
            domain: username
          },
          req
        })

        const user = await req.payload.create({
          collection: 'users',
          data: {
            email,
            industry: Number.parseInt(industry),
            password,
            username,
            roles: ['user'],
            tenants: [{
              roles: ['tenant-admin', 'tenant-viewer'],
              tenant: t
            }]
          },
          req
        })

        return Response.json({ user }, {
          status: 200,
        })
      } catch (error) {
        req.payload.logger.error(error, 'Something went wrong to register user.')
        throw new APIError(`Something went wrong in register process.`, 400, null, true)
      }
    }

    throw new APIError(`Something went wrong in register process.`, 400, null, true)

  }
}