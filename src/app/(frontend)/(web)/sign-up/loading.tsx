import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="relative w-full md:h-screen md:overflow-hidden">
            <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4">
                <div className="mx-auto space-y-4 sm:w-sm">
                    <div className="flex flex-col space-y-1">
                        <h1 className="font-bold text-2xl tracking-wide">
                            Sign In or Join Now!
                        </h1>
                        <p className="text-base text-muted-foreground">
                            login or create your Skill Shelf account.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="w-14 h-4" />
                                <Skeleton className="w-full h-9" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="w-16 h-4" />
                                <Skeleton className="w-full h-9" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="w-16 h-4" />
                                <Skeleton className="w-full h-9" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="w-12 h-4" />
                                <Skeleton className="w-full h-9" />
                            </div>
                            <Skeleton className="w-full h-9" />
                        </form>
                    </div>
                    <p className="mt-8 text-muted-foreground text-sm">
                        By clicking continue, you agree to our{" "}
                        <a
                            className="underline underline-offset-4 hover:text-primary"
                            href="#"
                        >
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                            className="underline underline-offset-4 hover:text-primary"
                            href="#"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}