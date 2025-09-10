'use client'
import { SignUp } from '@/app/(frontend)/(web)/_components/signup'
import { Branding } from '@/components/branding'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Industry } from '@/payload-types'
import { Menu, X } from 'lucide-react'
import { useScroll } from 'motion/react'
import Link from 'next/link'
import { PaginatedDocs } from 'payload'
import React from 'react'

const menuItems = [
    { name: 'Features', href: '#link' },
    { name: 'Solution', href: '#link' },
    { name: 'Pricing', href: '#link' },
    { name: 'About', href: '#link' },
]

export const HeroHeader: React.FC<{
    isAuthenticated: string | undefined,
    getFields: Promise<PaginatedDocs<Pick<Industry, 'id' | 'title' | 'slug'>>>
}> = ({ isAuthenticated, getFields }) => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState}
                className={cn('fixed z-20 w-full border-b transition-colors duration-150', {
                    'bg-background/50 backdrop-blur-3xl': scrolled
                })}>
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Branding src='./skillshelf-full.svg' unoptimized alt='Skill Shelf' fill className='w-40 h-9' />
                            </Link>

                            <button
                                onClick={() => {
                                    setMenuState(!menuState)
                                }}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="data-[state=true]:rotate-180 data-[state=true]:scale-0 data-[state=true]:opacity-0 m-auto size-6 duration-200" />
                                <X className="data-[state=true]:rotate-0 data-[state=true]:scale-100 data-[state=true]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={cn("bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent", {
                            'block': menuState === true,
                            'hidden': menuState === false
                        })}>
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm">
                                    <Link href={isAuthenticated ? '/admin' : '/admin/login'} prefetch replace>
                                        <span>{isAuthenticated ? 'Dashboard' : 'Login'}</span>
                                    </Link>
                                </Button>
                                {isAuthenticated ? (
                                    <Button
                                        asChild
                                        size="sm">
                                        <Link href="/admin/logout" replace>
                                            <span>Logout</span>
                                        </Link>
                                    </Button>
                                ) : (
                                    <React.Suspense fallback={null}>
                                        <SignUp getFields={getFields} />
                                    </React.Suspense>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}