"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandName from "./brand-name";
import ThemeSwitcher from "./theme-switcher";

const menus = [
  { name: "Home", link: "/" },
  { name: "Projects", link: "/projects" },
  { name: "Skills", link: "/skills" },
  { name: "About Me", link: "/about" },
  { name: "Contact Me", link: "/contact" },
];
export default function Navigation() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 flex h-20 items-center gap-4 px-4 md:px-8">
      <div className="hidden w-60  flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <BrandName />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <BrandName />
            {menus?.map((menu) => (
              <Link
                key={menu.link}
                href={menu.link}
                className={cn(
                  "transition-colors hover:text-foreground",
                  menu.link === pathname
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {menu.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial mr-8">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            {menus?.map((menu) => (
              <Link
                key={menu.link}
                href={menu.link}
                className={cn(
                  "transition-colors hover:text-foreground",
                  menu.link === pathname
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {menu.name}
              </Link>
            ))}
          </nav>
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
