"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust to your path
// import { TextEffect } from "@/components/ui/TextEffect"; // Adjust to your path
// import { AnimatedGroup } from "@/components/ui/AnimatedGroup"; // Adjust to your path
import CircularGallery from "./circular-gallery";
import { AnimatedGroup } from "./AnimatedGroup";
import { TextEffect } from "./TextEffect";
// import CircularGallery from "@/components/ui/section-components/circular-gallery"; // Adjust to your path

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection1(props: { isAuthenticated: boolean }) {
  const { isAuthenticated } = props || {}
  const defaultItems = [
    {
      image: '/portfolios/faizanadil-fe.png',
      text: "Faizan Adil",
    },
    {
      image: `/portfolios/faizanadil-fe-mobile.jpeg`,
      text: "Faizan Adil",
    },
    {
      image: `https://res.cloudinary.com/harshitproject/image/upload/v1746774806/One-screen.png`,
      text: "One",
    },
    {
      image: `https://res.cloudinary.com/harshitproject/image/upload/v1746774807/Reddit-nj7hwh.png`,
      text: "Reddit",
    },
    {
      image: `https://res.cloudinary.com/harshitproject/image/upload/v1746774805/Behance-screen.png`,
      text: "Behance",
    },
    {
      image: `https://res.cloudinary.com/harshitproject/image/upload/v1746774805/Notion-screen.png`,
      text: "Notion",
    },
  ];

  return (
    <>
      <main className="z-10">
        <section>
          <div className="relative overflow-hidden pt-2 md:pt-4">
            {/* Constrained content for the hero text */}
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup
                  // @ts-expect-error
                  variants={transitionVariants}>
                  <Link
                    href="#link"
                    className="mt-4 hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">
                      Design your Portfolio
                    </span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3 dark:text-white text-black" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3 dark:text-white text-black" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mt-8 text-balance text-6xl dark:text-white text-black md:text-7xl xl:text-[5.25rem] "
                >
                  Put your skills on the shelf, let the world see
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg dark:text-white/60 text-black"
                >
                  Skill Shelf is designed to let your skills shine — a platform made for creators, learners, and professionals.
                </TextEffect>

                <AnimatedGroup
                  // @ts-expect-error
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  {isAuthenticated && (
                    <div key={1} className="">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-md px-5 text-base dark:bg-white bg-black"
                      >
                        <Link href="/admin">
                          <span className="text-nowra dark:text-black text-white">
                            Dashboard
                          </span>
                        </Link>
                      </Button>
                    </div>
                  )}
                  {!isAuthenticated && (
                    <div key={1} className="">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-md px-5 text-base dark:bg-white bg-black"
                      >
                        <Link href="/sign-up">
                          <span className="text-nowra dark:text-black text-white">
                            Get Started
                          </span>
                        </Link>
                      </Button>
                    </div>
                  )}
                  {!isAuthenticated && (
                    <Button
                      key={2}
                      asChild
                      size="lg"
                      variant="ghost"
                      className="rounded-md px-5 bg-foreground/10"
                    >
                      <Link href="/admin">
                        <span className="text-nowrap dark:text-white text-black">
                          Sign in
                        </span>
                      </Link>
                    </Button>
                  )}
                </AnimatedGroup>
              </div>
            </div>

            <div className="mt-12 w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
              <CircularGallery
                items={defaultItems}
                bend={-9}
                textColor="#ffffff"
                borderRadius={0.03}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
