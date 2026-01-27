import { sdk } from "@/lib/sdk"
import { unstable_cache } from "next/cache"
import { ONE_MONTH_CACHE_TIME } from "../../constants"

const getForm = async (id: number) => await sdk.findByID({ collection: 'forms', id })
export const getFormByFormId = (id: number) =>
    unstable_cache(() => getForm(id), [`get-form-by-id-${id}`], {
        revalidate: ONE_MONTH_CACHE_TIME // Cache for 1 month
    })()