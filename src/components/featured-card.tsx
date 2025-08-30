import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { DualModeImage, DualModeImageProps } from "./dual-mode-image"
import { Card, CardHeader } from "./ui/card"

type CardHeadingProps = {
    icon?: LucideIcon
    title?: string
    description?: string
}

type FeatureCardProps = {
    className?: string
    render?: () => React.ReactNode
    reverse?: boolean
} & CardHeadingProps & { dualModeImageProps?: DualModeImageProps }

export const FeatureCard = ({
    className,
    render,
    title,
    description,
    icon,
    dualModeImageProps,
    reverse = false,
}: FeatureCardProps) => {
    return (
        <Card className={cn('group relative rounded-none shadow-zinc-950/5 border', className)}>
            <CardDecorator />
            {render ? render() : (
                <>
                    {reverse === false && (
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={icon}
                                title={title}
                                description={description}
                            />
                        </CardHeader>
                    )}
                    {dualModeImageProps && (
                        <div className="relative mb-6 border-t border-dashed sm:mb-0">
                            <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,var(--color-blue-600),var(--color-white)_100%)]"></div>
                            <DualModeImage className='w-full' {...dualModeImageProps} />
                        </div>
                    )}
                    {reverse === true && (
                        <CardHeader className="pt-3">
                            <CardHeading
                                icon={icon}
                                title="Real time location tracking"
                                description="Advanced tracking system, Instantly locate all your assets."
                            />
                        </CardHeader>
                    )}
                </>
            )}
        </Card>
    )
}

export const CardDecorator = () => (
    <>
        <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
        <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
        <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
        <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
    </>
)



export const CardHeading = ({ icon: Icon, title, description }: CardHeadingProps) => (
    <div className="p-6">
        <span className="text-muted-foreground flex items-center gap-2">
            {Icon && (
                <Icon className="size-4" />
            )}
            {title}
        </span>
        {description && (
            <p className="mt-8 text-2xl font-semibold">{description}</p>
        )}
    </div>
)