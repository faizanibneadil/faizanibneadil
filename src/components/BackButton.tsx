'use client'

import { ChevronLeft } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export function BackButton(){
    const router = useRouter()
    return <Button size='icon' onClick={() => router.back()} variant='secondary' className="rounded-md size-12"><ChevronLeft className="size-6" /></Button>
}