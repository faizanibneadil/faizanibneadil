'use server'
import config from '@payload-config'

import { TPortfolioFormValue } from "@/components/OnBoarding/PortfolioInfo";
import { getPayload } from 'payload';

export async function PortfolioInfoUpdate(values: TPortfolioFormValue) {
    try {
        const payload = await getPayload({ config })
        await payload.update({
            collection: 'tenants',
            id: '',
            data: {}
        })
    } catch (error) {

    }
}