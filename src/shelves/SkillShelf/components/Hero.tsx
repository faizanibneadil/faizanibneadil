import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Hero: React.FC = () => {
    return (
        <div
            className="relative bg-gradient-to-br from-primary/5 via-muted/50 to-background p-8 md:p-12 border-b border-border/60"
        >
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div
                    className="relative"
                >
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl transform scale-110" />
                    <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-2xl relative">
                        <AvatarImage
                            // src={RESUME_DATA.personalInfo.avatarUrl}
                            alt="Profile picture"
                        />
                        <AvatarFallback className="text-4xl font-bold bg-primary/10 text-primary">
                            asd
                        </AvatarFallback>
                    </Avatar>
                </div>

                <div className="flex-1 space-y-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-2">
                            Faizan Adil
                        </h1>
                        <p className="text-xl md:text-2xl text-primary font-medium tracking-wide">
                            faizan adil
                        </p>
                    </div>

                    <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed text-base md:text-lg">
                        faizan adil
                    </p>
                </div>

                <div className="flex flex-col gap-3 min-w-[160px]">
                    socials
                </div>
            </div>
        </div>
    )
}