'use server'

import { getPayloadConfig } from "@/utilities/getPayloadConfig"

export async function signup(prevState: any, formData: FormData) {

    const payload = await getPayloadConfig()
    const incomingPayload = {
        email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password'),
        field: formData.get('field'),
    }

    // console.log(incomingPayload)

    if (!incomingPayload.email) {
        return {
            success: false,
            message: 'email is required.',
            initialState: { ...incomingPayload }
        }
    }

    if (!incomingPayload.username) {
        return {
            success: false,
            message: 'username is required.',
            initialState: { ...incomingPayload }
        }
    }

    if (!incomingPayload.password) {
        return {
            success: false,
            message: 'password is required.',
            initialState: { ...incomingPayload }
        }
    }

    if (!incomingPayload.field) {
        return {
            success: false,
            message: 'field is required.',
            initialState: { ...incomingPayload }
        }
    }

    let savedUser: any;
    let error: any;
    const transactionID = await payload.db.beginTransaction()
    try {

        const tenant = await payload.create({
            collection: 'tenants',
            data: {
                name: incomingPayload.username as string,
                slug: incomingPayload.username as string,
                domain: incomingPayload.username as string
            },
            req: { transactionID: transactionID as string | number }
        })

        // console.log({ tenant })

        savedUser = await payload.create({
            collection: 'users',
            data: {
                email: incomingPayload.email as string,
                Industry: Number(incomingPayload.field),
                tenants: [{
                    roles: ['tenant-admin', 'tenant-viewer'],
                    tenant: tenant.id,
                    id: String(tenant.id)
                }],
                password: incomingPayload.password as string,
                username: incomingPayload.username as string,
                roles: ['user']
            },
            req: { transactionID: transactionID as string | number }
        })

        await payload.db.commitTransaction(transactionID as string | number)

        // console.log({ savedUser })

        return {
            success: true,
            user: savedUser,
            message: 'account is created.'
        }
    } catch (err) {
        await payload.db.rollbackTransaction(transactionID as string | number)
        error = err

        return {
            success: true,
            error: error,
            message: 'Something went wrong.'
        }
    }




}