"use client";
import { useScroll } from "@/hooks/use-scroll";
// import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/mobile-nav";
import { DualModeImage } from "./dual-mode-image";
import Link from "next/link";

export const navLinks = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Features",
		href: "/features",
	},
	{
		label: "Pricing",
		href: "/pricing",
	},
	{
		label: "Changelog",
		href: "/changelog",
	},
];

export function Header(props: { isAuthenticated: boolean }) {
	const { isAuthenticated } = props || {}
	const scrolled = useScroll(10);

	return (
		<header
			className={cn("sticky top-0 z-50 w-full border-transparent border-b", {
				"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
				<Link href='/' className="rounded-md p-2 hover:bg-accent">
					{/* <Logo className="h-4.5" /> */}
					<DualModeImage width={100} height={80} alt="Logo" lightSrc='/graphics/skillshelf-text-light.svg' darkSrc='/graphics/skillshelf-text-dark.svg' />
				</Link>
				<div className="hidden items-center gap-1 md:flex">
					{navLinks.map((link, i) => (
						<Link
							className={buttonVariants({ variant: "ghost" })}
							href={link.href}
							key={i}
						>
							{link.label}
						</Link>
					))}
					{!isAuthenticated && (
						<>
							<Link href={'/admin'} className={buttonVariants({ variant: "outline" })}>Sign In</Link>
							<Link href='/sign-up' className={buttonVariants({})}>Get Started</Link>
						</>
					)}
					{isAuthenticated && (
						<>
							<Link href='/admin' className={buttonVariants({})}>Dashboard</Link>
							<Link href={'/admin/logout'} className={buttonVariants({ variant: "outline" })}>Logout</Link>
						</>
					)}
				</div>
				<MobileNav isAuthenticated={isAuthenticated} />
			</nav>
		</header>
	);
}
