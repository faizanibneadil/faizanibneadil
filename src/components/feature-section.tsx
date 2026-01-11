import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import {
	Cpu,
	Fingerprint,
	Pencil,
	Settings2,
	Sparkles,
	Zap,
} from "lucide-react";
import type React from "react";

type FeatureType = {
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	description: string;
};

export function FeatureSection() {
	return (
		<div className="mx-auto w-full max-w-5xl space-y-8">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
					Features We Offer
				</h2>
				<p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
					Everything you need to build portfolio
				</p>
			</div>

			<div className="overflow-hidden rounded-lg border">
				<div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
					{features.map((feature) => (
						<FeatureCard feature={feature} key={feature.title} />
					))}
				</div>
			</div>
		</div>
	);
}

export function FeatureCard({
	feature,
	className,
	...props
}: React.ComponentProps<"div"> & {
	feature: FeatureType;
}) {
	return (
		<div
			className={cn("relative overflow-hidden bg-background p-6", className)}
			{...props}
		>
			<div className="-mt-2 -ml-20 mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 size-full">
				<GridPattern
					className="absolute inset-0 size-full stroke-foreground/20"
					height={40}
					width={40}
					x={5}
				/>
			</div>
			<feature.icon
				aria-hidden
				className="size-6 text-foreground/75"
				strokeWidth={1}
			/>
			<h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
			<p className="relative z-20 mt-2 font-light text-muted-foreground text-xs">
				{feature.description}
			</p>
		</div>
	);
}

const features: FeatureType[] = [
	{
		title: "Faaast",
		icon: Zap,
		description: "It supports an entire helping developers and innovate.",
	},
	{
		title: "Powerful",
		icon: Cpu,
		description: "It supports an entire helping developers and businesses.",
	},
	{
		title: "Security",
		icon: Fingerprint,
		description: "It supports an helping developers businesses.",
	},
	{
		title: "Customization",
		icon: Pencil,
		description: "It supports helping developers and businesses innovate.",
	},
	{
		title: "Control",
		icon: Settings2,
		description: "It supports helping developers and businesses innovate.",
	},
	{
		title: "Built for AI",
		icon: Sparkles,
		description: "It supports helping developers and businesses innovate.",
	},
	{
		title: "Faaast",
		icon: Zap,
		description: "It supports an entire helping developers and innovate.",
	},
	{
		title: "Powerful",
		icon: Cpu,
		description: "It supports an entire helping developers and businesses.",
	},
	{
		title: "Security",
		icon: Fingerprint,
		description: "It supports an helping developers businesses.",
	},
];
