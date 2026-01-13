import * as PricingCard from "@/components/pricing-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerSideURL } from "@/utilities/getURL";
import { CheckCircle2, Users, XCircleIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata:Metadata = {
    title: 'Pricing - SkillShelf',
    description: 'Pricing of skillshelf',
    metadataBase: new URL(getServerSideURL()),
    openGraph: {
        url: './graphics/website-og.png',
        images: [{
            url: './graphics/website-og.png',
        }]
    }
}

export default function Page() {
	const features = [
		"1 Portfolio",
	];
    
	const lockedFeatures = [
        "Unlimited Portfolios",
		"Priority support",
        "1GB storage",
	];

	return (
		<main
			className={cn(
				"relative min-h-svh w-full overflow-hidden",
				"flex items-center justify-center p-4"
			)}
		>
			{/* Subtle dotted grid */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage:
						"radial-gradient(rgba(255,255,255,0.08) 0.8px, transparent 0.8px)",
					backgroundSize: "14px 14px",
				}}
			/>

			{/* Radial spotlight */}
			<div
				aria-hidden="true"
				className={cn(
					"-top-1/2 -translate-x-1/2 pointer-events-none absolute left-1/2 h-[120vmin] w-[120vmin] rounded-full",
					"bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]",
					"blur-[30px]"
				)}
			/>
			<PricingCard.Card>
				<PricingCard.Header>
					<PricingCard.Plan>
						<PricingCard.PlanName>
							<Users aria-hidden="true" />
							<span className="text-muted-foreground">Professional</span>
						</PricingCard.PlanName>
						<PricingCard.Badge>For Individuals</PricingCard.Badge>
					</PricingCard.Plan>
					<PricingCard.Price>
						<PricingCard.MainPrice>$10</PricingCard.MainPrice>
						<PricingCard.Period>/ month</PricingCard.Period>
						<PricingCard.OriginalPrice className="ml-auto">
							$12
						</PricingCard.OriginalPrice>
					</PricingCard.Price>
					<Button
						className={cn(
							"w-full font-semibold text-white hover:text-black",
							"bg-linear-to-b from-orange-500 to-orange-600 shadow-[0_10px_25px_rgba(255,115,0,0.3)]"
						)}
					>
						Get Started
					</Button>
				</PricingCard.Header>
				<PricingCard.Body>
					<PricingCard.List>
						{features.map((item, i) => (
							<PricingCard.ListItem key={`feature-${i}`}>
								<span className="mt-0.5">
									<CheckCircle2
										aria-hidden="true"
										className="h-4 w-4 text-green-500"
									/>
								</span>
								<span>{item}</span>
							</PricingCard.ListItem>
						))}
					</PricingCard.List>
					<PricingCard.Separator>Pro features</PricingCard.Separator>
					<PricingCard.List>
						{lockedFeatures.map((item, i) => (
							<PricingCard.ListItem className="opacity-75" key={i}>
								<span className="mt-0.5">
									<XCircleIcon
										aria-hidden="true"
										className="h-4 w-4 text-destructive"
									/>
								</span>
								<span>{item}</span>
							</PricingCard.ListItem>
						))}
					</PricingCard.List>
				</PricingCard.Body>
			</PricingCard.Card>
		</main>
	);
}
