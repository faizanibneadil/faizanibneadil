import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

const Steps: Record<string, React.ComponentType> = {
    enableHomePage: dynamic(() => import('@/components/OnBoarding/PortfolioHomePage').then(({ PortfolioHomePage }) => ({
        default: PortfolioHomePage
    }))),
    enableIndustry: dynamic(() => import('@/components/OnBoarding/PortfolioIndustry').then(({ PortfolioIndustry }) => ({
        default: PortfolioIndustry
    }))),
    enablePortfolioInfo: dynamic(() => import('@/components/OnBoarding/PortfolioInfo').then(({ PortfolioInfo }) => ({
        default: PortfolioInfo
    }))),
    enableSystemRedirects: dynamic(() => import('@/components/OnBoarding/PortfolioSystemRedirects').then(({ PortfolioSystemRedirect }) => ({
        default: PortfolioSystemRedirect
    }))),
}

export default async function OnBoarding() {
    const headers = await getHeaders()
    const payload = await getPayload({ config })
    const auth = await payload.auth({
        headers
    })

    const onBoardingSteps = Object.entries(auth?.user?.onBoardingProgress ?? {})
    const activeStep = onBoardingSteps.find(([stepKey, stepValue]) => {
        return !Boolean(stepValue)
    })?.at(0)

    if(!auth?.user){
        redirect('/')
    }

    if(!activeStep){
        return null
    }

    const Step = Steps[activeStep as keyof typeof Steps]


    return <Step />
}